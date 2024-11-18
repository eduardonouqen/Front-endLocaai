document.addEventListener("DOMContentLoaded", async () => {
    const selectedProperty = JSON.parse(localStorage.getItem("selectedProperty"));

    if (selectedProperty) {
        document.querySelector(".placeName").textContent = selectedProperty.title || "Título não disponível";
        
        document.querySelector("#locatorName").textContent = `Por: ${selectedProperty.userId.name || "Nome não disponível"}`;

        document.querySelector("#locatorName2").textContent = `Por: ${selectedProperty.userId.name || "Nome não disponível"}`;
        
        document.querySelector(".placeAdressText").textContent = `${selectedProperty.adress || "Endereço não disponível"}, ${selectedProperty.city || "Cidade não disponível"}`;
        
        document.querySelector(".mainPrice").textContent = `R$${selectedProperty.value || "0"}`;

        document.querySelector("#rentalPrice").textContent = `R$${selectedProperty.value || "0"}`;

        const profilePicElement = document.querySelector(".locatorProfilePicture");
        profilePicElement.src = selectedProperty.userId.profile_pic_url || "img/profilePicAd.png";

        const enderecoCompleto = `${selectedProperty.adress}, ${selectedProperty.city}, ${selectedProperty.state}`;
        const chaveAPI = 'pk.6358622dd9e624601cc09c39bd4aa708';

        try {
            const resposta = await fetch(`https://us1.locationiq.com/v1/search.php?key=${chaveAPI}&q=${encodeURIComponent(enderecoCompleto)}&format=json`);
            const dados = await resposta.json();

            if (dados && dados[0]) {
                const lat = dados[0].lat;
                const lon = dados[0].lon;
                const mapIframe = document.querySelector("iframe");

                mapIframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon},${lat}&layer=mapnik&marker=${lat},${lon}`;
            } else {
                console.error("Endereço não encontrado na API do LocationIQ.");
            }
        } catch (erro) {
            console.error("Erro ao buscar as coordenadas:", erro);
        }
    } else {
        console.warn("Nenhuma propriedade selecionada encontrada no localStorage.");
    }
});







const selectedProperty = localStorage.getItem('selectedProperty');

if (selectedProperty) {
    try {
        // Converte os dados do localStorage para um objeto
        const propertyData = JSON.parse(selectedProperty);

        // Valida se photo é uma array e contém ao menos uma imagem
        if (propertyData && Array.isArray(propertyData.photo) && propertyData.photo.length > 0) {
            const mainAnnouncementDiv = document.querySelector('.mainAnnouncement');

            // Atualiza o background-image da div com a primeira URL da array
            mainAnnouncementDiv.style.backgroundImage = `url('${propertyData.photo[0]}')`;
        } else {
            console.warn('A propriedade "photo" está ausente ou não contém imagens.');
        }
    } catch (error) {
        console.error('Erro ao analisar os dados do localStorage:', error);
    }
} else {
    console.warn('Nenhum dado encontrado no localStorage para "selectedProperty".');
}