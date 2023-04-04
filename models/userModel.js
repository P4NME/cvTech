// userModel.js
const db = require('../config/database'); // On importe le fichier de connexion à la base de données

class User
{
  constructor(username , email , password , phone_number , postal_code , city , image_url, role_id)
  {
    this.username = username,
    this.email = email,
    this.password = password,
    this.phone_number = phone_number,
    this.postal_code = postal_code,
    this.city = city ,
    this.image_url = image_url,
    this.role_id =role_id
  }


  async save()
  {
    try
    {
      await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username , this.email , this.password , this.phone_number , this.postal_code , this.city , this.image_url, this.role_id]);
      return true;
    }
    catch (err)
    {
      console.error(err);
      return false;
    }
  }


  static findOneUser(username)
  {
    return new Promise((resolve, reject) =>
    {
      db.query(`SELECT * FROM users WHERE username='${username}'`, (err, result, fields) => {
        if (err)
        {
          reject(err);
        }
        else
        {
          if (result.length === 0)
          {
            resolve(null);
          }
          else
          {
            //const user = new User(result[0].id, result[0].username, result[0].password);
            console.log('47 - userModel : '+result[0]);
            resolve(result[0]);
          }
        }
      });
    });

  }

  static findAllUsers()
  {
    return new Promise((resolve, reject) =>
    {
      db.query(`SELECT users.id, users.username, users.email, image_url, roles.name
                FROM users
                INNER JOIN roles ON users.role_id = roles.id`, (err, result, fields) => {
        if (err)
        {
          reject(err);
        }
        else
        {
          if (result.length === 0)
          {
            resolve(null);
          }
          else
          {
            resolve(result);
          }
        }
      });
    });

  }

  static async getAllUser()
  {

  }

}

module.exports = User;
