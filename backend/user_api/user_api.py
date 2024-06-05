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
        # 'location': params['location'],
        'longitude': params['longitude'],
        'latitude': params['latitude'],
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
    final = {'id': user.id, 'name': user.name, 'role': user.role, 'latitude': user.latitude, 'longitude': user.longitude, 'email': user.email, 'token': token, 'verified': verified, 'isAdmin': isAdmin}

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
            'longitude': params['longitude'],
            'latitude': params['latitude'],
            # 'location': params['location'],
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

@user_api.route('/user/updateLocation', methods=['POST'])
def syncUpdateLocation():
    params = assert_data_has_keys(request, {'token'})
    token = User.check_token(params['token'])
    user = User.from_id(token)
    new = {
            'id': user.id,
            'name': params['name'],
            'longitude': params['longitude'],
            'latitude': params['latitude'],
            # 'location': params['location'],
            'hashed_password': user.hashed_password
        }
    User.update_user(new)
    user = User.from_id(token)
    final = {'id': user.id, 'name': user.name, 'role': user.role, 'latitude': user.latitude, 'longitude': user.longitude, 'email': user.email, 'token': params['token'], 'verified': user.verified, 'isAdmin': user.isAdmin}
    return jsonify({'message': final})

@user_api.route('/medicine/search', methods=['POST'])
def syncSearch():
    params = assert_data_has_keys(request, {'token', 'searchTerm'})
    token = User.check_token(params['token'])
    user = User.from_id(token)
    medicine = User.search_term(user, params['searchTerm'])
    return jsonify(medicine)
    
@user_api.route('/medicine/getmedicine', methods=['POST'])
def syncMedicine():
    params = assert_data_has_keys(request, {'token'})
    token = User.check_token(params['token'])
    # print(token)
    medicines = User.get_medicine(token)
    # print(medicines)
    return jsonify(medicines)

@user_api.route('/medicine/addmedicine', methods=['POST'])
def syncAddMedicine():
    params = assert_data_has_keys(request, {'token'})
    token = User.check_token(params['token'])
    user = User.from_id(token)
    if (user.role == 'pharmacy'):
        medicine = User.add_medicine(user, params['totalnumber'], params['price'], params['medicine'])
        return jsonify({'message': medicine})
    else: 
        return jsonify({'message': 'you are not allowed to add medicine'})
    

@user_api.route('/medicine/deletemedicine/<int:medicine_id>/<string:token>', methods=['DELETE'])
def syncDeleteMedicine(medicine_id, token):
    if medicine_id and token:
        user_id = User.check_token(token)
        # print(user_id)
        if user_id:
            # print(medicine_id)
            User.delete_medicine(medicine_id)
            return jsonify({'message': 'medicine deleted successfully'})
        else:
            return jsonify({'message': 'you are not allowed to delete'})
    else:
        return jsonify({'message': 'fill the parameters correctelly'})
@user_api.route('/medicine/updatemedicine', methods=['POST'])
def syncUpdateMedicine():
    params = assert_data_has_keys(request, {'token', 'totalnumber', 'price', 'medicine_id'})
    user_id = User.check_token(params['token'])
    valid = User.update_medicine(user_id, params['totalnumber'], params['price'], params['medicine_id'])
    if valid == True:
        return jsonify({'message': 'successfully updated'})
    else:
        return jsonify({'message': 'something wrong try again'})
@user_api.route('/save/addSave', methods=['POST'])
def syncAddSave():
    params = assert_data_has_keys(request, {'token', 'email', 'medicine_name', 'pharmacy_name', 'latitude', 'longitude'})
    user_id = User.check_token(params['token'])
    user = User.from_id(user_id)
    if user.role == 'user':
        add = User.add_save(params['email'], params['medicine_name'], params['pharmacy_name'], params['latitude'], params['longitude'])
        if add == True:
            return jsonify({'message': 'successfully added'})
        else: 
            return jsonify({'message': 'something wrong try again'})
    return jsonify({'message': 'you aren\'t allowed to add'})
@user_api.route('/save/getSave', methods=['POST'])
def syncgetSave():
    params = assert_data_has_keys(request, {'token', 'email'})
    user_id = User.check_token(params['token'])
    user = User.from_id(user_id)
    if user.role == 'pharmacy':
        saved = User.get_save(params['email'])
        return jsonify(saved)
        
    return jsonify({'message': 'you aren\'t allowed to get'})












    





