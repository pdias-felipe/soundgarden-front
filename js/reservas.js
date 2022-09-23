async function getReservas() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')

  const URL = 'https://xp41-soundgarden-api.herokuapp.com/bookings/event/' + id
  
  try {
      const divReservas = document.querySelector("#reservas");
      const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/bookings")
      const listReservas = await response.json()
  
      listReservas.forEach((reservas, index) => {
        const html = `
        <th scope="row">${index + 1}</th>
        <td>${reservas.owner_name}</td>
        <td>${reservas.owner_email}</td>
        <td>${reservas.number_tickets}</td>
            `;
  
        divReservas.innerHTML += html;
      })
  
      console.log(listReservas)
    } catch (error) {
      console.log(error)
    }
  }
  
  getReservas()
  
