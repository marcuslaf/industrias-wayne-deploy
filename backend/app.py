from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db, init_db, User
from routes import api_bp
import bcrypt 

app = Flask(__name__)
app.config.from_object(Config)
CORS(app) 

init_db(app) 


@app.cli.command("create-initial-users")
def create_initial_users():
    
    with app.app_context():
        users_to_create = [
            {'username': 'admin', 'password': 'admin123', 'role': 'admin_seguranca', 'nome': 'Bruce Wayne', 'email': 'bruce.wayne@waynecorp.com'},
            {'username': 'gerente', 'password': 'gerente123', 'role': 'gerente', 'nome': 'Lucius Fox', 'email': 'lucius.fox@waynecorp.com'},
            {'username': 'funcionario', 'password': 'funcionario123', 'role': 'funcionario', 'nome': 'Alfred Pennyworth', 'email': 'alfred.pennyworth@waynecorp.com'}
        ]

        for user_data in users_to_create:
            if not User.query.filter_by(username=user_data['username']).first():
                new_user = User(
                    username=user_data['username'],
                    role=user_data['role'],
                    nome=user_data['nome'],
                    email=user_data['email']
                )
                new_user.set_password(user_data['password']) 
                db.session.add(new_user)
                print(f"Usuário '{user_data['username']}' criado.")
            else:
                print(f"Usuário '{user_data['username']}' já existe. Ignorando.")

        db.session.commit()
        print("Verificação/criação de usuários iniciais concluída.")


app.register_blueprint(api_bp)

@app.route('/')
def index():
    return "API das Indústrias Wayne funcionando com Flask!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)