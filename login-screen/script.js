import CONFIG from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        
        const loadingSpinner = document.getElementById('loading');
        loadingSpinner.style.display = 'block';

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            loadingSpinner.style.display = 'none'; 

            if (!response.ok) {
                throw new Error('Login falhou!');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); 
            document.getElementById('feedback').innerText = 'Login bem-sucedido!';
            console.log('Token gerado:', data.token);

           
            window.location.href = '../initial-screen/index.html'; 
        } catch (error) {
            loadingSpinner.style.display = 'none';
            document.getElementById('feedback').innerText = error.message;
        }
    });
});