const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com/bookings";

function reservaIngresso() {

    fetch('https://xp41-soundgarden-api.herokuapp.com/events')
        .then(response => response.json())
        .then((res) => exibeEventos(res))
        .catch(err => console.log(err))

}

carregaEventos();

function exibeEventos(eventos) {

    const divEventos = document.querySelector('#eventos');
    let index = 0
    divEventos.innerHTML = ''
    eventos.forEach(evento => {
        index++
        divEventos.innerHTML += `
        <tr id="${evento._id}">
        <th scope="row">${index}</th>
        <td>${convertDate(evento.scheduled)}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions}</td>
        <td>
            <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
            <a href="#" class="btn btn-danger" onclick="excluirEvento('${evento._id}')">excluir</a>
        </td>
        </tr>`
    })
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

async function excluirEvento(eventoId) {
    try {        
        const response = await fetch(`${BASE_URL}/events/${eventoId}`, { method: "DELETE" });        
        if(response.status === 204){
            carregaEventos()
        }
        
    } catch (error) {
        console.log(error)
    }
}
