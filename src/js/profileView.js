//CRIAR O HTML PARA A LISTA DE REPO DO USUÁRIO 
function createRepositoriesHTML(userRepos) { 
  // Se o usuário não tiver repositórios ou a lista estiver vazia, mostramos uma mensagem. 
  if (!userRepos || userRepos.length === 0) {
    return `<div class="profile-repositories">
              <h2>Repositórios</h2>
              <p>Nenhum repositório encontrado.</p>
            </div>`; 
  }

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

// CRIAR O HTML PARA O CARTÃO DE PERFIL DO USUÁRIO
function createProfileCardHTML(userData) {
  return `
    <div class="profile-card">
      <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
      <div class="profile-info">
        <h2>${userData.name || "Não possui nome cadastrado"}</h2>
        <p>${userData.bio || "Não possui bio cadastrada 😢."}</p>
        <p>${userData.login || "Não tem login cadastrado"}</p>
      </div>
    </div>
  `;
}

//CRIAR O HTML PARA CONTAR SEGUIDORES E SEGUINDO
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

function createdEventsHTML(userEvents) {
  const eventosItems = userEvents
  .filter(event => event.type === 'CreateEvent' || event.type === 'PushEvent')
  .slice(0, 10)  

const eventosFiltrados =  eventosItems.map(event => { 

  let commitMessage = "Sem detalhes de commit"
  
  if (event.type === 'PushEvent' 
    && event.payload.commits 
    && event.payload.commits.length > 0){
    commitMessage = event.payload.commits[0].message 
  } 


 /*  const commitMessage = event.payload.commits && event.payload.commits.length > 0 */
  //? event.payload.commits[0].message
  //: "Sem detalhes de commit"

  const pushContent = `${event.repo.name} - ${commitMessage}`;

  return `
  <div class="profile-events">
  <span>Repositório: ${event.type === 'PushEvent'
    ? pushContent : 'Sem mensagem de commit'}
    </span>
  </div>
  `
  //.join('');
}
).join('')
return `
  <div class="Eventos">
<h2>Eventos</h2>
<div class= "events-repositories">
${eventosFiltrados}
</div>
</div>
 `}

 //CRIAR UM PERFIL COMPLETO 

//userData -> Os dados do usuário (nome, bio, avatar, etc...)
// userRepos -> A lista de repositórios
// userEvents -> Lista de commits do usuário
 
export function renderProfile(userData, userRepos, userEvents, container) {
  // Juntamos todas as partes do HTML que criamos com as funções acima.
  const profileHTML = `
    ${createProfileCardHTML(userData)}
    ${createCountersHTML(userData)}
    ${createRepositoriesHTML(userRepos)}
    ${createdEventsHTML(userEvents)}
  `;

  //PARA EXIBIR NA PÁGINA
  container.innerHTML = profileHTML;
}