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







// Recupera os dados do localStorage
const dadosAnuncio = JSON.parse(localStorage.getItem('cadastroAnuncio')); // Dados de anúncio (realty)
const filtrosSelecionados = JSON.parse(localStorage.getItem('selectedFilters')); // Dados de filtros (filters)

// Configura as URLs dos seus endpoints no backend
const urlRealty = 'http://localhost:3000/realty';
const urlFilters = 'http://localhost:3000/filters';

// Função para enviar os dados do anúncio (realty)
function enviarAnuncio() {
    return fetch(urlRealty, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAnuncio)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do backend para realty:', data);
        
        // Verifica se o ID do anúncio foi retornado
        if (data.id) {
            // Armazena o ID do anúncio retornado para a segunda requisição
            return data.id;
        } else {
            throw new Error('Falha ao receber ID do anúncio');
        }
    });
}

// Função para enviar os dados de filtros, relacionando com o ID do anúncio
function enviarFiltros(idAnuncio) {
    const dadosFiltros = {
        realtyId: idAnuncio,     // Associa o ID do anúncio aos filtros
        filters: filtrosSelecionados // Inclui os filtros selecionados
    };

    return fetch(urlFilters, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosFiltros)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do backend para filters:', data);
        alert('Dados enviados com sucesso!');
    });
}

// Função principal para enviar as requisições em sequência
function enviarDados() {
    enviarAnuncio()
        .then(idAnuncio => enviarFiltros(idAnuncio)) // Envia filtros com o ID do anúncio
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Falha ao enviar dados.');
        });
}

// Chama a função enviarDados quando necessário
enviarDados();









