// Recupera os dados de professores do localStorage
var professoresJson = localStorage.getItem("professores");
if (professoresJson) {
  var professores = JSON.parse(professoresJson);
} else {
  console.log("Não há dados de professores salvos no localStorage.");
}

// Recupera os dados de disciplinas do localStorage
var disciplinasJson = localStorage.getItem("disciplinas");
if (disciplinasJson) {
  var disciplinas = JSON.parse(disciplinasJson);
} else {
  console.log("Não há dados de disciplinas salvos no localStorage.");
}


let profdisc = [];

function preencherTabela() {
    if (document.getElementById("rgprof").value == "" || document.getElementById("sigla").value == "" || document.getElementById("disciplina").value == "" || document.getElementById("ano").value == "" || document.getElementById("semestre").value == "" || document.getElementById("diasSemana").value == "" || document.getElementById("horario").value == "") {
        alert("Preencha todos os campos!");
        return;
    }

    var rgprof = document.getElementById("rgprof").value;
    var sigla = document.getElementById("sigla").value;
    var disciplina = document.getElementById("disciplina").value;
    var ano = document.getElementById("ano").value;
    var semestre = document.getElementById("semestre").value;
    var diasSemana = document.querySelector('#diasSemana').options[document.querySelector('#diasSemana').selectedIndex].value;
    var horario = document.getElementById("horario").value;
    
    var registroExistente = false;
    var siglaExistente = false;

    for (var i = 0; i < professores.length; i++) {
        if (professores[i].registro == rgprof) {
            registroExistente = true;
            break;
        }
    }

    for (var i = 0; i < disciplinas.length; i++) {
        if (disciplinas[i].sigla == sigla) {
            siglaExistente = true;
            break;
        }
    }

    if (registroExistente && siglaExistente) {
        for (var i = 0; i < profdisc.length; i++) {
            if (profdisc[i].rgprof == rgprof) {
                alert("RG já cadastrado! Tente novamente com outro RG.");
                return;
            }
        }

        profdisc.push({
            rgprof: rgprof,
            sigla: sigla,
            disciplina: disciplina,
            ano: ano,
            semestre: semestre,
            diasSemana: diasSemana,
            horario: horario
        });

        var tabela = document.getElementById("tabela-profdisc").getElementsByTagName("tbody")[0];

        var novaLinha = tabela.insertRow();

        var colunaRgprof = novaLinha.insertCell();
        var colunaSigla = novaLinha.insertCell();
        var colunaDisciplina = novaLinha.insertCell();
        var colunaAno = novaLinha.insertCell();
        var colunaSemestre = novaLinha.insertCell();
        var colunaDiasSemana = novaLinha.insertCell();
        var colunaHorario = novaLinha.insertCell();

        colunaRgprof.innerHTML = rgprof;
        colunaSigla.innerHTML = sigla;
        colunaDisciplina.innerHTML = disciplina;
        colunaAno.innerHTML = ano;
        colunaSemestre.innerHTML = semestre;
        colunaDiasSemana.innerHTML = diasSemana;
        colunaHorario.innerHTML = horario;

        document.getElementById("rgprof").value = "";
        document.getElementById("sigla").value = "";
        document.getElementById("disciplina").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("semestre").value = "";
        document.getElementById("diasSemana").value = "";
        document.getElementById("horario").value = "";
    } else {
        alert("Registro e/ou sigla não encontrados nas áreas de professores e disciplinas.");
    }
}

function incluirProfDisc() {
    preencherTabela();
}


