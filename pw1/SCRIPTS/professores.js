let professores = [];

function preencherTabela() {
    if (document.getElementById("registro").value == "" || document.getElementById("nome").value == "" || document.getElementById("nascimento").value == "" || document.getElementById("sexo").value == "" || document.getElementById("pesquisa").value == "" || document.getElementById("universidade").value == "" || document.getElementById("email").value == "" || document.getElementById("telefone").value == "") {
        alert("Preencha todos os campos!");
        return;
    }
    let preenchido = false;
    for (var i = 0; i < professores.length; i++) {
        if (professores[i].registro == document.getElementById("registro").value) {
            preenchido = true;
            break;
        }
    }
    if (preenchido) {
        alert("Registro já cadastrado! tente novamente com outro registro.");
        return;
    }

    var registro = document.getElementById("registro").value;
    var nome = document.getElementById("nome").value;
    var nascimento = document.getElementById("nascimento").value;
    var sexo = document.querySelector("#sexo").options[document.querySelector("#sexo").selectedIndex].value;
    var pesquisa = document.getElementById("pesquisa").value;
    var universidade = document.getElementById("universidade").value;
    var email = document.getElementById("email").value.split(",");
    var telefone = document.getElementById("telefone").value;

    for (var i = 0; i < professores.length; i++) {
        if (professores[i].registro == registro) {
            alert("Registro já cadastrado! tente novamente com outro registro.");
            return;
        }
    }

    let existe = false;
    for (var i = 0; i < professores.length; i++) {
        if (professores[i].sigla == registro) {
            existe = true;
            break;
        }
    }

    // insere a disciplina no array
    professores.push({
        registro: registro,
        nome: nome,
        nascimento: nascimento,
        sexo: sexo,
        pesquisa: pesquisa,
        universidade: universidade,
        email: email,
        telefone: telefone
    });


    var tabela = document.getElementById("tabela-professores").getElementsByTagName("tbody")[0];
    var novaLinha = tabela.insertRow();

    var colunaRegistro = novaLinha.insertCell();
    var colunaNome = novaLinha.insertCell();
    var colunaNascimento = novaLinha.insertCell();
    var colunaSexo = novaLinha.insertCell();
    var colunapesquisa = novaLinha.insertCell();
    var colunaUniversidade = novaLinha.insertCell();
    var colunaEmail = novaLinha.insertCell();
    var colunaTelefone = novaLinha.insertCell();

    colunaRegistro.innerHTML = registro;
    colunaNome.innerHTML = nome;
    colunaNascimento.innerHTML = nascimento;
    colunaSexo.innerHTML = sexo;
    colunapesquisa.innerHTML = pesquisa;
    colunaUniversidade.innerHTML = universidade;
    colunaEmail.innerHTML = email;
    colunaTelefone.innerHTML = telefone;

    document.getElementById("registro").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("pesquisa").value = "";
    document.getElementById("universidade").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";


}


function incluirProfessor() {
    preencherTabela();
}

// Função para alterar uma disciplina que busca a disciplina a partir da registro
function alterarProfessor() {
    var professoresJson = localStorage.getItem("professores");
    if (!professoresJson) {
        alert("Não há professores cadastrados");
        return;
    }

    var professores = JSON.parse(professoresJson);

    // Recebe do usuário a registro da disciplina que deseja alterar
    var alterar = prompt("Digite a registro da disciplina que deseja alterar: ");
    for (var i = 0; i < professores.length; i++) {
        if (professores[i].registro == alterar) {
            alert("Disciplina encontrada, alterando: ");

            // Destaca a linha da tabela que contém a disciplina alterada
            var tabela = document.getElementById("tabela-professores").getElementsByTagName("tbody")[0];
            tabela.rows[i].style.backgroundColor = "yellow";

            // Faz a linha destacada sumir depois de 5 segundos
            setTimeout(function () {
                tabela.rows[i].style.backgroundColor = "white";
            }, 5000);

            var nome = prompt("Digite o novo nome: ");
            var nascimento = prompt("Digite o novo nascimento: ");
            var sexo = prompt("Digite o novo sexo: ");
            var pesquisa = prompt("Digite o novo pesquisa: ");
            var universidade = prompt("Digite o novo universidade: ");
            var email = prompt("Digite o novo email: ");
            var telefone = prompt("Digite o novo telefone: ");

            professores[i].nome = nome;
            professores[i].nascimento = nascimento;
            professores[i].sexo = sexo;
            professores[i].pesquisa = pesquisa;
            professores[i].universidade = universidade;
            professores[i].email = email;
            professores[i].telefone = telefone;

            localStorage.setItem("professores", JSON.stringify(professores));

            // Atualiza a tabela
            tabela.rows[i].cells[1].innerHTML = nome;
            tabela.rows[i].cells[2].innerHTML = nascimento;
            tabela.rows[i].cells[3].innerHTML = sexo;
            tabela.rows[i].cells[4].innerHTML = pesquisa;
            tabela.rows[i].cells[5].innerHTML = universidade;
            tabela.rows[i].cells[6].innerHTML = email;
            tabela.rows[i].cells[7].innerHTML = telefone;

            return;
        }
    }

    alert("Disciplina não encontrada");
}


