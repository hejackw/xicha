import React from 'react'
import {connect} from 'react-redux'
import {addTeaAction} from '../../../../store/modules/cart'

const Item = (props)=>(
    <div className="menu-item border-bottom">
        <div className="pic">
            <img src={props.data.imageUrl} alt=""/>
        </div>
        <div className="content">
            <h3 className="title">{props.data.name}</h3>
            <p className="desc">{props.data.desc}</p>
            <p className="price">
                <span>¥{props.data.price}</span>
                <span className="buy" onClick={()=>props.addTea(props.data)}>购买</span>
            </p>
        </div>
    </div>
)

const mapStateToProps = (state, props)=>({

});
const mapDispatchToProps = (dispatch, props)=>({
    //点击购买按钮的事件
    addTea(info){
        let action = addTeaAction(info);
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);