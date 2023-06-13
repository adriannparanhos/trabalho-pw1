let disciplinas = [];

function preencherTabela() {
  // Verifica se o formulário está preenchido
  if (
    document.getElementById("sigla").value == "" ||
    document.getElementById("nome").value == "" ||
    document.getElementById("ementa").value == "" ||
    document.getElementById("livros").value == "" ||
    document.getElementById("creditos").value == "" ||
    document.getElementById("carga-horaria").value == ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  const sigla = document.getElementById("sigla").value;

  const siglaExiste = disciplinas.some((disciplina) => {
    return disciplina.sigla === sigla;
  });

  if (siglaExiste) {
    alert("Sigla já cadastrada! Tente novamente com outra sigla.");
    return;
  }

  const nome = document.getElementById("nome").value;
  const ementa = document.getElementById("ementa").value;
  const livros = document.getElementById("livros").value.split(",");
  const creditos = document.getElementById("creditos").value;
  const cargaHoraria = document.getElementById("carga-horaria").value;

  disciplinas.push({
    sigla: sigla,
    nome: nome,
    ementa: ementa,
    livros: livros,
    creditos: creditos,
    cargaHoraria: cargaHoraria,
  });

  const tabela = document.getElementById("tabela-disciplinas").getElementsByTagName("tbody")[0];
  tabela.innerHTML = "";

  // Preenche a tabela com os dados das disciplinas
  disciplinas.forEach((disciplina) => {
    const novaLinha = tabela.insertRow();
    const colunaSigla = novaLinha.insertCell();
    const colunaNome = novaLinha.insertCell();
    const colunaEmenta = novaLinha.insertCell();
    const colunaLivros = novaLinha.insertCell();
    const colunaCreditos = novaLinha.insertCell();
    const colunaCargaHoraria = novaLinha.insertCell();

    colunaSigla.innerHTML = disciplina.sigla;
    colunaNome.innerHTML = disciplina.nome;
    colunaEmenta.innerHTML = disciplina.ementa;
    colunaLivros.innerHTML = disciplina.livros;
    colunaCreditos.innerHTML = disciplina.creditos;
    colunaCargaHoraria.innerHTML = disciplina.cargaHoraria;
  });

  // Limpa os campos do formulário
  document.getElementById("sigla").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("ementa").value = "";
  document.getElementById("livros").value = "";
  document.getElementById("creditos").value = "";
  document.getElementById("carga-horaria").value = "";
}

function incluirDisciplina() {
  preencherTabela();
}


function alterarDisciplina() {
    var disciplinasJson = localStorage.getItem("disciplinas");
    if (!disciplinasJson) {
        alert("Não há disciplinas cadastradas");
        return;
    }

    var disciplinas = JSON.parse(disciplinasJson);

    if (disciplinas.length == 0) {
        alert("Não há disciplinas cadastradas");
        return;
    } else {
        alert("Insira a sigla da disciplina que deseja alterar: ");
        var alterar = prompt("Digite a sigla da disciplina que deseja alterar: ");
        for (var i = 0; i < disciplinas.length; i++) {
            if (disciplinas[i].sigla == alterar) {
                alert("Disciplina encontrada, altere os dados: ");
                disciplinas[i].nome = prompt("Digite o novo nome: ");
                disciplinas[i].ementa = prompt("Digite a nova ementa: ");
                disciplinas[i].livros = prompt("Digite os novos livros: ");
                disciplinas[i].creditos = parseInt(prompt("Digite o novo número de créditos: "));
                while (isNaN(disciplinas[i].creditos)) {
                    alert("Digite um número válido para o número de créditos: ");
                    disciplinas[i].creditos = parseInt(prompt("Digite o novo número de créditos: "));
                }
                disciplinas[i].cargaHoraria = parseInt(prompt("Digite a nova carga horária: "));
                while (isNaN(disciplinas[i].cargaHoraria)) {
                    alert("Digite um número válido para a carga horária: ");
                    disciplinas[i].cargaHoraria = parseInt(prompt("Digite a nova carga horária: "));
                }
                alert("Disciplina alterada com sucesso!");

                localStorage.setItem("disciplinas", JSON.stringify(disciplinas));

                document.getElementById("sigla").value = "";
                document.getElementById("nome").value = "";
                document.getElementById("ementa").value = "";
                document.getElementById("livros").value = "";
                document.getElementById("creditos").value = "";
                document.getElementById("carga-horaria").value = "";

                var tabela = document.getElementById("tabela-disciplinas").getElementsByTagName("tbody")[0];
                tabela.innerHTML = "";
                for (var i = 0; i < disciplinas.length; i++) {
                    var novaLinha = tabela.insertRow();

                    var colunaSigla = novaLinha.insertCell();
                    var colunaNome = novaLinha.insertCell();
                    var colunaEmenta = novaLinha.insertCell();
                    var colunaLivros = novaLinha.insertCell();
                    var colunaCreditos = novaLinha.insertCell();
                    var colunaCargaHoraria = novaLinha.insertCell();

                    colunaSigla.innerHTML = disciplinas[i].sigla;
                    colunaNome.innerHTML = disciplinas[i].nome;
                    colunaEmenta.innerHTML = disciplinas[i].ementa;
                    colunaLivros.innerHTML = disciplinas[i].livros;
                    colunaCreditos.innerHTML = disciplinas[i].creditos;
                    colunaCargaHoraria.innerHTML = disciplinas[i].cargaHoraria;
                }
                return;
            }
        }
    }
    alert("Disciplina não encontrada!");
}


// Função para excluir uma disciplina
function excluirDisciplina() {
    var disciplinasJson = localStorage.getItem("disciplinas");
    if (!disciplinasJson) {
        alert("Não há disciplinas cadastradas");
        return;
    }

    var disciplinas = JSON.parse(disciplinasJson);

    if (disciplinas.length == 0) {
        alert("Não há disciplinas cadastradas");
        return;
    } else {
        alert("Insira a sigla da disciplina que deseja excluir: ");
        // Recebe do usuário a sigla que o usuário quer excluir a partir do prompt
        var excluir = prompt("Digite a sigla da disciplina que deseja excluir: ");
        for (var i = 0; i < disciplinas.length; i++) {
            if (disciplinas[i].sigla == excluir) {
                alert("Disciplina encontrada, excluindo: ");
                // Destaca a linha da tabela que contém a disciplina excluída
                var tabela = document.getElementById("tabela-disciplinas").getElementsByTagName("tbody")[0];
                tabela.rows[i].style.backgroundColor = "red";
                // Faz a linha destacada sumir depois de 5 segundos
                setTimeout(function() {
                    tabela.deleteRow(i);
                }, 5000);
                // Exclui a disciplina do array
                disciplinas.splice(i, 1);
                alert("Disciplina excluída com sucesso!");

                // Atualiza o localStorage com os novos dados das disciplinas
                localStorage.setItem("disciplinas", JSON.stringify(disciplinas));

                document.getElementById("sigla").value = "";
                document.getElementById("nome").value = "";
                document.getElementById("ementa").value = "";
                document.getElementById("livros").value = "";
                document.getElementById("creditos").value = "";
                document.getElementById("carga-horaria").value = "";

                return;
            }
        }
    }
    alert("Disciplina não encontrada!");
}


// Função para listar uma disciplina a partir da sigla
function listarDisciplina() {
    var disciplinasJson = localStorage.getItem("disciplinas");
    if (!disciplinasJson) {
        alert("Não há disciplinas cadastradas");
        return;
    }

    var disciplinas = JSON.parse(disciplinasJson);

    if (disciplinas.length == 0) {
        alert("Não há disciplinas cadastradas");
        return;
    } else {
        alert("Insira a sigla da disciplina que deseja listar: ");
        // Recebe do usuário a sigla que o usuário quer listar a partir do prompt
        var listar = prompt("Digite a sigla da disciplina que deseja listar: ");
        for (var i = 0; i < disciplinas.length; i++) {
            if (disciplinas[i].sigla == listar) {
                alert("Disciplina encontrada, listando: ");
                // Destaca a linha da tabela que contém a disciplina listada
                var tabela = document.getElementById("tabela-disciplinas").getElementsByTagName("tbody")[0];
                tabela.rows[i].style.backgroundColor = "blue";
                // Faz a linha destacada voltar ao normal depois de 5 segundos
                setTimeout(function() {
                    tabela.rows[i].style.backgroundColor = "white";
                }, 5000);

                // Exibe os dados da disciplina listada
                alert("Sigla: " + disciplinas[i].sigla + "\nNome: " + disciplinas[i].nome + "\nEmenta: " + disciplinas[i].ementa + "\nLivros: " + disciplinas[i].livros + "\nCréditos: " + disciplinas[i].creditos + "\nCarga Horária: " + disciplinas[i].cargaHoraria);

                document.getElementById("sigla").value = "";
                document.getElementById("nome").value = "";
                document.getElementById("ementa").value = "";
                document.getElementById("livros").value = "";
                document.getElementById("creditos").value = "";
                document.getElementById("carga-horaria").value = "";
                return;
            }
        }

        alert("Disciplina não encontrada!");
    }
}



// Função para listar todas as disciplinas
function listarTodasDisciplinas() {
    var disciplinasJson = localStorage.getItem("disciplinas");
    if (!disciplinasJson) {
        alert("Não há disciplinas cadastradas");
        return;
    }

    var disciplinas = JSON.parse(disciplinasJson);

    if (disciplinas.length == 0) {
        alert("Não há disciplinas cadastradas");
        return;
    } else {
        alert("Listando todas as disciplinas: ");
        // Destaca todas as linhas da tabela
        var tabela = document.getElementById("tabela-disciplinas").getElementsByTagName("tbody")[0];
        for (var i = 0; i < disciplinas.length; i++) {
            tabela.rows[i].style.backgroundColor = "yellow";
        }
        // Faz as linhas destacadas voltarem ao normal depois de 5 segundos
        setTimeout(function() {
            for (var i = 0; i < disciplinas.length; i++) {
                tabela.rows[i].style.backgroundColor = "white";
            }
        }, 5000);

        for (var i = 0; i < disciplinas.length; i++) {
            alert("Sigla: " + disciplinas[i].sigla + "\nNome: " + disciplinas[i].nome + "\nEmenta: " + disciplinas[i].ementa + "\nLivros: " + disciplinas[i].livros + "\nCréditos: " + disciplinas[i].creditos + "\nCarga Horária: " + disciplinas[i].cargaHoraria);
        }

        // Limpa os campos do formulário
        document.getElementById("sigla").value = "";
        document.getElementById("nome").value = "";
        document.getElementById("ementa").value = "";
        document.getElementById("livros").value = "";
        document.getElementById("creditos").value = "";
        document.getElementById("carga-horaria").value = "";
        return;
    }
}

/* --------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
FUNÇÕES APENAS PARA TESTES - JHOW ESTÁ SOFRENDO */
//função que preenche os campos do formulário com dados aleatorios apenas para teste

var pw = 1;
function preencherCampos(){
    // faz com que cada vez, adicione um numero diferente no final da sigla
    document.getElementById("sigla").value = "PW" + pw;
    document.getElementById("nome").value = "Programação para Web";
    document.getElementById("ementa").value = "Ementa de PW";
    document.getElementById("livros").value = "Livros de PW";
    document.getElementById("creditos").value = "4";
    document.getElementById("carga-horaria").value = "60";
    pw++;
    
}


function salvarJSON() {
    var tabela = document.getElementById("tabela-disciplinas").getElementsByTagName("tbody")[0];
    var dados = [];
    for (var i = 0; i < tabela.rows.length; i++) {
      dados.push({
        "sigla": tabela.rows[i].cells[0].innerHTML,
        "nome": tabela.rows[i].cells[1].innerHTML,
        "ementa": tabela.rows[i].cells[2].innerHTML,
        "livros": tabela.rows[i].cells[3].innerHTML,
        "creditos": tabela.rows[i].cells[4].innerHTML,
        "cargaHoraria": tabela.rows[i].cells[5].innerHTML
      });
    }
    
    var json = JSON.stringify(dados);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    
    var a = document.createElement('a');
    a.download = "disciplina.json";
    a.href = url;
    a.textContent = "Download disciplina.json";
    
    document.body.appendChild(a);
    
    localStorage.setItem("disciplinas", json);
    
    alert("Dados salvos com sucesso!");
}

function verificarLocalStorage() {
    var disciplinasJson = localStorage.getItem("disciplinas");
    if (disciplinasJson) {
      var disciplinas = JSON.parse(disciplinasJson);
      console.log("Dados encontrados no localStorage:", disciplinas);
    } else {
      console.log("Não há dados salvos no localStorage.");
    }
}

function preencherTabelaStorage() {
    var tabela = document.getElementById("tabela-disciplinas").getElementsByTagName("tbody")[0];
    tabela.innerHTML = ""; 
  
    var disciplinasJson = localStorage.getItem("disciplinas");
    if (disciplinasJson) {
      var disciplinas = JSON.parse(disciplinasJson);
      disciplinas.forEach(function (disciplina) {
        var row = tabela.insertRow();
        row.insertCell().innerHTML = disciplina.sigla;
        row.insertCell().innerHTML = disciplina.nome;
        row.insertCell().innerHTML = disciplina.ementa;
        row.insertCell().innerHTML = disciplina.livros;
        row.insertCell().innerHTML = disciplina.creditos;
        row.insertCell().innerHTML = disciplina.cargaHoraria;
      });
    } else {
      console.log("Não há dados salvos no localStorage.");
    }
}
  



function sair() {
    window.close();
}
  