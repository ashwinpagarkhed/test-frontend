import Axios from 'axios'



export const setTodos = (todos) => {
    return {
        type:"SET_TODOS",
        todos:todos
    }
}

export const addTodo = (todo) => {
return{
    type: "ADD_TODO",
    todo:todo
}
}

export const deleteTodo = (item) => {
    return{
        type: "DELETE_TODO",
        item:item
    }
    
}
export const updateTodo = (item) => {
    return{
        type: "UPDATE_TODO",
        item:item
    }
    
}

export const fetchTodos = () => {
    
    return function(dispatch){
        
        Axios.get("http://localhost:5000/get_tasks").then( res => dispatch(setTodos(res.data)) ).catch( err => {console.log(err)} )
       
    } 
}

