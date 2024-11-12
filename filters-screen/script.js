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

                if (!document.querySelector(`.item[data-value="${value}"]`)) {
                    createItem(value, text);
                    opcao.classList.add('disabled');
                    opcao.style.cursor = 'not-allowed';
                }
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
});

function toggleSimNao(button) {
    const filter = button.getAttribute('data-filter'); 
    const isSim = button.getAttribute('data-value') === 'Sim';


    const simButton = document.querySelector(`#sim${capitalizeFirstLetter(filter)}`);
    const naoButton = document.querySelector(`#nao${capitalizeFirstLetter(filter)}`);

    simButton.style.backgroundColor = ''; 
    naoButton.style.backgroundColor = ''; 
    simButton.style.color = '';
    naoButton.style.color = '';

    if (isSim) {
        simButton.style.backgroundColor = 'green';
        simButton.style.color = 'white';
        naoButton.style.backgroundColor = '';
        naoButton.style.color = '';
    } else {
        naoButton.style.backgroundColor = 'red';
        naoButton.style.color = 'white';
        simButton.style.backgroundColor = '';
        simButton.style.color = '';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearAllFilters() {
    const filtroElements = document.querySelectorAll('.filtro-container .item');
    filtroElements.forEach(item => item.remove());

    const simNaoButtons = document.querySelectorAll('.sim-nao-button');
    simNaoButtons.forEach(button => {
        button.style.backgroundColor = ''; 
        button.style.color = '';
    });
}

const clearButton = document.querySelector('.button-clear');
if (clearButton) {
    clearButton.addEventListener('click', clearAllFilters);
}