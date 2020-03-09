
let quantidade = 0;
let quantidadeHtml = 0;
let quantidadeCelulas = 0;
let quantidadeSemEspaco = 0;
let precoTotalChar = 0.0;
let precoTotalCell = 0.0;

contarCaracteres = function () {
  var strHtml = $('#summernote').summernote('code');
  var texto = jQuery(strHtml).text();
  //console.log(texto);
  //console.log(strHtml);
  quantidadeHtml = strHtml.length;
  quantidade = texto.length;
  //CÉLULAS
  quantidadeCelulas = (strHtml.match(/\<td/g) || []).length;
  //CARACTERES
  quantidadeSemEspaco = texto.length - (texto.match(/\s/g) || []).length; // remove espaços, tabulação e quebras de linha
  quantidadeSemEspaco = quantidadeSemEspaco - (texto.match(/\.|\,/g) || []).length;// remove pontos e virgulas da contagem
  calculaPrecos();
}

calculaPrecos = function () {
  precoTotalChar = quantidadeSemEspaco * 0.05;
  precoTotalChar = precoTotalChar.toLocaleString('pt-BR');
  precoTotalCell = quantidadeCelulas * 1.14
  precoTotalCell = precoTotalCell.toLocaleString('pt-BR');
  console.log("PREÇO: " + precoTotalChar);
  console.log("CARACTERES SEM ESPAÇOS: " + quantidadeSemEspaco);
}

atualizarFront = function(){
  $('#quantidadeSemEspaco').html(quantidadeSemEspaco);
  $('#precoTotalChar').html(precoTotalChar);
}

$(document).ready(function () {

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
      },
      options: { fullscreen: 'Tela cheia' }
    }
  });

  $('#summernote').summernote({
    height: 330,
    lang: 'pt-BR',
    placeholder: 'Digite ou cole a materia aqui...',
    toolbar: [
      ['table', ['table']],
      ['fullscreen', ['fullscreen']]
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



