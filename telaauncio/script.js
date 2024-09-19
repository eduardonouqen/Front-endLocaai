
function initMap() {
    const eichenwalde = { lat: 48.1351, lng: 11.5820 };  // Exemplo de localização em Bayern, Alemanha
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: eichenwalde
    });
    const marker = new google.maps.Marker({
        position: eichenwalde,
        map: map
    });
}


document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#calendar-input", {
        mode: "range",
        dateFormat: "d-m-Y",
        defaultDate: ["2024-08-01", "2024-08-31"],
        minDate: "today",
        locale: {
            firstDayOfWeek: 1,
        }
    });
});
