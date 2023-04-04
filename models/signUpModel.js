exports.signUpForm = function ()
{
  return `
  <html>
    <head>
      <title>Sign Up</title>
      <link rel="stylesheet" href="../css/form.css">

    </head>
    <body>
    <a href="/user/signin"><button type="submit" style="width:auto; position: absolute;right: 8px;"><i class='fas fa-sign-in-alt'></i>
signin</button></a>

      <form method="post" action="signup" style="border:1px solid #ccc">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr>

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required>

          <label for="email"><b>Username</b></label>
          <input type="text" placeholder="Enter username" name="username" required>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required>

          <label for="psw-repeat"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" name="password-repeat" required>

          <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
          </label>

          <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

          <div class="clearfix">
            <button type="button" class="cancelbtn">Cancel</button>
            <button type="submit" class="signupbtn">Sign Up</button>
          </div>
        </div>
      </form>
    </body>
  </html>
  `;
};
