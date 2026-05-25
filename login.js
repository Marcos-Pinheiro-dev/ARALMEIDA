

/* LOGIN */

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async () => {

    const senha = document.getElementById("senhaAdmin").value;

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

});

/* MOSTRAR */

function mostrarPainel(){

    document.getElementById("loginAdmin").style.display = "none";

    document.getElementById("painelEventos").style.display = "block";

}

/* ESCONDER */

function esconderPainel(){

    document.getElementById("loginAdmin").style.display = "block";

    document.getElementById("painelEventos").style.display = "none";

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

        await fetch("logout.php");

    esconderPainel();

    location.reload();

}

/* INICIAR */

verificarLogin();   
