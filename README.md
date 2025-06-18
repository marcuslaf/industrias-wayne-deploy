## Sistema de Gerenciamento de Recursos e Usuários - Indústrias Wayne

---

### Visão Geral

```

Este é um sistema completo de gerenciamento de recursos e usuários desenvolvido para a Indústrias Wayne, composto por:

Backend: API RESTful em Flask (Python)
Frontend: Interface em JavaScript puro (HTML, CSS)
Banco de Dados: MySQL/MariaDB

```

---

#### Pré-requisitos

```

Antes de começar, certifique-se de ter instalado:
Python 3.9+
Git
XAMPP (com MySQL/MariaDB ativo)
MySQL Workbench (opcional)

```

---

#### Configuração Rápida
#### 1 Clonar o repositório

```
bash 

git clone <URL_DO_REPOSITORIO>
cd industrias_wayne

```

---

#### 2 Configurar o Backend

```

bash

cd backend
python -m venv myenv
# Ativar o ambiente virtual:
# Windows: .\myenv\Scripts\activate
# Linux/macOS: source myenv/bin/activate
pip install -r requirements.txt

```

#### Crie um arquivo .env na pasta backend com o conteúdo:


```

env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB=industrias_wayne
JWT_SECRET_KEY=sua_chave_secreta_aleatoria

```

#### 3. Configurar o Banco de Dados

```
Inicie o MySQL no XAMPP
Execute o script database.sql no MySQL Workbench
Crie os usuários iniciais:

```

```

bash
python -m flask create-initial-users

```

#### 4. Iniciar o servidor

```

bash
python app.py

```

#### 5. Acessar o Frontend

```

Abra o arquivo frontend/index.html no navegador.

Credenciais Padrão

Perfil	            Usuário	        Senha

Administrador	    admin	        admin123
Gerente 	        gerente	        gerente123
Funcionário 	    funcionario	    funcionario123

```

#### Estrutura do Projeto

```
industrias_wayne/
├── backend/
│   ├── app.py                # Aplicação principal
│   ├── models.py             # Modelos de dados
│   ├── routes.py             # Rotas da API
│   ├── auth.py               # Autenticação
│   └── requirements.txt      # Dependências
├── frontend/
│   ├── public/
│   │   ├── css/              # Estilos
│   │   ├── js/               # Lógica JavaScript
│   │   └── *.html            # Páginas
└── database.sql              # Script do banco

```

---

#### Solução de Problemas Comuns

```

Erro de conexão com o banco:

Verifique se o MySQL está rodando no XAMPP

Confira as credenciais no arquivo .env

Módulos Python não encontrados:

Certifique-se que o ambiente virtual está ativado

Execute pip install -r requirements.txt novamente

Problemas de autenticação:

Recrie os usuários com python -m flask create-initial-users

Verifique se o JWT_SECRET_KEY no .env está configurado

```

---

## Agradecimentos especiais ao meus Professores e Monitores

---

### Professores
#### Iago Maciel (HTML e CSS)
#### Mateus Faustino (JavaScript)
#### Luan Oliveira (JavaScript, Lógica de Programação e Python)
#### Diego Sampaio (Python)
---

### Monitores
#### Esron Linhares
#### Carlos Franch
#### Elisson Victor
#### Lucas Souza
#### Maria Beatriz

---

##### Graças a Deus e essas pessoas maravilhosas, meu aprendizado na Infinity School Fortaleza foi a esperiência mais proveitosa possível. Gratidão a todos vocês!