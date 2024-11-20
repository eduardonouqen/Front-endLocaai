import CONFIG from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const userData = JSON.parse(jsonPayload);
        const userName = userData.name;

        document.querySelector('.textName').innerText = userName;
    }
});




async function fetchProperties() {
    const response = await fetch(`${CONFIG.API_BASE_URL}/realty`); // Verifique se a URL está correta
    if (!response.ok) {
        throw new Error('Falha ao buscar propriedades');
    }
    const data = await response.json();
    console.log('Dados das propriedades:', data); // Log da resposta da API
    return data;
}

async function fetchUsers() {
    const response = await fetch(`${CONFIG.API_BASE_URL}/users`); // Verifique se a URL está correta
    if (!response.ok) {
        throw new Error('Falha ao buscar usuários');
    }
    return await response.json();
}

async function displayProperties() {
try {
const properties = await fetchProperties();
const users = await fetchUsers();
const placesContainer = document.getElementById("placesContainer");

properties.forEach(property => {
    // Encontrar o usuário correspondente usando o userId
    const owner = users.find(user => user.id === String(property.userId));

    const placeContainer = document.createElement("div");
    placeContainer.className = "placeContainer";

    // Cria o link com um evento de clique para salvar os dados no localStorage
    const propertyLink = document.createElement("a");
    propertyLink.href = "../announcement-screen/index.html";
    propertyLink.target = "_blank";

    propertyLink.addEventListener("click", () => {
        // Salva os dados da propriedade no localStorage
        localStorage.setItem("selectedProperty", JSON.stringify(property));
    });

    // Monta o conteúdo HTML dentro do link
    propertyLink.innerHTML = `
        <img class="placeImage" src="${property.photo || './img/eichenwaldeTest.png'}">
        <div class="otherAlign">
            <div class="placeTop">
                <label id="placeFont" class="placeName">${property.title}</label>
                <label id="placeFont" class="placeOwner">Por: ${property ? property.userId.name : 'Desconhecido'}</label>
                <div class="placePriceDiv">
                    <label id="placeFont" class="placePrice">R$ ${property.value}</label>
                    <label id="placeFont">por diária</label>
                </div>
            </div>
            <div class="alignRating">
                <img class="profilePicAd" src="${owner ? owner.profile_pic_url : '../top-bar/img/profilePicTest.png'}">
                <div class="ratingSection">
                    <label class="placePrice">${property.rating}</label>
                    <img class="ratingStar" src="./img/ratingStar.png">
                </div>
            </div>
        </div>
    `;

    // Adiciona o link ao container da propriedade
    placeContainer.appendChild(propertyLink);
    placesContainer.appendChild(placeContainer);
});
} catch (error) {
console.error('Erro ao exibir propriedades:', error);
}
}

// Chama a função para exibir propriedades ao carregar a página
window.onload = displayProperties;











async function filterProperties(category) {
    try {
        const properties = await fetchProperties();
        const users = await fetchUsers();
        const placesContainer = document.getElementById("placesContainer");

        // Limpar o container antes de adicionar as propriedades filtradas
        placesContainer.innerHTML = '';

        // Filtrar as propriedades pela categoria
        const filteredProperties = properties.filter(property => property.category === category);

        // Exibir as propriedades filtradas
        filteredProperties.forEach(property => {
            // Encontrar o usuário correspondente usando o userId
            const owner = users.find(user => user.id === String(property.userId));

            const placeContainer = document.createElement("div");
            placeContainer.className = "placeContainer";

            placeContainer.innerHTML = `
            <a href="../announcement-screen/index.html" target="_blank">
    <img class="placeImage" src="${property.photo  ? property.photo  : './img/eichenwaldeTest.png'}">
    <div class="otherAlign">
        <div class="placeTop">
            <label id="placeFont" class="placeName">${property.title}</label>
            <label id="placeFont" class="placeOwner">Por: ${property ? property.userId.name : 'Desconhecido'}</label>
            <div class="placePriceDiv">
                <label id="placeFont" class="placePrice">R$ ${property.value}</label>
                <label id="placeFont">por diária</label>
            </div>
        </div>
        <div class="alignRating">
            <img class="profilePicAd" src="${owner ? owner.profile_pic_url : '../top-bar/img/profilePicTest.png'}">
            <div class="ratingSection">
                <label class="placePrice">${property.rating}</label>
                <img class="ratingStar" src="./img/ratingStar.png">
            </div>
        </div>
    </div>
    </a>
`;

            placesContainer.appendChild(placeContainer);
        });
    } catch (error) {
        console.error('Erro ao filtrar propriedades:', error);
    }
}




async function clearFilters() {
    try {
        const properties = await fetchProperties(); // Recarregar todas as propriedades
        const users = await fetchUsers(); // Carregar os usuários novamente
        const placesContainer = document.getElementById("placesContainer");
        placesContainer.innerHTML = ''; // Limpar as propriedades já exibidas

        properties.forEach(property => {
            // Encontrar o usuário correspondente
            const owner = users.find(user => user.id === String(property.userId));

            const placeContainer = document.createElement("div");
            placeContainer.className = "placeContainer";

            placeContainer.innerHTML = `
            <a href="../announcement-screen/index.html" target="_blank">
        <img class="placeImage" src="${property.photo  ? property.photo  : './img/eichenwaldeTest.png'}">
        <div class="otherAlign">
            <div class="placeTop">
                <label id="placeFont" class="placeName">${property.title}</label>
                <label id="placeFont" class="placeOwner">Por: ${property ? property.userId.name : 'Desconhecido'}</label>
                <div class="placePriceDiv">
                    <label id="placeFont" class="placePrice">R$ ${property.value}</label>
                    <label id="placeFont">por diária</label>
                </div>
            </div>
            <div class="alignRating">
                <img class="profilePicAd" src="${owner ? owner.profile_pic_url : '../top-bar/img/profilePicTest.png'}">
                <div class="ratingSection">
                    <label class="placePrice">${property.rating}</label>
                    <img class="ratingStar" src="./img/ratingStar.png">
                </div>
            </div>
        </div>
    `;

            placesContainer.appendChild(placeContainer);
        });
    } catch (error) {
        console.error('Erro ao limpar filtros:', error);
    }
}



