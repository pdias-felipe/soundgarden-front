async function getReservas() {
    try {
      const divReservas = document.querySelector("#reservas");
      const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
        headers: {
          Authorization: "token",
        },
      });
      const listReservas = await response.json();
  
      listReservas.forEach((reservas) => {
        const html = `
            <div>
                <label>id: </label> <input type="text" value="${reservas._id}" readonly> <br>
                <label>nome: </label> <input type="text" value="${reservas.owner_name}" readonly> <br>
                <label>email: </label> <input type="text" value="${reservas.owner_email}" readonly> <br>
                <label>Num. tickets: </label> <input type="text" value="${reservas.number_tickets}" readonly> <br>
                <label>evento: </label> <input type="text" value="${reservas.event.name}" readonly> <br>
                <label>data: </label> <input type="text" value="${reservas.created_at}" readonly> <br>
            </div> 
            `;
  
        divReservas.innerHTML += html;
      });
  
      console.log(listReservas);
    } catch (error) {
      console.log(error);
    }
  }
  
  getReservas();
  