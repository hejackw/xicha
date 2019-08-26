import React from 'react'
import './style.scss'

export default (props)=>(
    <header className="app-header border-bottom">
        {props.leftBtn}
        <h1 className="title">{props.title}</h1>
        {props.rightBtn}
    </header>
)