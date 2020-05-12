const cotizador = new API ('47fdb116bcd40f5ce3dbac169948d3273dc03d29c922c9eefce776137bd6a04f');
const ui = new Interfaz();


//Leer el formulario

const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //Leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSelecionada = monedaSelect.options[monedaSelect.selectedIndex].value

    //Leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSelecionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value

    //comprobar que ambos campos esten selecionados
    if(monedaSelecionada === '' || criptoMonedaSelecionada === '' ){
        // arrojjar una alerta de error
        ui.mostrarMensaje('ambos Campos son Obligatorios', 'alert bg-danger text-center ');

    }else {
        //todo bien, consultar la api
        cotizador.obtenerValores(monedaSelecionada, criptoMonedaSelecionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSelecionada, 
                    criptoMonedaSelecionada );
            })
    }
})