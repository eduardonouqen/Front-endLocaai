document.addEventListener('DOMContentLoaded', function () {
    
    const dropdownContainer = document.querySelector('.dropdown-container');

    if (dropdownContainer) {
        dropdownContainer.addEventListener('click', function () {
            this.classList.toggle('show');
        });
    }

    
    document.querySelectorAll('.option').forEach(function (option) {
        option.addEventListener('click', function () {
            document.querySelector('.selected-option').textContent = this.textContent;
            dropdownContainer.classList.remove('show');
        });
    });

    
    function toggleDropdown() {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.style.display = dropdownContent.style.display === 'grid' ? 'none' : 'grid';
        }
    }

    
});

let categoria = '';

function selecionarCategoria(option) {
    categoria = option;
    document.getElementById('categoriaSelecionada').textContent = option;
}

// Submissão do formulário
/*document.getElementById('formCadastroAnuncio').addEventListener('submit', function (event) {
    event.preventDefault();

    const dados = {
        titulo: document.getElementById('titulo').value,
        categoria: categoria,
        endereco: document.getElementById('adress').value,
        number: document.getElementById('number').value,
        cidade: document.getElementById('city').value,
        estado: document.getElementById('state').value,
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
            window.location.href = '../filter-screen';
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Houve um problema ao enviar os dados.');
        });
});*/

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('fileInput');
    const imgElement = document.getElementById('previewImage');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
  
    let images = [];
    let currentIndex = 0;
  
    input.addEventListener('change', function(event) {
      const files = event.target.files;
      images = Array.from(files).map(file => URL.createObjectURL(file)); 
  
      if (images.length > 0) {
        currentIndex = 0;
        imgElement.src = images[currentIndex]; 
  
        // Tornar os botões visíveis quando uma imagem for adicionada
        prevBtn.style.display = 'inline-block';
        nextBtn.style.display = 'inline-block';
      }
    });
  
    prevBtn.addEventListener('click', () => {
      if (images.length > 0) {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        imgElement.src = images[currentIndex]; 
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if (images.length > 0) {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        imgElement.src = images[currentIndex]; 
      }
    });
  });
  
  
  

  
  
  

// Função para buscar endereço pelo CEP
function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    console.log(cep);

    if (cep.length === 8) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    let enderecoCompleto = `${data.logradouro}, ${data.bairro}`;
                    if (data.complemento) {
                        enderecoCompleto += `, ${data.complemento}`;
                    }
                    document.getElementById('adress').value = enderecoCompleto;
                    document.getElementById('city').value = data.localidade;
                    document.getElementById('state').value = data.uf;
                } else {
                    alert("CEP não encontrado!");
                }
            })
            .catch(error => {
                console.error("Erro ao buscar o CEP:", error);
                alert("Erro ao buscar o CEP.");
            });
    } else {
        alert("Por favor, insira um CEP válido.");
    }
}
