import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Footer from './components/footer/index';
import TodoList from './components/listTodo/index';
import Spinner from './components/spinner';
import { getTodoById, setTodoData } from './action';
import AddNew from './components/addNew/index';

function App() {
  // variables
  const list = useSelector(state => state.todos);
  const dispatch = useDispatch();

  // useState
  const [linkType, setLinkType] = useState('new');
  const [todoList, setTodoList] = useState([]);
  const [totalItem, setTotalItem] = useState(list && list.length > 0 ? list.length : 0)
  const [activeTab, setActiveTab] = useState('All')
  const [loading, setLoading] = useState(false)

  // events
  const FooterLinkClick = (type) => {
    setLinkType(type)
    setActiveTab('All')
    setTodoList([])
    type === 'search' ? setTotalItem(0) : type === 'new' && setTotalItem(list && list.length > 0 && list.length)
  }

  const onSearch = (name) => {
    setLoading(true);
    const filterList = list && list.length > 0 && list.filter(d => d.label.toLowerCase().startsWith(name.toLowerCase()));
    filterList && setTodoList(filterList)
    filterList && setTotalItem(filterList.length)
    setLoading(false)
  }

  const tabClick = (data) => {
    setTodoList([])
    setLoading(true)
    setLinkType(data)
    setActiveTab(data);

    if (data === 'All') {
      setTodoList(list)
      setTotalItem(list.length)
      setLoading(false)
    }
    else if (data === 'Active') {
      const filterData = list && list.length > 0 && list.filter(d => d.isCompleted === 0);
      filterData && setTodoList(filterData);
      setTotalItem(filterData.length)
      setLoading(false)
    }
    else if (data === 'Completed') {
      const filterData = list && list.length > 0 && list.filter(d => d.isCompleted !== 0);
      filterData && setTodoList(filterData);
      setTotalItem(filterData.length)
      setLoading(false)
    }
  }

  // useEffect
  useEffect(() => {
    if (list && list.length) {
      setTotalItem(list.length)
    }
  }, [list])

  useEffect(() => {
    let tData = localStorage.getItem('toDoList');
    tData = tData && tData.length > 0 && JSON.parse(tData)
    if (tData) {
      dispatch(
        setTodoData({
          tData
        })
      )
    }
  }, [])


  return (
    <div className="App">
      {/* Spinner */}
      {loading && <Spinner />}
      <h1 className="title">Things to do</h1>
      {/* ADD NEW BOX */}
      <AddNew setTotalItem={setTotalItem} onSearch={onSearch} linkType={linkType} todoList={todoList} />
      {/* LIST */}
      <TodoList filterList={todoList} linkType={linkType} />
      {/* Footer */}
      <Footer tabClick={tabClick} totalItem={totalItem} clickHandler={FooterLinkClick} activeTab={activeTab} />
    </div>
  );
}

export default App;
