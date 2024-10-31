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








// Seleciona o contêiner onde serão exibidas as opções selecionadas
const selectedItemsContainer = document.getElementById('selectedItems');
// Seleciona o botão "PRÓXIMO"
const nextButton = document.querySelector('.button-next');
// Array para armazenar as opções selecionadas
const selectedOptions = [];

// Adiciona evento de clique a cada elemento de categoria
document.querySelectorAll('.opcao').forEach(opcao => {
    opcao.addEventListener('click', () => {
        const value = opcao.dataset.value; // Obtém o valor da opção (categoria)
        
        // Verifica se a categoria já foi selecionada, para não adicionar duplicados
        if (!selectedOptions.includes(value)) {
            selectedOptions.push(value); // Adiciona a categoria ao array
            
            // Cria um elemento <div> para exibir a categoria selecionada
            const selectedDiv = document.createElement('div');
            selectedDiv.textContent = value;
            selectedItemsContainer.appendChild(selectedDiv);
        }
    });
});

// Evento de clique para o botão "PRÓXIMO"
nextButton.addEventListener('click', () => {
    // Armazena as opções selecionadas no localStorage
    localStorage.setItem('nameFilter', JSON.stringify(selectedOptions));
    // Redireciona para a próxima página
    location.href = '../price-screen/index.html';
});