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

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const userData = JSON.parse(jsonPayload);
        const userName = userData.name;

        document.querySelector('.textName').innerText = userName;
    }
});
