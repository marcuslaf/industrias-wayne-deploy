from functools import wraps

import jwt
from flask import current_app, jsonify, request
from models import User, db


def token_required(roles=None):
    if roles is None:
        roles = []
    if isinstance(roles, str):
        roles = [roles]

    def wrapper(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            token = None
            if 'Authorization' in request.headers:
                auth_header = request.headers['Authorization']
                if auth_header.startswith('Bearer '):
                    token = auth_header.split(" ")[1]

            if not token:
                return jsonify({'message': 'Acesso negado. Token de autenticação não fornecido.'}), 401
            try:
                data = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
                current_user = db.session.get(User, data['id'])
                if current_user is None:
                    return jsonify({'message': 'Token inválido: Usuário associado ao token não encontrado.'}), 401

                if roles and current_user.role not in roles:
                    return jsonify({'message': 'Acesso negado. Você não tem permissão para esta ação.'}), 403

                request.current_user = current_user
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token expirado. Por favor, faça login novamente.'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Token inválido. Acesso não autorizado.'}), 400
            except Exception as e:  # noqa: BLE001 - catch-all intencional: mantém resposta JSON 500 em vez de erro HTML do Flask
                current_app.logger.error(f"Erro inesperado na validação do token: {e}")
                return jsonify({'message': f'Erro interno do servidor durante a autenticação: {e!s}'}), 500

            return fn(*args, **kwargs)
        return decorated
    return wrapper