function alterarProfDisc() {
    var profdiscString = localStorage.getItem('profdisc');
    if (!profdiscString) {
      alert("Não há profdisc cadastradas");
      return;
    }
  
    var profdisc = JSON.parse(profdiscString);
  
    alert("Insira o RG do professor cujos dados da disciplina você deseja alterar:");
    var rgProf = prompt("Digite o RG do professor para alterar os dados:");
    var siglaDisciplina = prompt("Digite a sigla da disciplina para alterar os dados:");
  
    for (var i = 0; i < profdisc.length; i++) {
      if (profdisc[i].rgprof == rgProf && profdisc[i].sigla == siglaDisciplina) {
        alert("Cadastro encontrado, altere os dados:");
        var novaDisciplina = prompt("Digite a nova disciplina:");
        var novoAno = prompt("Digite o novo ano:");
        var novoSemestre = prompt("Digite o novo semestre:");
        var novosDiasSemana = prompt("Digite os novos dias da semana:");
        var novoHorario = prompt("Digite o novo horário:");
  
        profdisc[i].disciplina = novaDisciplina;
        profdisc[i].ano = novoAno;
        profdisc[i].semestre = novoSemestre;
        profdisc[i].diasSemana = novosDiasSemana;
        profdisc[i].horario = novoHorario;
  
        alert("Disciplina alterada com sucesso!");
  
        localStorage.setItem('profdisc', JSON.stringify(profdisc));
  
        document.getElementById("sigla").value = "";
        document.getElementById("disciplina").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("semestre").value = "";
        document.getElementById("diasSemana").value = "";
        document.getElementById("horario").value = "";
  
        var tabela = document.getElementById("tabela-profdisc").getElementsByTagName("tbody")[0];
        tabela.innerHTML = "";
        for (var j = 0; j < profdisc.length; j++) {
          var novaLinha = tabela.insertRow();
          var colunaRgprof = novaLinha.insertCell();
          var colunaSigla = novaLinha.insertCell();
          var colunaDisciplina = novaLinha.insertCell();
          var colunaAno = novaLinha.insertCell();
          var colunaSemestre = novaLinha.insertCell();
          var colunaDiasSemana = novaLinha.insertCell();
          var colunaHorario = novaLinha.insertCell();
  
          colunaRgprof.innerHTML = profdisc[j].rgprof;
          colunaSigla.innerHTML = profdisc[j].sigla;
          colunaDisciplina.innerHTML = profdisc[j].disciplina;
          colunaAno.innerHTML = profdisc[j].ano;
          colunaSemestre.innerHTML = profdisc[j].semestre;
          colunaDiasSemana.innerHTML = profdisc[j].diasSemana;
          colunaHorario.innerHTML = profdisc[j].horario;
        }
        return;
      }
    }
  
    alert("Cadastro não encontrado!");
  }
  
  


  function excluirProfDisc() {
    var profdiscString = localStorage.getItem('profdisc');
    if (!profdiscString) {
      alert("Não há profdisc cadastradas");
      return;
    }
  
    var profdisc = JSON.parse(profdiscString);
  
    alert("Insira o RG do professor e a sigla da disciplina que deseja excluir:");
    var rgProf = prompt("Digite o RG do professor:");
    var siglaDisciplina = prompt("Digite a sigla da disciplina:");
  
    for (var i = 0; i < profdisc.length; i++) {
      if (profdisc[i].rgprof == rgProf && profdisc[i].sigla == siglaDisciplina) {
        alert("Disciplina encontrada, excluindo:");
  
        var tabela = document.getElementById("tabela-profdisc").getElementsByTagName("tbody")[0];
        tabela.rows[i].style.backgroundColor = "red";
  
        setTimeout(function() {
          tabela.deleteRow(i);
        }, 5000);
  
        profdisc.splice(i, 1);
        alert("Disciplina excluída com sucesso!");
  
        localStorage.setItem('profdisc', JSON.stringify(profdisc));
  
        document.getElementById("rgprof").value = "";
        document.getElementById("sigla").value = "";
        document.getElementById("disciplina").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("semestre").value = "";
        document.getElementById("diasSemana").value = "";
        document.getElementById("horario").value = "";
        return;
      }
    }
    alert("Cadastro não encontrado!");
  }
  


  function listarProfDisc() {
    var profdiscString = localStorage.getItem('profdisc');
    if (!profdiscString) {
      alert("Não há profdisc cadastradas");
      return;
    }
  
    var profdisc = JSON.parse(profdiscString);
  
    alert("Insira o RG do professor que deseja listar:");
    var rgProf = prompt("Digite o RG do professor:");
    
    alert("Insira a sigla da disciplina que deseja listar:");
    var siglaDisciplina = prompt("Digite a sigla da disciplina:");
  
    for (var i = 0; i < profdisc.length; i++) {
      if (profdisc[i].rgprof == rgProf && profdisc[i].sigla == siglaDisciplina) {
        alert("Disciplina encontrada, listando:");
  
        var tabela = document.getElementById("tabela-profdisc").getElementsByTagName("tbody")[0];
        tabela.rows[i].style.backgroundColor = "blue";
  
        setTimeout(function() {
          tabela.rows[i].style.backgroundColor = "white";
        }, 5000);
  
        alert("RG do professor: " + profdisc[i].rgprof + "\nSigla: " + profdisc[i].sigla + "\nDisciplina: " + profdisc[i].disciplina + "\nAno: " + profdisc[i].ano + "\nSemestre: " + profdisc[i].semestre + "\nDias da Semana: " + profdisc[i].diasSemana + "\nHorário: " + profdisc[i].horario);
  
        document.getElementById("rgprof").value = "";
        document.getElementById("sigla").value = "";
        document.getElementById("disciplina").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("semestre").value = "";
        document.getElementById("diasSemana").value = "";
        document.getElementById("horario").value = "";
        return;
      }
    }
  
    alert("Cadastro não encontrado!");
  }
  


