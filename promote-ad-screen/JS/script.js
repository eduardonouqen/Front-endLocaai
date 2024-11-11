let currentImageIndex = 0;
let images = [];


document.getElementById('image-upload').addEventListener('change', function(event) {
   
});


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
/*/ Recupera os dados do localStorage para quando os dados não forem predefinidos no html
window.addEventListener('DOMContentLoaded', () => {
    const nomePropriedade = localStorage.getItem('nomePropriedade');
    const endereco = localStorage.getItem('endereco');
    const valorDiaria = localStorage.getItem('valorDiaria');
    const avaliacao = localStorage.getItem('avaliacao');
    const imagemUrl = localStorage.getItem('imagemUrl');

   
    const imagePreviewContainer = document.querySelector('.image-preview-container');
    const adDetailsContainer = document.createElement('div');

    adDetailsContainer.innerHTML = `
        <h2>${nomePropriedade}</h2>
        <p><strong>Endereço:</strong> ${endereco}</p>
        <p><strong>Valor diária:</strong> ${valorDiaria}</p>
        <p><strong>Avaliação:</strong> ${avaliacao} <i class="fas fa-star" style="color: #FFA500;"></i></p>
    `;

    if (imagemUrl) {
        const img = document.createElement('img');
        img.src = imagemUrl;
        img.alt = 'Imagem da propriedade';
        img.style.maxWidth = '100%'; 
        imagePreviewContainer.appendChild(img);
    }


    imagePreviewContainer.appendChild(adDetailsContainer);
});
/*/

document.getElementById('data-inicio').addEventListener('change', calcularValor);
document.getElementById('data-final').addEventListener('change', calcularValor);