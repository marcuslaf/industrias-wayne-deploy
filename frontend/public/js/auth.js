document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = `message ${type}`; 
        element.classList.add('show'); 

        setTimeout(() => {
            element.classList.remove('show');
            setTimeout(() => {
                element.classList.add('hidden');
                element.textContent = ''; 
            }, 500); 
        }, 3000); 
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                showMessage(messageDiv, 'Por favor, preencha o usuário e a senha.', 'error');
                return;
            }

            try {
                const response = await fetch('https://industrias-wayne-api.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json(); 

                if (response.ok) { 
                    localStorage.setItem('token', data.token); 
                    localStorage.setItem('userRole', data.user.role); 
                    showMessage(messageDiv, 'Login bem-sucedido! Redirecionando...', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else { 
                    showMessage(messageDiv, data.message || 'Erro no login. Verifique suas credenciais.', 'error');
                }
            } catch (error) { 
                console.error('Erro de rede ou na requisição:', error);
                showMessage(messageDiv, 'Erro de rede. Verifique sua conexão e tente novamente.', 'error');
            }
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token'); 
            localStorage.removeItem('userRole');
            window.location.href = 'index.html';
        });
    }
});