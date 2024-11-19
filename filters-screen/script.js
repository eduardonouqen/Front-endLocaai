document.addEventListener('DOMContentLoaded', function () {
    const opcoes = document.querySelectorAll('.opcao');
    const filtroContainer = document.querySelector('.filtro-container');
    const buttonClear = document.querySelector('.button-clear');

    function updateButtonClearState() {
        const filtroAtivo = document.querySelector('.filtro-container .item');
        const simNaoAtivo = document.querySelector('.sim-nao-button[style*="background-color"]');
        const checkboxMarcado = document.querySelector('.localizacao-checkbox:checked, .tipo-local-checkbox:checked');

        if (filtroAtivo || simNaoAtivo || checkboxMarcado) {
            buttonClear.disabled = false;
            buttonClear.style.backgroundColor = 'red';
            buttonClear.style.cursor = 'pointer';
        } else {
            buttonClear.disabled = true;
            buttonClear.style.backgroundColor = '#A2A2A2';
            buttonClear.style.cursor = 'not-allowed';
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
                    updateButtonClearState();
                }
            }
        });
    });

    buttonClear.addEventListener('click', clearAllFilters);

    const simNaoButtons = document.querySelectorAll('.sim-nao-button');
    simNaoButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleSimNao(button);
            updateButtonClearState();
        });
    });

    const checkboxes = document.querySelectorAll('.localizacao-checkbox, .tipo-local-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateButtonClearState);
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

    const checkboxes = document.querySelectorAll('.localizacao-checkbox, .tipo-local-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });

    buttonClear.disabled = true;
    buttonClear.style.backgroundColor = '#A2A2A2';
    buttonClear.style.cursor = 'not-allowed';
}

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
    localStorage.setItem('selectedFilters', JSON.stringify(selectedOptions));
    location.href = '../price-screen/index.html';
});

document.getElementById("rural").addEventListener("change", function () {
    const urbanoCheckbox = document.getElementById("urbano");
    if (this.checked) {
        urbanoCheckbox.disabled = true;
        urbanoCheckbox.checked = false;
    } else {
        urbanoCheckbox.disabled = false;
    }
    updateButtonClearState();
});

document.getElementById("urbano").addEventListener("change", function () {
    const ruralCheckbox = document.getElementById("rural");
    if (this.checked) {
        ruralCheckbox.disabled = true;
        ruralCheckbox.checked = false;
    } else {
        ruralCheckbox.disabled = false;
    }
    updateButtonClearState();
});

document.getElementById("aberto").addEventListener("change", function () {
    const fechadoCheckbox = document.getElementById("fechado");
    if (this.checked) {
        fechadoCheckbox.disabled = true;
        fechadoCheckbox.checked = false;
    } else {
        fechadoCheckbox.disabled = false;
    }
    updateButtonClearState();
});

document.getElementById("fechado").addEventListener("change", function () {
    const abertoCheckbox = document.getElementById("aberto");
    if (this.checked) {
        abertoCheckbox.disabled = true;
        abertoCheckbox.checked = false;
    } else {
        abertoCheckbox.disabled = false;
    }
    updateButtonClearState();
});

async function fetchUsers() {
    const response = await fetch('http://localhost:3000/users'); // Replace with your API endpoint
    const user = await response.json();
    return user;
}

const token = localStorage.getItem("token");

if (token) {
    document.getElementById("statusLabel").textContent = "Locador Bronze";
}
