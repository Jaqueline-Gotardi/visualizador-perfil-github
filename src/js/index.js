// Importamos as funções que criamos em outros arquivos para poder usá-las aqui.
import { fetchGithubUser, fetchGithubUserRepos } from './githubApi.js';
import { renderProfile } from './profileView.js';

// "Pegamos" os elementos do HTML que vamos precisar usar no JavaScript.
const inputSearch = document.getElementById('input-search'); // O campo de texto para digitar o nome
const btnSearch = document.getElementById('btn-search'); // O botão de buscar
const profileResults = document.querySelector('.profile-results'); // A área onde o perfil vai aparecer

/**
 * Função principal que busca e exibe o perfil do usuário.
 */
async function searchAndDisplayProfile() {
    // Pegamos o nome de usuário que foi digitado no campo de texto.
    const userName = inputSearch.value;

    // Se o campo estiver vazio, mostramos um alerta e limpamos qualquer resultado anterior.
    if (!userName) {
        alert('Por favor, digite um nome de usuário do GitHub.');
        profileResults.innerHTML = "";
        return; // "return" para a execução da função aqui.
    }

    // Mostramos uma mensagem de "Carregando..." enquanto buscamos as informações.
    profileResults.innerHTML = `<p class="loading">Carregando...</p>`;

    // O "try...catch" é como uma rede de segurança.
    // Tentamos executar o código dentro do "try".
    try {
        // Chamamos as funções para buscar os dados do usuário e seus repositórios.
        // O "await" espera cada uma delas terminar antes de continuar.
        const userData = await fetchGithubUser(userName);
        const userRepos = await fetchGithubUserRepos(userName);

        // Depois de pegar os dados, chamamos a função para mostrar o perfil na tela.
        renderProfile(userData, userRepos, profileResults);

    // Se algo der errado no "try" (por exemplo, usuário não encontrado), o "catch" é executado.
    } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
        alert('Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.');
        profileResults.innerHTML = ""; // Limpamos a área de resultados.
    }
}

// Adicionamos um "ouvinte de evento" ao botão de busca.
// Quando o botão for clicado, a função searchAndDisplayProfile será executada.
btnSearch.addEventListener('click', searchAndDisplayProfile);

// Adicionamos também um "ouvinte" para o campo de texto.
inputSearch.addEventListener('keyup', (event) => {
    // Se a tecla pressionada for "Enter", executamos a busca também.
    if (event.key === 'Enter') {
        searchAndDisplayProfile();
    }
});