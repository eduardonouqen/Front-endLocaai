// Limitar campo de número a apenas dígitos
document.getElementById('justNumberInput').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.]/g, '');
});

// Alternar classe do botão de filtros
document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.buttonFilters');

    button.addEventListener('click', function () {
        button.classList.toggle('active');
    });
});

// Mostrar/ocultar barra de filtros
document.addEventListener('DOMContentLoaded', () => {
    const buttonFilters = document.getElementById('toggleButton');
    const filtersBar = document.getElementById('filtersBar');
    let isFiltersBarVisible = false;

    buttonFilters.add
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
