### api de auth login + protected routes

## iniciar server con:
 `npm run dev`

 `npm start`

POST
http://localhost:3004/api/v1/user/register/
{
    "name": "",
    "email": "",
    "password": ""
}

POST
http://localhost:3004/api/v1/user/login/
{
    "email": "",
    "password": ""
}

GET
http://localhost:3004/api/v1/admin

Header: {"auth-token":"TOKEN"}
