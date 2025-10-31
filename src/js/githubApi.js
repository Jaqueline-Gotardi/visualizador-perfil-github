// A URL base da API do GitHub que vamos usar. É como o endereço principal do site da API.
const BASE_URL = 'https://api.github.com';

/**
 * Busca os dados de um usuário no GitHub.
 * A palavra "async" antes da função significa que ela vai trabalhar com código que demora um pouco para responder (como a internet).
 * @param {string} userName - O nome do usuário do GitHub a ser pesquisado.
 * @returns {Promise<object>} - Uma promessa que, se der certo, retorna os dados do usuário.
 */
export async function fetchGithubUser(userName) {
  // A palavra "await" pausa a função aqui até que o "fetch" termine de buscar a informação na internet.
  // "fetch" é como se fosse o "buscar" do JavaScript para coisas na web.
  const response = await fetch(`${BASE_URL}/users/${userName}`);
  
  // Se a resposta não for "ok" (ou seja, se deu algum erro, como usuário não encontrado),
  // nós "lançamos um erro" para avisar que algo deu errado.
  if (!response.ok) {
    throw new Error('Usuário não encontrado.');
  }

  // Se deu tudo certo, transformamos a resposta da internet (que vem em um formato especial)
  // em um objeto JavaScript que podemos usar.
  return await response.json();
}

/**
 * Busca os 10 repositórios mais recentes de um usuário no GitHub.
 * @param {string} userName - O nome do usuário do GitHub.
 * @returns {Promise<Array>} - Uma promessa que, se der certo, retorna uma lista (array) de repositórios.
 */
export async function fetchGithubUserRepos(userName) {
    // Aqui fazemos o mesmo que na função de cima, mas para buscar os repositórios.
    // "?per_page=10&sort=created" significa que queremos 10 repositórios, ordenados por data de criação.
    const response = await fetch(`${BASE_URL}/users/${userName}/repos?per_page=10&sort=created`);
    
    if (!response.ok) {
        throw new Error('Repositórios não encontrados.');
    }
    
    return await response.json();
}