function listarTodosProfDisc() {
    var profdiscString = localStorage.getItem('profdisc');
    if (!profdiscString) {
        alert("Não há profdisc cadastradas");
        return;
    }

    var profdisc = JSON.parse(profdiscString);

    alert("Listando todas as disciplinas: ");

    // Destaca todas as linhas da tabela
    var tabela = document.getElementById("tabela-profdisc").getElementsByTagName("tbody")[0];
    for (var i = 0; i < profdisc.length; i++) {
        tabela.rows[i].style.backgroundColor = "yellow";
    }

    // Exibe os dados de todas as profdisc
    for (i = 0; i < profdisc.length; i++) {
        alert(
            "Disciplina " + (i + 1) + ": " + "\n" +
            "RG do professor: " + profdisc[i].rgprof + "\n" +
            "Sigla: " + profdisc[i].sigla + "\n" +
            "Disciplina: " + profdisc[i].disciplina + "\n" +
            "Ano: " + profdisc[i].ano + "\n" +
            "Semestre: " + profdisc[i].semestre + "\n" +
            "Dias da semana: " + profdisc[i].diasSemana + "\n" +
            "Horário: " + profdisc[i].horario
        );
    }

    // Faz as linhas destacadas voltarem ao normal depois de 5 segundos
    setTimeout(function () {
        for (var i = 0; i < profdisc.length; i++) {
            tabela.rows[i].style.backgroundColor = "white";
        }
    }, 5000);

    document.getElementById("sigla").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("ementa").value = "";
    document.getElementById("livros").value = "";
    document.getElementById("creditos").value = "";
    document.getElementById("carga-horaria").value = "";
}

/* --------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
FUNÇÕES APENAS PARA TESTES - JHOW ESTÁ SOFRENDO */
//função que preenche os campos do formulário com dados aleatorios apenas para teste

var pw = 1;
function preencherCampos() {
    document.getElementById("rgprof").value = "123456789" + pw;
    document.getElementById("sigla").value = "123456789" + pw;
    document.getElementById("disciplina").value = "123456789" + pw;
    document.getElementById("ano").value = "123456789" +  pw;
    document.getElementById("semestre").value = "123456789" + pw;
    document.getElementById("horario").value = "123456789" + pw;
    pw++;
}


function salvarJSON() {
    var tabela = document.getElementById("tabela-profdisc").getElementsByTagName("tbody")[0];
    var dados = [];
    for (var i = 0; i < tabela.rows.length; i++) {
      dados.push({
        "rgprof": tabela.rows[i].cells[0].innerHTML,
        "sigla": tabela.rows[i].cells[1].innerHTML,
        "disciplina": tabela.rows[i].cells[2].innerHTML,
        "ano": tabela.rows[i].cells[3].innerHTML,
        "semestre": tabela.rows[i].cells[4].innerHTML,
        "diasSemana": tabela.rows[i].cells[5].innerHTML,
        "horario": tabela.rows[i].cells[6].innerHTML
      });
    }
    
    var json = JSON.stringify(dados);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    
    var a = document.createElement('a');
    a.download = "profdisc.json";
    a.href = url;
    a.textContent = "Download profdisc.json";
    
    document.body.appendChild(a);
    
    localStorage.setItem("profdisc", json);
    
    alert("Dados salvos com sucesso!");
}

  
function verificarLocalStorage() {
    var profdiscJson = localStorage.getItem("profdisc");
    if (profdiscJson) {
      var profdisc = JSON.parse(profdiscJson);
      console.log("Dados encontrados no localStorage:", profdisc);
    } else {
      console.log("Não há dados salvos no localStorage.");
    }
}

function preencherTabelaStorage() {
    var tabela = document.getElementById("tabela-profdisc").getElementsByTagName("tbody")[0];
    tabela.innerHTML = ""; 
  
    var profdiscJson = localStorage.getItem("profdisc");
    if (profdiscJson) {
      var profdisc = JSON.parse(profdiscJson);
      profdisc.forEach(function (profdisc) {
        var row = tabela.insertRow();
        row.insertCell().innerHTML = profdisc.rgprof;
        row.insertCell().innerHTML = profdisc.sigla;
        row.insertCell().innerHTML = profdisc.disciplina;
        row.insertCell().innerHTML = profdisc.ano;
        row.insertCell().innerHTML = profdisc.semestre;
        row.insertCell().innerHTML = profdisc.diasSemana;
        row.insertCell().innerHTML = profdisc.horario;
      });
    } else {
      console.log("Não há dados salvos no localStorage.");
    }
}



function sair() {
    window.close();
}