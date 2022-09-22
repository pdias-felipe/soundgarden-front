let body = document.getElementsByTagName("body")[0];
//body.onload = editEvent()
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const urlParams = new URLSearchParams(window.location.search);
const eventoId= urlParams.get('id');       

async function pegarInfomacoes() {
    try {        
        const response = await fetch(`${BASE_URL}/events/${eventoId}`, { method: "GET" });
        
        const infoEvento = await response.json()
        mostrarInformacoes(infoEvento)
    } catch (error) {
        console.log(error)
    }
}

function mostrarInformacoes(data) {
    let dataEvento = convertDate(data.scheduled)

    document.getElementById('nome').value = data.name
    document.getElementById('banner').value = data.poster
    document.getElementById('atracoes').value = data.attractions
    document.getElementById('descricao').value = data.description
    document.getElementById('data').value = dataEvento
    document.getElementById('lotacao').value = data.number_tickets

}

function convertDate(date) {
    time = formatTime(date)
    date = new Date(date);
    let dia = date.getDate()
    let mes = (date.getMonth() + 1)
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    return dia + '/' + mes + '/' + date.getFullYear() + ' ' + time
}

function formatTime(date) {
    const [, fullTime] = date.split('T')
    const [time, _] = fullTime.split('.')

    return time;
}

function atualizarEvento(event){
    
    event.preventDefault()

    const name = document.querySelector('#nome').value;
    const poster = document.getElementById('banner').value;
    const attractions = document.querySelector('#atracoes').value;
    const description = document.querySelector('#descricao').value;
    const scheduled = document.querySelector('#data').value;
    const number_tickets = document.querySelector('#lotacao').value;
    
    
    if(!name || !name.length){
        alert('por favor preencha o formulario corretamente antes de enviar')
        return
    }
    if(!poster || !poster.length){
        alert('por favor preencha o formulario corretamente antes de enviar')
        return
    }
    if(!attractions){
        alert('por favor preencha o formulario corretamente antes de enviar')
        return
    }
    if(!description){
        alert('por favor preencha o formulario corretamente antes de enviar')
        return
    }
    if(!scheduled){
        alert('por favor preencha o formulario corretamente antes de enviar')
        return
    }
    if(!number_tickets || number_tickets < 1){
        alert('por favor preencha o formulario corretamente antes de enviar')
        return
    }

    const eventUpdate = {

        name,
        "attractions": attractions.split(','),
        description,
        "scheduled": new Date(scheduled).toISOString(),
        number_tickets,
        poster, 

    }

    fetch(`${BASE_URL}/events/${eventoId}`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(eventUpdate)
})

.then(function(res){
    alert('evento atualizado com sucesso')
    document.querySelector('#formulario').reset()
    console.log(res)
})
.catch(function(res){ 
    alert('tente novamente mais tarde')
    console.log(res) })
}

pegarInfomacoes();

