document.addEventListener('DOMContentLoaded', function () { //Aqui só está sendo definidas as variáveis pro controle daquele container

    const dropdownContainer = document.querySelector('.dropdown-container');
    const dropdownContent = document.querySelector('.dropdown-content');
    const selectedOption = document.querySelector('.selected-option');
    const options = document.querySelectorAll('.option');

    // Essa função determina que se clicar no container ele abre o content, e se clicar de novo ele fecha tbm
    if (dropdownContainer) {
        dropdownContainer.addEventListener('click', function (event) {
            event.stopPropagation();
            dropdownContainer.classList.toggle('show');
            dropdownContent.classList.toggle('show');
        });
    }

    // Ao selecionar uma opção essa função faz o container se fechar automaticamente
    options.forEach(function (option) {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            selectedOption.textContent = this.textContent;
            dropdownContainer.classList.remove('show');
            dropdownContent.classList.remove('show');
        });
    });

    // Aqui quando clica em qualquer lugar da tela o container se fecha
    document.addEventListener('click', function () {
        dropdownContainer.classList.remove('show')
        dropdownContent.classList.remove('show');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const termosCheckbox = document.getElementById('termos');
    const botaoProximo = document.getElementById('botaoProximo');

    // Função que verifica o estado do checkbox
    function verificarCheckbox() {
        if (termosCheckbox.checked) {
            botaoProximo.disabled = false;  // Habilita o botão se o checkbox estiver marcado
            botaoProximo.classList.remove('disabled');  // Remove a classe de desabilitado
        } else {
            botaoProximo.disabled = true;   // Desabilita o botão se o checkbox estiver desmarcado
            botaoProximo.classList.add('disabled');  // Adiciona a classe de desabilitado
        }
    }

    // Executa a função quando o estado do checkbox mudar
    termosCheckbox.addEventListener('change', verificarCheckbox);

    // Inicializa o botão como desabilitado ao carregar a página
    verificarCheckbox();
});






















let categoria;
let imagensBase64 = [];

function lerImagem(input) {
    const files = input.files;
    imagensBase64 = [];  // Limpa o array antes de adicionar novas imagens

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagensBase64.push(e.target.result);  // Adiciona a imagem em Base64 ao array
        };
        reader.readAsDataURL(file);  // Lê o arquivo como um Data URL (Base64)
    });
}

document.getElementById('fileInput').addEventListener('change', function () {
    lerImagem(this);  // Chama a função para ler as imagens ao selecionar arquivos
});

function selecionarCategoria(opcao) {
    categoria = opcao;
    document.getElementById('categoriaSelecionada').innerText = opcao;  // Exibe a categoria selecionada no HTML
}

document.getElementById('formCadastroAnuncio').addEventListener('submit', function (event) {
    event.preventDefault();  // Previne o envio padrão do formulário

    const dados = {
        title: document.getElementById('titulo').value,
        category: categoria,
        adress: document.getElementById('adress').value,
        no: document.getElementById('number').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        cep: document.getElementById('cep').value,
        photos: imagensBase64,  // Imagens em Base64 armazenadas no array
        room: document.getElementById('quarto').value,
        bathroom: document.getElementById('banheiro').value,
        garage: document.getElementById('garagem').value,
        area: document.getElementById('area').value,
        description: document.getElementById('descricao').value,
    };

    const missingFields = [];
    for (const key in dados) {
        if (!dados[key] && key !== 'photos' && key !== 'category') {
            missingFields.push(key);  // Verifica se algum campo obrigatório está vazio
        }
    }

    if (missingFields.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios: ' + missingFields.join(', '));
        return;  // Não prossegue com o envio se algum campo obrigatório estiver faltando
    }

    // Armazena os dados no localStorage
    localStorage.setItem('cadastroAnuncio', JSON.stringify(dados));

    console.log('Dados armazenados no localStorage:', JSON.parse(localStorage.getItem('cadastroAnuncio')));

    // Redireciona para a próxima tela
    window.location.href = '../filters-screen/index.html';
});

const token = localStorage.getItem("token");

if (token) {
    document.getElementById("statusLabel").textContent = "Locador Bronze";  // Exibe o status do usuário se o token estiver presente
}


















//TO ACHANDO QUE ISSO AQUI NÃO VAI SER NECESSARIO NESSA TELA

// Submissão do formulário
/*document.getElementById('formCadastroAnuncio').addEventListener('submit', function (event) {
    event.preventDefault();

    const dados = {
        titulo: document.getElementById('titulo').value,
        categoria: categoria,
        address: document.getElementById('adress').value,
        number: document.getElementById('number').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        cep: document.getElementById('cep').value,
        photos: [],
        rooms: document.getElementById('quarto').value,
        bathrooms: document.getElementById('banheiro').value,
        garage: document.getElementById('garagem').value,
        area: document.getElementById('area').value,
        description: document.getElementById('descricao').value,
    };

    

    const missingFields = [];
    for (const key in dados) {
        if (!dados[key] && key !== 'photos' && key !== 'categoria') { // Verifica se o campo está vazio, exceto 'photos' e 'categoria'
            missingFields.push(key);
        }
    }

    // Se houver campos vazios, alerta e impede o envio
    if (missingFields.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios: ' + missingFields.join(', '));
        return; // Impede o envio se houver campos obrigatórios não preenchidos
    }

    
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
        window.location.href = '../filters-screen/index.html';
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

    input.addEventListener('change', function (event) {
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
document.getElementById('cep').addEventListener('blur', function () {
    let cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        let url = `https://viacep.com.br/ws/${cep}/json/`; // Monta a URL corretamente

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    // Preenche os campos com as informações recebidas da API
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
});


document.getElementById('infotecnica').addEventListener('input', function () {
    let value = this.value;

    // Limita o valor aos últimos dois dígitos
    if (value.length > 2) {
        this.value = value.slice(-2); // Mantém os dois últimos dígitos
    }
});