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

    filtersButton.addEventListener('click', () => {
        filtersBar.classList.toggle('show');
        filtersButton.classList.toggle('active');
    });
    
  
    updateCharCount();
    adjustTextareaHeight();
});


document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error('Token não encontrado.');
        return;
    }

    try {
        const decodedToken = jwt_decode(token);
        console.log("Token decodificado:", decodedToken);

        const userId = decodedToken.sub; 
        const userName = decodedToken.name;
        const userCpf = decodedToken.cpf;

        if (!userId || !userName) {
            console.error('User ID ou User Name não encontrado no token.');
            return;
        }

        console.log("User ID:", userId);
        console.log("User Name:", userName);

        const url = `http://localhost:3000/users/${userId}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            document.querySelector('.user-info .info-item:nth-child(1) p.fontSizeData').textContent = data.email;
            document.querySelector('.user-info .info-item:nth-child(2) p.fontSizeData').textContent = data.phone;
            document.querySelector('.user-info .info-item:nth-child(3) p.fontSizeData').textContent = data.cpf;

            document.getElementById('user-name').textContent = userName;
        })
        .catch(error => console.error('Erro ao buscar os dados do usuário:', error));
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
    }
});