import users.data_access as db
from web_errors import WebError
# from language_strings.language_string import LanguageString

import bcrypt


class User:
    def __init__(self, id, name, role, email, longitude, latitude, hashed_password, verified, isAdmin):
        self.id = id
        self.name = name
        self.role = role
        self.email = email
        # self.location = location
        self.longitude = longitude
        self.latitude = latitude
        self.verified = verified,
        self.isAdmin = isAdmin,
        self.hashed_password = hashed_password

    @classmethod
    def authenticate(cls, email, password):
        user = cls.from_db_row(db.user_data_by_email(email))
        if not bcrypt.checkpw(password.encode(), user.hashed_password):
            raise WebError("password incorrect", status_code=401)
        else:
            return user


    @classmethod
    def from_id(cls, user_id):
        return cls.from_db_row(db.user_data_by_id(user_id))

    @classmethod
    def from_db_row(cls, db_row):
        id, name, role, email, longitude, latitude, hashed_password, verified, isAdmin = db_row
        # return cls(id, LanguageString.from_id(name), role, email, hashed_password.encode())
        return cls(id, name, role, email, longitude, latitude, hashed_password.encode(), verified, isAdmin)

    def reset_password(self, new_password):
        db.update_password(self.id, new_password)

    def logout(id):
        db.invalidate_all_tokens(id)

    def to_dict(self):
        return {
            "id": self.id,
            # "name": self.name.to_dict(),
            "name": self.name,
            "role": self.role,
            "email": self.email,
            "clinic_id": self.longitude,
        }

    def create_token(id):
        return db.create_token(id)
    
    def add_user(user):
        # user = {name: name, role: role, email: email, location: location, password: password}
        return db.add_user(user)
    def check_user_by_name(name):
        return db.check_user_by_name(name)
    def update_user(user, password=None):
        return db.update_user(user, password)
    def check_user(email):
        return db.check_user(email)
    def check_token(token):
        token = db.user_id_by_token(token)
        # print(token)
        return token
    def search_term(user, searchTerm):
        medicine = db.search_location(user.latitude, user.longitude, searchTerm)
        return medicine
    def get_user():
        users = db.get_user()
        return users
    def update_user_verified(id, verified):
        db.update_user_by_id(id, verified)
        return True
    def get_medicine(user):
        medicines = db.get_medicine_by_pharmacy_id(user)
        return medicines
    def add_medicine(user, totalnumber, price, medicine):
        medicine1 = db.add_medicine_by_pharmacy_id(user, totalnumber, price, medicine)
        return medicine1
    
    def delete_medicine(medicine_id):
        db.delete_medicine_by_id(medicine_id)
        return True
    def update_medicine(user_id, totalnumber, price, medicine_id):
        db.update_medicine_by_id(user_id, totalnumber, price, medicine_id)
        return True
    def add_save(email, medicine_name, pharmacy_name, latitude, longitude):
        db.add_save(email, medicine_name, pharmacy_name, latitude, longitude)
        return True
    def get_save(email):
        saved = db.get_save_by_email(email)
        return saved
