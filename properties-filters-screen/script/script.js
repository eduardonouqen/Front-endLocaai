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

document.addEventListener('DOMContentLoaded', () => {
    const newFiltersSidebar = document.getElementById('newFiltersSidebar');
    const newFilterButton = document.getElementById('newFilterButton');

    newFilterButton.addEventListener('click', () => {
        newFiltersSidebar.classList.toggle('open'); // Adiciona ou remove a classe 'open'
    });
});

function clearSection(sectionName) {
    const checkboxes = document.querySelectorAll(`input[name="${sectionName}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}