
// types
const ADD_TEA = 'cart/add_tea';
const MODIFY_TEA = 'cart/modify_tea';
const DELETE_TEA = 'cart/delete_tea';
const CLEAR_TEA = 'cart/clear_tea';

// state
const cartData = [];

// reducer
export default (state = cartData, action)=>{
    switch (action.type) {
        case ADD_TEA: 
            // 判断这杯茶是否在购物车中
            let index = state.findIndex(teaInfo=>teaInfo.id === action.value.id);
            if(index >= 0){
                //存在，修改count
                let teaInfo = {
                    ...state[index],
                    count: state[index].count+1
                };
                return state.map((item, i)=>{
                    if(index === i){
                        return teaInfo;
                    }else{
                        return item;
                    }
                });
            }else{
                //不存在，添加商品，设置count为1
                let teaInfo = {
                    ...action.value,
                    count: 1
                };
                return [
                    ...state,
                    teaInfo
                ];
            }
        case MODIFY_TEA:
            // 存在购物车中的数据需要修改数据
            let i = state.findIndex(teaInfo=>teaInfo.id === action.value.id);
            //根据i修改count
            let teaInfo = {
                ...state[i],
                count: state[i].count + (action.value.flag === 'add' ? 1 : -1)
            };
            return state.map((item, index)=>{
                if(index === i){
                    return teaInfo;
                }else{
                    return item;
                }
            });
        // 删除购物车中的茶
        case DELETE_TEA:
            // 找到需要删除的下标
            let j = state.findIndex(teaInfo=>teaInfo.id === action.value.id);
            //过滤state，执行删除
            return state.filter((item, i)=>(i!==j));
        case CLEAR_TEA: 
            return [];
        default:
            return state;
    }
}

// 同步action
export const addTeaAction = (params)=>({
    type: ADD_TEA,
    value: params//整个商品
});

export const modifyTeaAction = (params)=>({
    type: MODIFY_TEA,
    value: params
})

export const deleteTeaAction = (params) => ({
    type: DELETE_TEA,
    value: params//商品id
})

export const clearTeaAction = ()=>({
    type: CLEAR_TEA
})


