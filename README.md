## **Setting up the project locally:**
1) Clone the repository in your working directory
2) Open it in VS code
3) npm install to install the dependencies
4) npm start to start the server 
5) Navigate to your browser at localhost:3000
6) Need to install redis server locally and start it

## Important Variables
- **REDIS_URI** ="redis://localhost:6379"

- **MONGO_URI**=mongodb+srv://user1:<password>@cluster0.3zi2wrx.mongodb.net/databaseM?retryWrites=true&w=majority&appName=Cluster0

- **port** = 3000


## Base URL

### localhost:3000/api/v1

## Endpoints

### **1. Get All Medicines**

- ###  **URL:** {{URL}}/medicines
- ### **Method:** GET
- ### **Description:** Retrieves a list of all medicines.
- ### **Query Parameters:**
  - #### **sort**: Sort by fields, e.g., name,-price
     - #### Example Usage: Get All Medicines with Sorting:
       ```
        GET {{URL}}/medicines?sort=name,-price
  - #### **name**: Search by name
    - #### Example Usage: Search Medicines by Name:
       ```
       GET {{URL}}/medicines?name=te 
  - #### **numericFilters**: Filter by numeric fields, e.g., price>30
    - #### Example Usage: Filter Medicines by Price:
       ```
       GET {{URL}}/medicines?numericFilters=price>30 
    
### **2. Create Medicine**
- ### **URL:** {{URL}}/medicines
- ### **Method:** POST
- ### **Description:** Creates a new medicine.
- ### **Body:**
>json
```
{
  "name": "test3",
  "price": 400,
  "discountPrice": 300,
  "quantity": 4,
  "manufacturer": "abcd"
}
```
### **3. Get Medicine**
- ### **URL:** {{URL}}/medicines/:id
   - #### Example Usage:
     ```
     {{URL}}/medicines/66a3a11a4e164cc61f5f85ee 
- ### **Method:** GET
- ### **Description:** Retrieves details of a specific medicine by ID.
### **4. Update Medicine**
- ### **URL:** {{URL}}/medicines/:id
  - #### Example Usage:
     ```
     {{URL}}/medicines/66a3a11a4e164cc61f5f85ee 
- ### **Method:** PATCH
- ### **Description:** Updates a specific medicine by ID.
- ### **Body:**
>json
```
{
  "name": "neww",
  "price": 1000
}
```
### **5. Delete Medicine**
- ### **URL:** {{URL}}/medicines/:id
  - #### Example Usage:
     ```
     {{URL}}/medicines/66a3a11a4e164cc61f5f85ee 
- ### **Method:** DELETE
- ### **Description:** Deletes a specific medicine by ID.








   
