const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000
const connection = require('./database/database')
const Pergunta = require('./database/perguntas')
//Database connection 

connection.authenticate().then(()=>{
  console.log('tudo certo')
}).catch((erro)=>{
  console.log('erro');
})

//defining ejs how interpret the view
app.set('view engine','ejs'); 
app.use(express.static('public'));

//decoding data how body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


//Routes
app.get('/',(req,res)=>{
  Pergunta.findAll({raw:true}).then((pergunta)=>{
    console.log(pergunta);
  })
    res.render('index')

});
app.get('/question', (req, res) => {
 res.render('perguntar');
})
app.post('/savequestion', (req, res)=>{
    var titulo = req.body.titulos
    var descricao = req.body.descricao
  Pergunta.create({
    titulo: titulo,
    description:descricao
  }).then(()=>{
    res.redirect('/');
  })
})
app.listen(port, () => console.log(`server start`))

//aula importações de variaveis...