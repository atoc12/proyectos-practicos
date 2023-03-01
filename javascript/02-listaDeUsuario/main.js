// variables y constantes
const estilo  = document.documentElement.style; // variable que contiene los estilos
const display = [true,true,true]; // display para los elementos html , permite mostrar o no ciertos elementos 
let cajas = document.querySelectorAll(".barra"); // almacena un distintos elementos html con la clase "barra", es un array
let tablaData = [];// array que almacena los objetos creados a partir de la clase "info"
class info { // clase que plasma al usuario en html, js y nos permite manejar sus datos de manera más ordenada 
    constructor({nombre,contraseña,id}){
        this.id = id;
        this.nombre= nombre;
        this.contraseña=contraseña;
        this.fecha = new Date().toLocaleDateString();
        this.horario = new Date().toLocaleTimeString();
        this.tr = document.createElement("tr");
    }
    mostrar(Element){
        this.padre = document.getElementById(Element);
        this.tr.innerHTML =`
        <td>${this.nombre}</td>
        <td>${this.contraseña}</td>
        <td>${this.fecha}</td>
        <td>${this.horario}</td>
        <td>
            <button onclick=""><i class="fa-solid fa-pen-to-square"></i></button>
            <button onclick="Borrar(${this.id})"><i class="fa-solid fa-trash"></i></button>
        </td>
        `;
        this.padre.append(this.tr);
    }
    destruir(){//metodo que permite remover los elementos html creados a partir de esta clase 
        this.padre.removeChild(this.tr);
    }
    eliminarDatos(){//metodo que permite eliminar los datos del Usuario almacenados en el localstorage
        let data = JSON.parse(localStorage.getItem("usuarios"));
        data.splice(this.id,1);
        localStorage.setItem("usuarios",JSON.stringify(data));
        display[2]=true;
        mostrar("userList");
    }
}   

if(! JSON.parse(localStorage.getItem("usuarios"))){ // si en el localstorage no existe "Usuarios" esta condición lo creará
    localStorage.setItem("usuarios", JSON.stringify([]));
}
/*-----------------------funciones constantes   -------------------------------------*/
const load = ()=>{/* esta funcion se encarga de cargar los datos de los usuarios. 
                     Los Usuarios están ubicados en el localstorage debido a que los dabos deben prevalecer
                     los mismos serán eliminados cuando el propietario del lugar en donde se almacena los datos, lo elimine
                  */
    tablaData.forEach(elementos=>{
        elementos.destruir();
    })
    tablaData=[];
    let respons = JSON.parse(localStorage.getItem("usuarios"));
    respons.map((user,key) =>{
        tablaData.push(new info({id:key,nombre:user.nombre,contraseña:user.password}));
        tablaData[key].mostrar("data");
    })
}
/*----------------------------------------------funciones--------------------------*/
function Borrar(id){ // ejecuta los metodos ,se usa esta funcion antes que al metodo debido a que es necesario de un id  
    tablaData[id].eliminarDatos();
}
function create(){// muestra en pantalla el formulario para ingresar Usuarios
    display[1]=!display[1];
    estilo.setProperty("--locat",display[1]? "-200%" : "0%");
}
function mostrar(Element){ // muestra en pantalla los Usuarios ya existentes utilizando la funcion "load"
    display[2]=!display[2];
    document.getElementById(Element).style.display = display[2] ? "none"  : "block";
    load();
}
/* -------------------------EVENTOS-----------------------------------*/
document.getElementById("navbtn").addEventListener("click",e=>{ //a la escucha de un click en el boton de nav se encarga de abrir el menu
    this.navbtn.style.rotate=display[0] ?"360deg": "0deg";
    display[0] = !display[0];
    display[0] ? cajas[0].style.overflow ="hidden" :cajas[0].style.overflow ="visible";
    display[0]  ? cajas[0].style.height="0px": cajas[0].style.height="300px";
})
document.getElementById("userAdd").addEventListener("submit",e=>{ //a la escucha de un click, se encarga de almacenar los datos de nuevos Usuarios y luego los muestra en pantalla
    e.preventDefault();
    let data = {nombre:this.user.value,password:this.pass.value,}
    let datos =JSON.parse(localStorage.getItem("usuarios"));
    datos.push(data);
    localStorage.setItem("usuarios",JSON.stringify(datos));
    display[2]=true;
    mostrar("userList");
})
