# MedLocator
MedLocator is your go-to solution for finding the nearest pharmacies that stock the medicine you need. Our easy-to-use platform ensures that you get the right medicine at the right time without any hassle.
# Get started locally:

Clone the project

```bash
  git clone git@github.com:jo-learning/MedLocator.git
```

Go to the project directory

```bash
  cd MedLocator
```
### For FrontEnd

Go to the project frontend
```bash
  cd frontend
```
Install dependencies

```bash
  npm install
```
start frontend

```bash
  npm run dev
```


### For Backend

```bash
  cd backend
```
Create a new virtual environment to avoid conflicts and global polution of your system

```bash
  python3 -m venv /path/to/new/virtual/environment
```

Activate your virtual environment

```bash
  source <venv>/bin/activate

  # if windows use the following:
  # <venv>\Scripts\activate.bat
```

Install the requirements from the the `requirements.txt` file

```bash
  pip3 install -r requirements.txt
```

Start the server
```bash
  python app.py
```


## Architecture

### APIs and Methods
1. Authentication:
POST /api/auth/register: Register a new user or pharmacy.
POST /api/auth/login: Authenticate user or pharmacy and return a JWT.
POST /api/auth/logout: Invalidate the current session.
2. User Management:
GET /api/users/profile: Get user profile details.
PUT /api/users/profile: Update user profile details.
DELETE /api/users/profile: Delete user account.
3. Pharmacy Management:
GET /api/pharmacies: Get a list of all pharmacies.
GET /api/pharmacies/:id: Get details of a specific pharmacy.
PUT /api/pharmacies/:id: Update pharmacy details.
DELETE /api/pharmacies/:id: Delete a pharmacy.
4. Medicine Management:
GET /api/medicines: Get a list of all medicines.
GET /api/medicines/:id: Get details of a specific medicine.
POST /api/medicines: Add a new medicine.
PUT /api/medicines/:id: Update medicine details.
DELETE /api/medicines/:id: Delete a medicine.
5. Pharmacy Inventory:
GET /api/pharmacies/:id/inventory: Get the inventory of a specific pharmacy.
POST /api/pharmacies/:id/inventory: Add a medicine to the pharmacy's inventory.
PUT /api/pharmacies/:id/inventory/:medicineId: Update inventory details for a specific medicine.
DELETE /api/pharmacies/:id/inventory/:medicineId: Remove a medicine from the pharmacy's inventory.
6. Medicine Search:
GET /api/search: Search for a medicine in nearby pharmacies based on user location.
Query Parameters: medicineName, latitude, longitude

### Data Model
1. User:
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "role": "string" // "user" or "pharmacy"
}
2. Pharmacy:
{
  "id": "string",
  "name": "string",
  "address": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "contact": {
    "phone": "string",
    "email": "string"
  },
  "inventory": [
    {
      "medicineId": "string",
      "quantity": "number",
      "price": "number"
    }
  ]
}
3. Medicine:
{
  "id": "string",
  "name": "string",
  "description": "string",
  "brand": "string"
}
4. Authentication Token:
{
  "token": "string",
  "userId": "string",
  "expiry": "date"
}
#### Example API Usage
Register a new user:
bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "location": {
    "latitude": 40.712776,
    "longitude": -74.005974
  },
  "role": "user"
}


Login:
bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}


Search for a medicine:
bash
GET /api/search?medicineName=aspirin&latitude=40.712776&longitude=-74.005974


Add medicine to pharmacy inventory:
bash
POST /api/pharmacies/123/inventory
{
  "medicineId": "456",
  "quantity": 100,
  "price": 9.99
}


