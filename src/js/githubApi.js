// A URL base da API do GitHub
const BASE_URL = 'https://api.github.com';

//BUSCAR DADOS DO USUÁRIO
export async function fetchGithubUser(userName) {
  const response = await fetch(`${BASE_URL}/users/${userName}`); 
  
  //se a resposta não for ok. . .
  if (!response.ok) {  
    throw new Error('Usuário não encontrado.');
  }
  return await response.json();
}

//BUSCAR OS REPO DO USUÁRIO
export async function fetchGithubUserRepos(userName) {
    const response = await fetch(`${BASE_URL}/users/${userName}/repos?per_page&sort=created`);
    
    if (!response.ok) {
        throw new Error('Repositórios não encontrados.');
    }
    return await response.json();
}

//BUSCAR 10 ÚLTIMOS EVENTOS DO USUÁRIO
export async function fetchGithubUserEvents(userName) {
  const response = await fetch(`${BASE_URL}/users/${userName}/events?per_page=10`); 

  if (!response.ok) {
    throw new Error('Falha ao buscar eventos do usuário');
  } 
  return await response.json();
}