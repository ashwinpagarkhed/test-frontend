import './App.css';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import Axios from 'axios';
import {setTodos,addTodo,deleteTodo,updateTodo} from './Redux/ActionCreators'

function App() {

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const [todo,setTodo] = useState({name:"",task:"",status:"pending"}) 

  useEffect(() => {    
      getTodos();
  },[]);

  const getTodos = async ()=>{
    await Axios.get("http://localhost:5000/get_tasks")
    .then(response=>{ dispatch(setTodos(response.data));  })
    .catch(err => { console.log(`error occoured in fetching posts ${err}` ) } )
    
  }

  const addTask = async()=>{
    await Axios.post("http://localhost:5000/add_task",todo)
    .then(response=>{ dispatch(addTodo(response.data)); console.log(response.data)  })
    .catch(err => { console.log(`error occoured in fetching posts ${err}` ) } )    
  }

  const deleteTask = async(item)=>{
    console.log(item)
    await Axios.post("http://localhost:5000/delete_task",item)
    .then(response=>{ console.log(response.data); })
    .catch(err => { console.log(`error occoured in deleting task ${err}` ) } )   
    dispatch(deleteTodo(item))

  }
  const updateTask = async(item) => {
    console.log(item)
    await Axios.post("http://localhost:5000/update_task",item)
    .then(response=>{ console.log(response.data); })
    .catch(err => { console.log(`error occoured in deleting task ${err}` ) } )   
    dispatch(updateTodo(item))
  }

  const swipeRightDataSimple = item => ({
    content: (
      <div className={styles.contentLeft}>
        <span>Delete</span>
      </div>
    ),
    action: () => deleteTask(item) 
   });

  const swipeLeftDataSimple = item => ({
    content: (
      <div className={styles.contentRight}>
        <span>Done</span>
      </div>
    ),
    action: () => updateTask(item)
  });


  console.log(store)
  return (
    <div className="App container">

<div class="d-flex p-2"><input type="text" onChange = { e=> setTodo({...todo,name:e.target.value})} placeholder='name'></input></div>

<div class="d-flex p-2"><input type="text" onChange = { e=> setTodo({...todo,task:e.target.value})} placeholder='task'></input></div>
<div class="d-flex p-2">  <button type="button" class="btn btn-success" onClick={addTask}>Add task</button>
</div>
      
      <button type="button" class="btn btn-primary float-right">
  Total Tasks <span class="badge badge-light">{store.todos.length}</span>
</button>
     {store.todos.length ? store.todos.map(
        ({ name,task,status }) => {
          return (
          <React.Fragment>
            <SwipeableList>
          <SwipeableListItem
            swipeRight={swipeRightDataSimple({name:name,task:task})}
            swipeLeft={swipeLeftDataSimple({name:name,task:task})}
          >
            <div class="list-group container p-3">
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-2">{name}</h5>
      <small>{status}</small>
    </div>
          <p class="mb-2 text-left">{task}</p>
  </a>
 </div>
          </SwipeableListItem>
          </SwipeableList>
          </React.Fragment>);
        }
      )      
      : 
      <div className='col-md-10'>
        <h3 className='text-muted' style={{position:'absolute',marginTop:'80px',left:'35%'}}> No results to display</h3> 
      </div>
      }

    </div>
  );
}

export default App;
