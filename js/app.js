
const ingresos = [
    // new Ingreso('Salario', 5000),
    // new Ingreso('Venta de guitarra', 1000),
    // new Ingreso('Venta auto', 8000)
]

const egresos = [
    // new Egreso('Pañales', 1000),
    // new Egreso('Alimentos', 3000)
]

let cargarApp = () => {
    cargarHeader()
    cargarIngresos();
    cargarEgresos();
    limpiarForm()
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarHeader = () => {
    let presupuestoTotal = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuestoTotal);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = '-' + formatoMoneda(totalEgresos());

    const verificarPorcentaje = () => {
        if (!Number(porcentajeEgreso)) {
            document.getElementById('porcentaje').innerHTML = '';
        }

    }
    verificarPorcentaje()
    console.log('porcentaje egreso', porcentajeEgreso)

}
const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-AR', { style: 'percent', minimumFractionDigits: 2 })

}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista_ingresos').innerHTML = ingresosHTML;
}
const crearIngresoHTML = (ingreso) => {
    const cartelDeEspera = document.querySelector('.esperando_ingreso');
    cartelDeEspera.innerHTML = '';
    let ingresoHTML = `
    <div class="listado">
    <div class="ingresos_text"> ${ingreso.descripcion}</div>
                    <div class="ingresos_valor">+${formatoMoneda(ingreso.valor)}
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar-btn" id="eliminar_ingreso-btn" onclick="eliminarIngreso(${ingreso.id})">
                                <ion-icon name="close-circle-outline" class="icon_close"></ion-icon>
                            </button>
                        </div>
                    </div> 
                    </div>`;
    return ingresoHTML;
}
const cargarEgresos = () => {
    let egresosHTML = '';
    for (egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista_egresos').innerHTML = egresosHTML;

}
const crearEgresoHTML = () => {
    const cartelDeEspera = document.querySelector('.esperando_egreso');
    cartelDeEspera.innerHTML = '';
    let egresosHTML = ` 
    <div class="listado-egresos">
    <div class="ingresos_text"> ${egreso.descripcion}</div>
                    <div class="ingresos_valor">-${formatoMoneda(egreso.valor)}
                    <div class="porcentajeEnEgresos"> ${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar-btn" onclick="eliminarEgreso(${egreso.id})">
                                <ion-icon name="close-circle-outline" class="icon_close"></ion-icon>
                            </button>
                        </div>
                    </div> 
                    </div>
    `;
    return egresosHTML;

}


const eliminarIngreso = ({ id }) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarHeader();
    cargarIngresos();

}

const eliminarEgreso = ({ id }) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarHeader();
    cargarEgresos();

}

let agregarDato = () => {
    let formulario = document.querySelector('#form');
    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion_input'];
    let valor = formulario['valor_input'];
   
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)))
            cargarHeader();
            cargarIngresos();
            //limpiarForm()
        } else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, Number(valor.value)))
            cargarHeader();
            cargarEgresos();
            //limpiarForm()

        }
    }
   
   

}
const formulario = document.querySelector('#form');
const btnForm = document.querySelector('.agregar_btn')

const limpiarForm = ()=>{
    btnForm.addEventListener('click', (e)=>{
        e.preventDefault();
        formulario.reset();
    })
}
