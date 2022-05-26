require('colors');

const showMenu = () =>{
    return new Promise(resolve=>{
        console.clear();
        console.log("========================".gray)
        console.log("  Selecione una opción  ".blue)
        console.log("========================\n".gray)
        console.log(`${'1.'.blue} Crear tarea`);
        console.log(`${'2.'.blue} Listar tareas`);
        console.log(`${'3.'.blue} Listar tareas completadas`);
        console.log(`${'4.'.blue} Listar tareas pendientes`);
        console.log(`${'5.'.blue} Completar tarea(s)`);
        console.log(`${'6.'.blue} Borarr tarea`);
        console.log(`${'0.'.blue} Salir\n`);
    
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
        readline.question("Selecione una opción:",(res)=>{       
            readline.close();
            resolve(res)
        })    
    })
    
}

const pause = () =>{
    return new Promise (resolve => {
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
        readline.question(`Precione ${'ENTER'.green} para continuar`,(res)=>{
            readline.close();
            resolve();
        })
    })
}

module.exports={
    showMenu,
    pause
}