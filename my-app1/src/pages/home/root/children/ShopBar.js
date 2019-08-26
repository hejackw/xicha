import React from "react";
import { connect } from "react-redux";

const ShopBar = (props) => {
  console.log('shopbar render...');
  return (
    <div className="shop-bar border-bottom">
      <span>{props.shop}</span>
      <span className="iconfont icon-dizhiguanli" />
    </div>
  );
};

export default connect()(ShopBar);


// export default class ShopBar extends PureComponent{
//     render(){
//         console.log('shopbar render...');
//         return (
//             <div className="shop-bar border-bottom">
//                 <span>{this.props.shop}</span>
//                 <span className="iconfont icon-dizhiguanli" />
//             </div>
//         );
//     }
// }
