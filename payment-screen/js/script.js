const mp = new MercadoPago('APP_USR-de8b0da4-8329-4f5c-b7c9-10dc39866259');
const bricksBuilder = mp.bricks();

const renderPaymentBrick = async (bricksBuilder) => {
    const settings = {
        initialization: {
            /*
             "amount" é o valor total a ser pago por todos os meios de pagamento
           com exceção da Conta Mercado Pago e Parcelamento sem cartão de crédito, que tem seu valor de processamento determinado no backend através do "preferenceId"
            */
            amount: 100,
            preferenceId: "<PREFERENCE_ID>",
        },
        customization: {
            visual: {
                style: {
                    theme: 'default'
                }
            },
            paymentMethods: {
                ticket: "all",
                bankTransfer: "all",
                creditCard: "all",
                debitCard: "all",
                mercadoPago: "all",
            },
        },
        callbacks: {
            onReady: () => {
                /*
                 Callback chamado quando o Brick estiver pronto.
                 Aqui você pode ocultar loadings do seu site, por exemplo.
                */
            },
            onSubmit: ({ selectedPaymentMethod, formData }) => {
                // callback chamado ao clicar no botão de submissão dos dados
                return new Promise((resolve, reject) => {
                    fetch("/process_payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            // receber o resultado do pagamento
                            resolve();
                        })
                        .catch((error) => {
                            // lidar com a resposta de erro ao tentar criar o pagamento
                            reject();
                        });
                });
            },
            onError: (error) => {
                // callback chamado para todos os casos de erro do Brick
                console.error(error);
            },
        },
    };
    window.paymentBrickController = await bricksBuilder.create(
        "payment",
        "paymentBrick_container",
        settings
    );
};
renderPaymentBrick(bricksBuilder);











document.addEventListener("DOMContentLoaded", () => {
    function decodeToken(token) {
        try {
            const payload = token.split('.')[1];
            const decoded = atob(payload);
            return JSON.parse(decoded);
        } catch (e) {
            console.error("Erro ao decodificar o token:", e);
            return null;
        }
    }

    function updateServiceSummary() {
        const selectedProperty = JSON.parse(localStorage.getItem("selectedProperty"));
        const token = localStorage.getItem("token");
        const decodedToken = token ? decodeToken(token) : null;

        if (!selectedProperty || !decodedToken) {
            console.error("Dados ausentes no localStorage ou token inválido.");
            return;
        }

        const destinationElem = document.querySelector(".service-item p:nth-of-type(1)");
        if (destinationElem) {
            destinationElem.innerHTML = `<strong>Destino:</strong> ${selectedProperty.title}`;
        }

        const landlordElem = document.querySelector(".service-item p:nth-of-type(2)");
        if (landlordElem) {
            landlordElem.innerHTML = `<strong>Locador:</strong> ${selectedProperty.userId.name}`;
        }

        const locationElem = document.querySelector(".service-item p:nth-of-type(3)");
        if (locationElem) {
            locationElem.innerHTML = `<strong>Localização:</strong> ${selectedProperty.city}`;
        }

        const tenantElem = document.querySelector(".service-item p:nth-of-type(4)");
        if (tenantElem) {
            tenantElem.innerHTML = `<strong>Locatário:</strong> ${decodedToken.name}`;
        }

        const priceElem = document.querySelector(".service-item p:nth-of-type(5)");
        if (priceElem) {
            priceElem.innerHTML = `<strong>Valor:</strong> R$ ${selectedProperty.value}`;
        }

        const totalElem = document.querySelector(".final-totalsLabel1");
        if (totalElem) {
            totalElem.textContent = `Total: R$ ${selectedProperty.value}`;
        }

        const taxElem = document.querySelector(".final-totalsLabel2");
        if (taxElem) {
            taxElem.textContent = "*Incluindo taxas e impostos*";
        }
    }

    updateServiceSummary();
});