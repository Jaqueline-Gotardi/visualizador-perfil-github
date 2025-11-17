//IMPORTAR AS FUNÇÕES CRIADAS NO ProfileView.js
import { fetchGithubUser, fetchGithubUserRepos, fetchGithubUserEvents } from './githubApi.js'; 
import { renderProfile } from './profileView.js';
  
const inputSearch = document.getElementById('input-search'); //campo de texto para digitar o nome
const btnSearch = document.getElementById('btn-search'); //botão de buscar
const profileResults = document.querySelector('.profile-results'); //área onde o perfil vai aparecer

//PARA BUSCAR OS DADOS E EXIBIR O PERFIL DO INDIVÍDUO
async function searchAndDisplayProfile() {
    //Pegar nome que foi digitado no campo. . .
    const userName = inputSearch.value;

    // Se o campo estiver vazio, mostra um alerta e limpa qualquer resultado anterior.
    if (!userName) {
        alert('Por favor, digite um nome de usuário do GitHub.');
        profileResults.innerHTML = "";
        return; 
    }

    //mostrar uma mensagem de "Carregando..." enquanto buscamos o perfil. . .
    profileResults.innerHTML = `<p class="loading">Carregando...</p>`;

    try {
        //chama as funções importadas para buscar os dados do usuário 
        const userData = await fetchGithubUser(userName);
        const userRepos = await fetchGithubUserRepos(userName);
        const userEvents = await fetchGithubUserEvents(userName);

        //depois, a função para mostrar o perfil na tela é chamada
        renderProfile(userData, userEvents, userRepos, profileResults);

    } catch (error) { 
        console.error('Erro ao buscar o perfil do usuário:', error);
        alert('Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.');
        profileResults.innerHTML = ""; // Limpamos a área de resultados.
    }
}

btnSearch.addEventListener('click', searchAndDisplayProfile);

inputSearch.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchAndDisplayProfile();
    }
});











/* Solicitação 2
Apresentar as informações dos últimos eventos do usuário
no GitHub.

Apresentar na tela uma lista com até 10
últimos eventos do usuário no GitHub. Os eventos que
serão apresentados são de dois tipos: CreateEvent e
PushEvent apenas.

Use esse endpoint do GitHub: (https://api.github.com/users/<coloque-o-
nome-do-usuario-aqui>/events, por exemplo
https://api.github.com/users/devemdobro/events):

Mostre o nome do repositório e a mensagem de
commit do Evento. Exemplo:
Se for uma atividade do tipo CreateEvent você deve
mostrar apenas a mensagem “Sem mensagem de
commit”. */