

const token = localStorage.getItem("token");

if (token) {
    document.getElementById("statusLabel").textContent = "Locador Bronze";
}