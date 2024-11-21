import CONFIG from '../../config.js';

const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));

    if (selectedProperty) {
        const paragraphs = document.querySelectorAll('p');
        if (paragraphs.length >= 5) { 
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
        const storedData = JSON.parse(localStorage.getItem('selectedProperty'));
        if (!storedData) {
            throw new Error('Dados de pagamento não encontrados no localStorage.');
        }

        const queryParams = new URLSearchParams({
            id: storedData.id,
            title: storedData.title,
            price: parseFloat(storedData.value), 
        });

        const response = await fetch(`${CONFIG.API_BASE_URL}/mercadopago/generate-payment-link?${queryParams.toString()}`, {
            method: 'GET', 
        });

        if (!response.ok) {
            throw new Error('Erro ao gerar a preferência de pagamento');
        }

        const paymentUrl = await response.text();

        const paymentLinkElement = document.getElementById('payment-link');
        const linkElement = document.getElementById('link');
        linkElement.href = paymentUrl;
        linkElement.textContent = paymentUrl;

        paymentLinkElement.style.display = 'block';

        window.location.href = paymentUrl;

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao gerar o link de pagamento. Tente novamente.');
    }
}