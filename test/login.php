
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">

    <title>Welcome to Musicplayer</title>
</head>

<body >
    <h1>Welcome to Musicplayer</h1>
    <?php
        if (isset($_POST["submit"])) {
           $username = $_POST["username"];
           $password = $_POST["pwd"];
            require_once "database.php";
            $sql = "SELECT * FROM register WHERE username = '$username'";
            $result = mysqli_query($conn, $sql);
            $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
            if ($user) {
                if (password_verify($password, $user["pwd"])) {
                    session_start();
                    $_SESSION["user"] = "yes";
                    header("Location: index.php");
                    die();
                }else{
                    echo '<script>
                    window.location.href="login.php"
                        alert("Password does not match!!");
                        </script>';
                }
            }else{
                echo '<script>
      window.location.href="login.php"
          alert("username does not match!!");
          </script>';
            }
        }
        ?>
    <form action="login.php" method="post">
        
        <!-- Headings for the form -->
        <div class="headingsContainer" >
            <div id="close-btn">
                <button  aria-label="Close alert" type="button" data-close>
                <span aria-hidden="true"><a href="home page.html">&times;</a></span>
                  </button>
                </div> 
            <h3>Sign in</h3>
            <p>Sign in with your username and password</p>
        </div>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        
        <!-- Main container for all inputs -->
        <div class="mainContainer">
            <!-- Username -->
            <label for="username"><ion-icon name="person"></ion-icon>Username:</label>
            <input type="text" placeholder="Enter Username" name="username" required>
        </div>
        <div class="mainContainer">
            <!-- Password -->
            <label for="pwd"><ion-icon name="lock-closed"></ion-icon>password:</label>
            <input type="password" minlength="8" placeholder="Enter Password" name="pwd" required>
        </div>
            <!-- sub container for the checkbox and forgot password link -->
            <div class="subcontainer">
                <label>
                  <input type="checkbox" checked="checked" name="remember"> Remember me
                </label>
                <p class="forgotpsd"> <a href="forgotten password.html">Forgot Password?</a></p>
            </div>


            <!-- Submit button -->
            <div class="sub">
<!-- Click to verify valid password -->
               <button type = "submit" name = "submit" value = "Submit">login</button>
              </div>

            <!-- Sign up link -->
            <p class="register">Not a member?  <a href="register.php" >Register here!</a></p>
            
        

    </form>
</body>
</html>
