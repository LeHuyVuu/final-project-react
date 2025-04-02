
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import PageNotFound from "../layouts/PageNotFound/PageNotFound";
import ProductDetail from "../pages/Detail/patrials/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Category from "../pages/Category/Category";

import SignInSignUp from '../pages/SignInSignUp/SignInSignUp.jsx'

import Account from '../pages/User/Account.jsx'
import AccountInformation from '../pages/User/AccountInformation/AccountInformation.jsx'
import OrderManagement from '../pages/User/OrderManagement/OrderManagement.jsx'
import HelpCenter from '../pages/User/HelpCenter/HelpCenter.jsx'
import Notification from '../pages/User/Notification/Notification.jsx'
import Dice from '../pages/User/Game/Dice/Dice.jsx'

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="category/:cid" element={<Category />} />
          <Route path='login' element={<SignInSignUp />} />

          <Route path='account' element={<Account />} >
            <Route path='information' element={<AccountInformation />} />
            <Route path='order' element={<OrderManagement />} />
            <Route path='help-center' element={<HelpCenter />} />
            <Route path='notification' element={<Notification />} />
          </Route>
          <Route path='dice' element={<Dice />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};


export default MainRoutes;
