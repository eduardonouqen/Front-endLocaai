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
    const categoriesBar = document.getElementById('categoriesBar');
    let isCategoriesBarVisible = false;

    buttonFilters.addEventListener('click', () => {
        isCategoriesBarVisible = !isCategoriesBarVisible;
        categoriesBar.classList.toggle('show', isCategoriesBarVisible);
        buttonFilters.classList.toggle('active', isCategoriesBarVisible);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const userData = JSON.parse(jsonPayload);
        const userName = userData.name;

        document.querySelector('.textName').innerText = userName;
    }
});

document.getElementById('logo').addEventListener('click', function () {
    window.location.href = '../initial-screen/index.html';
});


document.querySelector('.announcementButton').addEventListener('click', function () {
    const userToken = localStorage.getItem('token');

    if (userToken) {

        window.location.href = "../announcementregister-screen/index.html";
    } else {

        window.location.href = "../login-screen/index.html";
    }
});