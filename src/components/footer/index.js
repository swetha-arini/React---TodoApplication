import './index.css';

function Footer(props){
    // empty func
    const emptyFunc = () => {}

    // Callback
    const onLinkClick = props.clickHandler ||  emptyFunc();
    const successCallback = props.tabClick || emptyFunc()
    // variable
    const activeTab= props.activeTab
    const totalItem = props.totalItem
    const tabs = [
        {name:'All',isActive:1},
        {name:'Active',isActive:0},
        {name:'Completed',isActive:0}
    ]

    // events
    const onTabClick = (data) => {
        successCallback(data.name)
    }

    return(
        <>
        <div className="fcn">
            <section className="fcn__left">
                <p onClick={() => onLinkClick('new')} className="fcn__left__inner"><img style={{marginTop:'-2px'}} src="/icons/plus.svg" /></p>
                <p onClick={() => onLinkClick('search')} className="fcn__left__inner"><img style={{marginTop:'-2px'}} src="/icons/search.svg" /></p>
                {totalItem && Number(totalItem) !== 0 ? <p className="fcn__left__inner total"> <span className="pipe" /> {totalItem} Items left </p>:null}
            </section>
            <section className="fcn__right">
                {
                    tabs.map((d,index) => <p onClick={() => onTabClick(d)} key={index} className={activeTab === d.name ? "fcn__right__inner active" : "fcn__right__inner"}>{d.name}</p>)
                }
            </section>
        </div>
        </>
    )
}

export default Footer