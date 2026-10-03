/* =====================================================================
   CONFIGURAÇÃO CENTRAL — é aqui que você edita quase tudo.
   1) SITE: logo, textos da home, rodapé.
   2) DISCIPLINAS: lista de disciplinas → assuntos → projetos.
   ===================================================================== */
const SITE = {
  nome: "Arduino Nota 10",
  slogan: "Semeando a educação com Arduino",
  logo: "assets/logo.png",                        // LOGO DO CABEÇALHO: substitua este arquivo (mesmo nome)
  logoHome: "assets/logo-home.png",               // LOGO GRANDE DA HOMEPAGE (acima do título). Se o arquivo não existir, usa a logo do cabeçalho
  personagemPadrao: "assets/personagem/personagem-padrao.png", // usada quando não há pose específica
  personagemHome: "assets/personagem/personagem-home.png",     // personagem grande da homepage
  // FUNDO ATRÁS DA PERSONAGEM: substitua estes arquivos (ou mude o caminho). Se o arquivo não existir, aparece a cor verde-clara padrão.
  fundoHome: "assets/imagens/fundo-personagem-home.png",     // fundo grande da homepage
  fundoInterno: "assets/imagens/fundo-personagem.png",       // fundo pequeno das páginas internas
  // OUTROS FUNDOS (opcionais; sem o arquivo, vale a cor padrão):
  fundoPalco: "assets/imagens/fundo-palco.png",   // cartão verde-escuro que envolve a personagem na homepage
  fundoSite: "assets/imagens/fundo-site.png",     // fundo de todas as páginas (use imagem clara, para o texto continuar legível)
  // Pose por disciplina: assets/personagem/personagem-<slug-da-disciplina>.png (ex.: personagem-fisica.png)

  /* ---- TEXTOS DA HOMEPAGE (todos provisórios — substitua) ---- */
  home: {
    chamadaHero: "[SUBSTITUA] Ideias que saem do papel. Conhecimento que ganha vida.",
    frasePalco: "O próximo passo começa com uma ideia.",
    tituloProposta: "Aprender fazendo. Conectar descobertas.",
    textoProposta: "[SUBSTITUA — TEXTO PROVISÓRIO] O Arduino pode transformar conceitos em experiências: medir, observar, criar e testar. Uma ponte entre o que se aprende na sala de aula e o que se descobre na prática.",
    passos: [
      { icone: "▤", titulo: "Explore uma disciplina", texto: "Encontre conexões entre a tecnologia e os conteúdos da sua sala de aula." },
      { icone: "✦", titulo: "Escolha uma ideia", texto: "Navegue pelos assuntos e descubra projetos para experimentar." },
      { icone: "⚙", titulo: "Coloque a mão na massa", texto: "Crie, teste e transforme a curiosidade em aprendizado." }
    ],
    tituloDisciplinas: "Por onde vamos começar?",
    subDisciplinas: "Escolha uma disciplina e descubra o que você pode criar.",
    sobreLema: "APRENDER<br>É CULTIVAR.",
    sobreTitulo: "Sobre o Arduino Nota 10",
    sobreTexto: "[SUBSTITUA — TEXTO PROVISÓRIO] O Arduino Nota 10 reúne projetos que usam o Arduino como ferramenta de apoio ao ensino de diferentes disciplinas da Educação Básica.",
    sobreAviso: "Versão de demonstração: textos provisórios e projetos fictícios. Substitua pelo conteúdo oficial do projeto."
  },
};

/* =====================================================================
   DISCIPLINAS — para ADICIONAR UMA DISCIPLINA, copie um bloco abaixo.
   slug = nome da pasta em /disciplinas/ (minúsculas, sem acento/espaço).
   assuntos[].slug = pasta dentro da disciplina; projetos = pastas dentro do assunto.
   Cada projeto precisa de: disciplinas/<disc>/<assunto>/<projeto>/projeto.json
   ===================================================================== */
const DISCIPLINAS = [
  { slug:"matematica", nome:"Matemática", icone:"±", cor:"#eaf3ee",
    descricao:"Medir, contar e representar: números e formas ganham vida com sensores e placas.",
    assuntos:[
      { slug:"geometria",   nome:"Geometria",   projetos:["medindo-formas"] },
      { slug:"estatistica", nome:"Estatística", projetos:["coleta-de-dados"] },
      { slug:"funcoes",     nome:"Funções",     projetos:["visualizando-variacoes"] } ] },
  { slug:"fisica", nome:"Física", icone:"⚛", cor:"#eaeffa",
    descricao:"Movimento, energia e circuitos para ver a Física acontecer.",
    assuntos:[ { slug:"eletricidade", nome:"Eletricidade", projetos:["circuito-led"] } ] },
  { slug:"biologia", nome:"Biologia", icone:"❦", cor:"#ecf2e6",
    descricao:"Sensores para observar seres vivos e o ambiente.",
    assuntos:[ { slug:"ecologia", nome:"Ecologia", projetos:["monitor-de-umidade"] } ] },
  { slug:"historia", nome:"História", icone:"↺", cor:"#f5f0e9",
    descricao:"Maquetes e automação para contar a história de outro jeito.",
    assuntos:[
      { slug:"revolucao-industrial", nome:"Revolução Industrial", projetos:["maquina-e-automacao"] },
      { slug:"patrimonio-historico", nome:"Patrimônio histórico", projetos:["maquete-interativa"] } ] },
  { slug:"ciencias", nome:"Ciências", icone:"⚗", cor:"#eaf3ee",
    descricao:"Experimentos com medições para investigar o mundo.",
    assuntos:[ { slug:"clima", nome:"Clima e tempo", projetos:["mini-estacao"] } ] },
  { slug:"quimica", nome:"Química", icone:"⬡", cor:"#eef0f8", descricao:"[SUBSTITUA] Medições de temperatura, pH e muito mais.", assuntos:[] },
  { slug:"geografia", nome:"Geografia", icone:"◍", cor:"#f0f3e4", descricao:"[SUBSTITUA] Clima, relevo e paisagem com sensores.", assuntos:[] },
  { slug:"portugues", nome:"Língua Portuguesa", icone:"Aa", cor:"#f6eef0", descricao:"[SUBSTITUA] Leitura e escrita com interação.", assuntos:[] },
  { slug:"ingles", nome:"Língua Inglesa", icone:"En", cor:"#eaf1f5", descricao:"[SUBSTITUA] Vocabulário e comandos em inglês.", assuntos:[] },
  { slug:"artes", nome:"Artes", icone:"✎", cor:"#f7efe6", descricao:"[SUBSTITUA] Luz, som e movimento como linguagem artística.", assuntos:[] }
];
