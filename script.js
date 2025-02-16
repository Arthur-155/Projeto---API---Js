const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.querySelector('.grid-container');

//Nessa linha pegamos o link da API, onde passamos o searchTerm com interpolação, o searchTerm nesse caso, possui os elementos da API
//O fetch é usado para fazer requisições a essa API
//Nessa linha pegamos o response que retorna uma promise e transformamos ela em .json para que possamos manipula-lo
//Na última linha o result contém o resultado da promise, logo depois é passado ela como parametro, junto com o searchTerm  (o termo de pesquisa que o usuário digitou), para que a função saiba o que fazer com os dados e como exibir os resultados.

function requestApi(searchTerm){
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result, searchTerm))
}

// Limpa os resultados anteriores
//gridContainer - Funciona da seguinte maneira: Ele limpa os termos processados/dados anteriores, evitando conflitos visuais e melhorando performance.
//Com o filtro, cria outro array chamado filteredArtists, que atende a condições especificas, nesse caso, ele pega o item artistas do array acessa o nome dos artistas com o artists.name 
//o toLowerCase serve para fazer com que o uso e maiuscula ou minuscula seja indiferente, o includes(searchTerm) é para verificar se o nome do artista contém a string que foi inserida pelo usuário.
//ou seja, nessa linha ele acessa os items do array e compara o que foi digitado pelo usuário com o que tem presente no array, através do filter.
//se não existirem artistas que correspondem com o que usuário inseriu ou o array filteredArtists estiver vazio, o resultArtist esconde os artistas e resultPlaylist mostra a playlist depois retorna, para finalizar o laço
// se o filteredArtists não for igual a 0 resultPlaylist será escondido e o resultArtist será exibido, ou seja, irá esconder as playlists e mostrar o artista pesquisado.


function displayResults(result, searchTerm) {
    gridContainer.innerHTML = ''; 

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    if (filteredArtists.length === 0) {
        resultArtist.classList.add('hidden'); 
        resultPlaylist.classList.remove('hidden'); 
        return;
    }

    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove('hidden');
//parei aqui
    gridContainer.innerHTML = filteredArtists.map(artist => `
        <div class="artist-card">
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" alt="${artist.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">              
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        </div>
    `).join("");
}


document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if(searchTerm === ''){
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
})

