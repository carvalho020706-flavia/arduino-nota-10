# Arduino Nota 10 — site educacional (GitHub Pages)

Site estático (HTML + CSS + JS puro). Sem banco de dados, login ou servidor.
**Slogan:** Semeando a educação com Arduino.

## Estrutura
```text
index.html · disciplina.html · projeto.html   (páginas-modelo; normalmente não editar)
css/style.css      cores, fontes, layout
js/config.js       ★ CONFIGURAÇÃO CENTRAL: textos da home, rodapé, lista de disciplinas/assuntos/projetos
js/script.js       monta as páginas (não precisa editar)
assets/logo.png    logo
assets/personagem/ imagens da personagem
disciplinas/<disciplina>/<assunto>/<projeto>/projeto.json  (+ imagens, .ino, arquivos do projeto)
```
O navegador não consegue listar pastas do GitHub Pages sozinho; por isso `js/config.js` é o **único índice** a atualizar.

## 1. Trocar a logo
São duas: `assets/logo.png` (cabeçalho) e `assets/logo-home.png` (grande, acima do título da homepage; se não existir, usa a do cabeçalho). Substitua os arquivos mantendo os nomes. (Outro nome/caminho: `SITE.logo` em `js/config.js`.)

## 2–3. Personagem e poses
Coloque os PNGs em `assets/personagem/`:
- `personagem-home.png` → grande, na homepage
- `personagem-padrao.png` → usada quando não existe pose específica
- `personagem-<slug-da-disciplina>.png` (ex.: `personagem-fisica.png`) → pose da disciplina e de seus projetos

Nas páginas internas o tamanho/posição é sempre o mesmo (`.slot-personagem.pequeno` em `css/style.css`). Sem imagem, aparece um espaço reservado.

### Fundo atrás da personagem
Coloque a imagem em `assets/imagens/`: `fundo-personagem-home.png` (homepage) e `fundo-personagem.png` (páginas internas). Para outros nomes/caminhos, edite `fundoHome` e `fundoInterno` em `js/config.js`. Sem o arquivo, aparece o fundo verde-claro padrão.

Também é possível usar imagem no cartão escuro da homepage (`assets/imagens/fundo-palco.png`) e no fundo de todo o site (`assets/imagens/fundo-site.png`); caminhos em `fundoPalco` e `fundoSite` no `js/config.js`.

## 4. Adicionar uma disciplina
1. Crie a pasta `disciplinas/geografia/` (minúsculas, sem acentos/espaços).
2. Em `js/config.js`, dentro de `DISCIPLINAS`, adicione **um bloco**:
```js
{ slug:"geografia", nome:"Geografia", icone:"◍", cor:"#f0f3e4",
  descricao:"Clima, relevo e paisagem com sensores.", assuntos:[] },
```
Pronto: aparece no scroll horizontal e ganha sua página.

## 5. Adicionar um assunto
Em `assuntos` da disciplina: `{ slug:"relevo", nome:"Relevo", projetos:[] }` e crie a pasta `disciplinas/geografia/relevo/`.

## 6. Adicionar um projeto
1. Crie `disciplinas/geografia/relevo/maquete-de-relevo/`.
2. Dentro, crie `projeto.json` (copie um dos exemplos, ex.: `disciplinas/matematica/geometria/medindo-formas/projeto.json`).
3. Em `js/config.js`, inclua `"maquete-de-relevo"` na lista `projetos` do assunto.
4. Commit e push.

Campos do `projeto.json` (todos opcionais, exceto `titulo`): `titulo`, `resumo`, `descricao`, `objetivo`, `materiais` (lista), `metodologia` (lista de passos), `imagens`, `videos`, `codigo`, `arquivos`, `informacoes`. Só o que existir é exibido. Remova `"demonstracao": true` nos projetos reais.

## 7. Imagens
Coloque na pasta do projeto e liste: `"imagens":[{"arquivo":"foto1.jpg","alt":"Descrição da imagem"}]`

## 8. Vídeos
Use o link *embed* (YouTube: `https://www.youtube.com/embed/ID_DO_VIDEO`): `"videos":["https://www.youtube.com/embed/ID"]`

## 9. Código Arduino
Salve o `.ino` na pasta do projeto e use `"codigo":"codigo.ino"`. Para download, adicione também em `arquivos`: `[{"nome":"Código","arquivo":"codigo.ino"}]`.

## 10. Publicar no GitHub Pages
Envie os arquivos para um repositório → **Settings → Pages** → *Deploy from a branch* → `main` / `(root)` → Save. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
Para testar no computador, use um servidor local (`python -m http.server`), pois os arquivos `projeto.json` são lidos via `fetch`.

## 11. Cores
`:root` no início de `css/style.css`.

## 12. Fontes
Oswald (títulos) e Crimson Pro (textos): link do Google Fonts no `<head>` dos 3 HTML e `--fonte-titulo` / `--fonte-texto` no CSS.

## 13. Textos da homepage
Objeto `SITE.home` em `js/config.js`. Textos marcados com **[SUBSTITUA]** são provisórios.

> Todo o conteúdo atual (projetos e textos) é **demonstração fictícia**.
