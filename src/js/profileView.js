/**
 * Cria o HTML para a lista de repositórios do usuário.
 * @param {Array} userRepos - A lista de repositórios do usuário.
 * @returns {string} - O HTML da lista de repositórios.
 */
function createRepositoriesHTML(userRepos) {
  // Se o usuário não tiver repositórios ou a lista estiver vazia, mostramos uma mensagem.
  if (!userRepos || userRepos.length === 0) {
    return `<div class="profile-repositories">
              <h2>Repositórios</h2>
              <p>Nenhum repositório encontrado.</p>
            </div>`;
  }

  // "map" passa por cada repositório da lista e cria um pedaço de HTML para ele.
  const repositoriesItems = userRepos.map(repo => `
    <a href="${repo.html_url}" target="_blank">
        <div class="repository-card">    
            <h3>${repo.name}</h3>
            <div class="repository-stats">
                <span>⭐Stars: ${repo.stargazers_count}</span>
                <span>🍴 Forks: ${repo.forks_count}</span>
                <span>👀 Watchers: ${repo.watchers_count}</span>
                <span>💻 Language: ${repo.language || 'Não informada'}</span>
            </div>
        </div>
    </a>
  `).join(''); // ".join('')" junta todos os pedaços de HTML em um texto só.

  return `
    <div class="profile-repositories">
        <h2>Repositórios</h2>
        <div class="repositories">
            ${repositoriesItems}
        </div>
    </div>
  `;
}

/**
 * Cria o HTML para o cartão de perfil do usuário.
 * @param {object} userData - Os dados do perfil do usuário.
 * @returns {string} - O HTML do cartão de perfil.
 */
function createProfileCardHTML(userData) {
  return `
    <div class="profile-card">
      <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
      <div class="profile-info">
        <h2>${userData.name || "Não possui nome cadastrado"}</h2>
        <p>${userData.bio || "Não possui bio cadastrada 😢."}</p>
      </div>
    </div>
  `;
}

/**
 * Cria o HTML para os contadores de seguidores e seguindo.
 * @param {object} userData - Os dados do perfil do usuário.
 * @returns {string} - O HTML dos contadores.
 */
function createCountersHTML(userData) {
  return `
    <div class="profile-counters">
        <div class="followers">
            <h4>👥 Seguidores</h4>
            <span>${userData.followers}</span>
        </div>
        <div class="following">
            <h4>👥 Seguindo</h4>
            <span>${userData.following}</span>
        </div>
    </div>
  `;
}

/**
 * Renderiza (desenha) o perfil completo do usuário na tela.
 * @param {object} userData - Os dados do usuário (nome, bio, avatar, etc.).
 * @param {Array} userRepos - A lista de repositórios do usuário.
 * @param {HTMLElement} container - O elemento HTML onde o perfil será inserido.
 */
export function renderProfile(userData, userRepos, container) {
  // Juntamos todas as partes do HTML que criamos com as funções acima.
  const profileHTML = `
    ${createProfileCardHTML(userData)}
    ${createCountersHTML(userData)}
    ${createRepositoriesHTML(userRepos)}
  `;

  // Colocamos o HTML final dentro do container para que ele apareça na página.
  container.innerHTML = profileHTML;
}