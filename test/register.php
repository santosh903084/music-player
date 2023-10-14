
<html>
<head>
    <link rel="stylesheet" href="register.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  <?php
  if (isset($_POST["submit"])) {
     $userName = $_POST["username"];
     $email = $_POST["email"];
     $password = $_POST["pwd"];
     $passwordRepeat = $_POST["cpwd"];
     
     $passwordHash = password_hash($password, PASSWORD_DEFAULT);
     $errors = array();
     if (empty($userName) OR empty($email) OR empty($password) OR empty($passwordRepeat)) {
        echo '<script>
        window.location.href="register.php"
            alert("All fields are required!!");
            </script>';
      
     }
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo '<script>
        window.location.href="register.php"
            alert("Email is not valid!!");
            </script>';
     }
     if (strlen($password)<6) {
      echo '<script>
      window.location.href="register.php"
          alert("Password must be at least 6 charactes long!!");
          </script>';

     }
     if ($password!==$passwordRepeat) {
      echo '<script>
      window.location.href="register.php"
          alert("Password does not match!!");
          </script>';
     }
     require_once "database.php";
     $sql = "SELECT * FROM register WHERE email = '$email'";
     $result = mysqli_query($conn, $sql);
     $rowCount = mysqli_num_rows($result);
     if ($rowCount>0) {
      echo '<script>
      window.location.href="register.php"
          alert("Email already exists!!");
          </script>';
     }
     if (count($errors)>0) {
      foreach ($errors as  $error) {
          echo "<div class='alert alert-danger'>$error</div>";
      }
     }else{
      
      $sql = "INSERT INTO register (username, email, pwd) VALUES ( ?, ?, ? )";
      $stmt = mysqli_stmt_init($conn);
      $prepareStmt = mysqli_stmt_prepare($stmt,$sql);
      if ($prepareStmt) {
          mysqli_stmt_bind_param($stmt,"sss",$userName, $email, $passwordHash);
          mysqli_stmt_execute($stmt);
          echo '<script>
            window.location.href="login.php"
                alert("Sucessfully registered!!");
                </script>';
      }else{
          die("Something went wrong");
      }
     }


  }
  ?>

<form action="register.php" method="POST" >
    <div class="headingsContainer">
        <!-- close button-->
        <div id="close-btn">
        <button  aria-label="Close alert" type="button" data-close>
        <span aria-hidden="true"><a href="home page.html">&times;</a></span>
          </button>
        </div>
        <h3>Register form</h3>
        <p>Register with your username and set the password to signin</p>
    </div>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <div class="mainContainer">
      
<!-- Enter first name -->
<label> User name <ion-icon name="person"></ion-icon> </label><br>
<input type = "text" id = "username" value = "" name="username" required> 
 </div>
<!-- Enter email -->
<div class="maincontainer">
<label>Email<ion-icon name="mail"></ion-icon></label><br>
<input type="email" id="email" value="" name="email" required>
 
</div>
<!-- Create a new password -->
<div class="mainContainer">
<label>  Password<ion-icon name="lock-closed"></ion-icon> </label><br>
<input type = "password" id = "pwd" value = "" name="pwd" required> 

</div>
<!-- re-enter password -->
<div class="mainContainer">
<label> Conform Password*<ion-icon name="lock-closed"></ion-icon> </label><br>
<input type = "password" id = "cpwd" value = "" name="cpwd" required> 

</div>
<!-- checkbox -->
<div class="subcontainer">
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
    
</div>

<div class="sub">
<!-- Click to verify valid password -->
<button type = "submit" name = "submit" value = "Submit">submit</button>
</div>

</div>
<div>
    <p>Already have an account? <a href="login.php">Log in</a>.</p>
  </div>
</form>
</body>
</html>