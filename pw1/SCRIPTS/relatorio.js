function mostrarDadosProfessores() {
  var emails = document.getElementById("dados-emails").value;
  
  if (emails == "") {
    alert("Digite o número de emails a serem exibidos");
    document.getElementById("dados-emails").style.backgroundColor = "#ff0000";
    setTimeout(function() {
      document.getElementById("dados-emails").style.backgroundColor = "#ffffff";
    }, 3000);
  } else {
    if (isNaN(emails)) {
      alert("Digite apenas números");
      document.getElementById("dados-emails").style.backgroundColor = "#ff0000";
      setTimeout(function() {
        document.getElementById("dados-emails").style.backgroundColor = "#ffffff";
      }, 3000);
    } else {
      alert("Número de emails a serem exibidos: " + emails);
      var professores = JSON.parse(localStorage.getItem("professores"));
      var professoresEncontrados = [];
      
      for (var i = 0; i < professores.length; i++) {
        if (professores[i].email.length >= emails) {
          professoresEncontrados.push(professores[i]);
        }
      }
      
      if (professoresEncontrados.length > 0) {
        var tabelaWrapper = document.getElementById("tabela");
        var tabela = document.createElement("table");
        tabela.id = "tabela-professor";
        tabela.classList.add("table-wrapper");
        
        var cabecalho = tabela.createTHead();
        var cabecalhoLinha = cabecalho.insertRow();
        var cabecalhoCelulas = [
          "Registro", "Nome", "Nascimento", "Sexo", "Área de pesquisa", "Universidade", "E-mails", "Telefones"
        ];
        
        for (var j = 0; j < cabecalhoCelulas.length; j++) {
          var cabecalhoCelula = document.createElement("th");
          cabecalhoCelula.textContent = cabecalhoCelulas[j];
          cabecalhoLinha.appendChild(cabecalhoCelula);
        }
        
        tabela.appendChild(cabecalho);
        
        var corpo = document.createElement("tbody");
        tabela.appendChild(corpo);
        
        tabelaWrapper.innerHTML = "";
        tabelaWrapper.appendChild(tabela);
        
        tabela.style.width = "800px";
        tabela.style.borderCollapse = "collapse";
        tabela.style.float = "left";
        tabela.style.marginRight = "5px";
        tabela.style.marginLeft = "20px";
        tabela.style.marginBottom = "20px";
        tabela.style.marginTop = "20px";
        tabela.style.borderRadius = "20px";
        
        var linhas = tabela.getElementsByTagName("tr");
        for (var k = 0; k < linhas.length; k++) {
          linhas[k].style.backgroundColor = "#f2f2f2";
        }
        
        var celulasCabecalho = tabela.getElementsByTagName("th");
        for (var l = 0; l < celulasCabecalho.length; l++) {
          celulasCabecalho[l].style.backgroundColor = "#b8cbcf";
          celulasCabecalho[l].style.padding = "5px";
          celulasCabecalho[l].style.borderBottom = "1px solid #372994";
        }
        
        var celulasCorpo = tabela.getElementsByTagName("td");
        for (var m = 0; m < celulasCorpo.length; m++) {
          celulasCorpo[m].style.padding = "5px";
          celulasCorpo[m].style.borderBottom = "1px solid #372994";
        }
        
        for (var n = 0; n < professoresEncontrados.length; n++) {
          var professor = professoresEncontrados[n];
          var professorLinha = corpo.insertRow();
          var professorCelulas = [
            professor.registro,
            professor.nome,
            professor.nascimento,
            professor.sexo,
            professor.pesquisa,
            professor.universidade,
            professor.email,
            professor.telefone
          ];
          
          for (var o = 0; o < professorCelulas.length; o++) {
            var professorCelula = professorLinha.insertCell();
            professorCelula.textContent = professorCelulas[o];
          }
        }
      } else {
        alert("Nenhum professor encontrado com este número de emails ou mais");
        var img = document.createElement("img");
        img.src = "../HTMLS/sad.gif";
        img.style.position = "absolute";
        img.style.left = "50%";
        img.style.top = "50%";
        img.style.transform = "translate(-50%, -50%)";
        img.style.width = "100px";
        img.style.height = "100px";
        document.body.appendChild(img);
        setTimeout(function() {
          document.body.removeChild(img);
        }, 3000);
      }
    }
  }
}


