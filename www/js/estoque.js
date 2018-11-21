// tx.executeSql("INSERT INTO admin (email, senha) VALUES (?, ?)", ["robinsontads@outlook.com", '123456']);
document.addEventListener("deviceready", function() {
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM gas where id_adm = ?", ['1'], function(tx, res) {
            if (document.querySelector('.estoque-gas')) {
                let estoqueGas = document.querySelector('.estoque-gas');
                estoqueGas.innerHTML += '<span style="font-size:30px;color: darkblue">  ' + res.rows.item(0).quantidade + '</span>';
            }
            document.querySelector('#gas').value = res.rows.item(0).quantidade;
        });
        tx.executeSql("SELECT * FROM agua where id_adm = ?", ['1'], function(tx, res) {
            if (document.querySelector('.estoque-agua')) {
                let estoqueAgua = document.querySelector('.estoque-agua');
                estoqueAgua.innerHTML += '<span style="font-size:30px;color: darkblue">  ' + res.rows.item(0).quantidade + '</span>';
            }
            document.querySelector('#agua').value = res.rows.item(0).quantidade;
        });
    });

    document.querySelector('.btn-atualizar').addEventListener('click', function() {
        db.transaction(function(tx) {
            tx.executeSql("UPDATE agua set quantidade = ? where id_adm = ?", [document.querySelector('#agua').value, '1'],
            function(tx, result) {
                tx.executeSql("UPDATE gas set quantidade = ? where id_adm = ?", [document.querySelector('#gas').value, '1'],
                    function(tx, result) {
                        alert("Atualizado com Sucesso");
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    },
                    function(error) {
                        alert("Problema ao atualizar");
                    })
            },
            function(error){
                alert('Problema ao atualizar');
            });
        });
    })
});


