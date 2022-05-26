const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pause,
        leerInpt, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');
console.clear();
const main = async() =>  {
    let opt= "";
    //Obtenemos la clase de  models/tareas
    const tareas = new Tareas();
    
    const tareasDB = leerDB();
    if( tareasDB ){
        tareas.cargarTareasFromArray(tareasDB)
    }
    //repetimos el proceso hasatq que el usuario desee salir
    do{
        //Mostramos el menu y obtenemos el valor selecionado por el usuario y lo guardamos en opt
        opt = await inquirerMenu();
        //una vez que tenemos el valor aplicamos una condicional para ver que se le presentara al usuario
        switch(opt){
            case "1":
                //Mandamos el mensaje para que nos aparezca en pantalla y obtenemos el valor ingreado y lo guardamos en desc
                const desc= await leerInpt("Descripcion:")
                //Mandamos a crear la tarea con solo la descripcion ya que la clase de tareas ya genera el id automatico y por defecto la fecha estara en null
                tareas.crearTarea( desc )
                break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3":
                tareas.listarPendientesCompletadas(true);
                break;
            case "4":
                tareas.listarPendientesCompletadas(false);
                break;
                case "5":
                    const ids= await mostrarListadoChecklist(tareas.listadoArr)
                    tareas.toggleCompletadas( ids )
                    break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if(id!=="0"){
                    const Confirmardelet = await confirmar("¿Estas seguro?");
                    if(Confirmardelet){
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada")
                    }
                }
                
                break;
        }
        guardarDB(tareas.listadoArr);
       
        await pause();
        
    }while(opt !=="0")
}
main();