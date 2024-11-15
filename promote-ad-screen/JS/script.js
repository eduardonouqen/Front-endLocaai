document.addEventListener("DOMContentLoaded", () => {
    const enderecoAnuncio = localStorage.getItem('enderecoAnuncio');
    const imagemAnuncio = localStorage.getItem('imagemAnuncio');

    if (enderecoAnuncio) {
        document.querySelector(".endereco-anuncio").textContent = enderecoAnuncio;  
    } else {
        console.log('Endereço não encontrado no LocalStorage.');
    }

    if (imagemAnuncio) {
        const imgElement = document.createElement('img');
        imgElement.src = imagemAnuncio;
        imgElement.alt = "Imagem do anúncio";
        document.querySelector('.image-preview-container').appendChild(imgElement);  
    } else {
        console.log('Imagem não encontrada no LocalStorage.');
    }

    function salvarAnuncio() {
        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const dataInicio = document.getElementById('data-inicio').value;
        const dataFim = document.getElementById('data-final').value;

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

    function calcularDiferencaDias(dataInicio, dataFim) {
        const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
        const diferencaEmMilissegundos = new Date(dataFim) - new Date(dataInicio);
        return Math.ceil(diferencaEmMilissegundos / umDiaEmMilissegundos);
    }

    document.getElementById('promover-anuncio').addEventListener('click', salvarAnuncio);

    document.getElementById('data-inicio').addEventListener('change', calcularValor);
    document.getElementById('data-final').addEventListener('change', calcularValor);

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
