
function loadImage(event) {
    const profileImage = document.getElementById('profile-image');
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            profileImage.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}

function adjustTextareaHeight() {
    const aboutTextarea = document.getElementById('user-about-text');
    aboutTextarea.style.height = 'auto'; 
    aboutTextarea.style.height = `${aboutTextarea.scrollHeight}px`; 
}

function saveAboutText() {
    const aboutTextarea = document.getElementById('user-about-text');
    const updatedText = aboutTextarea.value;
    
    console.log('Texto salvo:', updatedText);
    alert('Alterações salvas com sucesso!');
}


document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-upload');
    const photoPlaceholder = document.getElementById('photo-placeholder');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                photoPlaceholder.style.backgroundImage = `url(${e.target.result})`;
                photoPlaceholder.style.backgroundSize = 'cover';
                photoPlaceholder.style.backgroundPosition = 'center';
            };

            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione um arquivo de imagem.');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    adjustTextareaHeight();

    const aboutTextarea = document.getElementById('user-about-text');
    aboutTextarea.addEventListener('input', adjustTextareaHeight);

    const saveButton = document.getElementById('save-about-button');
    saveButton.addEventListener('click', saveAboutText);

    handleFileUpload();
});
document.addEventListener('DOMContentLoaded', () => {
    const aboutTextarea = document.getElementById('user-about-text');
    const charUsed = document.getElementById('char-used');
    const charMax = document.getElementById('char-max');
    const saveButton = document.getElementById('save-about-button');
    
  
    function updateCharCount() {
        const textLength = aboutTextarea.value.length;
        charUsed.textContent = textLength;
    }

    function adjustTextareaHeight() {
        aboutTextarea.style.height = 'auto'; 
        aboutTextarea.style.height = `${aboutTextarea.scrollHeight}px`; 
    }


    function saveAboutText() {
        const updatedText = aboutTextarea.value;
        console.log('Texto salvo:', updatedText);
        alert('Alterações salvas com sucesso!');
    }

   
    aboutTextarea.addEventListener('input', () => {
        updateCharCount();
        adjustTextareaHeight();
    });

  
    updateCharCount();


    saveButton.addEventListener('click', saveAboutText);
});
document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-photo').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.querySelector('.delete-account');

    if (deleteButton) {
        deleteButton.addEventListener('click', function(event) {

            event.preventDefault();


           const confirmation = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");

            if (confirmation) {

                alert("Conta excluída com sucesso!"); 
            }
        });
    }
});
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
    const filtersBar = document.getElementById('filtersBar');
    let isFiltersBarVisible = false;

    buttonFilters.addEventListener('click', () => {
        isFiltersBarVisible = !isFiltersBarVisible;
        filtersBar.classList.toggle('show', isFiltersBarVisible);
        buttonFilters.classList.toggle('active', isFiltersBarVisible);
    });
});