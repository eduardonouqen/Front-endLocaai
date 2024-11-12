document.addEventListener('DOMContentLoaded', () => {
   
    const idAnuncio = localStorage.getItem('idAnuncioAtual'); 

   
    const anuncio = JSON.parse(localStorage.getItem(`anuncio_${idAnuncio}`));

    if (anuncio) {
      
        document.querySelector('.description').textContent = anuncio.descricao;

    
        const enderecoContainer = document.createElement('p');
        enderecoContainer.textContent = `Endereço: ${anuncio.endereco}`;
        document.querySelector('.description').appendChild(enderecoContainer);

      
        if (anuncio.imagem) {
            const imgElement = document.createElement('img');
            imgElement.src = anuncio.imagem;
            imgElement.alt = "Imagem do anúncio";
            document.querySelector('.image-preview-container').appendChild(imgElement);
        }
    }


    function salvarAnuncio(id, titulo, endereco, descricao, imagem) {
        const anuncio = {
            titulo: titulo,
            endereco: endereco,
            descricao: descricao,
            imagem: imagem
        };
        
        localStorage.setItem(`anuncio_${id}`, JSON.stringify(anuncio));
    }

    
    document.querySelector('.anuncio-selecionado').addEventListener('click', function() {
        const idAnuncio = this.getAttribute('data-id'); 
       
        localStorage.setItem('idAnuncioAtual', idAnuncio);

        
    });

   
    let currentImageIndex = 0;
    let images = [];

    document.getElementById('image-upload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && isValidImage(file)) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgSrc = e.target.result;
                images.push(imgSrc);
                updateImagePreview();
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione um arquivo de imagem válido.');
        }
    });

    function isValidImage(file) {
        return file && file.type.startsWith('image/');
    }

    function updateImagePreview() {
        const imagePreviewContainer = document.querySelector('.image-preview-container');
        imagePreviewContainer.innerHTML = '';

        images.forEach((imgSrc, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = `Imagem ${index + 1}`;
            imgElement.classList.add('image-preview');
            imagePreviewContainer.appendChild(imgElement);
        });
    }

    function calcularDiferencaDias(dataInicio, dataFim) {
        const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
        const diferencaEmMilissegundos = new Date(dataFim) - new Date(dataInicio);
        return Math.ceil(diferencaEmMilissegundos / umDiaEmMilissegundos);
    }

    
    function calcularValor() {
        const dataInicio = document.getElementById('data-inicio').value;
        const dataFim = document.getElementById('data-final').value;

        console.log("Data de Início:", dataInicio);
        console.log("Data Final:", dataFim);

        if (dataInicio && dataFim) {
            const diferencaDias = calcularDiferencaDias(dataInicio, dataFim);
            console.log("Diferença em Dias:", diferencaDias);

            if (diferencaDias >= 0) {
                const valorBase = 180;
                const valorTotal = Math.ceil(diferencaDias / 3) * valorBase;
                console.log("Valor Total:", valorTotal);

                document.getElementById('valor-total').textContent = valorTotal.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            } else {
                alert("A data final deve ser posterior à data de início.");
            }
        }
    }

    document.getElementById('data-inicio').addEventListener('change', calcularValor);
    document.getElementById('data-final').addEventListener('change', calcularValor);

    
    const descricaoAnuncio = localStorage.getItem('descricaoAnuncio');
    const imagemAnuncio = localStorage.getItem('imagemAnuncio');

    if (descricaoAnuncio) {
        document.querySelector('.description').textContent = descricaoAnuncio;
    }

    if (imagemAnuncio) {
        const imageContainer = document.querySelector('.image-preview-container');
        const imgElement = document.createElement('img');
        imgElement.src = imagemAnuncio;
        imgElement.alt = "Imagem do anúncio";
        imageContainer.appendChild(imgElement);
    }

    
    document.getElementById('salvar-anuncio').addEventListener('click', () => {
        const titulo = document.getElementById('titulo').value;
        const endereco = "Avenida Brasil, Zona 05, de 5242/5243 a 5855/5856"; 
        const descricao = document.getElementById('descricao').value;
        const imagem = images.length > 0 ? images[0] : null; 

        
        const idAnuncio = new Date().getTime();

        salvarAnuncio(idAnuncio, titulo, endereco, descricao, imagem);
        localStorage.setItem('idAnuncioAtual', idAnuncio); 
        alert('Anúncio salvo com sucesso!');
    });
});
