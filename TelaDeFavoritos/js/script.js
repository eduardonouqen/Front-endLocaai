function trocarImagem() {
    const estrela = document.getElementById("estrelaFavorita");

    if (estrela.src.includes("estrela.png")) {
        estrela.src = "img/estrela2.png"; // Caminho da nova imagem
    } else {
        estrela.src = "img/estrela.png"; // Caminho da imagem original
    }
}