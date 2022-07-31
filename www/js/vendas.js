let client = document.querySelector("#client");
let valor = document.querySelector("#valor");
let radios = document.querySelectorAll(".optradio");
let quantidade = document.querySelector("#quantidade");
document.addEventListener("deviceready", function () {
  let vendas = document.querySelector(".btn-vendas");
  vendas.addEventListener("click", function (event) {
    event.preventDefault();
    if (
      verificaClient() &&
      verificaValor() &&
      verificaPagamento() &&
      verificaQuantidade()
    ) {
      let date = new Date();
      db.transaction(function (tx) {
        tx.executeSql(
          "UPDATE gas set quantidade = quantidade - ? where id_adm = ?",
          [verificaQuantidade(), "1"],
          function (tx, result) {
            tx.executeSql(
              "INSERT INTO vendasTotal (client, data, valor, pago, quantidade, tipo, id_adm) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                verificaClient(),
                date,
                verificaValor(),
                verificaPagamento(),
                verificaQuantidade(),
                "gas",
                "1",
              ],
              function (tx, res) {
                alert("Venda Realizada com sucesso");
                client.value = "";
                quantidade.value = "";
              },
              function (error) {
                alert("Problema ao realizar a venda");
              }
            );
          },
          function (error) {
            alert("Erro ao realizar a venda");
          }
        );
      });
    } else alert("Os campos não foram preenchidos corretamente");
  });
});

function verificaQuantidade() {
  if (quantidade.value) {
    return quantidade.value;
  } else return false;
}

function verificaClient() {
  if (client.value) {
    return client.value;
  } else return false;
}

function verificaValor() {
  if (valor.value) {
    return valor.value;
  } else return false;
}

function verificaPagamento() {
  let radiocheck = false;
  radios.forEach((radio) => {
    if (radio.checked) radiocheck = radio.value;
  });
  return radiocheck;
}
