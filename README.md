# Indústrias Wayne — Sistema de Gerenciamento

![Python](https://img.shields.io/badge/Python-3.9+-blue)
![Flask](https://img.shields.io/badge/Flask-2.3-black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black)

> API RESTful full stack para gerenciamento de recursos, usuários e controle de acesso — inspirada no universo das Indústrias Wayne.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Flask (Python) com JWT |
| Frontend | HTML, CSS, JavaScript puro |
| Banco | MySQL / MariaDB |
| Deploy | Vercel (backend serverless) |

## Funcionalidades

- Autenticação JWT com 3 perfis (Admin, Gerente, Funcionário)
- CRUD de recursos (equipamentos, veículos, dispositivos)
- Dashboard com visão geral do inventário
- Logs de acesso e controle por perfil
- Interface responsiva

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/login` | Autenticação |
| GET | `/api/users` | Listar usuários (admin) |
| GET | `/api/resources` | Listar recursos |
| POST | `/api/resources` | Criar recurso |
| PUT | `/api/resources/<id>` | Atualizar recurso |
| DELETE | `/api/resources/<id>` | Remover recurso |
| GET | `/api/access-logs` | Logs de acesso |

## Como rodar localmente

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

# 3. Configure .env (veja .env.example)
cp .env.example .env

# 4. Banco de dados
# Execute industrias_wayne.sql no MySQL Workbench ou XAMPP

# 5. Inicie
python app.py

# 6. Frontend
# Abra frontend/public/index.html no navegador
```

## Estrutura

```
industrias-wayne-deploy/
├── backend/
│   ├── app.py            # Aplicação principal
│   ├── config.py         # Configurações
│   ├── models.py         # Modelos SQLAlchemy
│   ├── routes.py         # Rotas da API
│   ├── auth.py           # Autenticação JWT
│   └── requirements.txt
├── frontend/public/
│   ├── index.html        # Login
│   ├── dashboard.html    # Dashboard
│   └── resources.html    # Gestão de recursos
├── industrias_wayne.sql  # Script do banco
└── README.md
```

## Credenciais de teste

| Perfil | Usuário | Senha |
|--------|---------|-------|
| Administrador | admin | admin123 |
| Gerente | gerente | gerente123 |
| Funcionário | funcionario | funcionario123 |
