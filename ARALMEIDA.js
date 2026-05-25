/* MENU MOBILE */

const menuMobile = document.getElementById("menu-mobile");
const nav = document.getElementById("nav");

if(menuMobile && nav){

    menuMobile.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}

/* LOGIN */

const btnLogin = document.getElementById("btnLogin");

if(btnLogin){

    btnLogin.addEventListener("click", async () => {

        const senha = document.getElementById("senhaAdmin").value;

        try{

            const resposta = await fetch("login.php", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    senha
                })

            });

            const dados = await resposta.json();

            if(dados.status === "ok"){

                mostrarPainel();

            }else{

                alert("Senha incorreta");

            }

        }catch(e){

            console.log(e);

            alert("Erro ao fazer login");

        }

    });

}

/* MOSTRAR */

function mostrarPainel(){

    const loginAdmin = document.getElementById("loginAdmin");
    const painelEventos = document.getElementById("painelEventos");

    if(loginAdmin){
        loginAdmin.style.display = "none";
    }

    if(painelEventos){
        painelEventos.style.display = "block";
    }

}

/* ESCONDER */

function esconderPainel(){

    const loginAdmin = document.getElementById("loginAdmin");
    const painelEventos = document.getElementById("painelEventos");

    if(loginAdmin){
        loginAdmin.style.display = "block";
    }

    if(painelEventos){
        painelEventos.style.display = "none";
    }

}

/* VERIFICAR LOGIN */

async function verificarLogin(){

    try{

        const resposta = await fetch("verifica.php");

        const dados = await resposta.json();

        if(dados.logado){

            mostrarPainel();

        }else{

            esconderPainel();

        }

    }catch(e){

        console.log(e);

    }

}

/* LOGOUT */

async function logoutAdmin(){

    try{

        await fetch("logout.php");

        esconderPainel();

        location.reload();

    }catch(e){

        console.log(e);

    }

}

/* CALENDÁRIO */

const mesAno = document.getElementById("mesAno");
const diasContainer = document.getElementById("dias");
const listaEventos = document.getElementById("lista-eventos");

const prevMes = document.getElementById("prevMes");
const nextMes = document.getElementById("nextMes");

const formEvento = document.getElementById("formEvento");

let dataAtual = new Date();

let eventos = {};

/* RENDERIZAR CALENDÁRIO */

function renderizarCalendario(){

    if(!diasContainer || !mesAno) return;

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1).getDay();

    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    const meses = [
        "Janeiro","Fevereiro","Março","Abril",
        "Maio","Junho","Julho","Agosto",
        "Setembro","Outubro","Novembro","Dezembro"
    ];

    mesAno.innerText = `${meses[mes]} ${ano}`;

    diasContainer.innerHTML = "";

    /* DIAS VAZIOS */

    for(let i = 0; i < primeiroDia; i++){

        diasContainer.innerHTML += `
            <div class="dia numero-vazio"></div>
        `;

    }

    /* DIAS DO MÊS */

    for(let dia = 1; dia <= ultimoDia; dia++){

        const dataCompleta =
        `${ano}-${String(mes + 1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;

        let eventoHTML = "";

        if(eventos[dataCompleta]){

            eventoHTML = `
                <div class="evento">
                    ${eventos[dataCompleta]}
                </div>
            `;

        }

        diasContainer.innerHTML += `
            <div class="dia">

                <div class="numero">
                    ${dia}
                </div>

                ${eventoHTML}

            </div>
        `;

    }

}

/* CARREGAR EVENTOS */

async function carregarEventos(){

    try{

        const resposta = await fetch("listar_eventos.php");

        const texto = await resposta.text();

        console.log("LISTAR EVENTOS:", texto);

        const dados = JSON.parse(texto);

        eventos = {};

        if(listaEventos){
            listaEventos.innerHTML = "";
        }

        dados.forEach(evento => {

            eventos[evento.data] = evento.nome;

            if(listaEventos){

                listaEventos.innerHTML += `

                    <div class="item-evento">

                        <div>

                            <strong>${evento.data}</strong><br>

                            <span>${evento.nome}</span>

                        </div>

                        <button
                        class="btn-excluir"
                        onclick="excluirEvento(${evento.id})">

                            Excluir

                        </button>

                    </div>

                `;

            }

        });

        renderizarCalendario();

    }catch(e){

        console.log(e);

    }

}

/* SALVAR EVENTO */

if(formEvento){

    formEvento.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const data = document.getElementById("dataEvento").value;

        const nome = document.getElementById("nomeEvento").value;

        if(!data || !nome){

            alert("Preencha todos os campos");

            return;

        }

        try{

            const resposta = await fetch("salvar_evento.php", {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    data,
                    nome
                })

            });

            const texto = await resposta.text();

            console.log("RESPOSTA PHP:", texto);

            const dados = JSON.parse(texto);

            console.log(dados);

            if(dados.status === "ok"){

                alert("Evento salvo com sucesso!");

                await carregarEventos();

                renderizarCalendario();

                formEvento.reset();

            }else{

                console.log(dados);

                alert(dados.mensagem || "Erro ao salvar evento");

            }

        }catch(e){

            console.log("ERRO:", e);

            alert("Erro no servidor PHP");

        }

    });

}

/* EXCLUIR EVENTO */

async function excluirEvento(id){

    const confirmar = confirm("Deseja excluir este evento?");

    if(!confirmar) return;

    try{

        const resposta = await fetch("excluir_evento.php", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                id
            })

        });

        const dados = await resposta.json();

        if(dados.status === "ok"){

            alert("Evento excluído!");

            carregarEventos();

        }else{

            alert(dados.mensagem || "Erro ao excluir");

        }

    }catch(e){

        console.log(e);

        alert("Erro no servidor");

    }

}

/* BOTÕES CALENDÁRIO */

if(prevMes){

    prevMes.addEventListener("click", ()=>{

        dataAtual.setMonth(dataAtual.getMonth() - 1);

        renderizarCalendario();

    });

}

if(nextMes){

    nextMes.addEventListener("click", ()=>{

        dataAtual.setMonth(dataAtual.getMonth() + 1);

        renderizarCalendario();

    });

}

/* AGENDAMENTO */

const formAgendamento = document.getElementById("formAgendamento");

if(formAgendamento){

    formAgendamento.addEventListener("submit", function(){

        setTimeout(() => {

            alert("Mensagem enviada com sucesso!");

        }, 1500);

    });

}

/* PDF */

const pdfInput = document.getElementById("pdfInput");

if(pdfInput){

    pdfInput.addEventListener("change", function () {

        const fileName = this.files[0]
        ? this.files[0].name
        : "Nenhum arquivo selecionado";

        document.getElementById("nomeArquivo").textContent = fileName;

    });

}

/* INICIAR */

verificarLogin();

carregarEventos();

renderizarCalendario();