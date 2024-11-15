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




async function fetchProperties() {
    const response = await fetch('http://localhost:3000/realty'); // Replace with your API endpoint
    const properties = await response.json();
    return properties;
}

async function fetchUsers() {
    const response = await fetch('http://localhost:3000/users'); // Replace with your API endpoint
    const user = await response.json();
    return user;
}

const token = localStorage.getItem("token");

    if (token) {
        document.getElementById("statusLabel").textContent = "Locador Bronze";
    }



