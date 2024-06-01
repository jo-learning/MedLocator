from flask import Blueprint, request, jsonify
from web_util import assert_data_has_keys
from medicine.medicine import Medicine

medicine_api = Blueprint('medicine_api', __name__, url_prefix='/api/medicine')


@medicine_api.route('/create', methods=['POST'])
def sync():
    params = assert_data_has_keys(request, {'user_token'})
    print(params['user_token'])
    token = Medicine.check_token(params['user_token'])
    # user = User.authenticate(params['email'], params['password'])
    if token:
        medicine = {
        'name' : params['name'],
        'medicine_id' : params['medicine_id'],
        'total': params['total'],
        'pharmacy_id': token
    }
        Medicine.add_medicine(medicine)
        return jsonify({'message': 'OK'})
    

@medicine_api.route('/medicine', methods=['GET'])
def syncget():
    result = Medicine.get_medicine()
    print(result)
    return jsonify({'message': result})
    
    
