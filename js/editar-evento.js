let body = document.getElementsByTagName("body")[0];
body.onload = editEvent()
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

async function pegarInfomacoes() {
    try {
        
        const eventos = document.querySelector("#arows");
        const response = await fetch(`${BASE_URL}/events`, { method: "GET" });
        
        const infoEvento = await response.json()
        mostrarInformacoes(infoEvento)
    } catch (error) {
        console.log(error)
    }
}

function mostrarInformacoes(data) {
    let dataEvento = data.scheduled.toLocaleString()

    document.getElementById('nome').value = data.name
    document.getElementById('banner').value = data.poster
    document.getElementById('atracoes').value = data.attractions
    document.getElementById('descricao').value = data.description
    document.getElementById('data').value = dataEvento.slice(0, -3)
    document.getElementById('lotacao').value = data.number_tickets

    console.log('Data: ' + dataEvento.slice(0, -3))
}

pegarInfomacoes()
