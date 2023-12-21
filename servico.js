const inflacao = require('./dados.js');


function historico(){
  return inflacao;
}

function idBuscar(id){
  return inflacao.historicoInflacao.find((item) => item.id === id);
}

function anoBuscar(ano){
  const historico = inflacao.historicoInflacao.filter(historico => historico.ano ==  ano);

  return historico;
}

function reajusteIPCA(valor, dataInicio, dataFim){

      let resultado = 1;
      let array = [];
      for(let i = 0; i<inflacao.historicoInflacao.length; i++){
          let dataInflacao = new Date(inflacao.historicoInflacao[i].ano, inflacao.historicoInflacao[i].mes);

          if(dataInflacao >= dataInicio && dataInflacao <= dataFim){
              array.push(inflacao.historicoInflacao[i]);
            resultado *= 1+(inflacao.historicoInflacao[i].ipca/100); 
          }

      }
      return (valor * resultado).toFixed(2)
  }


exports.historico = historico;
exports.idBuscar = idBuscar;
exports.anoBuscar = anoBuscar;
exports.reajusteIPCA = reajusteIPCA;
