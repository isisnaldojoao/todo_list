import { useState,FormEvent,useEffect } from 'react'
import { FiTrash,FiSend } from 'react-icons/fi'


export default function App(){
  const [task,setTask]= useState("");
  const [tasks,setTasks]= useState<string[]>([]);

  useEffect(()=>{
    const localTask = localStorage.getItem("@todoReact");
    if(localTask){
      setTasks(JSON.parse(localTask))
    }
  },[])

  
  function handleRegister(event: FormEvent) {
    event.preventDefault();
    if (!task) {
      alert('Preencha todos os campos!');
      return;
    }

    const newTask = [...tasks,task]

    setTasks(newTask);
    localStorage.setItem("@todoReact",JSON.stringify(newTask))
    setTask("")
  }

  function handleDelete(index:number){
    const newTasks = [...tasks]
    newTasks.splice(index,1)
    setTasks(newTasks)

    localStorage.setItem("@todoReact",JSON.stringify(newTasks))

  }



  return(

    <div className="w-full min-h-screen bg-zinc-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white"><span className='bg-black text-white rounded w-5'>My</span>TodoList</h1>
          <form className="flex flex-col  my-6 " onSubmit={handleRegister} >
            <label className="text-white">Task:</label>
            <input 
            className="w-full mb-5 p-2 rounded outline-none"
            placeholder="Your task here..."
            value={task}
            onChange={ (e) => setTask(e.target.value) }
            />
            <button
            className="bg-white flex items-center justify-center rounded font-semibold h-10 duration-200 hover:scale-105" 
            type="submit"
            ><FiSend/>Send</button>
          </form>


          {tasks.map((tasks,index)=>(
            <div className="bg-white flex flex-col rounded h-10 justify-center relative mb-5 p-5 duration-200 hover:scale-105" key={index}>
              <p className="font-medium">Task:<span className='font-normal'> {tasks}</span></p>
              <div className="items-center text-center absolute -right-2 ">
                <button
                className='bg-red-500 h-5 rounded'
                onClick={()=>handleDelete(index)}>
                  <FiTrash color='#fff' />
                </button>
              </div>
          </div>
          ))}

      </main>
    </div>
  )
}