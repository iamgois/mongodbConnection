const express = require('express')
const app = express()
const port = 3000
const { connectToDb, loginTest, createUser } = require('./db')
const path = require('path');
var bodyParser = require('body-parser')
const mysql = require('mysql2')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/views')));

// Adicionando o middleware bodyParser para analisar o corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/index.html'))
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/login.html'))
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/home.html'))
});

const dbConfig = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
};

// Rota para lidar com o envio do formulário de login
app.post('/login', (req, res) => {
  // Obtendo os dados do formulário de login
  const email = req.body.email;
  const senha = req.body.senha;

  // Criando uma conexão com o banco de dados
  const connection = mysql.createConnection(dbConfig);

  // Consulta SQL para verificar o usuário no banco de dados
  const query = `SELECT * FROM usuarios_crassus WHERE email = '${email}' AND senha = '${senha}'`;

  // Executando a consulta SQL
  connection.query(query, (err, result) => {
    if (err) {
      // Lidar com erros de consulta
      console.error(err);
      res.status(500).send('Erro ao realizar a consulta.');
    } else {
      if (result.length === 0) {
        res.redirect('/login');
      } else {
        // Usuário encontrado, redirecionar para a página inicial
        res.redirect('/home');
      }
    }

    // Fechando a conexão com o banco de dados
    connection.end();
  });
});

// Rota para lidar com o envio do formulário de login
app.post('/register', (req, res) => {
  // Obtendo os dados do formulário de login
  const name = req.body.name;
  const email = req.body.email;
  const senha = req.body.senha;
  const facebook_key = req.body.facebook_key;

  // Criando uma conexão com o banco de dados
  const connection = mysql.createConnection(dbConfig);

  // Consulta SQL para verificar o usuário no banco de dados
  const query = `SELECT * FROM usuarios_crassus WHERE email = '${email}'`;
  const createUserQuery = `INSERT INTO usuarios_crassus (name, email, senha, facebook_key) VALUES ('${name}','${email}','${senha}','${facebook_key}')`

  // Executando a consulta SQL
  connection.query(query, (err, result) => {
    if (err) {
      // Lidar com erros de consulta
      console.error(err);
      res.status(500).send('Erro ao realizar a consulta.');
    } else {
      if (result.length === 0) {
        // Usuário não encontrado
        connection.query(createUserQuery,(err, result) => {
          if(err) throw err
          res.redirect('/home')
        })
      } else {
        // Usuário encontrado, redirecionar para a página inicial
        res.send('Usuário já cadastrado, tente outro!');
      }
    }

    // Fechando a conexão com o banco de dados
    connection.end();
  });
});

// Rota para a página inicial após o login
app.get('/home', (req, res) => {
  res.send('<h1>Página Inicial</h1>');
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Running in port ${port}`);
});