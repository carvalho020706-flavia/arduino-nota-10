/* =====================================================================
   script.js — monta as páginas a partir de js/config.js e projeto.json.
   Normalmente você NÃO precisa editar este arquivo.
   ===================================================================== */
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const params = new URLSearchParams(location.search);
const pagina = document.body.dataset.pagina; // home | disciplina | projeto

/* Logo: usa SITE.logo em todo lugar; se faltar o arquivo, mostra o nome em texto */
const logoImg = (src = SITE.logo, alt = SITE.nome) =>
  `<img src="${src}" alt="${alt}" onerror="if(this.getAttribute('src')!=='${SITE.logo}'){this.src='${SITE.logo}'}else{this.replaceWith(Object.assign(document.createElement('span'),{className:'logo-texto',textContent:'${SITE.nome}'}))}">`;

/* Personagem: tenta a imagem pedida → padrão → espaço reservado */
function personagem(src, classe) {
  const ph = "Espaço da personagem";
  const fundo = classe.includes("grande") ? SITE.fundoHome : SITE.fundoInterno;
  return `<div class="slot-personagem ${classe}" style="background-image:url('${fundo}')"><img src="${src}" alt="Personagem do Arduino Nota 10"
    onerror="if(!this.dataset.t){this.dataset.t=1;this.src='${SITE.personagemPadrao}'}else{this.replaceWith(document.createTextNode('${ph}'))}"></div>`;
}

const cabecalho = () => `<header class="topo"><div class="wrap">
  <a class="logo" href="index.html" aria-label="${SITE.nome} — Início">${logoImg()}</a>
  <nav class="nav" aria-label="Principal">
    <a href="index.html" ${pagina === "home" ? 'aria-current="page"' : ""}>Início</a>
    <a href="index.html#disciplinas">Disciplinas</a>
    <a href="index.html#sobre">Sobre o projeto</a></nav></div></header>`;

/* Breadcrumb + botão voltar. itens = [{t, h}] (o último não tem link) */
const trilha = (itens) => {
  const pai = itens.length > 1 ? itens[itens.length - 2].h : "index.html";
  return `<nav class="migalhas" aria-label="Você está em">${itens.map((i) => (i.h ? `<a href="${i.h}">${esc(i.t)}</a>` : `<strong>${esc(i.t)}</strong>`)).join("<span>→</span>")}</nav>
  <a class="voltar" href="${pai}">← Voltar</a>`;
};

const achaDisc = (s) => DISCIPLINAS.find((d) => d.slug === s);
const caminhoProjeto = (d, a, p) => `disciplinas/${d}/${a}/${p}/`;
const lerJSON = (url) => fetch(url).then((r) => { if (!r.ok) throw 0; return r.json(); }).catch(() => null);

/* ---------------- HOME ---------------- */
function home() {
  const h = SITE.home;
  const cards = DISCIPLINAS.map((d) => `<a class="card" style="--cor:${d.cor}" href="disciplina.html?d=${d.slug}">
    <span class="icone" aria-hidden="true">${d.icone}</span><div><h3>${esc(d.nome)}</h3>
    <small><span>${d.assuntos.length} ${d.assuntos.length === 1 ? "assunto" : "assuntos"}</span><span aria-hidden="true">→</span></small></div></a>`).join("");
  return `
  <section class="abertura"><div class="wrap">
    <div><div class="logo-hero">${logoImg(SITE.logoHome)}</div><p class="rotulo">Educação que se conecta</p>
      <h1>Semeando a educação <span>com Arduino.</span></h1>
      <p>${h.chamadaHero}</p>
      <div class="acoes"><a class="btn" href="#disciplinas">Explore as disciplinas →</a><a class="btn sec" href="#sobre">Conheça o projeto</a></div></div>
    <div class="palco" style="background-image:url('${SITE.fundoPalco}')">${personagem(SITE.personagemHome, "grande")}
      <h2>${h.frasePalco}</h2></div></div></section>
  <section class="secao" id="disciplinas"><div class="wrap">
    <div class="cab-faixa"><div><p class="rotulo">Cada disciplina, uma nova possibilidade</p><h2>${h.tituloDisciplinas}</h2><p>${h.subDisciplinas}</p></div>
      <div class="setas"><button aria-label="Disciplinas anteriores" data-dir="-1">←</button><button aria-label="Próximas disciplinas" data-dir="1">→</button></div></div>
    <div class="faixa" id="faixa" tabindex="0" aria-label="Lista de disciplinas, role para os lados">${cards}</div>
    <div class="dica"><span>${DISCIPLINAS.length} disciplinas para explorar</span><span>Deslize para descobrir mais →</span></div></div></section>
  <section class="secao"><div class="wrap duas">
    <div><p class="rotulo">Tecnologia com propósito</p><h2>${h.tituloProposta}</h2><p>${h.textoProposta}</p></div>
    <div>${h.passos.map((p) => `<div class="passo"><span class="icone" aria-hidden="true">${p.icone}</span><div><h3>${p.titulo}</h3><p>${p.texto}</p></div></div>`).join("")}</div></div></section>
  <section class="secao" id="sobre"><div class="wrap"><div class="sobre"><div class="lema">${h.sobreLema}</div>
    <div><p class="rotulo">Sobre o projeto</p><h2>${h.sobreTitulo}</h2><p>${h.sobreTexto}</p><p class="aviso">${h.sobreAviso}</p></div></div></div></section>`;
}

