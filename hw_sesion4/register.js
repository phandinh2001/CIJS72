import { InputCommon } from "./common/inputCommon.js";
import { setScreen } from "./index.js";
import { Login } from "./login.js";

class Register {
  container = document.createElement("div");
  title = document.createElement("h3");

  form = document.createElement("form");
  inputEmail = new InputCommon(
    "Email: ",
    "email",
    "Enter your email",
    "inputEmail"
  );
  inputPassword = new InputCommon(
    "Password: ",
    "password",
    "Enter your password",
    "inputPassword"
  );
  inputConfirmPassword = new InputCommon(
    "Confirm password: ",
    "password",
    "Enter your confirm password",
    "inputConfirmPassword"
  );
  inputUser = new InputCommon(
    "User: ",
    "user",
    "Enter your user",
    "inputUser"
  );

  actionContainer = document.createElement("div");
  btnLogin = document.createElement("button");
  btnRegister = document.createElement("button");

  constructor() {
    this.title.innerHTML = "Register";

    this.container.appendChild(this.form);

    this.form.appendChild(this.title);
    this.form.appendChild(this.inputUser.container);
    this.form.appendChild(this.inputEmail.container);
    this.form.appendChild(this.inputPassword.container);
    this.form.appendChild(this.inputConfirmPassword.container);

    this.btnLogin.innerHTML = "Go to login";
    this.btnRegister.innerHTML = "Register";
    this.btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      const loginScreen = new Login();
      setScreen(loginScreen.container);
    });
    this.btnRegister.addEventListener("click", this.handldeRegister);

    this.form.appendChild(this.btnLogin);
    this.form.appendChild(this.btnRegister);
  }
  handldeRegister = (e) => {
    e.preventDefault();
    //get value
    const user = this.inputUser.getValue();
    const email = this.inputEmail.getValue();
    const password = this.inputPassword.getValue();
    const confirmpassword = this.inputConfirmPassword.getValue()

     //email không đúng định dạng
     var mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/
     if(email === mail_format){
       this.inputEmail.setErrorMessage("")
     }else {
       this.inputEmail.setErrorMessage("Email không đúng định dạng");
     }
     //check password 
     if(password.length <6){
      this.inputPassword.setErrorMessage("Mật khẩu phải lớn hơn 6 kí tự")
     }else {
      this.inputPassword.setErrorMessage("")
     }
     // check confirmpassword
     if(confirmpassword === password){
       this.inputConfirmPassword.setErrorMessage("")
     }else {
       this.inputConfirmPassword.setErrorMessage("Mật khẩu không trùng nhau")
     }
     //check user
     var keyValue =  /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g; 
     if (user === keyValue){
       this.inputUser.setErrorMessage("");
     }else{
      this.inputUser.setErrorMessage("User không đúng định dạng");
     }
    //regiter
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log(`User ${email} is created`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };
}

export { Register };
