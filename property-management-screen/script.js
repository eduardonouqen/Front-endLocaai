
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













document.addEventListener('DOMContentLoaded', () => {
    const propriedadesLista = document.getElementById('propriedades-lista');
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return;
    }

    const decodedToken = jwt_decode(token);
    console.log("Conteúdo do Token:", decodedToken);

    const userId = decodedToken.userId || decodedToken.id || decodedToken.sub;

    if (!userId) {
        console.error('User ID não encontrado no token.');
        return;
    }

    async function fetchPropriedades() {
        try {
            const response = await fetch(`http://localhost:3000/realty/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const propriedades = await response.json();

            propriedades.forEach(propriedade => {
                const propriedadeCard = document.createElement('div');
                propriedadeCard.classList.add('propriedade-card');

                propriedadeCard.innerHTML = `
                    <img src="${propriedade.imagem}" alt="Imagem da propriedade" class="propriedade-imagem">
                    <div class="propriedade-info">
                        <p><strong>Nome da Propriedade:</strong> ${propriedade.title}</p>
                        <p><strong>Endereço:</strong> ${propriedade.adress}</p>
                        <p><strong>Valor diária:</strong> R$ ${propriedade.value},00 (taxa inclusa)</p>
                        <p><strong>Avaliações:</strong> ${propriedade.avaliacao} <i class="fas fa-star" style="color: #FFA500;"></i></p>
                    </div>
                    <div class="botoes">
                        <a href="../promote-ad-screen/index.html">
                            <button class="botaopromover">Promover</button>
                        </a>
                        <button class="botaoeditar" data-id="${propriedade.id}">Editar</button>
                        <button class="botaoexcluir" data-id="${propriedade.id}">Excluir</button>
                    </div>
                `;

                const botaoEditar = propriedadeCard.querySelector('.botaoeditar');
                botaoEditar.addEventListener('click', () => {
                    // Armazena o ID da propriedade no localStorage
                    localStorage.setItem('realtyId', propriedade.id);

                    // Redireciona para a tela de edição
                    window.location.href = '../edit-announcementregister-screen/index.html';  // Substitua pelo caminho real da tela de edição
                });

                const botaoExcluir = propriedadeCard.querySelector('.botaoexcluir');
                botaoExcluir.addEventListener('click', () => deletePropriedade(propriedade.id, propriedadeCard));

                propriedadesLista.appendChild(propriedadeCard);
            });
        } catch (error) {
            console.error('Erro ao carregar as propriedades:', error);
        }
    }

    async function deletePropriedade(propriedadeId, propriedadeCard) {
        try {
            const response = await fetch(`http://localhost:3000/realty/${propriedadeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao excluir propriedade: ${response.status}`);
            }

            propriedadeCard.remove();
            console.log(`Propriedade com ID ${propriedadeId} foi excluída com sucesso.`);
        } catch (error) {
            console.error('Erro ao excluir a propriedade:', error);
        }
    }

    fetchPropriedades();
});

