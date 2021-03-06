const Tarea = require("./tarea")
require('colors');
class Tareas{
    _listado = {};

    get listadoArr(){
        const listado=[];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea ( id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
    cargarTareasFromArray( tareas = []){
        tareas.forEach(tarea =>{  
            // const tarea = new Tarea(key.desc);
            this._listado[tarea.id] = tarea;
        })
        
      
    }

    crearTarea( desc = ""){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
      console.log()
        this.listadoArr.forEach((tarea ,i ) =>{
            const idx = `${i+1}`.yellow;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? "Completado".green
                                :   "Pendiente".red;
           
            let cadena = `${idx} ${desc} :: ${estado}`;
            console.log(cadena)
        })  
    }
    listarPendientesCompletadas( completadas = true){
        console.log()
        this.listadoArr.forEach((tarea ,i ) =>{
            let test;
            const idx = `${i+1}.`.yellow;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? `${completadoEn}`.green
                                :  "Pendiente".red;
            (completadoEn)
                    ?  test=true
                    :  test=false
                                
            let cadena = `${idx} ${desc} :: ${estado}`;
            if(completadas == test){
                console.log(cadena)
            }
            
        })  
    }
    toggleCompletadas(ids=[]){
        ids.forEach (id=>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn= new Date().toISOString()
            }
        });
        this.listadoArr.forEach( tarea =>{
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;