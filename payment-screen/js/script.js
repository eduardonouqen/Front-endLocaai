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
    try {
        // Recupera os dados do localStorage
        const storedData = JSON.parse(localStorage.getItem('selectedProperty'));
        if (!storedData) {
            throw new Error('Dados de pagamento não encontrados no localStorage.');
        }

        // Monta a URL com os parâmetros
        const queryParams = new URLSearchParams({
            id: storedData.id,
            title: storedData.title,
            price: parseFloat(storedData.value), // Use "price" se o backend espera isso
        });

        // Faz a requisição GET com os parâmetros na URL
        const response = await fetch(`http://localhost:3000/mercadopago/generate-payment-link?${queryParams.toString()}`, {
            method: 'GET', // Não é necessário body para GET
        });

        if (!response.ok) {
            throw new Error('Erro ao gerar a preferência de pagamento');
        }

        // Obter a URL de pagamento gerada
        const paymentUrl = await response.text();

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