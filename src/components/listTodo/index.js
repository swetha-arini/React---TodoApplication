import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { deleteTodo, updateTodo } from '../../action';
import Checkbox from '../checkbox/index';
import Popup from '../popup';
import './index.css'

function TodoList (props) {

    // variables
    const todoList = useSelector(state => state.todos);
    const filterList = props.filterList;
    const listType = props.linkType || 'new';
    const dispatch = useDispatch();


    // usestate
    const [editable,setEdit] = useState(false)
    const [editData,setEditData] = useState('')

    // events
    const onEditClick = (data) => {
        setEdit(true);
        setEditData(data)
    }

    const onNameChange = (val) => {
        setEditData((prevState) => ({
            ...prevState,
            label: val,
        }))
    }
    const onCheckboxClick = (val) => {
        let checkVal = val === 0 ? 1 : 0
        setEditData((prevState) => ({
            ...prevState,
            isCompleted: checkVal,
        }))
    }

    const updateLocalStorage = () => {
        let tData = localStorage.getItem('toDoList');
        tData = tData && tData.length > 0 ? JSON.parse(tData) : []
        let fData = tData && tData.filter(ele => ele.id === editData.id)
        fData[0] = editData
        let index = -1;
        for (let i = 0; i < tData.length; i++) {
            index++;
            if (tData[i].id == editData.id) {
                break;
            }
        }
        if (index != -1) {
            tData[index] = fData[0];
        }
        localStorage.setItem('toDoList',JSON.stringify(tData))
    }

    const onSubmit = () => {
        setEdit(false);
        updateLocalStorage()
        onUpdate()
    }

    const onUpdate = () => dispatch(
        updateTodo({
            label:editData.label,
            isCompleted:editData.isCompleted,
            id: editData.id
        })
    )

    const onDelete = (id) => {
        let tData = localStorage.getItem('toDoList');
        tData = tData && tData.length > 0 ? JSON.parse(tData) : []
        let fData = tData && tData.filter(ele => ele.id !== id);
        localStorage.setItem('toDoList',JSON.stringify(fData))
        dispatch(
            deleteTodo({
                id
            })
        )
    }

    return(
        <>
        <div className="tl">
            {/* <h1 className="tl__title">{listType === "new" ? 'To-Do List' : `${listType} To-Do Results`}</h1> */}
            {
                listType === "new" && todoList && todoList.length > 0 ?
                <section className="tl__inner">
                {todoList.map(l => 
                    <section className="tl__cn">
                        <p className="tl__cn__inner"><Checkbox data={l} clickHandler={onEditClick}  isChecked={l.isCompleted} /> {l.label} </p>
                        <section className="tl__cn__btn">
                            <button className="editBtn" onClick={() => onEditClick(l)}>Edit</button>
                            <button className="deleteBtn" onClick={() => onDelete(l.id)}>Delete</button>
                        </section>
                    </section>
                )}
                </section>:listType === "new" && <p className="noData">No Task Found</p>
            }

            {/* Filter List */}
            {
                filterList && filterList.length > 0 ?
                <>
                {filterList.map(l => 
                    <section className="tl__cn">
                        <p className="tl__cn__inner"><Checkbox data={l} clickHandler={onEditClick} isChecked={l.isCompleted} /> {l.label} </p>
                        <section className="tl__cn__btn">
                            <button className="editBtn" onClick={() => onEditClick(l)}>Edit</button>
                            <button className="deleteBtn" onClick={() => onDelete(l.id)}>Delete</button>
                        </section>
                    </section>
                )}
                </>:listType !== "new" && <p className="noData">No Task Found</p>
            }
            {/* POPUP */}
            {editable && 
                <Popup onClose={() =>setEdit(false)} isOpen={editable} customWidth={'400px'}>
                    <section className="edit">
                        <h2>Edit Todo</h2>
                        <section className="edit__cn">
                            <section className="iBox">
                            <label className="label">Name</label>
                            <input className="box" value={editData.label} type="text" onChange={(e) => {onNameChange(e.target.value)}} />
                            </section>
                            <>
                            <section className="iBox">
                            <p className="label">Is Completed</p>
                            <section className="switch">
                                <label className="label" >
                                <input  onClick={() => onCheckboxClick(editData.isCompleted)} type="checkbox" checked={Number(editData.isCompleted) === 1}/>
                                <span className="slider round"></span>
                                </label>
                            </section>
                            </section>
                            </>
                        </section>
                        <button className="sBtn" onClick={() => onSubmit()} >Submit</button>
                    </section>
                </Popup>
            }
        </div>
        </>
    )
}

export default TodoList;