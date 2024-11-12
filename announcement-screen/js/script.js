document.addEventListener('DOMContentLoaded', function () {
    const bannerIcon = document.querySelector('#bannerIcon');

    bannerIcon.addEventListener('click', function () {
        if (bannerIcon.src.includes('bannerOff.png')) {
            bannerIcon.src = 'img/bannerOn.png';
        } else {
            bannerIcon.src = 'img/bannerOff.png';
        }
    });
});

document.getElementById('check-in').addEventListener('change', validarDatas);
    document.getElementById('check-out').addEventListener('change', validarDatas);

    function validarDatas() {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;

        if (checkIn && checkOut && new Date(checkOut) < new Date(checkIn)) {
            alert("Ops! A data de check-out não pode ser anterior à data de check-in!");
            document.getElementById('check-out').value = "";
        }
    }




    document.addEventListener("DOMContentLoaded", () => {
        // Recupera a propriedade armazenada no localStorage
        const selectedProperty = JSON.parse(localStorage.getItem("selectedProperty"));
    
        if (selectedProperty) {
            // Nome do local
            document.querySelector(".placeName").textContent = selectedProperty.title || "Título não disponível";
    
            // Nome do locador
            document.querySelector(".locatorName").textContent = `Por: ${selectedProperty.userId.name || "Nome não disponível"}`;
    
            // Substitui todas as ocorrências de "Eduardo França" pelo nome do usuário
            document.body.innerHTML = document.body.innerHTML.replace(/Eduardo França/g, selectedProperty.userId.name || "Nome não disponível");
    
            // Foto de perfil do locador
            const profilePicElement = document.querySelector(".locatorProfilePicture");
            profilePicElement.src = selectedProperty.userId.profile_pic_url || "img/profilePicAd.png";
    
            // Endereço completo do local (usando `adress` e `city`)
            document.querySelector(".placeAdressText").textContent = `${selectedProperty.adress || "Endereço não disponível"}, ${selectedProperty.city || "Cidade não disponível"}`;
    
            // Valor da diária
            document.querySelector(".mainPrice").textContent = `R$${selectedProperty.value || "0"}`;
    
            // Valores detalhados: locação, taxas e impostos
            document.querySelector(".labelDetailedPrices1").textContent = `Locação`;
            document.querySelector(".labelDetailedPrices2").textContent = `R$${selectedProperty.value || "0"}`;
            document.querySelectorAll(".labelDetailedPrices2")[1].textContent = `R$${selectedProperty.serviceFee || "0"}`;
            document.querySelectorAll(".labelDetailedPrices2")[2].textContent = `R$${selectedProperty.additionalValue || "0"}`;
    
            // Preenchendo a avaliação
            document.querySelector(".ratingPurpleBoxBigText").textContent = selectedProperty.rating || "N/A";
            document.querySelector(".ratingPurpleBoxSmallText").textContent = selectedProperty.rating_count ? `${selectedProperty.rating_count} avaliações` : "0 avaliações";
    
            // Atualizando o nível do locador
            document.querySelector(".locatorRanking").textContent = selectedProperty.userId.level || "Nível não disponível";
    
            // Texto adicional do locador (caso tenha uma biografia ou descrição)
            document.querySelector(".martelo").textContent = selectedProperty.userId.bio || "Sem descrição disponível";
    
            // Texto da localização usando `city` e `adress`
            document.querySelector(".placeInformationText2").textContent = `Pronto para curtir em ${selectedProperty.adress || "Endereço não disponível"}, ${selectedProperty.city || "Cidade não disponível"}?`;
    
            // Atualizando o iframe do mapa se houver um URL de mapa no objeto
            const mapIframe = document.querySelector("iframe");
            if (selectedProperty.map_url) {
                mapIframe.src = selectedProperty.map_url;
            }
        } else {
            console.warn("Nenhuma propriedade selecionada encontrada no localStorage.");
        }
    });
    