document.getElementById('formCreateAccount').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;

    
    if (!name || !cpf || !phone || !city) {
        alert('Todos os campos são obrigatórios.');
        return; 
    }

    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    const dados = {
        name: name,
        cpf: cpf,
        phone: phone,
        city: city,
        email: email, 
        password: senha 
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
        window.location.href = '../../initial-screen/index.html';
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Houve um problema ao enviar os dados.');
    });
});