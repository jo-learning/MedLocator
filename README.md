# MedLocator
# MedLocator MVP specification:
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


