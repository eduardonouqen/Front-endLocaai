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

document.getElementById('data-inicio').addEventListener('change', calcularValor);
document.getElementById('data-final').addEventListener('change', calcularValor);