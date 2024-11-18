const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));

    // Atualizar os valores no HTML
    if (selectedProperty) {
        const paragraphs = document.querySelectorAll('p');
        if (paragraphs.length >= 5) { // Verifica se os parágrafos necessários existem
            paragraphs[0].innerHTML = `<strong>Destino:</strong> ${selectedProperty.title}`;
            paragraphs[1].innerHTML = `<strong>Locador:</strong> ${selectedProperty.userId.name}`;
            paragraphs[2].innerHTML = `<strong>Localização:</strong> ${selectedProperty.city}`;
            paragraphs[4].innerHTML = `<strong>Valor:</strong> R$ ${selectedProperty.value}`;
            document.querySelector('.final-totalsLabel1').textContent = `Total: R$ ${selectedProperty.value}`;
        } else {
            console.error('Parágrafos esperados não encontrados no DOM.');
        }
    }

    if (decodedToken) {
        const locatarioParagraph = document.querySelectorAll('p')[3];
        if (locatarioParagraph) {
            locatarioParagraph.innerHTML = `<strong>Locatário:</strong> ${decodedToken.name}`;
        } else {
            console.error('Elemento do locatário não encontrado no DOM.');
        }
    }

    // Função para decodificar o token JWT
    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Erro ao decodificar o token JWT:', error);
            return null;
        }
    }
});










document.getElementById('pay-button').addEventListener('click', generatePaymentLink);

async function generatePaymentLink() {
    // Defina os dados que você deseja enviar
    const paymentData = {
        id: "12345",         // Exemplo de ID do serviço
        title: "Aluguel Castelo de Eichenwalde", // Exemplo de título
        value: 3500.00,      // Exemplo de valor
    };

    try {
        // Passo 1: Enviar a requisição GET para gerar a preferência de pagamento
        const postResponse = await fetch('http://localhost:3000/mercadopago/generate-payment-link', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData), // Enviando id, title e value
        });

        if (!postResponse.ok) {
            throw new Error('Erro ao gerar a preferência de pagamento');
        }

        // Recuperar o ID da preferência da resposta
        const paymentPreferenceId = await postResponse.text();

        // Passo 2: Fazer a requisição GET para obter o link de pagamento
        const getResponse = await fetch('http://localhost:3000/mercadopago/get-payment-link', {
            method: 'GET',  // Usando GET para enviar os dados no corpo
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ preferenceId: paymentPreferenceId }),  // Passando ID da preferência gerada
        });

        if (!getResponse.ok) {
            throw new Error('Erro ao obter o link de pagamento');
        }

        // Obter a URL de pagamento gerada
        const paymentUrl = await getResponse.text();

        // Exibir o link de pagamento na interface
        const paymentLinkElement = document.getElementById('payment-link');
        const linkElement = document.getElementById('link');
        linkElement.href = paymentUrl;
        linkElement.textContent = paymentUrl;

        // Mostrar o link de pagamento
        paymentLinkElement.style.display = 'block';

        // Redirecionar automaticamente o usuário para o Mercado Pago
        window.location.href = paymentUrl;

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao gerar o link de pagamento. Tente novamente.');
    }
}