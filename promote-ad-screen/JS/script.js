document.addEventListener("DOMContentLoaded", () => {
    // Recuperando as informações do LocalStorage
    const enderecoAnuncio = localStorage.getItem('enderecoAnuncio');
    const imagemAnuncio = localStorage.getItem('imagemAnuncio');

    // Exibindo o endereço na tela de promoção
    if (enderecoAnuncio) {
        document.querySelector(".endereco-anuncio").textContent = enderecoAnuncio;  // Exibe o endereço
    } else {
        console.log('Endereço não encontrado no LocalStorage.');
    }

    // Exibindo a imagem do anúncio na tela de promoção
    if (imagemAnuncio) {
        const imgElement = document.createElement('img');
        imgElement.src = imagemAnuncio;
        imgElement.alt = "Imagem do anúncio";
        document.querySelector('.image-preview-container').appendChild(imgElement);  // Exibe a imagem
    } else {
        console.log('Imagem não encontrada no LocalStorage.');
    }

    // Função para salvar as informações do anúncio (no LocalStorage ou enviar para o backend)
    function salvarAnuncio() {
        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const dataInicio = document.getElementById('data-inicio').value;
        const dataFim = document.getElementById('data-final').value;

        // Calculando a diferença entre as datas para determinar o valor total
        if (dataInicio && dataFim) {
            const diferencaDias = calcularDiferencaDias(dataInicio, dataFim);
            if (diferencaDias >= 0) {
                const valorTotal = Math.ceil(diferencaDias / 3) * valor;
                document.getElementById('valor-total').textContent = valorTotal.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            } else {
                alert("A data final deve ser posterior à data de início.");
            }
        }

        // Salvar os dados do anúncio no LocalStorage
        const anuncio = {
            endereco: enderecoAnuncio,
            imagem: imagemAnuncio,
            descricao: descricao,
            valorTotal: valorTotal,
            dataInicio: dataInicio,
            dataFim: dataFim
        };

        localStorage.setItem('anuncioPromocao', JSON.stringify(anuncio));
        alert('Anúncio promovido com sucesso!');
    }

    // Função para calcular a diferença de dias entre as datas
    function calcularDiferencaDias(dataInicio, dataFim) {
        const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
        const diferencaEmMilissegundos = new Date(dataFim) - new Date(dataInicio);
        return Math.ceil(diferencaEmMilissegundos / umDiaEmMilissegundos);
    }

    // Evento para salvar o anúncio ao clicar no botão "Promover"
    document.getElementById('promover-anuncio').addEventListener('click', salvarAnuncio);

    // Função para calcular e exibir o valor total (se as datas forem selecionadas)
    document.getElementById('data-inicio').addEventListener('change', calcularValor);
    document.getElementById('data-final').addEventListener('change', calcularValor);

    // Função para calcular o valor total
    function calcularValor() {
        const dataInicio = document.getElementById('data-inicio').value;
        const dataFim = document.getElementById('data-final').value;

        if (dataInicio && dataFim) {
            const diferencaDias = calcularDiferencaDias(dataInicio, dataFim);
            if (diferencaDias >= 0) {
                const valorBase = 180;
                const valorTotal = Math.ceil(diferencaDias / 3) * valorBase;
                document.getElementById('valor-total').textContent = valorTotal.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            } else {
                alert("A data final deve ser posterior à data de início.");
            }
        }
    }
});
