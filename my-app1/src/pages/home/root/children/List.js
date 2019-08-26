import React from "react";
import {connect} from 'react-redux'
import { Link } from "react-router-dom";

const List = () => {
  console.log('list render...');
  let data = [
    { id: 1, name: "立即购买", path: "/menu" },
    { id: 2, name: "我的订单", path: "/order" },
    { id: 3, name: "喜茶时光", path: "/time/time" },
    { id: 4, name: "查看评价", path: "/time/comment" },
    { id: 5, name: "我的优惠", path: "/home/coupon" },
    { id: 6, name: "我的优惠", path: "/home/coupon" },
    { id: 7, name: "我的优惠", path: "/home/coupon" },
    { id: 8, name: "我的优惠", path: "/home/coupon" }
  ];
  return (
    <ul className="list">
      {data.map(item => (
        <Link className="item border-bottom" key={item.id} to={item.path}>
          <span>{item.name}</span>
          <span className="iconfont icon-youjiantou" />
        </Link>
      ))}
    </ul>
  );
};

export default connect()(List);