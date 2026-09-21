# Industrias Wayne - Sistema de Gerenciamento / Wayne Industries - Management System

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge)
![Flask](https://img.shields.io/badge/Flask-2.3-black?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black?style=for-the-badge)

> API RESTful full stack para gerenciamento de recursos, usuarios e controle de acesso - inspirada no universo das Industrias Wayne.
> Full stack RESTful API for resource, user, and access control management - inspired by the Wayne Industries universe.

---

## Funcionalidades / Features

| Funcionalidade / Feature | Descricao / Description |
|--------------------------|------------------------|
| Autenticacao JWT / JWT Authentication | 3 perfis (Admin, Gerente, Funcionario) / 3 roles (Admin, Manager, Employee) |
| CRUD de recursos / Resource CRUD | Equipamentos, veiculos, dispositivos / Equipment, vehicles, devices |
| Dashboard | Visao geral do inventario / Inventory overview |
| Logs de acesso / Access logs | Controle por perfil / Role-based control |
| Interface responsiva / Responsive interface | HTML, CSS, JavaScript puro / Vanilla JS |

---

## Stack Tecnologica / Tech Stack

| Camada / Layer | Tecnologia / Technology |
|----------------|------------------------|
| Backend | Flask (Python) com JWT / with JWT |
| Frontend | HTML, CSS, JavaScript puro / Vanilla JS |
| Banco / Database | MySQL / MariaDB |
| Deploy | Vercel (backend serverless) |

---

## Rotas da API / API Routes

| Metodo / Method | Rota / Route | Descricao / Description |
|-----------------|-------------|------------------------|
| POST | /api/login | Autenticacao / Authentication |
| GET | /api/users | Listar usuarios (admin) / List users (admin) |
| GET | /api/resources | Listar recursos / List resources |
| POST | /api/resources | Criar recurso / Create resource |
| PUT | /api/resources/{id} | Atualizar recurso / Update resource |
| DELETE | /api/resources/{id} | Remover recurso / Delete resource |
| GET | /api/access-logs | Logs de acesso / Access logs |

---

## Como Rodar Localmente / How to Run Locally

```bash
# 1. Clone
git clone https://github.com/marcuslaf/industrias-wayne-deploy.git
cd industrias-wayne-deploy

# 2. Backend
cd backend
python -m venv myenv
source myenv/bin/activate  # Linux/macOS
# .\myenv\Scripts\activate  # Windows
pip install -r requirements.txt

# 3. Configure .env (veja .env.example / see .env.example)
cp .env.example .env

# 4. Banco de dados / Database
# Execute industrias_wayne.sql no MySQL Workbench ou XAMPP
# Execute industrias_wayne.sql in MySQL Workbench or XAMPP

# 5. Inicie / Start
python app.py

# 6. Frontend
# Abra frontend/public/index.html no navegador / Open in browser
```

---

## Estrutura / Structure

```
industrias-wayne-deploy/
  backend/
    app.py            # Aplicacao principal / Main application
    config.py         # Configuracoes / Configuration
    models.py         # Modelos SQLAlchemy / SQLAlchemy models
    routes.py         # Rotas da API / API routes
    auth.py           # Autenticacao JWT / JWT authentication
    requirements.txt
  frontend/public/
    index.html        # Login
    dashboard.html    # Dashboard
    resources.html    # Gestao de recursos / Resource management
  industrias_wayne.sql  # Script do banco / Database script
  README.md
```

---

## Credenciais de Teste / Test Credentials

| Perfil / Role | Usuario / Username | Senha / Password |
|---------------|-------------------|-------------------|
| Administrador / Admin | admin | admin123 |
| Gerente / Manager | gerente | gerente123 |
| Funcionario / Employee | funcionario | funcionario123 |

---

## Contato / Contact

**Marcus Lafaiete** - [GitHub](https://github.com/marcuslaf) | [LinkedIn](https://www.linkedin.com/in/marcuslaf)
