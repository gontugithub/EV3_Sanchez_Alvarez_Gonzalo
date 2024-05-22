// VARIABLES GLOBALES

let id;
let idDeporte;
let dta_id_crud;
let dte_id_crud;
let anun_id_crud;


// PARA MOSTRAR LOS MODALES

function fMostrarModal(nombre_modal_con_almohadilla) {



    // OCULTAMOS TODOS LOS DIV (ESTOS VAN A SER TODOS MODALES) -> LOS GUARDAMOS EN UNA LISTA

    let lista_modales = document.querySelectorAll("section > div");


    lista_modales.forEach(item => {
        item.style.display = "none";
    });

    document.querySelector(nombre_modal_con_almohadilla).style.display = "flex";
}

// PARA MOSTRAR LOS FORMULARIOS

function fMostrarFormularios(formulario){

    

    let lista_formularios = document.querySelectorAll("#modal_formularios > div");


    lista_formularios.forEach(item => {
        item.style.display = "none";
    });

    document.querySelector(formulario).style.display = "block";

    // Mostramos la modal
    
    fMostrarModal("#modal_formularios");


}

function fMostrarLibros(){

    let sql = "SELECT * FROM LIBROS";
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {

        console.log("LIBROS", data);

        let html = "";
        html += `  <tbody>`
        html += `   <tr>`
        html += `    <th>TITULO</th>`
        html += `    <th>AUTOR</th>`
        html += `    <th>EDITORIAL</th>`
        html += `    <th>PRECIO</th>`
        html += `    <th>OPERACIONES</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

            html += `   <tr>`
            html += `      <td>${item.lib_titulo}</td>`
            html += `      <td>${item.lib_autor}</td>` 
            html += `      <td>${item.lib_editorial}</td>`
            html += `      <td>${item.lib_precio} €</td>`
 

            html += `       <td class="acciones_admin">
            <span onclick="fPrepararFormLibros('eliminar', '${item.lib_id}','${item.lib_titulo}','${item.lib_autor}','${item.lib_editorial}', '${item.lib_precio}')">
            <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
            <span onclick="fPrepararFormLibros('modificar', '${item.lib_id}','${item.lib_titulo}','${item.lib_autor}','${item.lib_editorial}', '${item.lib_precio}')">
            <i class="fas fa-edit"></i></span></td>`


            html += `   </tr>`
 
         })

         html += `  </tbody>`
         document.querySelector("#tabla_libros").innerHTML = html;
          

    })




}


function fMostrarLibrosFiltros(){

    let filtro =  document.querySelector('#filtro_libros').value;

    let sql = `call LIBROS_TODOS_FILTRADO('${filtro}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {

        console.log("LIBROS", data);

        let html = "";
        html += `  <tbody>`
        html += `   <tr>`
        html += `    <th>TITULO</th>`
        html += `    <th>AUTOR</th>`
        html += `    <th>EDITORIAL</th>`
        html += `    <th>PRECIO</th>`
        html += `    <th>OPERACIONES</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

            html += `   <tr>`
            html += `      <td>${item.lib_titulo}</td>`
            html += `      <td>${item.lib_autor}</td>` 
            html += `      <td>${item.lib_editorial}</td>`
            html += `      <td>${item.lib_precio}</td>`
 

            html += `       <td class="acciones_admin">
            <span onclick="fPrepararFormLibros('eliminar', '${item.lib_id}','${item.lib_titulo}','${item.lib_autor}','${item.lib_editorial}', '${item.lib_precio}')">
            <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
            <span onclick="fPrepararFormLibros('modificar', '${item.lib_id}','${item.lib_titulo}','${item.lib_autor}','${item.lib_editorial}', '${item.lib_precio}')">
            <i class="fas fa-edit"></i></span></td>`


            html += `   </tr>`
 
         })

         html += `  </tbody>`
         document.querySelector("#tabla_libros").innerHTML = html;
          

    })




}



function fPrepararFormLibros(accion_formulario, lib_id, lib_titulo, lib_autor, lib_editorial, lib_precio){


    let lista_label = document.querySelectorAll("#formulario_deportistas > label");
    let lista_input = document.querySelectorAll("#formulario_deportistas > input");


     lista_label.forEach(item => {

        item.style.display = "block"
        
    });

    lista_input.forEach(item => {

        item.style.display = "block"
        
    });

    document.querySelector("#lib_id").style.display = "none";
    document.querySelector("#l_lib_id").style.display = "none";

    document.querySelector("#lib_id").value = lib_id;
    document.querySelector("#lib_titulo").value = lib_titulo;
    document.querySelector("#lib_autor").value = lib_autor;
    document.querySelector("#lib_editorial").value = lib_editorial;
    document.querySelector("#lib_precio").value = lib_precio;

    if (accion_formulario == "insertar"){

        document.querySelector("#lib_add").style.display = "block";
        document.querySelector("#lib_mod").style.display = "none";
        document.querySelector("#lib_del").style.display = "none";

        

    }

    if (accion_formulario == "modificar"){

        document.querySelector("#lib_add").style.display = "none";
        document.querySelector("#lib_mod").style.display = "block";
        document.querySelector("#lib_del").style.display = "none";

    }

    if (accion_formulario == "eliminar"){

        document.querySelector("#lib_add").style.display = "none";
        document.querySelector("#lib_mod").style.display = "none";
        document.querySelector("#lib_del").style.display = "block";


    }

    
    fMostrarFormularios("#formulario_libros");

}


function fCRUDLibros(accion){

    let sql;
    let URL = "assets/php/servidor.php?peticion=";

    let lib_id = document.querySelector('#lib_id').value;
    let lib_titulo = document.querySelector('#lib_titulo').value;
    let lib_autor = document.querySelector('#lib_autor').value;
    let lib_editorial = document.querySelector('#lib_editorial').value;
    let lib_precio = document.querySelector('#lib_precio').value;

    if (accion == "i"){

    sql = `call LIBROS_INSERTAR('${lib_titulo}', '${lib_autor}', '${lib_editorial}', '${lib_precio}')`
    URL += "EjecutarInsert&sql=" + sql;

    }
    if (accion == "m"){

    sql = `call LIBROS_MODIFICAR('${lib_id}','${lib_titulo}', '${lib_autor}', '${lib_editorial}', '${lib_precio}')`
    URL += "EjecutarUpdateDelete&sql=" + sql;
        
    }
    if (accion == "d"){

    sql = `call LIBROS_BORRAR('${lib_id}')`
    URL += "EjecutarUpdateDelete&sql=" + sql;
        
    }

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {

      
  })

  .finally(()=>{
    fMostrarLibros();
    fMostrarModal('#modal_libros');
  })



}









function fBorrarDeportistas(){
    console.log("ID PARA BORRAR:", dta_id_crud);

    let sql = `call Borrar_Deportistas('${dta_id_crud}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{
  
        fMostrarDeportistas();
      })
}

// MODIFICAR DEPORTISTAS


function fModificarDeportistas(){

    console.log("ID PARA MODIFICAR:", dta_id_crud);


    // RECOGEMOS LOS DATOS

    let nombre = document.querySelector('#dta_nombre').value;
    let password = document.querySelector('#dta_password').value;
    let telefono = document.querySelector('#dta_telefono').value;
    let fecha_alta = document.querySelector('#dta_fcha_alta').value;
    let fecha_baja = document.querySelector('#dta_fcha_baja').value;

    
    let sql = `call Modificar_Deportistas('${dta_id_crud}','${nombre}','${password}','${telefono}','${fecha_alta}','${fecha_baja}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
      })
      
      .finally(()=>{

        fMostrarDeport();
        
        
      })


}

// INSERTAR DEPORTISTAS

function fInsertarDeportistas(){

    // RECOGEMOS EL TITULAR Y EL NIF

    let nombre_insert = document.querySelector('#dta_nombre').value;
    let password_insert = document.querySelector('#dta_password').value;
    let telefono_insert = document.querySelector('#dta_telefono').value;
    let fecha_baja_insert = document.querySelector('#dta_fcha_baja').value;

    
    let sql = `call Insertar_Deportistas('${nombre_insert}','${password_insert}','${telefono_insert}','${fecha_baja_insert}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarInsert&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{
       document.querySelector('#dta_nombre').value="";
       document.querySelector('#dta_password').value="";
       document.querySelector('#dta_telefono').value="";
       document.querySelector('#dta_fcha_baja').value="";

       fMostrarDeportistas();

      })


}

