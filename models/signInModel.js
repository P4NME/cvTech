exports.signInForm = function ()
{
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Sign In</title>
      <link rel="stylesheet" href="../../css/main.css">
      <link rel="stylesheet" href="../../css/modal.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">


    </head>
    <body>
    <a href="/user/signup"><button type="submit" style="width:auto; position: absolute;left: 8px;">signup</button></a>

      <button onclick="document.getElementById('id01').style.display='block'" style="width:auto; position: absolute;right: 8px;">Login</button>

      <div id="id01" class="moda">

      <form class="modal-content animate" action="/user/signin/" method="post">
        <div class="imgcontainer">
          <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
          <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" class="avatar">
        </div>

        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" required>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required>

          <button type="submit">Login</button>
          <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
          </label>
        </div>

        <div class="container" style="background-color:#f1f1f1">
          <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>

    </div>
  </html>



  `;
};
