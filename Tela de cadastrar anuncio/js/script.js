document.querySelector('.dropdown-container').addEventListener('click', function() {
    this.classList.toggle('show');
});

document.querySelectorAll('.option').forEach(function(option) {
    option.addEventListener('click', function() {
        document.querySelector('.selected-option').textContent = this.textContent;
        document.querySelector('.dropdown-container').classList.remove('show');
    });
});

function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'grid' ? 'none' : 'grid';
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');

    
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0]; 
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                previewImage.src = event.target.result; 
            };

            reader.readAsDataURL(file);
        }
    });
});