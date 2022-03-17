import { Login } from "./login.js";

const app = document.querySelector("#app");

const setScreen = (container) => {
  app.innerHTML = "";
  app.appendChild(container);
};

// Set default screen
const loginScreen = new Login();
setScreen(loginScreen.container);

export { setScreen };
