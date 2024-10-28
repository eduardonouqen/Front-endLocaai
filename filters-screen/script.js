document.addEventListener('DOMContentLoaded', function () {
    const opcoes = document.querySelectorAll('.opcao');
    const filtroContainer = document.querySelector('.filtro-container');

    function createItem(value, text) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.setAttribute('data-value', value);
        itemDiv.innerHTML = `${text} <button class="remove-button">X</button>`;
        
        itemDiv.querySelector('.remove-button').addEventListener('click', () => {
            itemDiv.remove();
            const opcao = document.querySelector(`.opcao[data-value="${value}"]`);
            opcao.classList.remove('disabled');
            opcao.style.cursor = 'pointer';
        });

        

        filtroContainer.appendChild(itemDiv);
    }

    opcoes.forEach(opcao => {
        opcao.addEventListener('click', () => {
            if (!opcao.classList.contains('disabled')) {
                const value = opcao.getAttribute('data-value');
                const text = opcao.innerText;
                createItem(value, text);

                opcao.classList.add('disabled');
                opcao.style.cursor = 'not-allowed';
            }
        });
    });
});








const selectedItemsContainer = document.getElementById('selectedItems');
    const nextButton = document.getElementById('nextButton');
    const selectedOptions = [];

    document.querySelectorAll('.opcao').forEach(opcao => {
        opcao.addEventListener('click', () => {
            const value = opcao.dataset.value;
            if (!selectedOptions.includes(value)) {
                selectedOptions.push(value);
                const selectedDiv = document.createElement('div');
                selectedDiv.textContent = value;
                selectedItemsContainer.appendChild(selectedDiv);
            }
        });
    });

    nextButton.addEventListener('click', () => {
        localStorage.setItem('selectedFilters', JSON.stringify(selectedOptions));
        location.href = '../price-screen/index.html';
    });
