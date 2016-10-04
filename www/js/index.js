var db = openDatabase('partiesdb', '1.0', 'my first database', 2 * 1024 * 1024);

db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS PARTIES (name, description)');
});

function set_value(value){
  document.getElementsByClassName('lista')[0].innerHTML += "<li>" + value + "</li>";
}

function get_value_from_input(classNameN, classNameD){
  var name        = document.getElementsByClassName(classNameN)[0].value;
  var description = document.getElementsByClassName(classNameD)[0].value;
  set_value_to_db(name, description);
  //get_value_from_schedule();
}

function set_value_to_db(name, description){
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO PARTIES (name, description) VALUES (?, ?)', [name, description]);
  });
}

function get_value_from_schedule(){
  document.getElementsByClassName('lista')[0].innerHTML = null;

  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM PARTIES', [], function(tx, results){
      var i;
      var length = results.rows.length;

      // looping
      for (i = 0; i < length; i++){
        set_value(results.rows.item(i).name);
      }
    });
  });
}
