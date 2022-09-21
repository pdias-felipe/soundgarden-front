
function carregaEventos(){

    fetch('https://xp41-soundgarden-api.herokuapp.com/events')
    
.then(response=>response.json())
.then((res) => exibeEventos(res))
.catch(err => console.log(err))

}

carregaEventos();

function exibeEventos(eventos){

    const divEventos = document.querySelector('#eventos-cadastrados');
    console.log(eventos)
    eventos = eventos.slice(0, 3)
    console.log(eventos)
    eventos.forEach(evento => {
        divEventos.innerHTML += `
        <article class="evento card p-5 m-3" id="${evento._id}">
        <h2>${evento.name} - ${convertDate(evento.scheduled)}</h2>
        <h4>${evento.attractions}</h4>
        <p>${evento.description}</p>
        <a href="#" class="btn btn-primary">reservar ingresso</a>
        </article>`
    })
}

function convertDate(date){ 
	date = new Date(date);
	let dia = date.getDate() 
	let mes = (date.getMonth()+1)
	if (dia < 10) {
	  dia = '0' + dia;
	}
	if (mes < 10) {
	  mes = '0' + mes;
	}
	return  dia + '/' +  mes + '/' + date.getFullYear()
}