import React, {PureComponent} from 'react'
import AppScroll from '../../../../components/app-scroll'
import Item from './Item'


export default class MenuList extends PureComponent{
    listDOM = [];
    scroll = React.createRef();

    render(){
        let {data} = this.props;
        this.listDOM = [];
        return (
            <AppScroll className="list" ref={this.scroll} onScroll={this.handleScroll}>
                {
                    data.map((listInfo, i)=>{
                        let dom = React.createRef();
                        this.listDOM.push(dom);
                        return (
                            <div className="menu-list border-bottom" ref={dom} key={listInfo.id}>
                                <h3 className="list-title">{listInfo.name}</h3>
                            {
                                listInfo.data.map(item=>(
                                    <Item key={item.id} data={item}/>
                                ))
                            }
                            </div>
                        )
                    })
                }
            </AppScroll>
        )
    }
    
    scrollToIndex(index){
        //滚动视图，到对应的菜单
        //根据下标计算需要偏移的高度
        let height = 0;
        for(let i = 0; i < index; i++){
            let dom = this.listDOM[i].current;
            height -= dom.offsetHeight;
        }
        // 操作滚动视图，让菜单滚动到对应位置
        this.scroll.current.scrollTo(height);
    }

    // 处理滚动事件，查到应该选中的菜单类型
    handleScroll = (y)=>{
        this.listDOM.forEach(({current:dom}, i)=>{
            let maxY = 0;
            let minY = 0;
            for(let j = 0; j < i; j++){
                maxY -= this.listDOM[j].current.offsetHeight;
            }
            minY = maxY - this.listDOM[i].current.offsetHeight;
            if( y > minY && y <= maxY){
                this.props.onChange({index: i, flag: 'menu'});
            }
        })
    }
}