document.addEventListener('DOMContentLoaded', function () {
    const opcoes = document.querySelectorAll('.opcao');
    const filtroContainer = document.querySelector('.filtro-container');
    const buttonClear = document.querySelector('.button-clear');
    const nextButton = document.querySelector('.button-next');

    // Variáveis de controle para ativar o botão "próximo"
    const simNaoButtons = document.querySelectorAll('.sim-nao-button');
    const checkboxes = document.querySelectorAll('.localizacao-checkbox, .tipo-local-checkbox');
    const opcoesSelecionadas = new Set();

    // Função para verificar as condições do botão "próximo"
    function updateNextButtonState() {
        const filtroAtivo = document.querySelector('.filtro-container .item');
        const simNaoAtivo = document.querySelector('.sim-nao-button[style*="background-color"]');
        const checkboxLocalizacaoMarcado = document.querySelector('.localizacao-checkbox:checked');
        const checkboxTipoLocalMarcado = document.querySelector('.tipo-local-checkbox:checked');
        const opcoesSelecionadasCount = opcoesSelecionadas.size;

        const isNextButtonEnabled = filtroAtivo && simNaoAtivo && checkboxLocalizacaoMarcado && checkboxTipoLocalMarcado && opcoesSelecionadasCount > 0;
        
        nextButton.disabled = !isNextButtonEnabled;
        nextButton.style.backgroundColor = isNextButtonEnabled ? '#4D0872' : '#A2A2A2';
        nextButton.style.cursor = isNextButtonEnabled ? 'pointer' : 'not-allowed';

        

    }

    // Atualiza o estado do botão "limpar"
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
            buttonClear.style.backgroundColor = '#4D0872';
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
            opcao.style.cursor = 'pointer'; // Reverte o cursor para pointer
            updateButtonClearState();
            updateNextButtonState(); // Atualiza o estado do botão "próximo"
        });
    
        filtroContainer.appendChild(itemDiv);
        updateButtonClearState();
        updateNextButtonState(); // Atualiza o estado do botão "próximo"
    }
    
    // Adiciona filtro ao selecionar uma opção
    opcoes.forEach(opcao => {
        opcao.addEventListener('click', () => {
            if (!opcao.classList.contains('disabled')) {
                const value = opcao.getAttribute('data-value');
                const text = opcao.innerText;
    
                if (!document.querySelector(`.item[data-value="${value}"]`)) {
                    createItem(value, text);
                    opcao.classList.add('disabled');
                    opcao.style.cursor = 'not-allowed'; // Desabilita o cursor de pointer
                    opcoesSelecionadas.add(value); // Adiciona à lista de opções selecionadas
                    updateNextButtonState(); // Atualiza o estado do botão "próximo"
                }
            }
        });
    });

    // Limpar todos os filtros
    buttonClear.addEventListener('click', clearAllFilters);

    // Alterar o estado dos botões Sim/Não
    simNaoButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleSimNao(button);
            updateButtonClearState();
            updateNextButtonState(); // Atualiza o estado do botão "próximo"
        });
    });

    // Alterar estado dos checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateButtonClearState();
            updateNextButtonState(); // Atualiza o estado do botão "próximo"
        });
    });

    // Lógica dos checkboxes de "rural/urbano" e "aberto/fechado"
    document.getElementById("rural").addEventListener("change", function () {
        const urbanoCheckbox = document.getElementById("urbano");
        if (this.checked) {
            urbanoCheckbox.disabled = true;
            urbanoCheckbox.checked = false;
        } else {
            urbanoCheckbox.disabled = false;
        }
        updateButtonClearState();
        updateNextButtonState(); // Atualiza o estado do botão "próximo"
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
        updateNextButtonState(); // Atualiza o estado do botão "próximo"
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
        updateNextButtonState(); // Atualiza o estado do botão "próximo"
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
        updateNextButtonState(); // Atualiza o estado do botão "próximo"
    });

    // Função de toggle dos botões Sim/Não
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

    // Função para capitalizar a primeira letra
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Função para limpar os filtros
    function clearAllFilters() {
        const filtroElements = document.querySelectorAll('.filtro-container .item');
        filtroElements.forEach(item => item.remove());

        const opcoes = document.querySelectorAll('.opcao');
        opcoes.forEach(opcao => {
        opcao.classList.remove('disabled'); // Remove a classe 'disabled'
        opcao.style.cursor = 'pointer'; // Restaura o cursor para 'pointer'
    });

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
        updateNextButtonState(); // Atualiza o estado do botão "próximo"
    }

    // Ação ao clicar no botão "próximo"
    nextButton.addEventListener('click', () => {
        localStorage.setItem('selectedFilters', JSON.stringify([...opcoesSelecionadas]));
        location.href = '../price-screen/index.html';
    });

    nextButton.title = 'Por favor, complete todos os filtros antes de continuar!';


    // Verifica se o token está presente
    const token = localStorage.getItem("token");
    if (token) {
        document.getElementById("statusLabel").textContent = "Locador Bronze";
    }

    // Ao carregar a página, garantir que o botão "próximo" comece desabilitado
    updateNextButtonState(); // Chama para verificar o estado inicial do botão
});
