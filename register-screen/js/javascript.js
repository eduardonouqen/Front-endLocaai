document.getElementById("formCreateAccount").addEventListener("submit", function(event) {
    event.preventDefault();

    if (validar()) {
        var email = document.getElementById("email").value;
        var senha = document.getElementById("password").value;

        localStorage.setItem("email", email);
        localStorage.setItem("senha", senha);

        window.location.href = '../register-screen_2/index.html';
    }
});

function validar() {
    var senha = document.getElementById("password").value;
    var senha2 = document.getElementById("confirmarSenha").value;
    var email = document.getElementById("email").value;
    var r = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@\-#$]).{8,50}$/;

    if (email.trim() === "") {
        alert("O email está vazio.");
        return false;
    }

    if (!validarEmail(email)) {
        alert("O email não é válido.");
        return false;
    }

    if (senha !== senha2) {
        alert("As senhas não conferem.");
        return false;
    }

    if (!r.test(senha)) {
        alert("A senha deve ter entre 8 e 50 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@, -, #, ou $).");
        return false;
    }

    return true;
}

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}






























//<form id="formCreateAccount" action="/users" method="POST" onsubmit="return validarBackEnd();"></form>


/*document.getElementById('formCreateAccount').addEventListener('submit', function(event) {
    event.preventDefault();

    const dados = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
        window.location.href = '../email-code-screen/index.html';
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Houve um problema ao enviar os dados.');
    })});*/