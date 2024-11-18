document.addEventListener('DOMContentLoaded', () => {
    const propriedadesLista = document.getElementById('propriedades-lista');
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return;
    }

    const decodedToken = jwt_decode(token);
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
                        <p><strong>Endereço:</strong> ${propriedade.address}</p>
                        <p><strong>Valor diária:</strong> R$ ${propriedade.value},00 (taxa inclusa)</p>
                        <p><strong>Avaliações:</strong> ${propriedade.avaliacao} <i class="fas fa-star" style="color: #FFA500;"></i></p>
                    </div>
                    <div class="botoes">
                        <button class="botaopromover">Promover</button>
                        <button class="botaoeditar" data-id="${propriedade.id}">Editar</button>
                        <button class="botaoexcluir" data-id="${propriedade.id}">Excluir</button>
                    </div>
                `;

                const botaoPromover = propriedadeCard.querySelector('.botaopromover');
                botaoPromover.addEventListener('click', () => {
                    // Salva as informações no localStorage para serem usadas na tela de promoção
                    localStorage.setItem('tituloAnuncio', propriedade.title);
                    localStorage.setItem('enderecoAnuncio', propriedade.address);
                    localStorage.setItem('imagemAnuncio', propriedade.imagem);
                    console.log('Título, endereço e imagem do anúncio salvos no LocalStorage.');

                    // Redireciona para a tela de promoção de anúncio
                    window.location.href = '../promote-ad-screen/index.html'; 
                });

                const botaoEditar = propriedadeCard.querySelector('.botaoeditar');
                botaoEditar.addEventListener('click', () => {
                    localStorage.setItem('realtyId', propriedade.id);
                    console.log(`ID da propriedade ${propriedade.id} salvo no LocalStorage.`);
                    window.location.href = '../edit-announcementregister-screen/index.html'; 
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
