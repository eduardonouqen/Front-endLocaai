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