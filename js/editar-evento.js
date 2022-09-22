const elemento = document.querySelector("body");
const tabela = document.querySelector("tabelaEventos");

// Link API
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

elemento.onload = async () => {
    try {
        // Constantes API
        const linkEventos = await fetch(`${BASE_URL}/events`, { method: "GET" });
        const linkEventosJson = await linkEventos.json();
        
        // Laço
        for (let index = 0; index < 10; index++) {
            // dd/mm/yyyy
            const dataEvento = new Date(linkEventosJson[index].scheduled);
        
            tabela.insertAdjacentHTML{
                ."beforend",
                <tr>
                <th scope="row">
                    ${index + 1}
                </th>
                <td>
                    ${dataEvento.toLocalDateString("pt-BR")}
                </td>
                <td>
                    ${linkEventosJson[index].name}}
                </td>
                <td>
                    <a href="reservas.html?id=${
                        linkEventosJson[index]._id
                    }"class="btn btn-dark">
                    ver reservas</a>
                    <a href="editar-evento.html?id=${
                        linkEventosJson[index]._id
                    }"class="btn btn-secondary">editar</a>
                    <a href="excluir-evento.html?id=${
                        linkEventosJson[index]._id
                    }"class="btn btn-danger">excluir</a>      
                </td>
              </tr>
            };
                
        }
       }
  } catch (error) {
    console.log(error)
    alert("Ocorreu um erro de " + error);
    }
};
