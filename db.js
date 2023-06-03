const mysql = require('mysql2');
require('dotenv').config()
const express = require('express')
const app = express()

module.exports = {

    connectToDb: () => {
        var con = mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
          });
          
          con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
          });
        
        con.query(
            "SELECT * FROM usuarios_crassus WHERE name = 'Thiago Gois'",
            function(err, results, fields){
                if(err) throw err;
                console.log(results)
            }
        )
    },
    loginTest: (cb) => {
      var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "T2h60781@",
        database: 'crassus'
      });

      con.query('SELECT * FROM usuarios_crassus WHERE email = "' + cb.email + '" AND senha = "' + cb.senha + '"', function (err, result) {
        if (err) throw err;
        if(result.length === 0){
          cb('/login')
        } else{
          cb('/home')  
        }
      });
    },
    createUser: (cb) => {
      var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "T2h60781@",
        database: 'crassus'
      });

      con.query(`INSERT INTO usuarios_crassus (name, email, senha, facebook_key) VALUES ('`+ cb.name +`', '`+ cb.email +`', '`+ cb.senha +`', '`+ cb.facebook_key +`')`, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
      });
    }
  }