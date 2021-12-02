# practical-test

### Versions
1. React JS: 17.0.2 
2. Express JS: 4.17.1 
3. Node Version: 16.5.0

This test has been performed in React(Frontend) and Express/Node(Backend).

There are two folders.

1. client (Frontend)
2. server (Backend)

After successfully clone please move to `practical_test` branch.

Find client folder and perform `npm install`.

Find server folder and perform `npm install`.

### Database

Mysql has been used as database. 
Create database with name `form_builder`.
You need to import database which is located in `/server/database` folder.
You need to change the database credentials in `/server/.env` file.

### Run Project
Go to client and perform `npm start`.
Go to server and perform `npm start`.

React will be run on 3000 port and node will be run on 7000 port.
If you want to change the port for node change `PORT` in `/server/env` file and you need to make change in `REACT_APP_BASEURL` param which is located at `/client/.env`
