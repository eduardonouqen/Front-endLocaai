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



let categoria = ''; 

function selecionarCategoria(opcao) {
    categoria = opcao;
    document.getElementById('categoriaSelecionada').textContent = opcao;
}



document.getElementById('formCadastroAnuncio').addEventListener('submit', function(event) {
    event.preventDefault();

    const dados = {
        titulo: document.getElementById('titulo').value,
        categoria: categoria, 
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        fotos: document.getElementById('fileInput').files[0],
        quartos: document.getElementById('quarto').value,
        banheiros: document.getElementById('banheiro').value,
        garagem: document.getElementById('garagem').value,
        area: document.getElementById('area').value,
        descricao: document.getElementById('descricao').value
    };

    fetch('http://localhost:3000/cadastroAnuncio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
        // Redireciona para a próxima página após o envio bem-sucedido
        window.location.href = '../X - TelaFiltros/index.html';
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Houve um problema ao enviar os dados.'); // Alerta para o usuário
    })});