/* ---------------- DISCIPLINA ---------------- */
async function disciplina() {
  const d = achaDisc(params.get("d"));
  if (!d) return naoEncontrado();
  document.title = `${d.nome} — ${SITE.nome}`;
  const pastas = await Promise.all(d.assuntos.map(async (a) => {
    const projs = await Promise.all(a.projetos.map(async (p) => ({ p, j: await lerJSON(caminhoProjeto(d.slug, a.slug, p) + "projeto.json") })));
    const links = projs.map(({ p, j }) => `<a class="projeto-link" href="projeto.html?d=${d.slug}&a=${a.slug}&p=${p}">
      <h3>${esc(j?.titulo || p)}</h3><p>${esc(j?.resumo || "")}</p></a>`).join("");
    return `<section class="pasta"><h2>📁 ${esc(a.nome)}</h2><div>${links || '<p class="vazio">Nenhum projeto ainda.</p>'}</div></section>`;
  }));
  return `<div class="wrap">${trilha([{ t: "Início", h: "index.html" }, { t: d.nome }])}
    <div class="cab-pagina"><div><p class="rotulo">Disciplina</p><h1>${esc(d.nome)}</h1><p>${d.descricao}</p></div>
    ${personagem(`assets/personagem/personagem-${d.slug}.png`, "pequeno")}</div>
    ${pastas.join("") || '<p class="vazio">Em breve: os assuntos desta disciplina aparecerão aqui.</p>'}</div>`;
}

/* ---------------- PROJETO ---------------- */
async function projeto() {
  const [ds, as, ps] = ["d", "a", "p"].map((k) => params.get(k));
  const d = achaDisc(ds), a = d?.assuntos.find((x) => x.slug === as);
  const base = caminhoProjeto(ds, as, ps);
  const j = a && (await lerJSON(base + "projeto.json"));
  if (!j) return naoEncontrado();
  document.title = `${j.titulo} — ${SITE.nome}`;
  const lista = (t, arr, ord) => arr?.length ? `<div class="bloco"><h2>${t}</h2><${ord ? "ol" : "ul"}>${arr.map((i) => `<li>${esc(i)}</li>`).join("")}</${ord ? "ol" : "ul"}></div>` : "";
  const texto = (t, v) => v ? `<div class="bloco"><h2>${t}</h2><p>${esc(v)}</p></div>` : "";
  const imgs = j.imagens?.length ? `<div class="bloco"><h2>Imagens</h2><div class="galeria">${j.imagens.map((i) => `<figure><img src="${base}${esc(i.arquivo)}" alt="${esc(i.alt)}"><figcaption>${esc(i.alt)}</figcaption></figure>`).join("")}</div></div>` : "";
  const vids = j.videos?.length ? `<div class="bloco"><h2>Vídeos</h2>${j.videos.map((v) => `<div class="video"><iframe src="${esc(v)}" title="Vídeo do projeto" allowfullscreen loading="lazy"></iframe></div>`).join("")}</div>` : "";
  const arqs = j.arquivos?.length ? `<div class="bloco"><h2>Arquivos</h2><ul>${j.arquivos.map((f) => `<li><a href="${base}${esc(f.arquivo)}" download>${esc(f.nome)}</a></li>`).join("")}</ul></div>` : "";
  let codigo = "";
  if (j.codigo) { const c = await fetch(base + j.codigo).then((r) => (r.ok ? r.text() : "// Arquivo de código não encontrado.")); codigo = `<div class="bloco"><h2>Código Arduino</h2><pre><code>${esc(c)}</code></pre></div>`; }
  return `<div class="wrap">${trilha([{ t: "Início", h: "index.html" }, { t: d.nome, h: "disciplina.html?d=" + ds }, { t: a.nome }, { t: j.titulo }])}
    <div class="cab-pagina"><div><p class="rotulo">${esc(d.nome)} · ${esc(a.nome)}</p><h1>${esc(j.titulo)}</h1><p>${esc(j.descricao || j.resumo)}</p>
    ${j.demonstracao ? '<p class="aviso">Projeto de demonstração (fictício).</p>' : ""}</div>
    ${personagem(`assets/personagem/personagem-${ds}.png`, "pequeno")}</div>
    ${texto("Objetivo", j.objetivo)}${lista("Materiais", j.materiais)}${lista("Metodologia", j.metodologia, true)}${imgs}${vids}${codigo}${arqs}${texto("Informações adicionais", j.informacoes)}</div>`;
}

const naoEncontrado = () => `<div class="wrap">${trilha([{ t: "Início", h: "index.html" }, { t: "Não encontrado" }])}<h1>Página não encontrada</h1><p>Confira o endereço ou volte ao início.</p></div>`;

/* ---------------- Inicialização ---------------- */
(async () => {
  const miolo = await { home, disciplina, projeto }[pagina]();
  $("#app").innerHTML = cabecalho() + `<main>${miolo}</main>`;
  document.body.style.backgroundImage = `url('${SITE.fundoSite}')`;
  const faixa = $("#faixa");
  document.querySelectorAll(".setas button").forEach((b) => b.addEventListener("click", () => faixa.scrollBy({ left: b.dataset.dir * 520, behavior: "smooth" })));
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
})();
