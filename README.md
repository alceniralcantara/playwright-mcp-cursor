# Playwright MCP Cursor

Este repositório demonstra como integrar o [Playwright](https://playwright.dev/) com o **Model Context Protocol (MCP)** e inclui um exemplo de paginação usando cursor na API do GitHub.

## Sobre o MCP

O MCP (Model Context Protocol) é um protocolo aberto que permite que modelos de linguagem interajam com navegadores e APIs por meio de mensagens estruturadas. O pacote `@playwright/mcp` disponibiliza um servidor que expõe as capacidades do Playwright em um formato que pode ser consumido por modelos de IA. Para mais detalhes consulte a [documentação oficial](https://github.com/microsoft/playwright-mcp).

Neste projeto é possível executar os testes localmente com `npx playwright test` ou utilizar os testes em um ambiente MCP, onde a execução e o contexto podem ser controlados por um modelo de linguagem.

## Exemplo de paginação com cursor

O arquivo `tests/mcp-cursor.spec.ts` contém um teste que utiliza a API GraphQL do GitHub para listar repositórios do usuário autenticado paginando via cursor. O teste utiliza o `request.newContext` do Playwright para fazer requisições HTTP assíncronas. Para autenticar, é necessário fornecer um token de acesso pessoal do GitHub via variável de ambiente `GITHUB_TOKEN`.

O fluxo do teste é:

1. Criar um contexto de requisição com cabeçalhos contendo o token.
2. Enviar uma consulta GraphQL solicitando os primeiros _N_ repositórios e capturar a `endCursor` e `hasNextPage`.
3. Caso haja mais páginas (`hasNextPage === true`), repetir a consulta usando o `endCursor` como argumento `after`.
4. Armazenar os nomes dos repositórios e verificar que o total retornado é maior que zero.

## Estrutura do projeto

- `package.json` – dependências e scripts.
- `playwright.config.ts` – configurações do Playwright, como baseURL e diretório de testes.
- `tsconfig.json` – configurações do TypeScript.
- `tests/mcp-cursor.spec.ts` – teste de paginação utilizando a API GraphQL do GitHub.
- `README.md` – descrição do projeto e instruções de uso.

## Pré‑requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior).
- Token de acesso pessoal do GitHub com permissão de leitura para repositórios (definir na variável de ambiente `GITHUB_TOKEN`).

## Instalação

1. Instale as dependências de desenvolvimento:

   ```bash
   npm install
   ```

2. Defina a variável de ambiente `GITHUB_TOKEN` no seu sistema. No Linux/macOS, por exemplo:

   ```bash
   export GITHUB_TOKEN=seu_token_aqui
   ```

## Executando os testes

Para executar todos os testes com o Playwright:

```bash
npx playwright test
```

Você também pode rodar somente o teste de paginação:

```bash
npx playwright test tests/mcp-cursor.spec.ts
```

## Observações

- O token não deve ser commitado no repositório. Utilize variáveis de ambiente ou arquivos locais `.env`.
- Para executar em um servidor MCP, instale o pacote `@playwright/mcp` globalmente ou utilize a CLI incluída e consulte a documentação para iniciar o servidor.
