const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000
const connection = require('./database/database')
const Pergunta = require('./database/perguntas')
const Resposta = require('./database/resposta')
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
  Pergunta.findAll({raw:true, order:[
    ['createdAt','DESC']]})// ASC = Crescente || DESC = decresente
    .then((pergunta)=>{
    res.render('index',{
      perguntas:pergunta
    })  
})
});
app.get('/question', (req, res) => {
 res.render('perguntar');
})
app.get('/pergunta/:id',(req, res)=>{
   var id = req.params.id;
   Pergunta.findOne({
     raw:true,
     where:{ id:id }
   }).then((pergunta)=>{
      if(pergunta!=undefined){
        Resposta.findAll({where:{
          perguntaId:pergunta.id
        }, order:[
          ['createdAt','DESC']]
      }).then(respostas =>{
          res.render('pergunta',{
           pergunta:pergunta,
           respostas:respostas
         })
        })
      }else{
         res.redirect('/');
      }
   })
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

app.post('/responder', (req,res) => {
  var corpo = req.body.corpo
  var perguntaId = req.body.pergunta
  console.log(perguntaId);
  Resposta.create({
    corpo:corpo,
    perguntaId:perguntaId,
  }).then(()=>{
    res.redirect('/pergunta/'+perguntaId)
    console.log(perguntaId);
  })
 
});

app.listen(port, () => console.log(`server start`))

//aula importações de variaveis...