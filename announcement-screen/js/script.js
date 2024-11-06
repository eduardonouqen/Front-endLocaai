document.addEventListener('DOMContentLoaded', function () {
    const bannerIcon = document.querySelector('#bannerIcon');

    bannerIcon.addEventListener('click', function () {
        if (bannerIcon.src.includes('bannerOff.png')) {
            bannerIcon.src = 'img/bannerOn.png';
        } else {
            bannerIcon.src = 'img/bannerOff.png';
        }
    });
});

document.getElementById('check-in').addEventListener('change', validarDatas);
    document.getElementById('check-out').addEventListener('change', validarDatas);

    function validarDatas() {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;

        if (checkIn && checkOut && new Date(checkOut) < new Date(checkIn)) {
            alert("Ops! A data de check-out não pode ser anterior à data de check-in!");
            document.getElementById('check-out').value = "";
        }
    }