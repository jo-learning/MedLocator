from flask import Blueprint, request, jsonify
from web_util import assert_data_has_keys
from users.user import User
import json

user_api = Blueprint('users_api', __name__, url_prefix='/api')


@user_api.route('/auth/register', methods=['POST'])
def sync():
    params = assert_data_has_keys(request, {'email', 'password'})
    # user = User.authenticate(params['email'], params['password'])
    
    user = {
        'name' : params['name'],
        'role' : params['role'],
        'email': params['email'],
        'location': params['location'],
        'password': params['password']
    }
    
    email = User.check_user(params['email'])
    print(email)
    if email:
        return jsonify({'message': 'email allready registed'})
    User.add_user(user)
    return jsonify({'message': 'OK'})


@user_api.route('/auth/login', methods=['POST'])
def sync1():
    params = assert_data_has_keys(request, {'email', 'password'})
    user = User.authenticate(params['email'], params['password'])
    if user.verified[0] == 1:
        verified = True
    else:
        verified = False
    if user.isAdmin[0] == 1:
        isAdmin = True
    else:
        isAdmin = False
    token = User.create_token(user.id)
    final = {'id': user.id, 'name': user.name, 'role': user.role, 'location': user.location, 'email': user.email, 'token': token, 'verified': verified, 'isAdmin': isAdmin}

    return jsonify({'message': final})

@user_api.route('/auth/logout', methods=['POST'])
def sync2():
    User.logout()

@user_api.route('/user/profile', methods=['POST'])
def syncprofileget():
    params = assert_data_has_keys(request, {'token'})
    print(params['user_token'])
    token = User.check_token(params['token'])
    user = User.from_id(token)
    return jsonify({'message': user.email})
    # if token:
    #     user = User.

@user_api.route('/user/profile', methods=['PUT'])
def syncprofileput():
    params = assert_data_has_keys(request, {'token'})
    print(params['user_token'])
    token = User.check_token(params['token'])
    user = User.from_id(token)
    if user and params['location'] and params['name']:
        new = {
            'id': user.id,
            'name': params['name'],
            'location': params['location'],
            'hashed_password': user.hashed_password
        }
        password = None
        if 'password' in params:
            password = params['password']
        User.update_user(new, password)
        return jsonify({'message': 'updated successfully'})
    return jsonify({'message': 'some params are missing'})

@user_api.route('/user/logout', methods=['POST'])
def synclogout():
    params = assert_data_has_keys(request, {'token'})
    token = User.check_token(params['token'])
    User.logout(token)
    return jsonify({'message': 'user logout successfully'})



