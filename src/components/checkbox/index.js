import './index.css'

function Checkbox(props){
    // emptyFunc
    const emptyFunc = () => {}
    // variables
    const isChecked = props.isChecked || false
    const successCallback = props.clickHandler || emptyFunc()
    const data = props.data || ''

    // events
    const onCheckboxClick = () => {
        successCallback(data)
    }


    return (
        <div className="test">
            {/* <a className="check"> */}
                <input onClick={() => onCheckboxClick()} type="checkbox" className="cb" checked={isChecked}/>
            {/* </a> */}
        </div>
    )
}

export default Checkbox;