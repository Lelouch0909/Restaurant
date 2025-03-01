import { getAccount, signIn } from "./actions.js";

try {
  const account = await getAccount();
  if (account) {
    window.location.href = "../index.html";
  }
} catch (error) {

}
const submit = async (e) => {
  const inp_con = document.getElementById("email").value;
  const inp_pass = document.getElementById("password").value;
  const bsubmit = document.getElementById("submit-connexion");
  if (inp_con && password) {
    try {

      const session = await signIn(inp_con, inp_pass);

      location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }
};

const btn_submit = document.getElementById("submit-connexion");

btn_submit.addEventListener("click", submit);
