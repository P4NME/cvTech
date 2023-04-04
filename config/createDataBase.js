const mysql = require('mysql');
require('dotenv').config();
const session = require('express-session');
// https://github.com/users/linnnux/projects/23?pane=issue&itemId=24756533
const traceUtils = require('../utils/trace-utils.js');

function myDebug(msg)
{
  const debugInfo = traceUtils.getFileInfoFromStackTrace();
  console.log(`fileName : ${debugInfo.fileName}, Ligne : ${debugInfo.lineNumber} : ${msg} `);
}


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

 global.sessionInit = 0;

 myDebug('global global.sessionInit = '+global.sessionInit);

if(sessionInit == 0)
{
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // Create database if not exists
    con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, function(err, result) {
      if (err) throw err;
       myDebug('Database chat created or already exists');


      // Switch to the newly created database
      con.changeUser({database: process.env.DB_DATABASE}, function(err) {
        if (err) throw err;

        // Create users table if not exists
        const createUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
                                        id INT(11) NOT NULL AUTO_INCREMENT,
                                        username VARCHAR(255) NOT NULL,
                                        email VARCHAR(255) NOT NULL,
                                        password VARCHAR(255) NOT NULL,
                                        phone_number VARCHAR(20),
                                        postal_code VARCHAR(10),
                                        city VARCHAR(255),
                                        image_url VARCHAR(255),
                                        role_id INT(11),
                                        PRIMARY KEY (id)
                                      )`;
        const createProjectsTableQuery = `CREATE TABLE IF NOT EXISTS projects (
                                        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                        user_id INT(11) NOT NULL,
                                        title VARCHAR(255) NOT NULL,
                                        client_name VARCHAR(255) NOT NULL,
                                        start_date DATE NOT NULL,
                                        end_date DATE,
                                        stack_technologies VARCHAR(255),
                                        description TEXT,
                                        image_url VARCHAR(255)
                                    )`;
        const createRolesTableQuery = `CREATE TABLE IF NOT EXISTS roles (
                                          id INT(11) NOT NULL AUTO_INCREMENT,
                                          name VARCHAR(255) NOT NULL,
                                          PRIMARY KEY (id)
                                        )`;

        const insertRolesTableQuery = `INSERT INTO roles (name) VALUES
                                          ('Développeur Front-End'),
                                          ('Développeur Back-End'),
                                          ('Testeur'),
                                          ('Designeur'),
                                          ('Intégrateur')`;

        const insertUsersQuery = `INSERT INTO users (username, email, password, phone_number, postal_code, city, image_url, role_id )
VALUES
    ('jane doe', 'user1@example.com', 'password1', '1234567890', '75001', 'Paris', 'https://cdn.pixabay.com/photo/2016/02/07/21/03/computer-1185626_1280.jpg', 1),
    ('Li yonnaise', 'user2@example.com', 'password2', '0987654321', '69001', 'Lyon', 'https://cdn.pixabay.com/photo/2015/04/20/17/39/woman-731894_1280.jpg', 2),
    ('user1', 'user1@example.com', 'password1', '1234567890', '75001', 'Paris', 'https://cdn.pixabay.com/photo/2016/04/25/12/06/man-1351761_1280.png', 2),
    ('user1', 'user1@example.com', 'password1', '1234567890', '75001', 'Paris', 'https://cdn.pixabay.com/photo/2016/04/25/08/23/man-1351393_1280.png',1)
`;
        const insertProjectsTableQuery = `INSERT INTO projects (user_id, title, client_name, start_date, end_date, stack_technologies, description, image_url)
VALUES
    (1, 'Project 1', 'Client 1', '2022-01-01', '2022-03-31', 'HTML5, CSS3, JavaScript', 'Description 1', 'https://cdn.pixabay.com/photo/2017/12/29/14/14/set-3047724_1280.jpg'),
    (1, 'Project 2', 'Client 2', '2022-04-01', '2022-06-30', 'React, Node.js, MongoDB', 'Description 2', 'https://cdn.pixabay.com/photo/2017/12/29/14/14/set-3047724_1280.jpg'),
    (2, 'Project 3', 'Client 3', '2022-07-01', '2022-09-30', 'Angular, Firebase', 'Description 3', 'https://cdn.pixabay.com/photo/2017/12/29/14/14/set-3047724_1280.jpg'),
    (3, 'Project 4', 'Client 4', '2022-10-01', '2022-12-31', 'Vue.js, Django, PostgreSQL', 'Description 4', 'https://cdn.pixabay.com/photo/2017/12/29/14/14/set-3047724_1280.jpg')`;;

        con.query(createRolesTableQuery, function(err, result) {
          if (err) throw err;
          console.log('Table roles created or already exists');
        });
        con.query(createProjectsTableQuery, function(err, result) {
          if (err) throw err;
          console.log('Table projects created or already exists');
        });
        con.query(createUserTableQuery, function(err, result) {
          if (err) throw err;
          console.log('Table users created or already exists');
        });



        con.query(insertRolesTableQuery, function(err, result) {
          if (err) throw err;
          console.log('Table roles initied');
        });
        con.query(insertProjectsTableQuery, function(err, result) {
          if (err) throw err;
          console.log('Table projects initied');
        });
        con.query(insertUsersQuery, function(err, result) {
          if (err) throw err;
          console.log('Table users initied');
          // Close the connection
          con.end();
        });

      });
    });
  });
  global.sessionInit =1;
  console.log('sessionInit = '+sessionInit);


}
module.exports = con;
