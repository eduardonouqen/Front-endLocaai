document.addEventListener('DOMContentLoaded', () => {
    const aboutTextarea = document.getElementById('user-about-text');
    const charUsed = document.getElementById('char-used');
    const saveButton = document.getElementById('save-about-button');
    const deleteButton = document.querySelector('.delete-account');
    const fileUpload = document.getElementById('file-upload');
    const filtersButton = document.getElementById('toggleButton');
    const filtersBar = document.getElementById('filtersBar');

    const updateCharCount = () => {
        const textLength = aboutTextarea.value.length;
        charUsed.textContent = textLength;
        saveButton.disabled = textLength === 0;
    };

    const adjustTextareaHeight = () => {
        aboutTextarea.style.height = 'auto';
        aboutTextarea.style.height = `${aboutTextarea.scrollHeight}px`;
    };

    const saveAboutText = () => {
        const updatedText = aboutTextarea.value;
        console.log('Texto salvo:', updatedText);
        alert('Alterações salvas com sucesso!');
    };

    const loadImage = (event) => {
        const file = event.target.files[0];
        if (isValidImage(file)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profile-photo').src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione um arquivo de imagem válido.');
        }
    };

    const isValidImage = (file) => file && file.type.startsWith('image/');

    
    aboutTextarea.addEventListener('input', () => {
        updateCharCount();
        adjustTextareaHeight();
    });

    saveButton.addEventListener('click', saveAboutText);
    fileUpload.addEventListener('change', loadImage);

    if (deleteButton) {
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            const confirmation = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
            if (confirmation) {
                alert("Conta excluída com sucesso!");
            }
        });
    }

    filtersButton.addEventListener('click', () => {
        filtersBar.classList.toggle('show');
        filtersButton.classList.toggle('active');
    });
    
  
    updateCharCount();
    adjustTextareaHeight();
});
