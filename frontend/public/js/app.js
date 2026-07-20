document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

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

    if (!token && (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('resources.html'))) {
        window.location.href = 'index.html';
        return;
    }

    if (window.location.pathname.includes('dashboard.html')) {
        loadDashboardData();
    }

    const resourceForm = document.getElementById('resourceForm');
    const resourceMessageDiv = document.getElementById('resourceMessage');

    if (window.location.pathname.includes('resources.html')) {
        if (userRole === 'funcionario') {
            if (resourceForm) {
                resourceForm.classList.add('hidden');
            }
            if (resourceMessageDiv) {
                showMessage(resourceMessageDiv, 'Você não tem permissão para adicionar/editar recursos.', 'error');
            }
        }
        loadResources(); 

        if (resourceForm) {
            resourceForm.addEventListener('submit', handleResourceSubmit);
        }
    }

    async function loadDashboardData() {
        document.getElementById('loginAttempts').textContent = '150';
        document.getElementById('authorizedAccesses').textContent = '140';
        document.getElementById('deniedAccesses').textContent = '10';

        const recentActivitiesList = document.getElementById('recentActivities');
        recentActivitiesList.innerHTML = `
            <li>[${new Date().toLocaleString('pt-BR')}] Bruce Wayne acessou a Batcaverna.</li>
            <li>[${new Date().toLocaleString('pt-BR')}] Batmovel MK-III saiu da garagem.</li>
            <li>[${new Date().toLocaleString('pt-BR')}] Câmera de Vigilância T-2000 em manutenção.</li>
        `;

        try {
            const response = await fetch('https://industrias-wayne-api.onrender.com/api/resources', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao carregar dados do dashboard.');
            }

            const resources = await response.json();

            const equipmentInUse = resources.filter(res => res.type === 'equipamento' && res.status === 'em_uso').length;
            const vehiclesInUse = resources.filter(res => res.type === 'veiculo' && res.status === 'em_uso').length;
            const securityDevicesActive = resources.filter(res => res.type === 'dispositivo_seguranca' && res.status === 'em_uso').length;

            document.getElementById('equipmentInUse').textContent = equipmentInUse;
            document.getElementById('vehiclesInUse').textContent = vehiclesInUse;
            document.getElementById('securityDevicesActive').textContent = securityDevicesActive;

            const upcomingMaintenanceList = document.getElementById('upcomingMaintenance');
            upcomingMaintenanceList.innerHTML = '';

            const maintenanceResources = resources.filter(res => res.status === 'em_manutencao' && res.last_maintenance_date);

            if (maintenanceResources.length === 0) {
                upcomingMaintenanceList.innerHTML = '<li>Nenhuma manutenção agendada ou em andamento.</li>';
            } else {
                maintenanceResources.forEach(res => {
                    const li = document.createElement('li');
                    const maintenanceDate = res.last_maintenance_date ? new Date(res.last_maintenance_date).toLocaleDateString('pt-BR') : 'N/A';
                    li.textContent = `${res.name} (${res.type}) - Última Manutenção: ${maintenanceDate}`;
                    upcomingMaintenanceList.appendChild(li);
                });
            }

        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
            const dashboardMessageDiv = document.getElementById('dashboardMessage');
            if (dashboardMessageDiv) {
                showMessage(dashboardMessageDiv, `Erro ao carregar dados do dashboard: ${error.message}`, 'error');
            }
            document.getElementById('loginAttempts').textContent = 'Erro';
            document.getElementById('authorizedAccesses').textContent = 'Erro';
            document.getElementById('deniedAccesses').textContent = 'Erro';
            document.getElementById('equipmentInUse').textContent = 'Erro';
            document.getElementById('vehiclesInUse').textContent = 'Erro';
            document.getElementById('securityDevicesActive').textContent = 'Erro';
            document.getElementById('upcomingMaintenance').innerHTML = '<li>Erro ao carregar dados.</li>';
        }
    }

    async function loadResources() {
        const resourceTableBody = document.querySelector('#resourceTable tbody');
        if (!resourceTableBody) return; 

        resourceTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Carregando recursos...</td></tr>'; // Mensagem de carregamento

        try {
            const response = await fetch('https://industrias-wayne-api.onrender.com/api/resources', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 403) {
                    resourceTableBody.innerHTML = '<tr><td colspan="5">Você não tem permissão para visualizar recursos.</td></tr>';
                    showMessage(resourceMessageDiv, errorData.message, 'error');
                } else {
                    throw new Error(errorData.message || 'Erro ao buscar recursos.');
                }
                return;
            }

            const resources = await response.json();
            resourceTableBody.innerHTML = ''; 

            if (resources.length === 0) {
                resourceTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum recurso cadastrado.</td></tr>';
                return;
            }

            resources.forEach(resource => {
                const row = resourceTableBody.insertRow();
                row.innerHTML = `
                    <td>${resource.name}</td>
                    <td>${resource.type}</td>
                    <td>${resource.status}</td>
                    <td>${resource.location}</td>
                    <td class="action-buttons">
                        ${userRole !== 'funcionario' ? `<button class="edit-button" data-id="${resource.id}">Editar</button>` : ''}
                        ${userRole === 'admin_seguranca' ? `<button class="delete-button" data-id="${resource.id}">Excluir</button>` : ''}
                    </td>
                `;

                if (userRole !== 'funcionario') {
                    const editButton = row.querySelector('.edit-button');
                    if (editButton) {
                        editButton.addEventListener('click', () => editResource(resource));
                    }
                }
                if (userRole === 'admin_seguranca') {
                    const deleteButton = row.querySelector('.delete-button');
                    if (deleteButton) {
                        deleteButton.addEventListener('click', () => deleteResource(resource.id));
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao carregar recursos:', error);
            resourceTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Erro ao carregar recursos: ${error.message}.</td></tr>`;
            showMessage(resourceMessageDiv, `Erro ao carregar recursos: ${error.message}`, 'error');
        }
    }

    async function handleResourceSubmit(e) {
        e.preventDefault();

        const resourceId = document.getElementById('resourceId').value.trim();
        const name = document.getElementById('name').value.trim();
        const type = document.getElementById('type').value.trim();
        const serial_number = document.getElementById('serial_number').value.trim() || null;
        const plate = document.getElementById('plate').value.trim() || null;
        const location = document.getElementById('location').value.trim();
        const status = document.getElementById('status').value.trim();
        const acquisition_date = document.getElementById('acquisition_date').value.trim();
        const last_maintenance_date = document.getElementById('last_maintenance_date').value.trim() || null;

        if (!name || !type || !location || !status || !acquisition_date) {
            showMessage(resourceMessageDiv, 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        const resourceData = {
            name, type, serial_number, plate, location, status, acquisition_date, last_maintenance_date
        };

        const method = resourceId ? 'PUT' : 'POST';
        const url = resourceId ? `https://industrias-wayne-api.onrender.com/api/resources/${resourceId}` : 'https://industrias-wayne-api.onrender.com/api/resources';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(resourceData)
            });

            const data = await response.json();

            if (response.ok) {
                showMessage(resourceMessageDiv, data.message, 'success');
                resourceForm.reset();
                document.getElementById('resourceId').value = '';
                document.getElementById('saveResourceButton').textContent = 'Adicionar Recurso';
                loadResources();
            } else {
                showMessage(resourceMessageDiv, data.message || `Erro ao ${resourceId ? 'atualizar' : 'adicionar'} recurso.`, 'error');
            }
        } catch (error) {
            console.error('Erro na requisição de recurso:', error);
            showMessage(resourceMessageDiv, 'Erro de rede. Verifique sua conexão e tente novamente.', 'error');
        }
    }

    /**
        @param {Object} resource 
     */
    function editResource(resource) {
        document.getElementById('resourceId').value = resource.id;
        document.getElementById('name').value = resource.name;
        document.getElementById('type').value = resource.type;
        document.getElementById('serial_number').value = resource.serial_number || '';
        document.getElementById('plate').value = resource.plate || '';
        document.getElementById('location').value = resource.location;
        document.getElementById('status').value = resource.status;
        document.getElementById('acquisition_date').value = resource.acquisition_date ? resource.acquisition_date.split('T')[0] : '';
        document.getElementById('last_maintenance_date').value = resource.last_maintenance_date ? resource.last_maintenance_date.split('T')[0] : '';

        document.getElementById('saveResourceButton').textContent = 'Salvar Alterações';
        resourceForm.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }

    /**
        @param {number} id 
     */
    async function deleteResource(id) {
        if (!confirm('Tem certeza que deseja excluir este recurso? Esta ação é irreversível.')) {
            return;
        }
        try {
            const response = await fetch(`https://industrias-wayne-api.onrender.com/api/resources/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                showMessage(resourceMessageDiv, data.message, 'success');
                loadResources();
            } else {
                showMessage(resourceMessageDiv, data.message || 'Erro ao excluir recurso.', 'error');
            }
        } catch (error) {
            console.error('Erro ao excluir recurso:', error);
            showMessage(resourceMessageDiv, 'Erro de rede ao excluir recurso. Tente novamente.', 'error');
        }
    }
});