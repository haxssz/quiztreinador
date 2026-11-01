(function () {
  "use strict";

  var Q = window.QUIZ;
  var AXES = Q.AXES, QUESTIONS = Q.QUESTIONS, COACHES = Q.COACHES, TEAMS = Q.TEAMS;
  var STORE = "quiz-treinador-v2";
  var THEME = "quiz-treinador-theme";

  var MODES = [
    { n: 30, name: "Rápido",   desc: "Uma visão geral do seu estilo, ideal para um primeiro teste.", time: "~3 min" },
    { n: 60, name: "Completo", desc: "O equilíbrio entre rapidez e precisão.",                         time: "~6 min", featured: true },
    { n: 90, name: "Profundo", desc: "O resultado mais preciso, com várias perguntas por eixo.",       time: "~9 min" }
  ];

  // Concordância de +2 (concordo totalmente) a -2 (discordo totalmente)
  var CHOICES = [
    { label: "Concordo totalmente", v: 2 },
    { label: "Concordo",            v: 1 },
    { label: "Neutro / depende",    v: 0 },
    { label: "Discordo",            v: -1 },
    { label: "Discordo totalmente", v: -2 }
  ];

  // Um usuário dificilmente chega a ±100 em todos os eixos, então comparamos
  // com perfis um pouco "suavizados".
  var VEC_SCALE = 0.75;
  var PAGE = 8;
  var MIN_PARTIAL = 12;

  var $ = function (id) { return document.getElementById(id); };
  var els = {};
  [
    "home", "quiz", "result", "resumeBtn", "modesGrid", "axesPreview", "progress", "progressBar", "counter",
    "statement", "answers", "backBtn", "exitBtn", "exitModal", "exitInfo", "exitContinue", "exitFinish",
    "exitSave", "exitDiscard", "resultEyebrow", "profileTitle", "profileLead", "topMatches", "axesResult",
    "tabs", "chips", "coachList", "moreBtn", "opposite", "shareBtn", "retryBtn", "toast", "themeBtn", "brand"
  ].forEach(function (id) { els[id] = $(id); });

  var state = { mode: 60, order: [], answers: {}, pos: 0 };
  var view = { tab: "coaches", filter: "all", expanded: false, scores: [], coaches: [], teams: [], partial: false };
  var locked = false;

  function total() { return state.order.length; }

  /* ---------- armazenamento (opcional; nunca quebra o app) ---------- */
  function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} }
  function clearSaved() { try { localStorage.removeItem(STORE); } catch (e) {} }
  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !Array.isArray(s.order) || !s.answers || typeof s.answers !== "object") return null;
      if ([30, 60, 90].indexOf(s.order.length) === -1) return null;
      var ok = s.order.every(function (i) { return typeof i === "number" && QUESTIONS[i]; });
      if (!ok) return null;
      s.pos = Math.max(0, Math.min(Number(s.pos) || 0, s.order.length - 1));
      s.mode = s.order.length;
      return s;
    } catch (e) { return null; }
  }

  /* ---------- utilidades ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function answeredCount() { return Object.keys(state.answers).length; }
  function show(name) {
    ["home", "quiz", "result"].forEach(function (n) { els[n].hidden = n !== name; });
    window.scrollTo({ top: 0 });
  }
  function toast(msg) {
    els.toast.textContent = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { els.toast.textContent = ""; }, 2600);
  }
  function lc(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

  /* Sorteia n perguntas, metade de cada lado em cada eixo (balanceado) */
  function pickQuestions(n) {
    var pairs = n / 2;
    var base = Math.floor(pairs / AXES.length);
    var extra = pairs - base * AXES.length;
    var extraAxes = shuffle(AXES.map(function (_, i) { return i; })).slice(0, extra);
    var chosen = [];

    AXES.forEach(function (a, ai) {
      var k = base + (extraAxes.indexOf(ai) !== -1 ? 1 : 0);
      var left = [], right = [];
      QUESTIONS.forEach(function (q, qi) {
        if (q.a !== a.id) return;
        (q.d < 0 ? left : right).push(qi);
      });
      chosen = chosen.concat(shuffle(left).slice(0, k), shuffle(right).slice(0, k));
    });

    // embaralha evitando dois eixos iguais em sequência, quando possível
    var order = shuffle(chosen);
    for (var i = 1; i < order.length; i++) {
      if (QUESTIONS[order[i]].a === QUESTIONS[order[i - 1]].a) {
        for (var j = i + 1; j < order.length; j++) {
          if (QUESTIONS[order[j]].a !== QUESTIONS[order[i - 1]].a &&
              (i + 1 >= order.length || QUESTIONS[order[j]].a !== QUESTIONS[order[i + 1]].a)) {
            var t = order[i]; order[i] = order[j]; order[j] = t;
            break;
          }
        }
      }
    }
    return order;
  }

  /* ---------- início ---------- */
  function renderHome() {
    els.modesGrid.innerHTML = "";
    MODES.forEach(function (m) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "mode" + (m.featured ? " featured" : "");
      b.innerHTML =
        (m.featured ? '<span class="badge">Recomendado</span>' : "") +
        '<span class="num">' + m.n + "<small>perguntas</small></span>" +
        "<b>" + m.name + "</b><p>" + m.desc + '</p><span class="time">' + m.time + "</span>";
      b.addEventListener("click", function () { startNew(m.n); });
      els.modesGrid.appendChild(b);
    });

    els.axesPreview.innerHTML = AXES.map(function (a) {
      return '<div class="chip-ax"><div class="poles"><b>' + a.l + "</b><i>↔</i><b>" + a.r + "</b></div><p>" + a.desc + "</p></div>";
    }).join("");

    var saved = load();
    var n = saved ? Object.keys(saved.answers).length : 0;
    if (saved && n >= saved.order.length) {
      els.resumeBtn.hidden = false;
      els.resumeBtn.textContent = "Ver meu último resultado";
    } else if (saved && n > 0) {
      els.resumeBtn.hidden = false;
      els.resumeBtn.textContent = "Continuar (" + n + "/" + saved.order.length + ")";
    } else {
      els.resumeBtn.hidden = true;
    }
  }

  function startNew(n) {
    state = { mode: n, order: pickQuestions(n), answers: {}, pos: 0 };
    save();
    show("quiz");
    renderQuestion();
  }

  function resume() {
    var saved = load();
    if (!saved) { renderHome(); return; }
    state = saved;
    if (answeredCount() >= total()) return showResult(false);
    show("quiz");
    renderQuestion();
  }

  /* ---------- quiz ---------- */
  function renderQuestion() {
    var qi = state.order[state.pos];
    var q = QUESTIONS[qi];
    var pct = Math.round((answeredCount() / total()) * 100);

    els.progressBar.style.width = pct + "%";
    els.progress.setAttribute("aria-valuenow", String(pct));
    els.counter.textContent = "Pergunta " + (state.pos + 1) + " de " + total();
    els.statement.textContent = q.t;
    els.backBtn.style.visibility = state.pos === 0 ? "hidden" : "visible";

    var current = state.answers[qi];
    els.answers.innerHTML = "";
    CHOICES.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "answer" + (current === c.v ? " picked" : "");
      b.innerHTML = '<span class="key">' + (i + 1) + "</span><span>" + c.label + "</span>";
      b.addEventListener("click", function () { choose(c.v); });
      els.answers.appendChild(b);
    });
  }

  function choose(v) {
    if (locked || !els.exitModal.hidden) return;
    locked = true;
    var qi = state.order[state.pos];
    state.answers[qi] = v;

    els.answers.querySelectorAll(".answer").forEach(function (b, i) {
      b.classList.toggle("picked", CHOICES[i].v === v);
    });

    setTimeout(function () {
      locked = false;
      if (state.pos < total() - 1) {
        state.pos += 1;
        save();
        renderQuestion();
      } else {
        save();
        showResult(false);
      }
    }, 170);
  }

  function back() {
    if (state.pos === 0 || locked) return;
    state.pos -= 1;
    save();
    renderQuestion();
  }

  /* ---------- saída do teste ---------- */
  function openExit() {
    var n = answeredCount();
    els.exitInfo.textContent = "Você respondeu " + n + " de " + total() + " perguntas. " +
      "Pode guardar o progresso e continuar depois" +
      (n >= MIN_PARTIAL ? ", ou ver agora um resultado parcial." : ".");
    els.exitFinish.hidden = n < MIN_PARTIAL;
    els.exitModal.hidden = false;
    els.exitContinue.focus();
  }
  function closeExit() { els.exitModal.hidden = true; }

  /* ---------- cálculo ---------- */
  function computeScores() {
    var sum = {}, cnt = {};
    AXES.forEach(function (a) { sum[a.id] = 0; cnt[a.id] = 0; });
    state.order.forEach(function (qi) {
      if (state.answers[qi] === undefined) return;
      var q = QUESTIONS[qi];
      sum[q.a] += state.answers[qi] * q.d;
      cnt[q.a] += 1;
    });
    return AXES.map(function (a) {
      return cnt[a.id] ? Math.round((sum[a.id] / (cnt[a.id] * 2)) * 100) : 0;
    });
  }

  function vec(item) { return item.v.map(function (x) { return x * VEC_SCALE; }); }

  function distance(a, b) {
    var s = 0;
    for (var i = 0; i < a.length; i++) { var d = a[i] - b[i]; s += d * d; }
    return Math.sqrt(s);
  }

  // distância 0 => 100%; ~160 de diferença média por eixo => 0%
  function matchPct(dist) {
    var maxD = Math.sqrt(AXES.length) * 160;
    return Math.max(0, Math.min(100, Math.round(100 * (1 - dist / maxD))));
  }

  function rank(list, scores) {
    return list.map(function (item) {
      var d = distance(scores, vec(item));
      return { item: item, dist: d, pct: matchPct(d) };
    }).sort(function (a, b) { return a.dist - b.dist; });
  }

  /* ---------- resultado ---------- */
  function profileFrom(scores) {
    var idx = AXES.map(function (_, i) { return i; }).sort(function (a, b) {
      return Math.abs(scores[b]) - Math.abs(scores[a]);
    }).slice(0, 3).filter(function (i) { return Math.abs(scores[i]) >= 15; });

    if (!idx.length) {
      return { title: "Treinador equilibrado", lead: "Você não pende forte para nenhum lado: adapta o jogo ao adversário e ao elenco, sem dogmas." };
    }
    var names = idx.map(function (i) { return lc(scores[i] < 0 ? AXES[i].l : AXES[i].r); });
    var title = names.join(", ").replace(/, ([^,]*)$/, " e $1");
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return { title: title, lead: "Seus traços mais marcantes mostram o tipo de treinador que você tende a ser. Abaixo estão todos os seus eixos e quem mais se parece com você." };
  }

  function showResult(partial) {
    show("result");
    var scores = computeScores();
    view.scores = scores;
    view.coaches = rank(COACHES, scores);
    view.teams = rank(TEAMS, scores);
    view.tab = "coaches";
    view.filter = "all";
    view.expanded = false;
    view.partial = !!partial;

    var p = profileFrom(scores);
    els.resultEyebrow.innerHTML = "Seu perfil" +
      (partial ? ' <span class="note">Parcial: ' + answeredCount() + " de " + total() + " respostas</span>" : "");
    els.profileTitle.textContent = p.title;
    els.profileLead.textContent = p.lead;

    var c = view.coaches[0], t = view.teams[0];
    els.topMatches.innerHTML =
      topCard("Treinador mais parecido", c) + topCard("Time mais parecido", t);

    renderAxes(scores);
    renderTabs();
    renderChips();
    renderList();

    var lc_ = view.coaches[view.coaches.length - 1], lt = view.teams[view.teams.length - 1];
    els.opposite.innerHTML = "O treinador mais diferente de você é <b>" + lc_.item.f + " " + lc_.item.n +
      "</b> (" + lc_.pct + "%), e o time mais diferente é <b>" + lt.item.f + " " + lt.item.n + "</b> (" + lt.pct + "%).";
  }

  function topCard(kind, r) {
    return '<div class="top-match"><div class="pct">' + r.pct + "<small>%</small></div><div>" +
      '<div class="kind">' + kind + "</div><h3>" + r.item.f + " " + r.item.n + "</h3><p>" + r.item.t + "</p></div></div>";
  }

  function renderAxes(scores) {
    els.axesResult.innerHTML = AXES.map(function (a, i) {
      var left = Math.round((100 - scores[i]) / 2);
      var right = 100 - left;
      return '<div class="axis"><div class="axis-labels"><span class="l"><b>' + left + "%</b>" + a.l + "</span>" +
        '<span class="r"><b>' + right + "%</b>" + a.r + "</span></div>" +
        '<div class="bar"><div class="a" data-w="' + left + '"></div><div class="b"></div></div></div>';
    }).join("");
    requestAnimationFrame(function () {
      els.axesResult.querySelectorAll(".bar .a").forEach(function (el) {
        el.style.width = el.getAttribute("data-w") + "%";
      });
    });
  }

  var FILTERS = {
    coaches: [
      { id: "all", label: "Todos" },
      { id: "ucl", label: "🏆 Campeões da Champions" },
      { id: "br",  label: "🇧🇷 Futebol brasileiro" }
    ],
    teams: [
      { id: "all", label: "Todos" },
      { id: "br",  label: "🇧🇷 Clubes do Brasil" },
      { id: "eu",  label: "🌍 Clubes da Europa" },
      { id: "sel", label: "🏆 Seleções" }
    ]
  };
  var TAB_LABELS = { coaches: "Treinadores", teams: "Times" };

  function renderTabs() {
    els.tabs.innerHTML = "";
    ["coaches", "teams"].forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tab";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", k === view.tab ? "true" : "false");
      b.textContent = TAB_LABELS[k];
      b.addEventListener("click", function () {
        view.tab = k; view.filter = "all"; view.expanded = false;
        renderTabs(); renderChips(); renderList();
      });
      els.tabs.appendChild(b);
    });
  }

  function renderChips() {
    els.chips.innerHTML = "";
    FILTERS[view.tab].forEach(function (f) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", f.id === view.filter ? "true" : "false");
      b.textContent = f.label;
      b.addEventListener("click", function () {
        view.filter = f.id; view.expanded = false;
        renderChips(); renderList();
      });
      els.chips.appendChild(b);
    });
  }

  function filtered() {
    var src = view.tab === "coaches" ? view.coaches : view.teams;
    return src.filter(function (r) {
      if (view.filter === "all") return true;
      if (view.tab === "coaches") return view.filter === "ucl" ? r.item.ucl : r.item.br;
      return r.item.grp === view.filter;
    });
  }

  function tagsFor(item) {
    var out = "";
    if (view.tab === "coaches") {
      if (item.ucl) out += '<span class="tag">🏆 Champions</span>';
      if (item.br) out += '<span class="tag">🇧🇷 Brasil</span>';
    } else {
      var lab = { br: "Brasil", eu: "Europa", sel: "Seleção" }[item.grp];
      if (lab) out += '<span class="tag">' + lab + "</span>";
    }
    return out;
  }

  function compareHTML(r) {
    var cv = vec(r.item);
    var rows = AXES.map(function (a, i) {
      var you = (view.scores[i] + 100) / 2, them = (cv[i] + 100) / 2;
      return '<div class="cmp-row"><div class="t"><span>' + a.l + "</span><span>" + a.r + "</span></div>" +
        '<div class="track"><span class="mk them" style="left:' + them + '%"></span>' +
        '<span class="mk you" style="left:' + you + '%"></span></div></div>';
    }).join("");
    return '<div class="compare"><div class="legend"><span><i class="dot you"></i>Você</span>' +
      '<span><i class="dot them"></i>' + r.item.n + "</span></div>" + rows + "</div>";
  }

  function renderList() {
    var list = filtered();
    var shown = view.expanded ? list : list.slice(0, PAGE);
    els.coachList.innerHTML = shown.map(function (r, i) {
      return '<details class="coach"><summary><span class="rank">' + (i + 1) + "</span>" +
        '<span><div class="name"><em>' + r.item.f + "</em>" + r.item.n + tagsFor(r.item) + "</div>" +
        '<div class="sub">' + r.item.t + "</div></span>" +
        '<span class="score">' + r.pct + "%</span></summary>" + compareHTML(r) + "</details>";
    }).join("");
    els.moreBtn.hidden = list.length <= PAGE;
    els.moreBtn.textContent = view.expanded ? "Ver menos" : "Ver todos (" + list.length + ")";
  }

  function shareText() {
    var c = view.coaches.slice(0, 3).map(function (r) { return r.item.n + " (" + r.pct + "%)"; }).join(", ");
    var t = view.teams[0];
    var traits = AXES.map(function (a, i) { return { a: a, s: view.scores[i] }; })
      .sort(function (x, y) { return Math.abs(y.s) - Math.abs(x.s); }).slice(0, 3)
      .map(function (x) { return x.s < 0 ? x.a.l : x.a.r; }).join(", ");
    return "Meu perfil de treinador: " + traits + ". Treinadores parecidos: " + c +
      ". Time que mais combina comigo: " + t.item.n + " (" + t.pct + "%). Faça o teste!";
  }

  function copyShare() {
    var text = shareText();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("Resultado copiado!"); }
      catch (e) { toast("Não foi possível copiar."); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast("Resultado copiado!"); }, fallback);
    } else { fallback(); }
  }

  /* ---------- tema ---------- */
  function applyTheme(t) {
    if (t === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
  }
  function initTheme() {
    var t = null;
    try { t = localStorage.getItem(THEME); } catch (e) {}
    if (!t && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) t = "light";
    applyTheme(t);
  }
  function toggleTheme() {
    var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem(THEME, next); } catch (e) {}
  }

  /* ---------- eventos ---------- */
  els.resumeBtn.addEventListener("click", resume);
  els.backBtn.addEventListener("click", back);
  els.exitBtn.addEventListener("click", openExit);
  els.exitContinue.addEventListener("click", closeExit);
  els.exitSave.addEventListener("click", function () { closeExit(); save(); renderHome(); show("home"); });
  els.exitDiscard.addEventListener("click", function () { closeExit(); clearSaved(); renderHome(); show("home"); });
  els.exitFinish.addEventListener("click", function () { closeExit(); save(); showResult(true); });
  els.exitModal.addEventListener("click", function (e) { if (e.target === els.exitModal) closeExit(); });
  els.retryBtn.addEventListener("click", function () { clearSaved(); renderHome(); show("home"); });
  els.shareBtn.addEventListener("click", copyShare);
  els.themeBtn.addEventListener("click", toggleTheme);
  els.moreBtn.addEventListener("click", function () { view.expanded = !view.expanded; renderList(); });
  els.brand.addEventListener("click", function (e) {
    e.preventDefault();
    if (!els.quiz.hidden && answeredCount() > 0) { openExit(); return; }
    renderHome(); show("home");
  });

  document.addEventListener("keydown", function (e) {
    if (!els.exitModal.hidden) {
      if (e.key === "Escape") closeExit();
      return;
    }
    if (els.quiz.hidden) return;
    if (e.key >= "1" && e.key <= "5") {
      choose(CHOICES[Number(e.key) - 1].v);
    } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
      e.preventDefault(); back();
    } else if (e.key === "Escape") {
      openExit();
    }
  });

  initTheme();
  renderHome();
})();
