const express = require('express')
const app = express();
const funcao = require('./servico.js');

app.use(express.static('index.html'));
app.get('/historicoIPCA/calculo', (req,res) => {
  
  const mes1 = parseInt(req.query.mes1);
  const ano1 = parseInt(req.query.ano1);
  const mes2 = parseInt(req.query.mes2);
  const ano2 = parseInt(req.query.ano2);
  const value = req.query.value;

  let dataStart = new Date(ano1, mes1);
  let dataFinal = new Date(ano2, mes2);
  let dataArray = new Date(parseInt(2023), parseInt(5));

  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials" : true 
  })
  
  if(ano1 >= 2015 && dataFinal <= dataArray && dataStart <= dataFinal && value != null && !isNaN(value)){
  res.json(funcao.reajusteIPCA(value, dataStart, dataFinal));
}
  else{
    res.status(403).json({erro:"Dados inválidos"})
  }
});

app.get('/historicoIPCA', (req,res) =>{
  
  
  
  let year = req.query.year

  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials" : true 
  })
  if(year == null ){
    res.json(funcao.historico());
  }
    
    else{
      if(year < 2015 || year > 2023){
        res.json({erro: 'Ano inválido'});
      }
      else if(isNaN(year)){
        res.json({erro: 'dado inválido'});
      }
      else{
        res.json(funcao.anoBuscar(year));
      }
    }
});


app.get('/historicoIPCA/:id', (req,res) =>{
  const idHistorico = parseInt(req.params.id);
  const historico = funcao.idBuscar(idHistorico);
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials" : true 
  })
  res.json(historico);
  
});


app.listen(3000, () => {
  console.log("Servidor iniciado");
})