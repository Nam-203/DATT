import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SwiperCore, { Autoplay } from "swiper";
import { Navigation, Thumbs } from "swiper/swiper.esm";
import "swiper/swiper.scss";
import CartPage from "./page/cart";
import ContentDetailPage from "./page/content-detail";
import ContentListPage from "./page/content-list";
import ErrorPage from "./page/error";
import HomePage from "./page/home";
import LoginPage from "./page/login";
import OrderCheckPage from "./page/order-check";
import RegisterPage from "./page/register";
import UpdateOrderPage from "./page/update-order";
import UpdateUserInfoPage from "./page/update-user-info";
import UserInfoPage from "./page/user-info";
import "./style/index.scss";
import "./index.scss";
import { ToastContainer } from "react-toastify/dist";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./page/menu";
SwiperCore.use([Navigation, Thumbs, Autoplay]);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/introduct" component={Menu} />
        <Route path="/category/:slug" component={ContentListPage} />
        <Route path="/product/:slug" component={ContentDetailPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/order-check" component={OrderCheckPage} />
        <Route path="/user-info" component={UserInfoPage} />
        <Route path="/update-user-info" component={UpdateUserInfoPage} />
        <Route path="/update-order/:orderId" component={UpdateOrderPage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default App;
