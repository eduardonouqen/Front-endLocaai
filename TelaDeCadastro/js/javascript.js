function validar() {
    var senha = document.getElementById("senha").value;
    var senha2 = document.getElementById("confirmarSenha").value;
    var email = document.getElementById("email").value
    var r = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@\-#$]).{8,50}$/;


    if (senha != senha2) {
        alert("As senhas não conferem.");
        return false;
    }
    if (!r.test(senha)) {
        alert("A senha deve ter entre 8 e 50 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@, -, #, ou $).");
        return false;
    }

    if (senha !== senha2) {
        alert("As senhas não conferem.");
        return false;
    }
    if (email.trim() === "") { 
        alert("O email está vazio.");
        return false;
    }
    if (!validarEmail(email)) {
        alert("O email não é válido.");
        return false;
    }
    alert("Conta criada com sucesso");
    return true;
}

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarBackEnd() {
    var senha = document.getElementById("senha").value;
    var senha2 = document.getElementById("confirmarSenha").value;
    var email = document.getElementById("email").value
    var r = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@\-#$]).{8,50}$/;


    if (senha != senha2) {
        return false;
    }
    if (!r.test(senha)) {
        return false;
    }

    if (senha !== senha2) {
        return false;
    }
    if (email.trim() === "") { 
        return false;
    }
    if (!validarEmail(email)) {
        return false;
    }
    return true;
}

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}