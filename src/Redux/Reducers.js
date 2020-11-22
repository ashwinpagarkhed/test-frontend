import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage' //to tell redux to use localstorage as default storage 
import { combineReducers } from "redux"
import { data } from "jquery"

let store={
    todos:[]
}

//reducer modifies the state. It must be a pure sync funtion. so we need to use action creator with thunk middleware for api calls

const reducer = (state=store,action) =>{

switch(action.type){
        
    case "SET_TODOS":
        return {
            ...state,
        todos:action.todos
        }
    case "ADD_TODO":
        return{
            ...state,
            todos:[...state.todos,action.todo]
        }
    case "DELETE_TODO":
        return{
            ...state,
            todos:state.todos.filter(item => item.task !== action.item.task && item.name!== action.item.name)
        }
    case "UPDATE_TODO":
      
        for(let i=0;i<state.todos.length;i++){

            if(state.todos[i].task==action.item.task && state.todos[i].name==action.item.name){
                state.todos[i].status="Done"
            }

        }
        
        return{
            ...state,
            todos:state.todos
        }

    default:
        return state
}
}


export default reducer;