
document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('cbFiltros');
    const selectedItemsContainer = document.getElementById('selectedItems');

    function createItem(value, text) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.dataset.value = value;

        const itemText = document.createElement('span');
        itemText.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => {
            itemDiv.remove();
            const option = selectElement.querySelector(`option[value="${value}"]`);
            option.style.display = 'block';
        });

        itemDiv.appendChild(itemText);
        itemDiv.appendChild(removeButton);
        return itemDiv;
    }

    selectElement.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const value = selectedOption.value;
        const text = selectedOption.text;

        if (selectedOption.style.display === 'none') return;

        const newItem = createItem(value, text);
        selectedItemsContainer.appendChild(newItem);

        selectedOption.style.display = 'none';

        selectElement.selectedIndex = -1;
    });

   
    function salvarDadosPropriedade(nome, endereco, valor, avaliacao, imagem) {
        localStorage.setItem('nomePropriedade', nome);
        localStorage.setItem('endereco', endereco);
        localStorage.setItem('valorDiaria', valor);
        localStorage.setItem('avaliacao', avaliacao);
        localStorage.setItem('imagemUrl', imagem);

        window.location.href = "../promote-ad-screen/index.html"; 
    
    }

 
    const promoverButtons = document.querySelectorAll('.botaopromover');
    promoverButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.propriedade-card'); 
            const nomePropriedade = card.querySelector('.propriedade-info strong').nextSibling.textContent; 
            const endereco = card.querySelector('.propriedade-info p:nth-child(2)').textContent.split(': ')[1]; 
            const valorDiaria = card.querySelector('.propriedade-info p:nth-child(3)').textContent.split(': ')[1]; 
            const avaliacao = card.querySelector('.propriedade-info p:nth-child(4)').textContent.split(': ')[1]; 
            const imagemUrl = card.querySelector('.propriedade-imagem').src; 

            salvarDadosPropriedade(nomePropriedade, endereco, valorDiaria, avaliacao, imagemUrl);
        });
    });
});
