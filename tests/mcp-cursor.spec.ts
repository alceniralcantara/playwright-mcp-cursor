import { test, expect } from '@playwright/test';
// Exemplo de teste de paginacao com cursor na API do GitHub usando GraphQL

test('should fetch repositories with cursor pagination', async ({ request }) => {
  // Pula o teste se o token nao estiver definido
  test.skip(!process.env.GITHUB_TOKEN, 'GITHUB_TOKEN environment variable is required');

  const perPage = 5;
  const org = 'microsoft';
  let hasNextPage = true;
  let endCursor: string | null = null;
  const names: string[] = [];
const query = "query ($org: String!, $first: Int!, $after: String) { organization(login: $org) { repositories(first: $first, after: $after, privacy: PUBLIC, orderBy: { field: NAME, direction: ASC }) { nodes { name } pageInfo { endCursor hasNextPage } } } }";



  // Busca paginas ate obter pelo menos duas paginas ou nao haver proxima
  while (hasNextPage && names.length < perPage * 2) {
    const variables = { org, first: perPage, after: endCursor };
    const response = await request.post('', { data: { query, variables } });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const repoInfo = body.data.organization.repositories;
    names.push(...repoInfo.nodes.map((n: any) => n.name));
    hasNextPage = repoInfo.pageInfo.hasNextPage;
    endCursor = repoInfo.pageInfo.endCursor;
  }

  expect(names.length).toBeGreaterThan(0);
});
