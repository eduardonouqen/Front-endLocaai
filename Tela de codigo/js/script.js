function iniciarTemporizador(botao) {
    botao.disabled = true; 
    botao.classList.add('desativado'); 
    let tempoRestante = 60;

    const intervalo = setInterval(() => {
        tempoRestante--;
        botao.innerText = `Reenviar Código (${tempoRestante}s)`;

        if (tempoRestante <= 0) {
            clearInterval(intervalo); 
            botao.disabled = false; 
            botao.classList.remove('desativado'); 
            botao.innerText = "Reenviar Código";
        }
    }, 1000);
}