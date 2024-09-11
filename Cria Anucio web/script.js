
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

document.getElementById('cancelButton').addEventListener('click', function() {
    alert('A promoção foi cancelada.');
});


document.getElementById('confirmButton').addEventListener('click', function() {
    alert('Promoção confirmada!');
});
document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtém o arquivo selecionado
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.getElementById('preview-image');
            imgElement.src = e.target.result; // Atualiza a imagem de visualização com o arquivo carregado
        }
        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
});
document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('preview-image');
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block'; // Exibe a imagem
        }

        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        previewImage.style.display = 'none'; // Oculta a imagem se nenhum arquivo for selecionado
    }
});
