
function carregaEventos() {

    fetch('https://xp41-soundgarden-api.herokuapp.com/events')
        .then(response => response.json())
        .then((res) => exibeEventos(res))
        .catch(err => console.log(err))

}

carregaEventos();

function exibeEventos(eventos) {

    const divEventos = document.querySelector('#eventos');
    let index = 0
    eventos.forEach(evento => {
        index++
        divEventos.innerHTML += `
        <tr>
        <th scope="row">${index}</th>
        <td>${convertDate(evento.scheduled)}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions}</td>
        <td>
            <a href="reservas.html" class="btn btn-dark">ver reservas</a>
            <a href="editar.html" class="btn btn-secondary">editar</a>
            <a href="editar.html" class="btn btn-danger">excluir</a>
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
