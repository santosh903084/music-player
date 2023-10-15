function check(form) {
    if (form.username.value == "guest" && form.pwd.value == "guest@123") {
      window.location.href="a.html"
      alert("successfully logined!!")
      return true;
    } else {
      window.location.href="loginpage.html"
      alert("Incorrect Password or Username")
      return false;
    }
  }
  
  