/* Dados do quiz: eixos, perguntas e treinadores.
   Cada eixo vai de -100 (polo esquerdo) a +100 (polo direito).
   Em cada pergunta, d = +1 significa que CONCORDAR empurra para o polo direito; d = -1, para o esquerdo. */
window.QUIZ = {
  AXES: [
    { id: "posse",     l: "Posse de bola",           r: "Jogo direto",         desc: "Você controla o jogo com a bola ou prefere chegar rápido ao gol com bolas diretas?" },
    { id: "pressao",   l: "Pressão alta",            r: "Bloco baixo",         desc: "Onde seu time defende: roubando a bola lá na frente ou protegendo o espaço atrás?" },
    { id: "ataque",    l: "Ofensivo",                r: "Solidez defensiva",   desc: "Quanto você aposta no ataque e quanto prioriza não levar gol." },
    { id: "chao",      l: "Jogo pelo chão",          r: "Jogo aéreo",          desc: "Saída curta e bola no chão, ou bola longa, cruzamento e disputa pelo alto." },
    { id: "corredor",  l: "Pelas laterais",          r: "Pelo centro",         desc: "Por onde seu time prefere atacar: pela amplitude das pontas ou por dentro." },
    { id: "estrutura", l: "Estrutura rígida",        r: "Liberdade criativa",  desc: "Sistema com funções definidas ou liberdade para o talento individual decidir." },
    { id: "marcacao",  l: "Marcação por zona",       r: "Marcação individual", desc: "A defesa protege espaços ou cada jogador tem um adversário para acompanhar." },
    { id: "ritmo",     l: "Construção paciente",     r: "Transição rápida",    desc: "Paciência para construir a jogada ou velocidade para atacar logo após recuperar a bola." },
    { id: "elenco",    l: "Rodízio de elenco",       r: "Time-base fixo",      desc: "Rodar o elenco para poupar e dar chances ou manter sempre o mesmo time." },
    { id: "base",      l: "Formação da base",        r: "Contratar prontos",   desc: "Apostar em formar jogadores ou em quem já chega pronto para render." },
    { id: "dados",     l: "Dados e análise",         r: "Instinto e leitura",  desc: "Decidir com números e vídeo ou com intuição e leitura do momento do jogo." },
    { id: "gestao",    l: "Hierarquia e disciplina", r: "Gestão horizontal",   desc: "Vestiário com ordem e regras claras ou gestão baseada em diálogo e confiança." }
  ],

  QUESTIONS: [
    // posse
    { a: "posse", d: -1, t: "Prefiro perder a bola tentando construir de trás do que dar um chutão." },
    { a: "posse", d:  1, t: "Um lançamento longo para o centroavante é uma arma legítima, não um sinal de desespero." },
    { a: "posse", d: -1, t: "Meu time precisa ter mais posse de bola que o adversário para eu ficar tranquilo." },
    { a: "posse", d:  1, t: "Com o jogo ganho, ocupar o campo de ataque com bolas diretas é mais inteligente do que trocar passes." },
    // pressão
    { a: "pressao", d: -1, t: "Quando perdemos a bola, a prioridade é recuperá-la na hora, no campo do adversário." },
    { a: "pressao", d:  1, t: "Deixar o adversário ter a bola e fechar os espaços atrás é um plano tão bom quanto qualquer outro." },
    { a: "pressao", d: -1, t: "Meu time deve jogar com a linha defensiva adiantada, perto do meio-campo." },
    { a: "pressao", d:  1, t: "Prefiro um bloco compacto e baixo, que force o adversário a errar, a um time que corre atrás da bola." },
    // ataque x solidez
    { a: "ataque", d: -1, t: "Prefiro vencer por 4 a 3 do que por 1 a 0." },
    { a: "ataque", d:  1, t: "Não tomar gol é o primeiro passo para ganhar um campeonato." },
    { a: "ataque", d: -1, t: "Um time que não arrisca no ataque não merece vencer." },
    { a: "ataque", d:  1, t: "Com a vantagem no placar, tiro um atacante e coloco um zagueiro ou volante sem culpa nenhuma." },
    // chão x aéreo
    { a: "chao", d: -1, t: "Meus zagueiros precisam saber jogar com os pés antes de saber brigar pelo alto." },
    { a: "chao", d:  1, t: "Bola parada, cruzamento e disputa pelo alto decidem muitos jogos, então treino isso com ênfase." },
    { a: "chao", d:  1, t: "Um centroavante forte no jogo aéreo vale mais do que um atacante técnico e baixo." },
    { a: "chao", d: -1, t: "Mesmo sob pressão, o goleiro deve sair jogando curto." },
    // corredores
    { a: "corredor", d: -1, t: "Pontas abertos, que vão à linha de fundo e cruzam, são essenciais ao meu time." },
    { a: "corredor", d:  1, t: "Quero meu melhor criador jogando pelo meio, entre as linhas." },
    { a: "corredor", d: -1, t: "Os laterais devem ser quase alas, subindo o jogo inteiro." },
    { a: "corredor", d:  1, t: "Prefiro congestionar o meio-campo e deixar o adversário jogar pelas pontas, onde ele é menos perigoso." },
    // estrutura x liberdade
    { a: "estrutura", d: -1, t: "Cada jogador tem posição e função muito claras, e quem sai delas precisa ter um bom motivo." },
    { a: "estrutura", d:  1, t: "Meu craque tem liberdade para sair da posição e inventar." },
    { a: "estrutura", d: -1, t: "Treino jogadas ensaiadas e movimentos automatizados à exaustão." },
    { a: "estrutura", d:  1, t: "Dar três instruções simples e deixar os jogadores resolverem em campo é melhor do que um manual de 40 páginas." },
    // marcação
    { a: "marcacao", d: -1, t: "Cada jogador deve marcar um espaço, não um adversário." },
    { a: "marcacao", d:  1, t: "Meu melhor marcador deve seguir o craque do adversário pelo campo inteiro." },
    { a: "marcacao", d: -1, t: "Trocar a marcação conforme a bola se move é mais eficiente do que acompanhar o homem." },
    { a: "marcacao", d:  1, t: "Na bola parada defensiva, a marcação individual dá mais segurança do que a por zona." },
    // ritmo
    { a: "ritmo", d: -1, t: "Prefiro circular a bola até achar o espaço certo, mesmo que demore." },
    { a: "ritmo", d:  1, t: "O melhor momento para atacar é logo depois de roubar a bola, com o adversário desorganizado." },
    { a: "ritmo", d: -1, t: "Se não houver espaço, recuo a bola e recomeço a jogada quantas vezes for preciso." },
    { a: "ritmo", d:  1, t: "Meu time deve atacar em poucos toques e em alta velocidade." },
    // elenco
    { a: "elenco", d: -1, t: "Gosto de rodar o elenco, mesmo que isso mude o time titular toda semana." },
    { a: "elenco", d:  1, t: "O time titular tem de estar na cabeça de todo mundo: entrosamento vale mais do que descanso." },
    { a: "elenco", d: -1, t: "Todo jogador do elenco deve achar que pode ser titular se treinar bem." },
    { a: "elenco", d:  1, t: "Prefiro manter os melhores em campo até o limite, mesmo em jogos menos importantes." },
    // base x prontos
    { a: "base", d: -1, t: "Prefiro lançar um garoto da base a contratar um nome consagrado, mesmo que ele erre no começo." },
    { a: "base", d:  1, t: "Quando o clube pode contratar, o ideal é buscar jogadores prontos, não apostar em potencial." },
    { a: "base", d: -1, t: "O treinador deve ajudar a formar jogadores, não só ganhar jogos." },
    { a: "base", d:  1, t: "Numa final, prefiro um veterano rodado a um jovem promissor." },
    // dados x instinto
    { a: "dados", d: -1, t: "Mudo minha tática com base em números e vídeos, mesmo contra a minha intuição." },
    { a: "dados", d:  1, t: "Boa parte das minhas melhores decisões vem da leitura do momento, não de planilha." },
    { a: "dados", d: -1, t: "Todo adversário merece uma análise detalhada: padrões de passe, mapas de calor, jogadas ensaiadas." },
    { a: "dados", d:  1, t: "Estatística ajuda, mas não substitui olhar nos olhos do jogador e sentir o clima do vestiário." },
    // gestão
    { a: "gestao", d: -1, t: "No meu vestiário, quem manda sou eu, e ordem é ordem." },
    { a: "gestao", d:  1, t: "Escuto os jogadores e, em muitas decisões, deixo o grupo opinar." },
    { a: "gestao", d: -1, t: "Jogador indisciplinado, mesmo sendo craque, fica de fora." },
    { a: "gestao", d:  1, t: "Um bom ambiente e amizade no grupo ganham mais jogos do que cobrança dura." },

    // ——— banco ampliado (usado nos testes de 60 e 90) ———
    { a: "posse", d: -1, t: "Meu time deve conseguir sair jogando mesmo com o adversário pressionando lá em cima." },
    { a: "posse", d: -1, t: "Gosto de ver o time trocando 20 passes antes de chegar ao ataque." },
    { a: "posse", d:  1, t: "Segunda bola e bola dividida no campo de ataque são tão importantes quanto a posse." },
    { a: "posse", d:  1, t: "Prefiro um time que vá do goleiro ao atacante em poucos passes a um que construa em fases." },

    { a: "pressao", d: -1, t: "Quero atacantes e meias participando da marcação desde a saída de bola do adversário." },
    { a: "pressao", d: -1, t: "Prefiro correr o risco de ter espaço nas costas a deixar o adversário respirar na construção." },
    { a: "pressao", d:  1, t: "Esperar o adversário em linhas compactas no meio de campo e só então apertar é mais inteligente." },
    { a: "pressao", d:  1, t: "Correr atrás da bola o jogo todo é desperdício de energia: prefiro economizar e atacar no momento certo." },

    { a: "ataque", d: -1, t: "Mesmo vencendo, continuo atacando para matar o jogo." },
    { a: "ataque", d: -1, t: "Prefiro escalar três atacantes e correr o risco de levar gol." },
    { a: "ataque", d:  1, t: "Escalo dois volantes sem culpa quando o adversário é mais forte." },
    { a: "ataque", d:  1, t: "Empatar fora de casa já é um bom resultado, e monto o time para isso." },

    { a: "chao", d: -1, t: "Prefiro construir uma jogada de 30 segundos a cruzar a bola na área esperando um desvio." },
    { a: "chao", d: -1, t: "O jogo aéreo deve ser exceção, não regra, no meu time." },
    { a: "chao", d:  1, t: "Minha equipe tem de ser forte em bolas paradas, tanto ofensivas quanto defensivas." },
    { a: "chao", d:  1, t: "Cruzar muitas bolas na área é uma estratégia perfeitamente válida." },

    { a: "corredor", d: -1, t: "Abrir o campo e dar amplitude ao jogo é o que desorganiza uma defesa fechada." },
    { a: "corredor", d: -1, t: "Quero meus pontas em duelos individuais constantes com os laterais adversários." },
    { a: "corredor", d:  1, t: "Meus meias devem ocupar o corredor central, com combinações curtas no meio." },
    { a: "corredor", d:  1, t: "Prefiro um camisa 10 clássico, entre as linhas, a dois pontas rápidos." },

    { a: "estrutura", d: -1, t: "Antes do jogo, defino com precisão onde cada jogador deve estar em cada fase da partida." },
    { a: "estrutura", d: -1, t: "Jogador que quebra o padrão tático precisa ter muito mérito para continuar em campo." },
    { a: "estrutura", d:  1, t: "O talento individual deve prevalecer sobre o desenho tático." },
    { a: "estrutura", d:  1, t: "Quero jogadores que decidam sozinhos nos momentos de dúvida, sem esperar ordem do banco." },

    { a: "marcacao", d: -1, t: "Prefiro que a linha defensiva se mova em bloco, como um só organismo." },
    { a: "marcacao", d: -1, t: "Passar a marcação de um jogador para outro durante a jogada faz parte do meu sistema defensivo." },
    { a: "marcacao", d:  1, t: "Cada jogador deve saber exatamente quem é o seu homem." },
    { a: "marcacao", d:  1, t: "Colocar um volante só para anular o camisa 10 adversário é uma decisão sensata." },

    { a: "ritmo", d: -1, t: "Para mim, paciência na construção vale mais do que velocidade." },
    { a: "ritmo", d: -1, t: "Um time que não sabe controlar o ritmo do jogo não é um time grande." },
    { a: "ritmo", d:  1, t: "Contra times que têm mais posse, o contra-ataque deve ser meu principal plano." },
    { a: "ritmo", d:  1, t: "Prefiro um jogo aberto, de ida e volta, a um jogo controlado." },

    { a: "elenco", d: -1, t: "Minhas substituições são planejadas, e todo mundo sabe que vai jogar em algum momento." },
    { a: "elenco", d: -1, t: "Em sequência de jogos, prefiro poupar titulares a arriscar uma lesão." },
    { a: "elenco", d:  1, t: "Poucas mudanças de uma partida para outra: o time precisa ter uma cara só." },
    { a: "elenco", d:  1, t: "Time que está ganhando não se mexe." },

    { a: "base", d: -1, t: "Um garoto de 18 anos que erra na minha equipe aprende; um veterano que erra só custa caro." },
    { a: "base", d: -1, t: "Prefiro investir em olheiros e categorias de base do que em grandes contratações." },
    { a: "base", d:  1, t: "Resultado imediato exige contratar jogadores já testados em alto nível." },
    { a: "base", d:  1, t: "Não tenho paciência para esperar a formação de um jogador: quero quem já rende hoje." },

    { a: "dados", d: -1, t: "Gosto de ter relatórios de desempenho de cada jogador à mão antes de escalar." },
    { a: "dados", d: -1, t: "Decisão sem dado nem análise é palpite, e eu não trabalho com palpite." },
    { a: "dados", d:  1, t: "Nenhuma análise substitui a experiência de quem já viveu mil jogos." },
    { a: "dados", d:  1, t: "O melhor treinador é o que sente o jogo e muda no momento certo, sem esperar o intervalo." },

    { a: "gestao", d: -1, t: "O treinador não precisa ser querido; precisa ser respeitado." },
    { a: "gestao", d: -1, t: "As regras do vestiário valem para todos, do reserva ao capitão, sem exceções." },
    { a: "gestao", d:  1, t: "Os jogadores mais experientes devem ajudar a definir como o time joga." },
    { a: "gestao", d:  1, t: "Prefiro conversar a punir: quase sempre dá mais resultado." }
  ],

  /* v segue a ordem dos eixos: posse, pressao, ataque, chao, corredor, estrutura,
     marcacao, ritmo, elenco, base, dados, gestao.
     ucl = campeão da Champions/Copa dos Campeões; br = do futebol brasileiro.
     Os valores são uma leitura subjetiva do estilo de cada treinador. */
  COACHES: [
    // ——— Campeões da Champions ———
    { n: "Pep Guardiola",   f: "🇪🇸", ucl: true,  br: false, t: "Posse total, pressão pós-perda e estrutura posicional rigorosa.",           v: [-95,-90,-65,-85, 20,-60,-50,-80,-40, 30,-60,-40] },
    { n: "Jürgen Klopp",    f: "🇩🇪", ucl: true,  br: false, t: "Gegenpressing, intensidade e um vestiário que corre junto.",                  v: [ 10,-95,-60,-30,-20, 10, 10, 90,  0,  0,-30, 60] },
    { n: "Carlo Ancelotti", f: "🇮🇹", ucl: true,  br: false, t: "Pragmatismo sereno: deixa o craque jogar e cuida do grupo.",                  v: [-10, 10,-10,-10,  0, 70, 10, 10, 50, 30, 50, 95] },
    { n: "José Mourinho",   f: "🇵🇹", ucl: true,  br: false, t: "Bloco organizado, transições letais e controle total do vestiário.",          v: [ 40, 60, 70, 20, 20,-50, 30, 60, 70, 60, 10,-70] },
    { n: "Zinedine Zidane", f: "🇫🇷", ucl: true,  br: false, t: "Gestão de egos e leitura de jogo para decidir as grandes noites.",            v: [-10, 20,  0,-10,  0, 50,  0, 10, 60, 40, 70, 90] },
    { n: "Hansi Flick",     f: "🇩🇪", ucl: true,  br: false, t: "Linha altíssima e pressão sufocante com ataque vertical.",                    v: [-50,-95,-70,-50, 10,-30,-30, 30, 10, 10,-40, 20] },
    { n: "Luis Enrique",    f: "🇪🇸", ucl: true,  br: false, t: "Pressão coletiva, posse com propósito e exigência absoluta.",                 v: [-70,-90,-60,-50, 10,-50,-40,-30,-30,  0,-30,-50] },
    { n: "Alex Ferguson",   f: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", ucl: true,  br: false, t: "Autoridade, formação de jogadores e um time que não desiste.",                v: [ 10,-10,-30, 10,-30, 30, 10, 50, 20,-60, 70,-90] },
    { n: "Arrigo Sacchi",   f: "🇮🇹", ucl: true,  br: false, t: "Zona pura, linha de impedimento e o coletivo acima de tudo.",                 v: [-30,-100,-60,-30,  0,-95,-100,-30,  0, 40,-50,-80] },
    { n: "Johan Cruyff",    f: "🇳🇱", ucl: true,  br: false, t: "Futebol total: posse, largura e jogadores da base.",                          v: [-100,-80,-90,-95,-70,-30,-60,-70, 0,-100, 40, 30] },
    { n: "Jupp Heynckes",   f: "🇩🇪", ucl: true,  br: false, t: "Equilíbrio alemão com liberdade na hora certa.",                              v: [-30,-40,-20,-10,-20,-10,-10,  0, 40, 20,-20, 20] },
    { n: "Vicente del Bosque", f: "🇪🇸", ucl: true, br: false, t: "Gestão tranquila de estrelas e respeito ao jogador.",                        v: [-60,-20,-10,-40, 10, 40,-10,-10, 70,-20, 20, 95] },
    { n: "Thomas Tuchel",   f: "🇩🇪", ucl: true,  br: false, t: "Tático, detalhista e mestre em ajustes de sistema.",                          v: [-40,-60,-30,-30, 40,-60,-20,  0,-20, 30,-60,-30] },
    { n: "Marcello Lippi",  f: "🇮🇹", ucl: true,  br: false, t: "Time fechado, vestiário forte e cultura vencedora.",                          v: [  0,-10, 10, 10,  0,-30,-10, 30, 90, 50, 50,-60] },
    { n: "Fabio Capello",   f: "🇮🇹", ucl: true,  br: false, t: "Disciplina de ferro e um time que não perde.",                                v: [-10, 10, 30, 20, 10,-60,  0, 20, 60, 50, 10,-85] },
    { n: "Louis van Gaal",  f: "🇳🇱", ucl: true,  br: false, t: "Filosofia rígida, posse e a base como religião.",                             v: [-80,-50,-30,-50,-20,-100,-40,-60, 20,-90,-30,-95] },
    { n: "Rinus Michels",   f: "🇳🇱", ucl: true,  br: false, t: "O pai do futebol total: movimento, pressão e espaço.",                        v: [-80,-90,-80,-50,-50,-30,-70,-50, 30,-60,-30,-50] },

    // ——— Futebol brasileiro ———
    { n: "Telê Santana",    f: "🇧🇷", ucl: false, br: true,  t: "Futebol-arte: toque, ofensividade e respeito à bola.",                        v: [-90,-30,-90,-80,-60, 40,-30,-50, 40,-80, 40, 20] },
    { n: "Luiz Felipe Scolari", f: "🇧🇷", ucl: false, br: true, t: "Família, coragem e um time organizado para decidir.",                      v: [ 40, 20, 40, 20,-30,-40, 10, 40, 70, 50, 60, 50] },
    { n: "Tite",            f: "🇧🇷", ucl: false, br: true,  t: "Estudo, método e coletivo organizado.",                                       v: [-30,-30,-10,-10,-10,-60,-10,  0, 30,  0,-50, 30] },
    { n: "Vanderlei Luxemburgo", f: "🇧🇷", ucl: false, br: true, t: "Pragmático e vencedor: adapta o time ao elenco que tem.",                  v: [-30,-20,-30,-20,-20,-20,-20, 30, 10, 10,-20,-30] },
    { n: "Abel Ferreira",   f: "🇵🇹", ucl: false, br: true,  t: "Disciplina tática, rotação de elenco e muita análise.",                       v: [  0,-60,  0,  0,  0,-70, 30, 40,-60, 20,-60,-60] },
    { n: "Renato Gaúcho",   f: "🇧🇷", ucl: false, br: true,  t: "Instinto, ousadia e confiança total nos jogadores.",                          v: [ 10, 40,-40, 10,  0, 70, 10, 40, 60, 50, 95, 80] },
    { n: "Jorge Jesus",     f: "🇵🇹", ucl: false, br: true,  t: "Ataque total, linha alta e rigor tático.",                                    v: [-70,-95,-90,-30,-40,-60,  0,-30,  0,-30,-40,-80] },
    { n: "Mano Menezes",    f: "🇧🇷", ucl: false, br: true,  t: "Equilibrado, prático e adaptável.",                                           v: [  0, 10, 10,  0,  0,-20,  0, 20, 20, 10,  0, 20] },
    { n: "Dorival Júnior",  f: "🇧🇷", ucl: false, br: true,  t: "Gestão humana, equilíbrio e confiança no grupo.",                             v: [ 10, 20,  0, 10,  0, 20, 10, 30, 60, 10, 50, 70] },
    { n: "Mário Zagallo",   f: "🇧🇷", ucl: false, br: true,  t: "Pragmatismo tático e uma fibra de campeão.",                                  v: [-10, 10,-30, 10,-70,-10,  0, 30, 70,  0, 40, 30] },
    { n: "Carlos Alberto Parreira", f: "🇧🇷", ucl: false, br: true, t: "Cautela, segurança defensiva e título acima de tudo.",                     v: [  0, 20, 40, 10,  0,-60,  0, 20, 80, 30,-30,-30] },
    { n: "Cuca",            f: "🇧🇷", ucl: false, br: true,  t: "Intuição, transição rápida e leitura de jogo.",                               v: [  0,  0,  0,  0,  0, 10,  0, 40, 40, 40, 60, 20] },
    { n: "Fernando Diniz",  f: "🇧🇷", ucl: false, br: true,  t: "Fluidismo, posse extrema e liberdade total.",                                 v: [-100,-90,-80,-50,-90, 95,-50,-70, 30,-80,  0, 20] },
    { n: "Muricy Ramalho",  f: "🇧🇷", ucl: false, br: true,  t: "Disciplina, solidez e mentalidade vencedora.",                                v: [ 10,  0, 30, 10,  0,-70, 10, 30, 70, 20, 10,-70] },

    // ——— Outros nomes ———
    { n: "Diego Simeone",   f: "🇦🇷", ucl: false, br: false, t: "Intensidade, solidez e um time que é a cara do treinador.",                   v: [ 50, 70, 95, 40, 20,-80, 60, 70, 90, 50, 10,-95] },
    { n: "Antonio Conte",   f: "🇮🇹", ucl: false, br: false, t: "Intensidade, alas e muito trabalho tático.",                                  v: [ 10,-20, 10, 10,-50,-80,-30, 40, 70, 30,-30,-70] },
    { n: "Mauricio Pochettino", f: "🇦🇷", ucl: false, br: false, t: "Pressão intensa e jovens em alta rotação.",                                v: [  0,-80,-40,  0,  0,-20, 10, 40, 10,-40,-20,-20] },
    { n: "Marcelo Bielsa",  f: "🇦🇷", ucl: false, br: false, t: "Marcação individual, obsessão por vídeo e ataque sem medo.",                  v: [-30,-100,-90,-20,-30,-90,100, 80, 50,-70,-90,-40] },
    { n: "Mikel Arteta",    f: "🇪🇸", ucl: false, br: false, t: "Controle posicional e detalhismo extremo.",                                    v: [-60,-70,-40,-40, 10,-95,-30,-30,  0,-10,-70,-70] },
    { n: "Xavi Hernández",  f: "🇪🇸", ucl: false, br: false, t: "Posse pura e a filosofia do jogo de posição.",                                v: [-100,-80,-70,-80,-10,-70,-30,-80, 10,-30,-40,  0] },
    { n: "Arne Slot",       f: "🇳🇱", ucl: false, br: false, t: "Pressão vertical e adaptação inteligente.",                                   v: [-30,-60,-40,-20,  0,-30,  0, 30, 10,  0,-60, 10] },
    { n: "Enzo Maresca",    f: "🇮🇹", ucl: false, br: false, t: "Construção curta, domínio da bola e ruptura por dentro.",                     v: [-90,-70,-60,-60, 40,-80,  0,-60,  0, 20,-50,-20] },
    { n: "Simone Inzaghi",  f: "🇮🇹", ucl: false, br: false, t: "Sistema fluido, alas fortes e time que se entende.",                          v: [-20,-20,-20,-10,-30,-30,-20, 30, 40,  0,-20, 20] },
    { n: "Massimiliano Allegri", f: "🇮🇹", ucl: false, br: false, t: "Resultado acima de tudo: pragmatismo e gestão de momentos.",              v: [ 30, 70, 90, 30, 10,-30, 20, 40, 60, 40, 40, 10] },
    { n: "Roberto Mancini", f: "🇮🇹", ucl: false, br: false, t: "Equilíbrio, talento e vestiário unido.",                                      v: [-20,  0,-10,  0,  0,-10,-10,  0, 30, 30,  0, 60] },
    { n: "Didier Deschamps", f: "🇫🇷", ucl: false, br: false, t: "Solidez, pragmatismo e gestão fria de estrelas.",                            v: [ 20, 30, 60, 20, 20,-20, 20, 40, 70, 50, 20,-40] },
    { n: "Lionel Scaloni",  f: "🇦🇷", ucl: false, br: false, t: "Grupo antes de tudo: time fechado e líder de verdade.",                       v: [-20,-20,-20,  0, 10, 20, 10, 10, 60, 10,-10, 80] },
    { n: "Ange Postecoglou", f: "🇦🇺", ucl: false, br: false, t: "Ataque total, linha adiantada e risco permanente.",                          v: [-60,-100,-100,-30,-40,-30, 10,-30, 60,-30,-30, 40] },
    { n: "Unai Emery",      f: "🇪🇸", ucl: false, br: false, t: "Estudioso, tático e especialista em mata-mata.",                              v: [-10,-30,  0,  0,  0,-50,-20, 10,-10, 10,-70,-30] },
    { n: "Julian Nagelsmann", f: "🇩🇪", ucl: false, br: false, t: "Treinador-cientista: tática flexível e vocação para jovens.",              v: [-40,-80,-40,-40, 20,-40,-20,  0,-60,-40,-70, 40] },
    { n: "Claudio Ranieri", f: "🇮🇹", ucl: false, br: false, t: "Pragmatismo simpático e pé no chão.",                                         v: [ 10,  0, 20,  0,  0, 10,  0, 20,-10, 40, 40, 70] }
  ],

  /* Identidade de jogo de clubes e seleções (leitura subjetiva, mesma ordem de eixos dos treinadores).
     grp: "br" = clubes do Brasil, "eu" = clubes da Europa, "sel" = seleções históricas. */
  TEAMS: [
    // ——— Europa ———
    { n: "Barcelona",          f: "🇪🇸", grp: "eu",  t: "A escola da posse: La Masia, toque curto e jogo de posição.",              v: [-95,-75,-70,-85,-20,-50,-40,-70,  0,-95,-40,  0] },
    { n: "Real Madrid",        f: "🇪🇸", grp: "eu",  t: "Estrelas, liberdade e a mentalidade de decidir nas grandes noites.",      v: [-10, 10,-20,-10, 10, 70, 10, 40, 60, 70, 50, 60] },
    { n: "Manchester City",    f: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", grp: "eu",  t: "Controle absoluto da bola, estrutura posicional e pressão pós-perda.",    v: [-90,-85,-70,-80, 30,-60,-50,-60,-30, 30,-70,-30] },
    { n: "Liverpool",          f: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", grp: "eu",  t: "Intensidade total, gegenpressing e transição em velocidade.",             v: [  0,-90,-60,-20,-30, 10, 10, 90, 10, 10,-50, 50] },
    { n: "Bayern de Munique",  f: "🇩🇪", grp: "eu",  t: "Mentalidade vencedora, linha alta e físico para dominar.",               v: [-50,-80,-60,-40,  0,-20,-20, 10, 40, 50,-30,-20] },
    { n: "Arsenal",            f: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", grp: "eu",  t: "Controle posicional, detalhes e muita bola parada trabalhada.",           v: [-60,-70,-40,-40, 10,-80,-30,-30,  0,-10,-70,-60] },
    { n: "Atlético de Madrid", f: "🇪🇸", grp: "eu",  t: "Bloco baixo, raça, solidez e intensidade para sofrer e decidir.",         v: [ 40, 70, 90, 40, 20,-70, 60, 70, 80, 40, 10,-90] },
    { n: "Inter de Milão",     f: "🇮🇹", grp: "eu",  t: "Sistema fluido, alas fortes e equilíbrio entre defesa e ataque.",         v: [-10,-20,  0,  0,-40,-30,-20, 40, 50, 30,-20, 10] },
    { n: "Juventus",           f: "🇮🇹", grp: "eu",  t: "Pragmatismo, defesa sólida e mentalidade de resultado.",                  v: [ 20, 50, 80, 30, 10,-30, 30, 40, 70, 60, 20,-60] },
    { n: "Milan",              f: "🇮🇹", grp: "eu",  t: "Tradição, equilíbrio tático e jogadores que decidem.",                    v: [-40,-30,-30,-30,-10,-20,-20, 20, 30, 30, 10, 20] },
    { n: "PSG",                f: "🇫🇷", grp: "eu",  t: "Talento individual, intensidade e ataque como identidade.",               v: [-60,-70,-50,-50,  0,  0,-20, 10,-10, 60,-30, 10] },
    { n: "Ajax",               f: "🇳🇱", grp: "eu",  t: "A escola holandesa: posse, base e futebol ofensivo.",                     v: [-85,-70,-70,-70,-30,-50,-40,-60,-10,-100,-30, 10] },
    { n: "Borussia Dortmund",  f: "🇩🇪", grp: "eu",  t: "Velocidade, jovens talentos e ataque em transição.",                      v: [-10,-70,-50,-20,-20,  0,  0, 60,-10,-40,-30, 40] },
    { n: "Chelsea",            f: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", grp: "eu",  t: "Elenco gigante, rotação constante e foco em resultado.",                  v: [-20,-30,-20,-10,  0,-30,  0, 20,-40, 50,-50,-30] },

    // ——— Brasil ———
    { n: "Flamengo",           f: "🇧🇷", grp: "br",  t: "Ofensivo, intensidade e craques em alta velocidade.",                    v: [-30,-40,-70,-20,-30, 50,  0, 40, 30, 40, 60, 40] },
    { n: "Palmeiras",          f: "🇧🇷", grp: "br",  t: "Organização, força física, bola parada e elenco profundo.",              v: [ 10,-10, 10, 10, 10,-60, 20, 40,-20,-20,-40,-30] },
    { n: "Corinthians",        f: "🇧🇷", grp: "br",  t: "Raça, solidez e força coletiva para superar o adversário.",              v: [ 30, 30, 70, 30, 20,-40, 20, 30, 60, 10, 40,-20] },
    { n: "São Paulo",          f: "🇧🇷", grp: "br",  t: "Tradição de campeão, organização e base forte.",                          v: [-10,  0, 20, 10,  0,-40,  0, 20, 50,-40,  0,-20] },
    { n: "Santos",             f: "🇧🇷", grp: "br",  t: "Os Meninos da Vila: ataque, ponta e formação de craques.",               v: [-60,-30,-80,-50,-70, 60,-20,-20, 30,-100, 40, 40] },
    { n: "Fluminense",         f: "🇧🇷", grp: "br",  t: "Toque de bola, liberdade criativa e jogo fluido.",                       v: [-90,-60,-70,-50,-70, 95,-40,-60, 20,-40, 10, 60] },
    { n: "Grêmio",             f: "🇧🇷", grp: "br",  t: "Garra, jogo aéreo e mentalidade copeira.",                               v: [ 10, 20, 30, 60,-20,-20, 10, 40, 60,  0, 50, 40] },
    { n: "Internacional",      f: "🇧🇷", grp: "br",  t: "Tradição, equilíbrio e identidade competitiva.",                          v: [-10,-10,  0, 10,  0,-20, 10, 30, 50,-30, 20, 10] },
    { n: "Cruzeiro",           f: "🇧🇷", grp: "br",  t: "Camisa pesada, equilíbrio e jogo de toque com intensidade.",             v: [-20,  0,-20,  0,-10,-10,  0, 20, 30, 10, 20, 10] },
    { n: "Atlético-MG",        f: "🇧🇷", grp: "br",  t: "Raça, transição rápida e confiança no instinto.",                         v: [ 20, 10, 20, 40,-20, 20, 20, 50, 50, 10, 60, 50] },
    { n: "Botafogo",           f: "🇧🇷", grp: "br",  t: "Velocidade, transição e jogadores decisivos.",                            v: [-30,-30,-30,-20,-20,  0,  0, 40, 20, 10, 10, 40] },
    { n: "Vasco",              f: "🇧🇷", grp: "br",  t: "Formação de base, raça e tradição popular.",                              v: [ 10, 10, 20, 20,-10,-20, 10, 40, 40,-80, 30, 20] },

    // ——— Seleções históricas ———
    { n: "Brasil de 1970",     f: "🇧🇷", grp: "sel", t: "O futebol-arte no auge: craques livres e ataque total.",                  v: [-70,-30,-90,-50,-70, 95,-60,-40,100,-20, 70, 60] },
    { n: "Brasil de 1982",     f: "🇧🇷", grp: "sel", t: "Toque, beleza e ofensividade acima de tudo.",                             v: [-90,-30,-100,-80,-80, 95,-50,-60, 80,-20, 90, 70] },
    { n: "Brasil de 2002",     f: "🇧🇷", grp: "sel", t: "Time-base fixo, estrelas no ataque e laterais ofensivos.",                v: [  0, 10,-20, 10,-50,-10,  0, 30,100, 60, 50, 50] },
    { n: "Espanha de 2010",    f: "🇪🇸", grp: "sel", t: "Posse total e uma geração em sintonia.",                                  v: [-100,-80,-60,-90,-10,-40,-30,-70,100,-30,-30, 40] },
    { n: "Holanda de 1974",    f: "🇳🇱", grp: "sel", t: "O futebol total que mudou o jogo.",                                       v: [-80,-95,-90,-60,-40,-20,-60,-50, 90,-60,-20, 50] },
    { n: "Alemanha de 2014",   f: "🇩🇪", grp: "sel", t: "Estrutura, inteligência coletiva e controle do jogo.",                    v: [-50,-60,-50,-40,  0,-30,-10, 10, 70,-20,-60, 40] },
    { n: "Itália de 2006",     f: "🇮🇹", grp: "sel", t: "Defesa fechada, coletivo forte e talento na hora certa.",                v: [ 10, 10, 70, 20, 10,-50, 30, 30, 70, 50, 10, 10] },
    { n: "Argentina de 2022",  f: "🇦🇷", grp: "sel", t: "Um grupo unido em torno do seu craque.",                                  v: [-20,-10, 10,  0, 10, 20, 10, 20, 60, 10,  0, 90] }
  ]
};
