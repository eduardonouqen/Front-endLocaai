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

        dadosAnuncio.nameFilter = filtrosSelecionados;
        const urlRealty = `${CONFIG.API_BASE_URL}/realty`;
        const token = localStorage.getItem('token');

        const current = parseFloat(priceDisplay.innerText.replace("R$", "").replace(",", "."));
        const basePriceValue = parseFloat(basePriceSpan.innerText.replace("R$", "").replace(",", "."));
        const serviceFeeValue = parseFloat(serviceFeeSpan.innerText.replace("R$", "").replace(",", "."));
        const additionalValueValue = parseFloat(additionalValueSpan.innerText.replace("R$", "").replace(",", "."));
        const price = current + serviceFeeValue + additionalValueValue;
        dadosAnuncio.value = price;

        const realtyId = localStorage.getItem('realtyId');

        if (!realtyId) {
            alert('Erro: ID do imóvel não encontrado');
            return;
        }

        function atualizarAnuncio() {
            console.log('Enviando dados para o backend...');
            console.log('Dados do anúncio:', dadosAnuncio);
            console.log('ID do imóvel:', realtyId);
            console.log('Token de autorização:', token);
        
            return fetch(`${urlRealty}/${realtyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dadosAnuncio)
            })
            .then(response => {
                console.log('Resposta do servidor:', response);
        
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro no servidor: ${response.status} - ${text}`);
                    });
                }
        
                console.log('Resposta recebida com sucesso.');
        
                if (response.status === 204) {
                    console.log('Resposta com código 204 (No Content). Atualização bem-sucedida.');
                    return { message: 'Anúncio atualizado com sucesso (sem conteúdo retornado)' };
                }
        
                return response.text().then(text => {
                    console.log('Corpo da resposta (em texto):', text);
                    if (!text) {
                        console.log('Resposta vazia. Continuando...');
                        return { message: 'Anúncio atualizado, sem conteúdo adicional' };
                    }
        
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        throw new Error(`Falha ao parsear a resposta JSON: ${e.message}`);
                    }
                });
            })
            .then(data => {
                console.log('Resposta JSON do backend:', data);
        
                if (data.id) {
                    return data.id;
                } else {
                    console.log('ID não retornado, mas a atualização foi bem-sucedida.');
                    return; 
                }
            });
        }

        atualizarAnuncio()
        .then(() => {
            console.log('Redirecionando para a página inicial...');
            window.location.href = '../initial-screen/index.html';
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Falha ao enviar dados.');
        });
    });
});












