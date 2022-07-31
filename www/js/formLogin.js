let btnLogin = document.querySelector(".btnLogin");

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM admin where email = ? and senha = ?",
      [validaEmail(), validaSenha()],
      function (tx, res) {
        if (res.rows.length) {
          window.location = "file:///android_asset/www/vendas.html";
        } else alert("Email e/ou senha inválidos");
      }
    );
  });
});

let password = document.querySelector(".senha-administrador");
function validaSenha() {
  if (password.value == "") {
    password.classList.remove("color-btn");
    password.classList.remove("correto");
    password.classList.add("errado");
    return false;
  } else {
    password.classList.remove("color-btn");
    password.classList.remove("errado");
    password.classList.add("correto");
    return password.value;
  }
}

password.addEventListener("focus", function () {
  setInterval(() => {
    validaSenha();
  }, 200);
});

let email = document.querySelector(".email-administrador");

function validaEmail() {
  if (
    !email.value.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    email.classList.remove("color-btn");
    email.classList.remove("correto");
    email.classList.add("errado");
    return false;
  } else {
    email.classList.remove("color-btn");
    email.classList.remove("errado");
    email.classList.add("correto");
    return email.value;
  }
}

email.addEventListener("focus", function () {
  setInterval(() => {
    validaEmail();
  }, 200);
});

setInterval(() => {
  if (validaSenha() && validaEmail()) btnLogin.removeAttribute("disabled");
  else btnLogin.setAttribute("disabled", "disabled");
}, 500);
