function trocarImagem() {
    const estrela = document.getElementById("estrelaFavorita");

    if (estrela.src.includes("estrela.png")) {
        estrela.src = "img/estrela2.png"; 
    } else {
        estrela.src = "img/estrela.png"; 
    }
}

function trocarImagem2() {
    const estrela = document.getElementById("estrelaFavorita2");

    if (estrela.src.includes("estrela.png")) {
        estrela.src = "img/estrela2.png"; 
    } else {
        estrela.src = "img/estrela.png"; 
    }
}

document.getElementById('formCadastroAnuncio').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/cadastroAnuncio', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Erro ao enviar os dados.');
        }
    })
    .then(data => {
        console.log('Formulário enviado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});