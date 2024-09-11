// script.js
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
            option.style.display = 'block'; // Torna a opção disponível novamente
        });

        itemDiv.appendChild(itemText);
        itemDiv.appendChild(removeButton);
        return itemDiv;
    }

    selectElement.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const value = selectedOption.value;
        const text = selectedOption.text;

        // Verifica se a opção já está na lista
        if (selectedOption.style.display === 'none') return;

        // Adiciona a opção ao container de itens selecionados
        const newItem = createItem(value, text);
        selectedItemsContainer.appendChild(newItem);

        // Torna a opção selecionada indisponível no select
        selectedOption.style.display = 'none';

        // Limpa a seleção do <select>
        selectElement.selectedIndex = -1;
    });
});
