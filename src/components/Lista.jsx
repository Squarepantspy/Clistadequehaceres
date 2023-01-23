import React,{useState, useEffect} from 'react';

const Lista = () => {
    const [entrada, setEntrada]=useState('');//entrada del campo submit
    const [listado, setListado]=useState([]); //array de objetos con propiedades de contenido de la tarea y estado para el checkbox

    useEffect(()=>{ //get del listado, para que no se renderice dos veces quitamos restrict mode de react de manera a que no se pierda la data en refresh ya que cargaria una lista vacia en el re render
        const items = JSON.parse(localStorage.getItem('listado')); //parse cambia el string de vuelta a su valor 
        if (items) {
        setListado(items);
    }
    },[])

    useEffect(()=>{ //use efect para guardar en el local storage
        localStorage.setItem('listado', JSON.stringify(listado)); //set item recibe una key y un valor del listado pasado a string en formato json
    });
    


    const handleSubmit =(e)=>{
        e.preventDefault(); //quitamos el comportamiento por defecto
        setListado(oldarray=>[...oldarray,{estado : false, contenido : entrada  }])
        setEntrada('') // dejamos vacio el campo despues del envio
    }
    const handleChange = (e)=>{
        const {value}=e.target
        setEntrada(value);
    }
    const handleDelete= (e,elemento,indexx)=>{
        //filtrar en el array y encontrar la coincidencia entre elemento e indice y borrar ese elemento
        let nuevoArray=listado.filter((e,index)=> index!== indexx); //tambien podriamos buscar coincidencias en las propiedades no solo comparando el indice
        setListado(nuevoArray);
    }
    
    const handleState = (e,elemento,indexx)=>{
        let nuevoArray = [...listado];
        let qui=nuevoArray.filter((e,index)=> index===indexx)
        qui[0].estado ? qui[0].estado = false : qui[0].estado =true; 
        nuevoArray[indexx]=qui[0];
        setListado(nuevoArray);
    }

  return (
    <div className='centered'>
        <form className="form" onSubmit={handleSubmit}>
        <input className="mx-3" type="text" onChange={handleChange} value={entrada} />
        <input type="submit" value="Añadir tarea"/>
        </form>
        <ul>
        {
            listado.map((elemento , index)=>{return(<div className="tarea" key={`in${index}`}>
            <li key={index} className={elemento.estado ? "true" : ""} ><input key={`#${index}`} type="checkbox" onChange={e=>handleState(e,elemento,index)} checked={elemento.estado} />{elemento.contenido}</li>
            <button key={`&${index}`} className=" mx-2" type="button" onClick={(e)=>handleDelete(e,elemento,index)}>Borrar tarea</button>
            </div>)})
        }
        </ul>
    </div>
  )
}

export default Lista