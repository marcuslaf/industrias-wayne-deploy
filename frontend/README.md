---

## `README.md` (Pasta Frontend)

```markdown
# Frontend - Indústrias Wayne: Interface do Usuário

Este diretório contém o código-fonte da interface do usuário (frontend) para o sistema de gerenciamento da Indústrias Wayne. O frontend é desenvolvido utilizando tecnologias web padrão (HTML, CSS, JavaScript) e é responsável por consumir a API RESTful fornecida pelo backend em Flask.

---

## Tecnologias Utilizadas

* **HTML5**: Define a estrutura semântica e o conteúdo das páginas.
* **CSS3**: Responsável pelo estilo, layout e design responsivo da interface, garantindo uma boa experiência visual em diferentes dispositivos.
* **JavaScript (ES6+)**: Adiciona interatividade à aplicação, manipula o DOM (Document Object Model) e gerencia as requisições assíncronas para o backend (via `fetch API`) para autenticação e manipulação de dados.

---

## Como Executar o Frontend

Para que o frontend funcione corretamente, é **fundamental que o servidor backend esteja ativo e rodando** na porta `5000`. Certifique-se de ter configurado e iniciado o backend seguindo as instruções detalhadas no `README.md` principal do projeto (`industrias_wayne/README.md`).

Uma vez que o backend esteja funcionando:

1.  **Navegue até este diretório (`industrias_wayne/frontend/`)** no seu explorador de arquivos.
    * Exemplo de caminho: `C:\Users\<SeuUsuario>\Desktop\industrias_wayne\frontend\`
2.  **Abra o arquivo `index.html`** em seu navegador web preferido (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.). Você pode simplesmente dar um clique duplo no arquivo.

O navegador carregará a página de login e tentará se conectar automaticamente ao backend que está rodando em `http://localhost:5000`.

---

## Ponto de Conexão com o Backend

Todas as requisições para a API do backend são direcionadas para `http://localhost:5000/api/...`. As configurações de URL são definidas nos arquivos JavaScript (`auth.js` e `script.js`). Se a porta ou o endereço IP do backend for alterado no futuro, estas URLs precisarão ser atualizadas nos arquivos JavaScript correspondentes no frontend.

---

## Estrutura dos Arquivos Principais

* `index.html`: O arquivo HTML principal que define a estrutura da página de login e as interfaces para as funcionalidades do sistema.
* `styles.css`: Contém todas as regras de estilo CSS aplicadas à interface do usuário.
* `script.js`: Implementa a lógica JavaScript geral para manipulação do DOM, navegação entre telas e interações do usuário.
* `auth.js`: Contém as funções JavaScript específicas para lidar com a autenticação de usuários (login), enviando requisições para os endpoints de autenticação do backend e gerenciando os tokens JWT.

---

## Solução de Problemas Específicos do Frontend

* **"Erro de rede" ou `net::ERR_CONNECTION_REFUSED`**: Esta mensagem no navegador indica que o frontend não conseguiu estabelecer uma conexão com o servidor Flask (backend). Verifique se o backend está ativo e rodando sem erros no terminal.
* **"Credenciais inválidas. Verifique seu nome de usuário e senha."**: Esta mensagem é retornada pelo backend quando ele consegue receber a requisição de login, mas a combinação de usuário/senha fornecida não corresponde a um registro válido no banco de dados. Certifique-se de que os usuários padrão foram criados corretamente via `python -m flask create-initial-users` e que você está usando as credenciais corretas.

---