// Função para excluir uma disciplina
function excluirProfessor() {
    var professoresJson = localStorage.getItem("professores");
    if (!professoresJson) {
        alert("Não há professores cadastrados");
        return;
    }

    var professores = JSON.parse(professoresJson);

    // Recebe do usuário a registro da disciplina que deseja excluir
    var excluir = prompt("Digite a registro da disciplina que deseja excluir: ");
    for (var i = 0; i < professores.length; i++) {
        if (professores[i].registro == excluir) {
            alert("Disciplina encontrada, excluindo: ");

            var tabela = document.getElementById("tabela-professores").getElementsByTagName("tbody")[0];
            tabela.rows[i].style.backgroundColor = "red";

            setTimeout(function() {
                tabela.deleteRow(i);
            }, 5000);

            // Exclui a disciplina do array de professores
            professores.splice(i, 1);

            // Atualiza o localStorage com o array de professores modificado
            localStorage.setItem("professores", JSON.stringify(professores));

            alert("Disciplina excluída com sucesso!");

            document.getElementById("registro").value = "";
            document.getElementById("nome").value = "";
            document.getElementById("nascimento").value = "";
            document.getElementById("sexo").value = "";
            document.getElementById("pesquisa").value = "";
            document.getElementById("carga-horaria").value = "";

            return;
        }
    }

    alert("Disciplina não encontrada!");
}


// Função para listar uma disciplina a partir da registro
function listarProfessor() {
    var professoresJson = localStorage.getItem("professores");
    if (!professoresJson) {
        alert("Não há professores cadastrados");
        return;
    }

    var professores = JSON.parse(professoresJson);

    // Recebe do usuário a registro da disciplina que deseja listar
    var listar = prompt("Digite a registro da disciplina que deseja listar: ");
    for (var i = 0; i < professores.length; i++) {
        if (professores[i].registro == listar) {
            alert("Disciplina encontrada, listando: ");

            // Destaca a linha da tabela que contém a disciplina listada
            var tabela = document.getElementById("tabela-professores").getElementsByTagName("tbody")[0];
            tabela.rows[i].style.backgroundColor = "blue";

            // Faz a linha destacada voltar ao normal depois de 5 segundos
            setTimeout(function() {
                tabela.rows[i].style.backgroundColor = "white";
            }, 5000);

            // Exibe os dados da disciplina listada
            alert("Registro: " + professores[i].registro +
                  "\nNome: " + professores[i].nome +
                  "\nNascimento: " + professores[i].nascimento +
                  "\nSexo: " + professores[i].sexo +
                  "\nPesquisa: " + professores[i].pesquisa +
                  "\nUniversidade: " + professores[i].universidade);

            document.getElementById("registro").value = "";
            document.getElementById("nome").value = "";
            document.getElementById("nascimento").value = "";
            document.getElementById("sexo").value = "";
            document.getElementById("pesquisa").value = "";
            document.getElementById("carga-horaria").value = "";

            return;
        }
    }

    alert("Disciplina não encontrada!");
}



