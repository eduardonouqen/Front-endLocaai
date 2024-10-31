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

        const urlRealty = 'http://localhost:3000/realty';
        const urlFilters = 'http://localhost:3000/filters';

        // Captura o token do localStorage
        const token = localStorage.getItem('token');

        // Captura e converte os valores de preço para números
        const current = parseFloat(priceDisplay.innerText.replace("R$", "").replace(",", "."));
        const basePriceValue = parseFloat(basePriceSpan.innerText.replace("R$", "").replace(",", "."));
        const serviceFeeValue = parseFloat(serviceFeeSpan.innerText.replace("R$", "").replace(",", "."));
        const additionalValueValue = parseFloat(additionalValueSpan.innerText.replace("R$", "").replace(",", "."));

        // Soma todos os valores
        const price = current + serviceFeeValue + additionalValueValue;

        // Adiciona o valor total de `price` ao `dadosAnuncio`
        dadosAnuncio.value = price;

        function enviarAnuncio() {
            return fetch(urlRealty, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dadosAnuncio)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Resposta do backend para realty:', data);
                
                if (data.id) {
                    return data.id;
                } else {
                    throw new Error('Falha ao receber ID do anúncio');
                }
            });
        }

        function enviarFiltros(idAnuncio) {
            const dadosFiltros = {
                realtyId: idAnuncio,   
                nameFilter: filtrosSelecionados 
            };
        
            // Validação para garantir que filters é um array de strings
            if (!Array.isArray(dadosFiltros.nameFilter) || !dadosFiltros.nameFilter.every(filter => typeof filter === 'string')) {
                console.error('filters deve ser um array de strings.');
                alert('Erro: Os filtros selecionados são inválidos.');
                return; // Impede o envio se não for válido
            }
        
            console.log('Dados a serem enviados para filtros:', JSON.stringify(dadosFiltros));
        
            return fetch(urlFilters, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dadosFiltros)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Erro desconhecido');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do backend para filter:', data);
                alert('Dados enviados com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao enviar filtros:', error);
                alert('Falha ao enviar filtros: ' + error.message);
            });
        }

        enviarAnuncio()
        .then(idAnuncio => {
            return enviarFiltros(idAnuncio);
        })
        .then(() => {
            // Redireciona para a nova página após o envio bem-sucedido
            window.location.href = '../initial-screen/index.html'; // Substitua pela URL desejada
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Falha ao enviar dados.');
        });
    });
});










