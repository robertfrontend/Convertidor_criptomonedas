class Interfaz {

    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                // crear un select de opciones
                const select = document.querySelector('#criptomoneda')

                // iterar por los resultados de la api
                for( const [key, value] of Object.entries(monedas.monedas.Data)){ 
                    //añadir el symbol y el nombre como opciones
                    const opcion = document.createElement('option')
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion)

                }
            })
    }

    mostrarMensaje(mensaje, clase) {
        const div = document.createElement('div');
        div.className = clase;
        div.appendChild(document.createTextNode(mensaje))

        // selecionar mensajes
        const divMensaje = document.querySelector('.mensajes')
        divMensaje.appendChild(div);
        
        // mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    // imprime el resultado de la coitzacion

    mostrarResultado(resultado, moneda, crypto) {

        //en caso de un resultado anterior ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div')

        if(resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda]

        //recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEDAY.toFixed(2),
        actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleTimeString('es-MX')

        //construir el template
        let templateHTML = `
            <div class="card bg-warning" >
                <div class="card-body text-light">
                    <h2 class="card-title" >Resultado:</h2>
                    <p>El precio de: ${datosMoneda.FROMSYMBOL}
                        a moneda ${datosMoneda.TOSYMBOL} es de: $${precio}
                    </p> 
                    <p>
                        Variacion ultimo dia: % ${porcentaje}
                    </p>
                    <p>
                        Ultima actualizacion: ${actualizado}
                    </p>
                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block')

        setTimeout(() => {
            //insertar el resultado
            document.querySelector('#resultado').innerHTML = templateHTML
            //ocultar el spiner
            this.mostrarOcultarSpinner('none')
        },3000)
    }
    //mostrar un spinner de carga al enviar la cotizacion
    mostrarOcultarSpinner(vista) {
        const spiner = document.querySelector('.contenido-spinner');
        spiner.style.display = vista
    }



}