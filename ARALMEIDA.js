/* MENU MOBILE */

const menuMobile = document.getElementById('menu-mobile')
const nav = document.getElementById('nav')

menuMobile.addEventListener('click', ()=>{

    nav.classList.toggle('active')

})

/* LOGIN ADMIN */

const senhaAdmin = document.getElementById('senhaAdmin')
const btnLogin = document.getElementById('btnLogin')
const painelEventos = document.getElementById('painelEventos')

const senhaCorreta = "almeida2026"

btnLogin.addEventListener('click', ()=>{

    if(senhaAdmin.value === senhaCorreta){

        painelEventos.style.display = 'block'

        document.getElementById('loginAdmin').style.display = 'none'

    }else{

        alert('Senha incorreta!')

    }

})

/* CALENDÁRIO */

const mesAno = document.getElementById('mesAno')
const diasContainer = document.getElementById('dias')
const listaEventos = document.getElementById('lista-eventos')

const prevMes = document.getElementById('prevMes')
const nextMes = document.getElementById('nextMes')

const formEvento = document.getElementById('formEvento')
const dataEvento = document.getElementById('dataEvento')
const nomeEvento = document.getElementById('nomeEvento')

let dataAtual = new Date()

let eventos = {

    '2026-05-12':'Feira Comercial',
    '2026-05-18':'Visita Técnica',
    '2026-05-25':'Reunião Parceiros',
    '2026-06-08':'Workshop Logística',
    '2026-06-22':'Evento Corporativo'

}

/* RENDER CALENDÁRIO */

function renderizarCalendario(){

    const ano = dataAtual.getFullYear()
    const mes = dataAtual.getMonth()

    const primeiroDia = new Date(ano, mes, 1).getDay()
    const ultimoDia = new Date(ano, mes + 1, 0).getDate()

    const meses = [
        'Janeiro','Fevereiro','Março','Abril',
        'Maio','Junho','Julho','Agosto',
        'Setembro','Outubro','Novembro','Dezembro'
    ]

    mesAno.innerText = `${meses[mes]} ${ano}`

    diasContainer.innerHTML = ''

    for(let i = 0; i < primeiroDia; i++){

        diasContainer.innerHTML += `
        <div class="dia numero-vazio"></div>
        `

    }

    for(let dia = 1; dia <= ultimoDia; dia++){

        const dataCompleta =
        `${ano}-${String(mes+1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`

        let eventoHTML = ''

        if(eventos[dataCompleta]){

            eventoHTML =
            `<div class="evento">${eventos[dataCompleta]}</div>`

        }

        diasContainer.innerHTML += `
        <div class="dia">

            <div class="numero">${dia}</div>

            ${eventoHTML}

        </div>
        `
    }

    renderizarListaEventos()

}

/* LISTA EVENTOS */

function renderizarListaEventos(){

    listaEventos.innerHTML = ''

    Object.keys(eventos).sort().forEach(data => {

        listaEventos.innerHTML += `
        <div class="item-evento">

            <strong>${data}</strong>

            <span>${eventos[data]}</span>

        </div>
        `

    })

}

/* ADICIONAR EVENTO */

formEvento.addEventListener('submit', (e)=>{

    e.preventDefault()

    const data = dataEvento.value
    const nome = nomeEvento.value

    eventos[data] = nome

    renderizarCalendario()

    formEvento.reset()

})

/* BOTÕES */

prevMes.addEventListener('click', ()=>{

    dataAtual.setMonth(dataAtual.getMonth() - 1)

    renderizarCalendario()

})

nextMes.addEventListener('click', ()=>{

    dataAtual.setMonth(dataAtual.getMonth() + 1)

    renderizarCalendario()

})

/* INICIAR */

renderizarCalendario()

/* AGENDAMENTO */


const formAgendamento = document.getElementById("formAgendamento");

formAgendamento.addEventListener("submit", function(){

    setTimeout(() => {

        alert("Mensagem enviada com sucesso!");

        window.location.reload();

    }, 1500);

});