// Função para listar todas as professores
function listarTodosProfessores() {
    var professoresJson = localStorage.getItem("professores");
    if (!professoresJson) {
        alert("Não há professores cadastrados");
        return;
    }

    var professores = JSON.parse(professoresJson);

    alert("Listando todas as professores:");

    // Destaca todas as linhas da tabela
    var tabela = document.getElementById("tabela-professores").getElementsByTagName("tbody")[0];
    for (var i = 0; i < professores.length; i++) {
        tabela.rows[i].style.backgroundColor = "yellow";
    }

    // Faz as linhas destacadas voltarem ao normal depois de 5 segundos
    setTimeout(function() {
        for (var i = 0; i < professores.length; i++) {
            tabela.rows[i].style.backgroundColor = "white";
        }
    }, 5000);

    // Exibe os dados de todas as professores
    for (var i = 0; i < professores.length; i++) {
        alert("Registro: " + professores[i].registro +
              "\nNome: " + professores[i].nome +
              "\nNascimento: " + professores[i].nascimento +
              "\nSexo: " + professores[i].sexo +
              "\nPesquisa: " + professores[i].pesquisa +
              "\nUniversidade: " + professores[i].universidade);
    }

    document.getElementById("registro").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("pesquisa").value = "";
    document.getElementById("carga-horaria").value = "";
}

/* --------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------
FUNÇÕES APENAS PARA TESTES - JHOW ESTÁ SOFRENDO */
//função que preenche os campos do formulário com dados aleatorios apenas para teste

var pw = 1;
function preencherCampos(){
    // preenche os campos do formulário com dados aleatorios
    document.getElementById("registro").value = pw;
    document.getElementById("nome").value = "Nome para Teste " + pw;
    document.getElementById("nascimento").value = "01/01/200" + pw;
    document.getElementById("sexo").text = "Masculino" + pw;
    document.getElementById("pesquisa").value = "pesquisa em numero " + pw;
    document.getElementById("universidade").value = pw + "º" + " Universidade";
    document.getElementById("email").value = "emailTeste" + pw + "@gmail.com";
    document.getElementById("telefone").value = "(16)9 9999-999" + pw;
    pw++;
    
}


//FUNÇÃO QUE PEGA OS VALORES DA TABELA E SALVA EM JSON
function salvarJSON() {
    var tabela = document.getElementById("tabela-professores").getElementsByTagName("tbody")[0];
    var dados = [];
    for (var i = 0; i < professores.length; i++) {
      dados.push({
        registro: professores[i].registro,
        nome: professores[i].nome,
        nascimento: professores[i].nascimento,
        sexo: professores[i].sexo,
        pesquisa: professores[i].pesquisa,
        universidade: professores[i].universidade,
        email: professores[i].email,
        telefone: professores[i].telefone
      });
    }
  
    var json = JSON.stringify(dados);
    var blob = new Blob([json], {type: "application/json"});
    var url = URL.createObjectURL(blob);
  
    var a = document.createElement('a');
    a.download = "professores.json";
    a.href = url;
    a.textContent = "Download professores.json";
  
    document.body.appendChild(a);

    localStorage.setItem("professores", json);
    
    alert("Dados salvos com sucesso!");
}

function verificarLocalStorage() {
    var professoresJson = localStorage.getItem("professores");
    if (professoresJson) {
      var professores = JSON.parse(professoresJson);
      console.log("Dados encontrados no localStorage:", professores);
    } else {
      console.log("Não há dados salvos no localStorage.");
    }
  }
  
  function preencherTabelaStorage() {
    var tabela = document.getElementById("tabela-professores").getElementsByTagName("tbody")[0];
    tabela.innerHTML = ""; // Limpa o conteúdo da tabela antes de preencher
  
    var professoresJson = localStorage.getItem("professores");
    if (professoresJson) {
      var professores = JSON.parse(professoresJson);
      professores.forEach(function (professor) {
        var row = tabela.insertRow();
        row.insertCell().innerHTML = professor.registro;
        row.insertCell().innerHTML = professor.nome;
        row.insertCell().innerHTML = professor.nascimento;
        row.insertCell().innerHTML = professor.sexo;
        row.insertCell().innerHTML = professor.pesquisa;
        row.insertCell().innerHTML = professor.universidade;
        row.insertCell().innerHTML = professor.email;
        row.insertCell().innerHTML = professor.telefone;
      });
    } else {
      console.log("Não há dados salvos no localStorage.");
    }
}
  
  

function sair() {
    window.close();
}
  



  