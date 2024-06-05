from db_util import get_connection
from web_errors import WebError
import bcrypt
# from language_strings.data_access import update_language_string
# from language_strings.language_string import LanguageString
from datetime import datetime, timedelta
import uuid


def user_data_by_email(email):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT id, name, role, email, longitude, latitude,  hashed_password, verified, isAdmin FROM users WHERE email = %s',
                        [email])
            row = cur.fetchone()
            if not row:
                raise WebError("email not found", status_code=404)
            return row


def user_data_by_id(user_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT id, name, role, email,longitude, latitude,  hashed_password, verified, isAdmin FROM users WHERE id = %s',
                        [user_id])
            row = cur.fetchone()
            if not row:
                raise WebError("id not found", status_code=404)
            return row


# def user_name_by_id(user_id):
#     with get_connection() as conn:
#         with conn.cursor() as cur:
#             cur.execute('SELECT name FROM users WHERE id = %s',
#                         [user_id])
#             row = cur.fetchone()
#             if not row:
#                 return None
#             return LanguageString.from_id(row)


def update_password(user_id, new_password):
    with get_connection() as conn:
        with conn.cursor() as cur:
            new_password_hashed = bcrypt.hashpw(
                new_password.encode(), bcrypt.gensalt()).decode()
            cur.execute('UPDATE users SET hashed_password = %s WHERE id = %s',
                        [new_password_hashed, user_id])

def update_user(user, new_password=None):
    with get_connection() as conn:
        with conn.cursor() as cur:
            if new_password:
                new_password_hashed = bcrypt.hashpw(
                new_password.encode(), bcrypt.gensalt()).decode()
                user['hashed_password'] = new_password_hashed
            
            cur.execute('UPDATE users SET hashed_password = %s, name = %s, longitude = %s, latitude = %s WHERE id = %s',
                        [user['hashed_password'], user['name'], user['longitude'], user['latitude'], user['id']])
            conn.commit()

def add_user(user):
    # update_language_string(user.name)
    with get_connection() as conn:
        with conn.cursor() as cur:
            password = user['password']
            hashed_password = bcrypt.hashpw(
                password.encode(), bcrypt.gensalt()).decode()
            query = '''
            INSERT INTO users (name, role, email, longitude, latitude,  hashed_password) VALUES ( %s, %s,%s, %s, %s, %s);
            '''
            # cur.execute(query, [user.id, user.name.id, user.role, user.email, user.hashed_password, datetime.now()])
            cur.execute(query, [user['name'],user['role'],user['email'],user['longitude'], user['latitude'], hashed_password])
            conn.commit()
            return user
        
def check_user(email):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT email FROM users WHERE email = %s', [email])
            row = cur.fetchone()
            return row


def create_token(user_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            token = str(uuid.uuid4())
            current_date = datetime.today().date() + timedelta(days=1)
            cur.execute('INSERT INTO tokens (user_id, token, expiry_date) VALUES (%s, %s, %s)', [
                        user_id, token, current_date])
            conn.commit()   
            return token

def user_id_by_token(token):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                'SELECT user_id, expiry_date FROM tokens WHERE token = %s', [token])
            result = cur.fetchall()
            if result:
                token = result[len(result) - 1]
                expiry_date = token[1]
                current_date = datetime.today().date()
                if expiry_date > current_date:
                    return token[0]

            else:
                return None

def invalidate_all_tokens(user_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('DELETE FROM tokens WHERE user_id = %s', [user_id])
            conn.commit()


# def user_id_by_token(token):
#     with get_connection() as conn:
#         with conn.cursor() as cur:
#             cur.execute(
#                 'SELECT user_id FROM tokens WHERE token = %s AND expiry > now()', [token])
#             result = cur.fetchone()
#             if result:
#                 return result[0]
#             else:
#                 return None


def all_user_data():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                'SELECT id, name, role, email,  hashed_password FROM users ORDER BY name', [])
            yield from cur


def delete_user_by_id(user_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('DELETE FROM users WHERE id = %s', [user_id])

def search_location( latitude, longitude, searchTerm):
    print(latitude)
    print(longitude)
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT m.name, ph.latitude AS latitude, ph.longitude AS longitude, ph.verified,(6371 * acos(cos(radians(%s)) * cos(radians(latitude)) * cos(radians(longitude) - radians(%s)) + sin(radians(%s)) * sin(radians(latitude)))) AS distance, ph.name FROM medicines AS med JOIN users AS ph ON med.pharmacy_id = ph.id JOIN medicine AS m ON med.medicine_id = m.id WHERE m.name REGEXP %s ORDER BY distance', [latitude, longitude, latitude, searchTerm])
            results = cur.fetchall()
            return results

def get_medicine_by_pharmacy_id(pharmacy_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT med.id, m.name, med.totalnumber, med.price FROM medicines AS med JOIN medicine AS m ON med.medicine_id = m.id WHERE med.pharmacy_id = %s ', [pharmacy_id])
            results = cur.fetchall()
            return results

def add_medicine_by_pharmacy_id(user, totalnumber, price, medicine):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT id FROM medicine WHERE name = %s', [medicine])
            result = cur.fetchone()
            if result is None:
                raise ValueError("Medicine not found")

            medicine_id = result[0]
            cur.execute('INSERT INTO medicines (pharmacy_id, medicine_id, totalnumber, price) VALUES (%s, %s, %s, %s)', [user.id, medicine_id, totalnumber, price])
            conn.commit()
            return medicine

def delete_medicine_by_id(medicine_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('DELETE FROM medicines WHERE id = %s', [medicine_id])
            conn.commit()

def update_medicine_by_id(user_id, totalnumber, price, medicine_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('UPDATE medicines SET totalnumber = %s, price = %s WHERE pharmacy_id = %s AND id = %s', [totalnumber, price, user_id, medicine_id])
            conn.commit()
def add_save(email, medicine_name, pharmacy_name, latitude, longitude):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('INSERT INTO requestmedicine (email, medicine_name, pharmacy_name, latitude, longitude) VALUE (%s, %s, %s, %s, %s)', [email, medicine_name, pharmacy_name, latitude, longitude])
            conn.commit()
def get_save_by_email(email):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT medicine_name, pharmacy_name, latitude, longitude FROM requestmedicine WHERE email = %s', [email])
            results = cur.fetchall()
            return results