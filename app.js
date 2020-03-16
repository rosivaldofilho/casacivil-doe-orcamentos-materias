/**
 * @author Rosivaldo Souza <rosivaldo@casacivil.to.gov.br>
 * Casa Civil DOE - Sistema de Orcamento de Matérias
 * Sistema para orçamento de publicação de materias do Diário Oficial do Estado do Tocantins
 * BASEADO EM CONTAGEM DE CARACTERES
 */
var quantidade = 0;
var quantidadeSemEspaco = 0;
var precoTotalChar = 0.0;
var ufir = 3.5550;
var caracterePorUfir = 0.05;

contarCaracteres = function () {
  var strHtml = $('#summernote').summernote('code');
  //Correção summernote vazio
  if (!strHtml) {strHtml = "<p><br></p>"; $('.note-editable').html(strHtml);}
  var texto = jQuery(strHtml).text();
  //CARACTERES
  quantidade = texto.length;
  // remove espaços, tabulação e quebras de linha
  quantidadeSemEspaco = texto.length - (texto.match(/\s/g) || []).length;
  // remove pontos e virgulas da contagem
  quantidadeSemEspaco = quantidadeSemEspaco - (texto.match(/\.|\,/g) || []).length;
  calculaPrecos();
}

calculaPrecos = function () {
  precoTotalChar = ajuste(quantidadeSemEspaco * caracterePorUfir * ufir, 2);
  precoTotalChar = formatarMoeda(precoTotalChar);
}

//arredonda para baixo
function ajuste(nr, casas) {
  const og = Math.pow(10, casas)
  return Math.floor(nr * og) / og;
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

atualizarFront = function () {
  $('#quantidadeSemEspaco').html(quantidadeSemEspaco);
  $('#precoTotalChar').html(formatarMoeda(precoTotalChar));
  $('#ufir').html(ufir.toString().replace(".", ","));
}

$(document).ready(function () {
  atualizarFront();

  $.extend($.summernote.lang, {
    'pt-BR': {
      table: {
        table: 'Tabela',
        addRowAbove: 'Adicionar linha acima',
        addRowBelow: 'Adicionar linha abaixo',
        addColLeft: 'Adicionar coluna à esquerda',
        addColRight: 'Adicionar coluna à direita',
        delRow: 'Deletar linha',
        delCol: 'Deletar coluna',
        delTable: 'Deletar Tabela'
      }
    }
  });

  $('#summernote').summernote({
    height: 330,
    lang: 'pt-BR',
    placeholder: 'Digite ou cole a materia aqui...',
    toolbar: [
      ['table', ['table']]
    ]
  });

  $('.note-editable').keyup(function () {
    contarCaracteres();
    atualizarFront();
  });

  $('#btn-calcular').click(function () {
    contarCaracteres();
    atualizarFront();
  });

});



