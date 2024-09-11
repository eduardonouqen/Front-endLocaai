document.getElementById('justNumberInput').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.]/g, '');
});

document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.buttonFilters');

    button.addEventListener('click', function () {
        button.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttonFilters = document.getElementById('toggleButton');
    const filtersBar = document.getElementById('filtersBar');
    let isFiltersBarVisible = false;

    buttonFilters.addEventListener('click', () => {
        isFiltersBarVisible = !isFiltersBarVisible;
        filtersBar.classList.toggle('show', isFiltersBarVisible);
        buttonFilters.classList.toggle('active', isFiltersBarVisible);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const priceDisplay = document.getElementById('price');
    const priceInput = document.getElementById('price-input');
    const editPriceBtn = document.getElementById('edit-price');
    const serviceFeeToggle = document.getElementById('service-fee-toggle');
    const feeInfo = document.getElementById('fee-info');
    const basePriceSpan = document.getElementById('base-price');
    const serviceFeeSpan = document.getElementById('service-fee');
    const totalPriceSpan = document.getElementById('total-price');
    
    let basePrice = 128;
    let serviceFee = 50;
    let totalPrice = basePrice + serviceFee;

    editPriceBtn.addEventListener('click', () => {
        priceDisplay.style.display = 'none';
        priceInput.style.display = 'block';
    });

  
    priceInput.addEventListener('input', (e) => {
        basePrice = parseFloat(e.target.value) || 0;
        totalPrice = basePrice + serviceFee;
        priceDisplay.textContent = `R$${basePrice}`;
        serviceFeeToggle.textContent = `Preço sem taxa R$${totalPrice}`;
        basePriceSpan.textContent = `R$${basePrice}`;
        totalPriceSpan.textContent = `R$${totalPrice}`;
    });

 
    serviceFeeToggle.addEventListener('click', () => {
        feeInfo.classList.toggle('hidden');
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const priceDisplay = document.getElementById('price');
    const priceInput = document.getElementById('price-input');
    const serviceFeeToggle = document.getElementById('service-fee-toggle');
    const feeInfo = document.getElementById('fee-info');
    const basePriceSpan = document.getElementById('base-price');
    const serviceFeeSpan = document.getElementById('service-fee');
    const additionalValueSpan = document.getElementById('additional-value');
    const totalPriceSpan = document.getElementById('total-price');
    const confirmBtn = document.getElementById('confirm-btn');

    let basePrice = 0;
    let serviceFee = 0;
    let additionalValue = 0;
    let totalPrice = 0;


    function updatePrices() {
        serviceFee = basePrice * 0.10;
        additionalValue = basePrice * 0.05;
        totalPrice = basePrice + serviceFee + additionalValue;

        basePriceSpan.textContent = `R$${basePrice.toFixed(2)}`;
        serviceFeeSpan.textContent = `R$${serviceFee.toFixed(2)}`;
        additionalValueSpan.textContent = `R$${additionalValue.toFixed(2)}`;
        totalPriceSpan.textContent = `R$${totalPrice.toFixed(2)}`;
        serviceFeeToggle.textContent = `Preço sem taxa R$${totalPrice.toFixed(2)}`;
    }


    priceInput.addEventListener('input', (e) => {
        basePrice = parseFloat(e.target.value) || 0;

   
        if (basePrice > 0) {
            updatePrices();
            serviceFeeToggle.disabled = false;
            confirmBtn.disabled = false;
            priceDisplay.textContent = `R$${basePrice.toFixed(2)}`;
        } else {
            priceDisplay.textContent = "R$0";
            serviceFeeToggle.disabled = true;
            confirmBtn.disabled = true;
        }
    });

    serviceFeeToggle.addEventListener('click', () => {
        feeInfo.classList.toggle('hidden');
    });
});
document.addEventListener('DOMContentLoaded', (event) => {
    const priceSpan = document.getElementById('price');

    
    priceSpan.addEventListener('blur', () => {
        const newValue = priceSpan.textContent.trim();
        if (isNaN(parseFloat(newValue.replace('R$', '').replace(',', '.')))) {
        
            priceSpan.textContent = 'R$0';
        }
    });

    priceSpan.addEventListener('click', () => {
        priceSpan.focus();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const serviceFeeToggle = document.getElementById('service-fee-toggle');
    const feeInfo = document.getElementById('fee-info');

    // Verifica se os elementos existem
    if (serviceFeeToggle && feeInfo) {
        serviceFeeToggle.addEventListener('click', () => {
            if (feeInfo.classList.contains('hidden')) {
                feeInfo.classList.remove('hidden');
                serviceFeeToggle.textContent = 'Preço com taxa'; // Altera o texto do botão
            } else {
                feeInfo.classList.add('hidden');
                serviceFeeToggle.textContent = 'Preço sem taxa'; // Altera o texto do botão
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const serviceFeeToggle = document.getElementById('service-fee-toggle');
    const feeInfo = document.getElementById('fee-info');

    // Verifica se os elementos existem
    if (serviceFeeToggle && feeInfo) {
        serviceFeeToggle.addEventListener('click', () => {
            if (feeInfo.classList.contains('hidden')) {
                feeInfo.classList.remove('hidden');
                serviceFeeToggle.textContent = 'Preço com taxa'; // Altera o texto do botão
            } else {
                feeInfo.classList.add('hidden');
                serviceFeeToggle.textContent = 'Preço sem taxa'; // Altera o texto do botão
            }
        });
    }
});
