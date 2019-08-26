import React, { Component } from 'react'
import {connect} from 'react-redux'


class Mine extends Component {
    render() {
        return (
            <div className="page" id="mine">
                个人中心界面
            </div>
        )
    }

}


export default connect()(Mine);