const contenedorTarjetas = document.getElementById("productos-container")
const unidadesElement = document.getElementById("unidades");  
const precioElement = document.getElementById("precio");  
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");  
const comprarCarritoElement = document.getElementById("comprar");

function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse (localStorage.getItem("vehiculos"));
    console.log(productos);
    if(productos && productos.length > 0){
    productos.forEach(producto => {
      const nuevoVehiculo = document.createElement("div");
      nuevoVehiculo.classList = "tarjeta-producto";
      nuevoVehiculo.innerHTML = `
      <img src="img/productos/${producto.id}.jpg">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <div>
        <button>-</button>
        <span class = "cantidad">${producto.cantidad}</span>
        <button>+</button>
      </div>

      
      `
      contenedorTarjetas.appendChild(nuevoVehiculo);  
      nuevoVehiculo
      .getElementsByTagName("button")[1]
      .addEventListener("click", (e) => {
        const cuentaElement = e.target.parentElement.querySelector(".cantidad");
        cuentaElement.innerText = agregarAlCarrito(producto);
        actualizarTotales(); 
      });
    
        nuevoVehiculo
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasProductosInicio();
          actualizarTotales();
          // El revisarMensajeVacio lo agrege a lo ultimo yse ejecuta después de actualizarTotales porque este último
        
        });
  

    });
}

}


crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales(){
   const productos = JSON.parse(localStorage.getItem("vehiculos"));
    let unidades = 0;
    let precio = 0;
   if(productos && productos.length > 0){
    productos.forEach(producto => {
       unidades += producto.cantidad;
       precio += producto.precio * producto.cantidad;
    })
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
       
   }
}

function revisarMensajeVacio(){
  const productos = JSON.parse(localStorage.getItem("vehiculos"));
  carritoVacioElement.classList.toggle("escondido",productos && productos.length>0);
  totales.classList.toggle("escondido",!(productos && productos.length>0));
}
comprarCarritoElement.addEventListener("click", () => {
  Swal.fire("Gracias por su compra");
  reiniciarCarrito();
});

reiniciarCarritoElement.addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

revisarMensajeVacio();

function reiniciarCarrito(){
  localStorage.removeItem("vehiculos");
  crearTarjetasProductosInicio();
  actualizarTotales();
  revisarMensajeVacio();
  actualizarNumeroCarrito();
}