document.addEventListener('DOMContentLoaded', function () {
    const opcoes = document.querySelectorAll('.opcao');
    const filtroContainer = document.querySelector('.filtro-container');
    const buttonClear = document.querySelector('.button-clear');

    function updateButtonClearState() {
        if (filtroContainer.children.length === 0) {
            buttonClear.disabled = true;
            buttonClear.style.backgroundColor = '#A2A2A2';
            buttonClear.style.cursor = 'not-allowed';
        } else {
            buttonClear.disabled = false;
            buttonClear.style.backgroundColor = 'red';
            buttonClear.style.cursor = 'pointer';
        }
    }

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
            updateButtonClearState();
        });

        filtroContainer.appendChild(itemDiv);
        updateButtonClearState();
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

    buttonClear.addEventListener('click', () => {
        filtroContainer.innerHTML = '';
        opcoes.forEach(opcao => {
            opcao.classList.remove('disabled');
            opcao.style.cursor = 'pointer';
        });
        updateButtonClearState();
    });

    updateButtonClearState();
});



const selectedItemsContainer = document.getElementById('selectedItems');

const nextButton = document.querySelector('.button-next');

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
    localStorage.setItem('nameFilter', JSON.stringify(selectedOptions));
    location.href = '../price-screen/index.html';
});