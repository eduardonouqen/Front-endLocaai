document.addEventListener("DOMContentLoaded", () => {
    const priceDisplay = document.getElementById('price');
    const serviceFeeToggle = document.getElementById('service-fee-toggle');
    const feeInfo = document.getElementById('fee-info');
    const basePriceSpan = document.getElementById('base-price');
    const serviceFeeSpan = document.getElementById('service-fee');
    const additionalValueSpan = document.getElementById('additional-value');
    const totalPriceSpan = document.getElementById('total-price');
    const totalNoFeeSpan = document.getElementById('total-no-fee');
    const confirmBtn = document.getElementById('confirm-btn');

    let basePrice = 0;
    let serviceFee = 0;
    let additionalValue = 0;
    let totalPrice = 0;
    let totalNoFee = 0;

    function updatePrices() {
        serviceFee = (basePrice * 0.10).toFixed(2);
        additionalValue = (basePrice * 0.05).toFixed(2);
        totalPrice = (parseFloat(basePrice) + parseFloat(serviceFee) + parseFloat(additionalValue)).toFixed(2);
        totalNoFee = basePrice.toFixed(2);

        basePriceSpan.textContent = `R$${parseFloat(basePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        serviceFeeSpan.textContent = `R$${parseFloat(serviceFee).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        additionalValueSpan.textContent = `R$${parseFloat(additionalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        totalPriceSpan.textContent = `R$${parseFloat(totalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        totalNoFeeSpan.textContent = `R$${parseFloat(totalNoFee).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        serviceFeeToggle.textContent = `Veja as taxas R$${parseFloat(totalNoFee).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    function formatPriceInput(value) {
        const cleanValue = value.replace(/\D/g, '');

        if (cleanValue.length > 10) {
            return cleanValue.slice(0, 10);
        }

        const numericValue = parseFloat(cleanValue) / 100;
        return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    priceDisplay.addEventListener('input', (e) => {
        let formattedPrice = formatPriceInput(e.target.textContent);
        priceDisplay.textContent = formattedPrice;

        basePrice = parseFloat(formattedPrice.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;

        updatePrices();

        if (basePrice > 0) {
            serviceFeeToggle.disabled = false;
            confirmBtn.disabled = false;
        } else {
            serviceFeeToggle.disabled = true;
            confirmBtn.disabled = true;
        }

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

        if (priceDisplay.textContent.replace(/\D/g, '').length >= 10) {
            e.preventDefault();
        }
    });

    serviceFeeToggle.addEventListener('click', () => {
        feeInfo.classList.toggle('hidden');
        if (!feeInfo.classList.contains('hidden')) {
            serviceFeeToggle.textContent = 'Esconda as taxas';
        } else {
            serviceFeeToggle.textContent = 'Veja as taxas';
        }
    });
});







document.addEventListener("DOMContentLoaded", () => {
    const confirmBtn = document.getElementById("confirmbtn");
    const priceDisplay = document.getElementById("price");
    const basePriceSpan = document.getElementById("base-price");
    const serviceFeeSpan = document.getElementById("service-fee");
    const additionalValueSpan = document.getElementById("additional-value");
    const totalPriceSpan = document.getElementById("total-price");

    confirmBtn.addEventListener("click", () => {
        const dadosAnuncio = JSON.parse(localStorage.getItem('cadastroAnuncio'));
        const filtrosSelecionados = JSON.parse(localStorage.getItem('nameFilter'));

        // Combina os filtros com os dados do anúncio
        dadosAnuncio.nameFilter = filtrosSelecionados;

        // Captura o token do localStorage
        const token = localStorage.getItem('token');

        // Calcula o preço total
        const current = parseFloat(priceDisplay.innerText.replace("R$", "").replace(",", "."));
        const serviceFeeValue = parseFloat(serviceFeeSpan.innerText.replace("R$", "").replace(",", "."));
        const additionalValueValue = parseFloat(additionalValueSpan.innerText.replace("R$", "").replace(",", "."));
        const price = current + serviceFeeValue + additionalValueValue;

        // Atualiza o valor total de `price` no `dadosAnuncio`
        dadosAnuncio.value = price;

        // Função para converter Base64 para Buffer
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

        // Função para enviar a imagem
        async function enviarImagem() {
            const urlImagens = 'http://localhost:3000/imagens/';
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
                const blob = new Blob([buffer], { type: 'image/jpeg' });
                const file = new File([blob], "image.jpg", { type: 'image/jpeg' });

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

                // Verifique se a chave 'path' está presente
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

        // Função para obter a URL assinada
        async function obterUrlAssinada(fileName) {
            const urlAssinada = `http://localhost:3000/imagens/${fileName}`;

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

        // Função para enviar o anúncio
        async function enviarAnuncio() {
            const urlRealty = 'http://localhost:3000/realty';

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

        // Sequência de execução
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
                alert('Falha ao enviar dados.');
            });
    });
});







