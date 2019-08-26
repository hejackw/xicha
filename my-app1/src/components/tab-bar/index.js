import React, { Component } from 'react'
import './style.scss'

export default class TabBar extends Component {
    state = {};
    
    render() {
        const tabs = [
            {id: 1, title: '首页', basicPath: '/home', path: '/home', icon: 'icon-homepage', selectIcon: 'icon-homepage_fill'},
            {id: 2, title: '菜单', basicPath: '/menu', path: '/menu', icon: 'icon-createtask', selectIcon: 'icon-createtask_fill'},
            {id: 3, title: '时光', basicPath: '/time', path: '/time/time', icon: 'icon-integral', selectIcon: 'icon-integral_fill'},
            {id: 4, title: '取茶', basicPath: '/order', path: '/order', icon: 'icon-service', selectIcon: 'icon-service_fill'},
            {id: 5, title: '我的', basicPath: '/mine', path: '/mine', icon: 'icon-addressbook', selectIcon: 'icon-addressbook_fill'}
        ]

        //  根据地址栏当前的地址判断那个tabItem选中了
        let selectIndex = tabs.findIndex(item=>this.state.currentPath.startsWith(item.basicPath));

        return (
            <nav className="tab-bar border-top">
            {
                tabs.map((item, index)=>(
                    <li key={item.id}
                        className="tab-item"
                        onClick={()=>this.changeTab(index, item.path)}>
                        <span className={'iconfont '+ ((selectIndex === index)?item.selectIcon:item.icon)}></span>
                        <span>{item.title}</span>
                    </li>
                ))
            }
            </nav>
        )
    }

    changeTab = (index, path)=>{
        // 切换页面
        this.props.history.push(path);
    }

    static getDerivedStateFromProps(props, state){
        return {
            // 取出当前地址栏的地址
            currentPath: props.location.pathname
        }
    }

}