function mostrarDadosDisciplina() {
    var tabelaWrapper = document.getElementById("tabela");
    var livroInput = document.getElementById("dados-livros").value;
    var disciplinas = JSON.parse(localStorage.getItem("disciplinas"));
  
    // Cria a tabela (mantive o código original)
    var tabela = document.createElement("table");
    tabela.id = "tabela-disciplina";
    tabela.classList.add("table-wrapper");
  
    var cabecalho = tabela.createTHead();
    var cabecalhoLinha = cabecalho.insertRow();
    var cabecalhoCelulas = ["Sigla", "Nome", "Ementa", "Livros", "Número de créditos", "Carga horária"];
  
    for (var i = 0; i < cabecalhoCelulas.length; i++) {
      var cabecalhoCelula = document.createElement("th");
      cabecalhoCelula.textContent = cabecalhoCelulas[i];
      cabecalhoLinha.appendChild(cabecalhoCelula);
    }
  
    tabela.appendChild(cabecalho);
  
    var corpo = document.createElement("tbody");
    tabela.appendChild(corpo);
  
    tabelaWrapper.innerHTML = "";
    tabelaWrapper.appendChild(tabela);
  
    tabela.style.width = "800px";
    tabela.style.borderCollapse = "collapse";
    tabela.style.float = "left";
    tabela.style.marginRight = "5px";
    tabela.style.marginLeft = "20px";
    tabela.style.marginBottom = "20px";
    tabela.style.marginTop = "20px";
    tabela.style.borderRadius = "20px";
  
    var linhas = tabela.getElementsByTagName("tr");
    for (var j = 0; j < linhas.length; j++) {
      linhas[j].style.backgroundColor = "#f2f2f2";
    }
  
    var celulasCabecalho = tabela.getElementsByTagName("th");
    for (var k = 0; k < celulasCabecalho.length; k++) {
      celulasCabecalho[k].style.backgroundColor = "#b8cbcf";
      celulasCabecalho[k].style.padding = "5px";
      celulasCabecalho[k].style.borderBottom = "1px solid #372994";
    }
  
    var celulasCorpo = tabela.getElementsByTagName("td");
    for (var l = 0; l < celulasCorpo.length; l++) {
      celulasCorpo[l].style.padding = "5px";
      celulasCorpo[l].style.borderBottom = "1px solid #372994";
    }
  
    // Verifica se o livro digitado corresponde a alguma disciplina e adiciona à tabela
    for (var m = 0; m < disciplinas.length; m++) {
      if (disciplinas[m].livros.includes(livroInput)) {
        var disciplinaLinha = corpo.insertRow();
        var disciplinaCelulas = [
          disciplinas[m].sigla,
          disciplinas[m].nome,
          disciplinas[m].ementa,
          disciplinas[m].livros,
          disciplinas[m].creditos,
          disciplinas[m].cargaHoraria
        ];
  
        for (var n = 0; n < disciplinaCelulas.length; n++) {
          var disciplinaCelula = disciplinaLinha.insertCell();
          disciplinaCelula.textContent = disciplinaCelulas[n];
        }
      }
    }
}
  
function mostrardiscdia(){
  var dia = document.getElementById("dados-dia").value;
  if (dia == "#"){
    alert("Selecione um dia da semana");
    document.getElementById("dados-dia").style.backgroundColor = "#ff0000";
    setTimeout(function(){document.getElementById("dados-dia").style.backgroundColor = "#ffffff";}, 3000);
    return;
  }else{
    alert("Dia selecionado: " + dia);
    var rf = prompt("Digite o RF do professor");
    var professores = JSON.parse(localStorage.getItem("professores"));
    var prof = false;
    for (var i = 0; i < professores.length; i++){
      if (professores[i].registro == rf){
        prof = true;
        alert("Professor encontrado, este é o professor " + professores[i].nome);
        varrelac = JSON.parse(localStorage.getItem("profdisc"));
        var profdisc = false;
        for (var j = 0; j < varrelac.length; j++){
          if (varrelac[j].rf == rf && varrelac[j].dia == dia){
            profdisc = true;
            alert("Disciplina encontrada, esta é a disciplina " + varrelac[j].sigla);
            var disciplinas = JSON.parse(localStorage.getItem("disciplinas"));
            for (var k = 0; k < disciplinas.length; k++){
              if (disciplinas[k].sigla == varrelac[j].sigla){
                alert("Nome da disciplina: " + disciplinas[k].nome + "\nEmenta: " + disciplinas[k].ementa + "\nLivros: " + disciplinas[k].livros + "\nNúmero de créditos: " + disciplinas[k].creditos + "\nCarga horária: " + disciplinas[k].cargaHoraria);
              }
            }
          }else{
            profdisc = false;
            alert("Professor não ministra nenhuma disciplina no dia selecionado");
          }



        }
        }else{
          prof = false;
          alert("Professor não encontrado");
        }
        

      }
    }
}



function sair() {
  window.close();
}