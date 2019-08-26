//功能:首页新品的轮播图
// 请求方式: GET
// 参数: 无
const HOME_BANNER = '/api/home/banner';


// 功能: 喜茶所有店铺列表
// 请求方式: GET
// 参数: 无
const SHOP_LIST = '/api/shoplist'

// 功能: 喜茶的菜单
// 请求方式: GET
// 参数: 无
const MENU_LIST = '/api/menu/list';


// 发送验证码
// POST
// 参数：tel：电话号码
const SEND_CODE = '/api/user/send_phone_code';

// 使用验证码登录
// POST
// 参数：tel：电话号码   code
const LOGIN = '/api/user/login';

// 提交订单
// post
// 参数： list
const POST_OPRDER = '/api/user/post_order';

// 检查是否登录过期
const CHECK_LOGIN = '/api/user/check_login';

// 查询订单
// get
const ORDER_LIST = '/api/user//order_list';



export default {
    HOME_BANNER,
    SHOP_LIST,
    MENU_LIST,
    SEND_CODE,
    LOGIN,
    POST_OPRDER,
    CHECK_LOGIN,
    ORDER_LIST
}