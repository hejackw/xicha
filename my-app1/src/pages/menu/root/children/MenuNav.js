import React from 'react'
import AppScroll from '../../../../components/app-scroll'

export default (props)=>{
    let {selected, onChange} = props;
    return (
        <AppScroll className="nav border-right">
            {
                props.data.map((item, index)=>(
                    <li className={"nav-item border-bottom "+(selected===index?'active':'')} 
                        onClick={()=>onChange({index, flag: 'nav'})}
                        key={item.id}>
                        {item.name}
                    </li>
                ))
            }
        </AppScroll>
    )
}