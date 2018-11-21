document.addEventListener("deviceready", function() {
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, gotFS, fail);

    function fail() {
        alert("problema para baixar");
    }

    function gotFS(fileSystem) {
        fileSystem.getDirectory("Download", {create: true, exclusive: false}, onGetDirectorySuccess, fail);
    }

    function onGetDirectorySuccess(dir) {
        dir.getFile("relatorio.pdf", {
            create: true,
            exclusive: false
        }, gotFileEntry, fail);
    };

    
    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }
    
    function gotFileWriter(writer) {
        db.transaction(function(tx) {
            tx.executeSql('select * from vendastotal', [], function(err, res) {
                let item = 'Cliente   |   Data   |   Valor   |   Pago   |   Quantidade   | Tipo \n \n';
                for(let i = 0; i < res.rows.length; i++) {
                    item += `${res.rows.item(i).client} | ${res.rows.item(i).data.split(' ').slice(0, 5)} | ${res.rows.item(i).valor} | ${res.rows.item(i).pago} | ${res.rows.item(i).quantidade} | ${res.rows.item(i).tipo} \n \n`;
                }
                var doc = new jsPDF();
                doc.setFontSize(14);
                doc.text(10, 10, item);
                writer.write(doc.output());
                alert("Arquivo baixado, olhe na pasta download");
            });
        });
    }
})