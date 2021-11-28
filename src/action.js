export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const SET__TODO = "SET__TODO"
export const GET__TODO__BYID = "GET__TODO__BYID"

export function getTodoById (todoId){
    return{
        type:GET__TODO__BYID,
        payload:todoId
    }
}


export function addTodo(todo) {
    return {
        type:ADD_TODO,
        payload: todo,
    }
}

export function deleteTodo(todoId) {
    return {
        type:DELETE_TODO,
        payload: todoId,
    }
}


export function updateTodo(todo) {
    return {
        type:UPDATE_TODO,
        payload: todo,
    }
}

export function setTodoData(data){
    return{
        type:SET__TODO,
        payload:data
    }
}