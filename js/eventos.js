
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
    eventos.forEach(evento => {
        divEventos.innerHTML += `
        <article class="evento card p-5 m-3" id="${evento._id}">
        <h2>${evento.name} - ${convertDate(evento.scheduled)}</h2>
        <h4>${evento.attractions}</h4>
        <p>${evento.description}</p>
        <button id="btn-reserva" data-bs-toggle="modal" data-bs-target="#reservaModal" data-bs-event="${evento.name}" data-bs-eventid="${evento._id}" class="btn btn-primary">reservar ingresso</button>
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

const modal = document.querySelector('#reservaModal')

modal.addEventListener('shown.bs.modal', function (event) {
  event.preventDefault()

  const button = event.relatedTarget

  const eventName = button.getAttribute('data-bs-event')

  const eventId = button.getAttribute('data-bs-eventid')
  
  const modalTitle = modal.querySelector('.modal-title')

  modalTitle.textContent = 'Reserva ' + eventName
  
})

function criaReserva(event){
    
  event.preventDefault()

  const owner_name = document.querySelector('#owner_name').value;
  const owner_email = document.querySelector('#owner_email').value;
  const number_tickets = document.querySelector('#lotacao').value;
  const event_id = document.querySelector('#btn-reserva').getAttribute('data-bs-eventid')
  
  
  if(!owner_name || !owner_name.length){
      alert('por favor preencha o formulario corretamente antes de enviar')
      return
  }
  if(!owner_email || !owner_email.includes('@')){
      alert('por favor preencha o formulario corretamente antes de enviar')
      return
  }
  
  if(!number_tickets || number_tickets < 1){
      alert('por favor preencha o formulario corretamente antes de enviar')
      return
  }

  const newReserve = {

      owner_name,
      owner_email,
      number_tickets,
      event_id,

  }

  fetch("https://xp41-soundgarden-api.herokuapp.com/bookings",
{
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify(newReserve)
})

.then(function(res){
  alert('reserva cadastrada com sucesso')
  document.querySelector('#formulario').reset()
  console.log(res)
})
.catch(function(res){ 
  alert('tente novamente mais tarde')
  console.log(res) })
}