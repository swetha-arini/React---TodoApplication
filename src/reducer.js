import { ADD_TODO, UPDATE_TODO, DELETE_TODO, SET__TODO, GET__TODO__BYID } from './action';

const initialState = {
    todos:[]
}

const reducer = (state = initialState, action) => {
    let newTodos;
    switch (action.type) {
        case SET__TODO:
            return{
                ...state,
                todos: state.todos ? [...state.todos, ...action.payload.tData] : []
            }
        case ADD_TODO:
            return{
                ...state,
                todos:[...state.todos,action.payload]
            }
        case DELETE_TODO:
            return{
                ...state,
                todos: state.todos.filter(todo => todo.id != action.payload.id)
            }
        case GET__TODO__BYID:
            if (state.todos.id !== action.id) {
                return state;
              }
              return {
                ...state,
                todos: !state.todos.isCompleted,
            };
        case UPDATE_TODO:
            newTodos = state.todos ? [...state.todos] : [];
            let index = -1;
            for (let i = 0; i < newTodos.length; i++) {
                index++;
                if (newTodos[i].id == action.payload.id) {
                    break;
                }

            }
            if (index != -1) {
                newTodos[index] = action.payload;
                state.todos[index] = newTodos[index];
            }
            return state
        default:
            return state;
    }
}

export default reducer;