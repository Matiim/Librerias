const fecha = document.querySelector('#fecha')
const elemento = document.querySelector('#elemento')
const botonEnter = document.querySelector('#boton-enter')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const contenido = document.querySelector('#contenido')
const marcado = 'fa-check-circle'
const desmarcado = 'fa-circle'
const tachado = 'line-through'
let list 
let id 



const dia = new Date ()
fecha.innerHTML = dia.toLocaleDateString('es-AR',{weekday: 'long', month: 'short', day:'numeric',year: 'numeric'})


function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return}  
	const hecho = realizado ? marcado : desmarcado 
	const linea = realizado ? tachado : '' 
    const elemento = `  <li id="elemento">
                		<i class="far ${hecho}" data="realizado" id="${id}"></i>
                        <p class="text ${linea}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
					 `
    lista.insertAdjacentHTML("beforeend",elemento); 
 }


 function traer(){
	fetch('tareas.json')
	.then(res => res.json())
	.then(datos =>  {
		tabla(datos)
	})
 }
 
 function tabla(datos){
	contenido.innerHTML=''
	for(let valor of datos){
		contenido.innerHTML += `  
								<li id="elemento">
								
								${valor.tarea}
								</li>
	 							`
	}
 }






function tareaRealizada(element) {
    element.classList.toggle(marcado)
    element.classList.toggle(desmarcado)
    element.parentNode.querySelector('.text').classList.toggle(tachado)
    list[element.id].realizado = list[element.id].realizado ?false :true 
   
}



function tareaEliminada(element){
	Swal.fire({
		icon: 'error',
		title: 'Tarea eliminada',
	  })
    element.parentNode.parentNode.removeChild(element.parentNode)
    list[element.id].eliminado = true
}




botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
		list.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
		
        localStorage.setItem('todo',JSON.stringify(list))
		id++
		input.value = ''
	}
})
      
	

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
			   list.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('todo',JSON.stringify(list))
    	id++
		input.value = ''
		}
	}
})
     
     

lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('todo',JSON.stringify(list))
})


let datos = localStorage.getItem('todo')
if(datos){
    list = JSON.parse(datos)
    id = list.length
    cargarLista(list)
}else {
   list = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}