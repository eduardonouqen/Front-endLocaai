import CONFIG from '../../config.js';

document.addEventListener("DOMContentLoaded", () => {
    const priceDisplay = document.getElementById('price');
    const serviceFeeToggle = document.getElementById('service-fee-toggle');
    const feeInfo = document.getElementById('fee-info');
    const basePriceSpan = document.getElementById('base-price');
    const serviceFeeSpan = document.getElementById('service-fee');
    const additionalValueSpan = document.getElementById('additional-value');
    const totalPriceSpan = document.getElementById('total-price');
    const totalNoFeeSpan = document.getElementById('total-no-fee');
    const confirmBtn = document.getElementById('confirmbtn');

    let basePrice = 0;

    function updatePrices() {
        const serviceFee = (basePrice * 0.10).toFixed(2);
        const additionalValue = (basePrice * 0.05).toFixed(2);
        const totalPrice = (parseFloat(basePrice) + parseFloat(serviceFee) + parseFloat(additionalValue)).toFixed(2);
        const totalNoFee = basePrice.toFixed(2);

        basePriceSpan.textContent = formatCurrency(basePrice);
        serviceFeeSpan.textContent = formatCurrency(serviceFee);
        additionalValueSpan.textContent = formatCurrency(additionalValue);
        totalPriceSpan.textContent = formatCurrency(totalPrice);
        totalNoFeeSpan.textContent = formatCurrency(totalNoFee);
        serviceFeeToggle.textContent = `Veja as taxas ${formatCurrency(totalNoFee)}`;
    }

    function formatCurrency(value) {
        return `R$${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    function parseCurrency(value) {
        return parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
    }

    priceDisplay.addEventListener('input', (e) => {
        const rawValue = e.target.textContent.replace(/\D/g, ''); 
        const numericValue = parseFloat(rawValue) / 100;

        basePrice = numericValue || 0;
        priceDisplay.textContent = formatCurrency(basePrice);

        updatePrices();

        serviceFeeToggle.disabled = basePrice <= 0;
        confirmBtn.disabled = basePrice <= 0;

        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(priceDisplay.childNodes[0], priceDisplay.textContent.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    });

    priceDisplay.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    serviceFeeToggle.addEventListener('click', () => {
        feeInfo.classList.toggle('hidden');
        serviceFeeToggle.textContent = feeInfo.classList.contains('hidden') ? 'Veja as taxas' : 'Esconda as taxas';
    });

    confirmBtn.addEventListener("click", () => {
        const dadosAnuncio = JSON.parse(localStorage.getItem('cadastroAnuncio')) || {};
        const filtrosSelecionados = JSON.parse(localStorage.getItem('selectedFilters')) || [];

        dadosAnuncio.nameFilter = filtrosSelecionados;

        const token = localStorage.getItem('token');

        const serviceFeeValue = parseCurrency(serviceFeeSpan.textContent);
        const additionalValueValue = parseCurrency(additionalValueSpan.textContent);
        const totalPrice = basePrice + serviceFeeValue + additionalValueValue;

        dadosAnuncio.value = parseFloat(totalPrice.toFixed(2));


        console.log('Dados enviados:', dadosAnuncio);

        function base64ToBuffer(base64) {
            try {
                const base64String = base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
                const byteString = atob(base64String);
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const intArray = new Uint8Array(arrayBuffer);

                for (let i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }

                return arrayBuffer;
            } catch (error) {
                console.error("Erro ao converter Base64 para Buffer:", error);
                throw new Error("Falha ao processar a imagem.");
            }
        }

        async function enviarImagem() {
            const urlImagens = `${CONFIG.API_BASE_URL}/imagens/`;
            const formData = new FormData();

            let imageBase64 = dadosAnuncio.photos;
            if (Array.isArray(imageBase64) && imageBase64.length > 0) {
                imageBase64 = imageBase64[0];
            }

            if (typeof imageBase64 !== 'string' || !imageBase64.startsWith("data:image/")) {
                console.error("Imagem não está em Base64 ou não tem o prefixo correto.");
                throw new Error("Imagem não está em Base64 ou não tem o prefixo correto.");
            }

            try {
                const buffer = base64ToBuffer(imageBase64);
                const blob = new Blob([buffer], { type: 'image/jpg' });
                const file = new File([blob], "image.jpg", { type: 'image/jpg' });

                formData.append("file", file);

                const response = await fetch(urlImagens, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                const data = await response.json();
                console.log("Resposta do servidor:", data);

                const fileName = data.data ? data.data.path : null;

                if (!fileName) {
                    console.error("Falha ao obter 'fileName'.");
                    throw new Error("Falha ao enviar imagem.");
                }

                console.log("Upload bem-sucedido, fileName:", fileName);
                return fileName;
            } catch (error) {
                console.error("Erro ao enviar a imagem:", error);
                throw new Error("Falha ao enviar imagem.");
            }
        }


        async function obterUrlAssinada(fileName) {
            const urlAssinada = `${CONFIG.API_BASE_URL}/imagens/${fileName}`;

            try {
                const response = await fetch(urlAssinada, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!data.signedUrl) {
                    throw new Error("Falha ao obter URL assinada.");
                }

                return data.signedUrl;
            } catch (error) {
                console.error("Erro ao obter URL assinada:", error);
                throw new Error("Falha ao obter URL assinada.");
            }
        }

        async function enviarAnuncio() {
            const urlRealty = `${CONFIG.API_BASE_URL}/realty`;

            try {
                const response = await fetch(urlRealty, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(dadosAnuncio)
                });

                const data = await response.json();

                if (!data.id) {
                    throw new Error("Falha ao receber ID do anúncio.");
                }

                return data.id;
            } catch (error) {
                console.error("Erro ao enviar o anúncio:", error);
                throw new Error("Falha ao enviar o anúncio.");
            }
        }

        enviarImagem()
            .then(fileName => obterUrlAssinada(fileName))
            .then(signedUrl => {
                dadosAnuncio.photo = signedUrl;
                return enviarAnuncio();
            })
            .then(() => {
                window.location.href = '../initial-screen/index.html';
            })
            .catch(error => {
                console.error('Erro:', error);
                console.log('Falha ao enviar dados.');
            });
    });
});



const token = localStorage.getItem("token");

if (token) {
    document.getElementById("statusLabel").textContent = "Locador Bronze";
}







