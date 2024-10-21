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
});
