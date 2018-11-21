document.addEventListener("deviceready", init, false);
var db = null;
function init() {
	
	function onSuccess(imageData) {
		var image = document.getElementById('myImage');
		image.src = imageData;
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}	

	//Use from Camera
	if (document.querySelector("#takePicture")) {
		document.querySelector("#takePicture").addEventListener("touchend", function() {
			navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 70,
				sourceType: Camera.PictureSourceType.CAMERA,
				destinationType: Camera.DestinationType.FILE_URI
			});
		});
	}

	//Use from Library
	if (document.querySelector("#takePicture")) {
		document.querySelector("#usePicture").addEventListener("touchend", function() {
			navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 70,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				destinationType: Camera.DestinationType.FILE_URI
			});
		});
	}

	db = window.sqlitePlugin.openDatabase({name: 'aquagas.db', location: 'default'});
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS admin (id integer primary key, email text, senha text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS gas (id integer primary key, quantidade text, id_adm text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS agua (id integer primary key, quantidade text, id_adm text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS vendastotal (id integer primary key, client text, data text, valor text, pago text, quantidade text, tipo text, id_adm text)');
		// tx.executeSql("INSERT INTO gas (quantidade, id_adm) VALUES (?, ?)", ['50', '1']);
		// tx.executeSql("INSERT INTO agua (quantidade, id_adm) VALUES (?, ?)", ['25', '1']);
	});
}

