Setting up the project locally:
1) Clone the repository in your working directory
2) Open it in VS code
3) npm install to install the dependencies
4) npm start to start the server 
5) Navigate to your browser at localhost:3000
6) Need to install redis server locally and start it

REDIS_URI="redis://localhost:6379"

MONGO_URI=mongodb+srv://user1:<password>@cluster0.3zi2wrx.mongodb.net/databaseM?retryWrites=true&w=majority&appName=Cluster0

port = 3000



API Endpoints:

URL= localhost:3000/api/v1

GET
Get All Medicines

{{URL}}/medicines

Sort

{{URL}}/medicines?sort=name,-price

Search

{{URL}}/medicines?name=te

Filter

{{URL}}/medicines?numericFilters=price>30


POST

Create Medicine

{{URL}}/medicines
﻿

Body

raw (json)

json

{
    "name": "test3",
    "price":400,
    "discountPrice":300,
    "quantity": 4,
    "manufacturer": "abcd"


}


GET

Get Medicine

{{URL}}/medicines/66a3a11a4e164cc61f5f85ee
﻿


PATCH

Update Medicine

{{URL}}/medicines/66a3a11a4e164cc61f5f85ee
﻿

Body

raw (json)

json

{
    "name":"neww",
    "price":1000
}

DELETE

Delete Medicine

{{URL}}/medicines/66a3a11a4e164cc61f5f85ee
   
