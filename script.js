let tarefas = [];

// Carregar tarefas quando a página abrir
window.onload = function() {
    let tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(tarefa => {
            criarElementoTarefa(tarefa);
        });
    }
};

function adicionarTarefa() {

    let data = document.getElementById("data").value;
    let horario = document.getElementById("horario").value;
    let texto = document.getElementById("tarefa").value;

    if (texto === "" || data === "") {
        alert("Preencha a data e a tarefa!");
        return;
    }

    let novaTarefa = {
        data: data,
        hora: horario,
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    criarElementoTarefa(novaTarefa);

    document.getElementById("tarefa").value = "";
}


function criarElementoTarefa(tarefa) {

    let hoje = new Date().toISOString().split("T")[0];

    let lista;

    if (tarefa.data === hoje) {
        lista = document.getElementById("tarefasHoje");
    } else {
        lista = document.getElementById("tarefasFuturas");
    }

    let li = document.createElement("li");
let texto = document.createElement("span");

texto.textContent = `📅 ${formatarData(tarefa.data)} ⏰ ${tarefa.hora} - ${tarefa.texto}`;



    if (tarefa.concluida) {
        texto.classList.add("concluida");
    }

    texto.addEventListener("click", function() {
        tarefa.concluida = !tarefa.concluida;
        texto.classList.toggle("concluida");
        salvarTarefas();
    });

    let botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "❌";
    botaoExcluir.style.marginLeft = "10px";

    botaoExcluir.addEventListener("click", function() {
        lista.removeChild(li);
        tarefas = tarefas.filter(t => t !== tarefa);
        salvarTarefas();
    });

    li.appendChild(texto);
    li.appendChild(botaoExcluir);

    lista.appendChild(li);
}

function formatarData(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}





function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
