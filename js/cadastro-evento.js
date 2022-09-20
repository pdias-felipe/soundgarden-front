

function criaEvento(event){
    
    event.preventDefault()

    const name = document.querySelector('#nome').value;
    const attractions = document.querySelector('#atracoes').value;
    const description = document.querySelector('#descricao').value;
    const scheduled = document.querySelector('#data').value;
    const number_tickets = document.querySelector('#lotacao').value;
    
    
    if(!name || !name.length){
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

    const newEvent = {

        name,
        "attractions": attractions.split(','),
        description,
        "scheduled": new Date(scheduled).toISOString(),
        number_tickets,
        "poster": 'https://doity.com.br/blog/app/uploads/2022/05/Promocao-de-eventos.png',

    }

    fetch("https://xp41-soundgarden-api.herokuapp.com/events",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(newEvent)
})

.then(function(res){
    alert('evento cadastrado com sucesso')
    document.querySelector('#formulario').reset()
    console.log(res)
})
.catch(function(res){ 
    alert('tente novamente mais tarde')
    console.log(res) })
}
