Node/Express/MySQL web application for True Legacy Homes (Estate Sales)
Created 8/8/2021
====================================================================
====================================================================

npm init -y  
npm i --save-dev nodemon  
npm i express, mysql (no need for body-parser with express 4.16 or greater)  
npm i dotenv to use .env  
npm i bcrypt for password hashing  

====================================================================

be sure to add .env and nodemodules/ to the .gitignore file

====================================================================

service -> controller -> router  

====================================================================

.env file with:

PORT=  
DB_PORT=  
DB_HOST=  
DB_USER=  
DB_PASS=  
DB_NAME=  
AUTH0_SECRET=  
AUTH0_BASEURL=  
AUTH0_CLIENTID=  
AUTH0_ISSUERBASEURL=  
