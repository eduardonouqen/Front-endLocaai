async function fetchUsers() {
    const response = await fetch('http://localhost:3000/users'); // Replace with your API endpoint
    const user = await response.json();
    return user;
}

const token = localStorage.getItem("token");

if (token) {
    document.getElementById("statusLabel").textContent = "Locador Bronze";
}