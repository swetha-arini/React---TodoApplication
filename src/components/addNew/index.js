import { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { addTodo } from "../../action";
import './index.css'

function AddNew(props){

    // props
    const inputType = props.linkType || 'new'
    const searchCallback = props.onSearch;

    // useState
    const [todo,setTodo] = useState('')
    const [error,setError] = useState('')

    // dispatch
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todos);

    // events
    const handleTextChange = (val) => {
        setTodo(val);
        setError('')
    }

    useEffect(() => {
      setError('')
    },[inputType])

    // methods
    const AddNewTodo =() => {
        if(todo === ''){
            setError('Please enter a valid todo');
            return
        }
        if(inputType === "new"){
            if(todo){
                const filter = todoList && todoList.filter(d => d.label.toLowerCase() === todo.toLowerCase());
                if(filter && filter.length > 0){
                    setError('To-Do List already present');
                    return
                }
                // props.setTotalItem(todoList.length+1)
                const rId = Math.ceil(Math.random() * 1000)
                let payload = {
                    label:todo,
                    isCompleted:0,
                    id: rId
                }
                let newList = todoList&&  todoList.length > 0 ? [...todoList,payload] : payload
                localStorage.setItem('toDoList',JSON.stringify(newList))

                // Set Redux Data
                onSuccess(rId)
                setTodo('')
            }
        }
        else{
            setTodo('')
            searchCallback(todo)
        }
    }

    const onSuccess = (rId) => dispatch(
      addTodo({
        label:todo,
        isCompleted:0,
        id: rId
      })
    );

    return (
      <>
        <div className="adn">
          <input
            autoFocus
            value={todo}
            type="text"
            placeholder={inputType === "search" ? "Search Todo" : "Add New Todo"}
            onKeyPress={(e) => e.key === "Enter" && AddNewTodo()}
            className="inputBox"
            onChange={(e) => handleTextChange(e.target.value)}
          />
          {error !== "" && <span className="errMsg">{error}</span>}
        </div>
      </>
    );
}

export default AddNew;