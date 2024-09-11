
function validateLogin(event) {
    console.log("Função validateLogin chamada");
    event.preventDefault(); // Evita o envio do formulário

    // Defina as credenciais válidas
    const validEmail = "locaaieventos@gmail.com";
    const validPassword = "senhalegal";

    // Capture os valores dos inputs
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loading = document.getElementById("loading");
    const feedback = document.getElementById("feedback");

    // Limpa o feedback e os estilos anteriores
    feedback.textContent = "";
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    // Verifica se o email e senha estão corretos
    if (emailInput.value === validEmail && passwordInput.value === validPassword) {
        // Mostra o símbolo de loading
        loading.style.display = "block";

        // Após 3 segundos, mostra a mensagem de sucesso e recarrega a página
        setTimeout(() => {
            loading.style.display = "none";
            feedback.style.color = "green";
            feedback.textContent = "Login realizado com sucesso!";
            setTimeout(() => {
                location.reload(); // Recarrega a página
            }, 3000); // Recarrega após 3 segundos
        }, 3000); // Simula o tempo de carregamento
    } else {
        
        // Circule os campos de email e senha em vermelho
        emailInput.style.borderColor = "red";
        passwordInput.style.borderColor = "red";
        feedback.style.color = "red";
        feedback.textContent = "Dados inválidos";
    }
}
