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