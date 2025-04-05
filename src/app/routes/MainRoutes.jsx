import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound/PageNotFound";
import RootLayout from "../layouts/RootLayout";
import Category from "../pages/Category/Category";
import ProductDetail from "../pages/Detail/patrials/ProductDetail";
import Home from "../pages/Home/Home";

import Cart from "../pages/Cart/Cart.jsx";
import Payment from "../pages/Payment/Payment.jsx";


import SignInSignUp from '../pages/SignInSignUp/SignInSignUp.jsx';

import Account from '../pages/User/Account.jsx';
import AccountInformation from '../pages/User/AccountInformation/AccountInformation.jsx';
import UpdatePhoneNumber from '../pages/User/AccountInformation/PhoneNumberAndEmail/UpdatePhoneNumber/UpdatePhoneNumber.jsx';
import UpdateEmail from '../pages/User/AccountInformation/PhoneNumberAndEmail/UpdateEmail/UpdateEmail.jsx';
import ChangePassword from '../pages/User/AccountInformation/PhoneNumberAndEmail/ChangePassword/ChangePassword.jsx';
import UpdatePIN from '../pages/User/AccountInformation/PhoneNumberAndEmail/UpdatePIN/UpdatePIN.jsx';
import OrderManagement from '../pages/User/OrderManagement/OrderManagement.jsx';
import HelpCenter from '../pages/User/HelpCenter/HelpCenter.jsx';
import Notification from '../pages/User/Notification/Notification.jsx';
import Address from '../pages/User/Address/Address.jsx';
import CreateAddress from '../pages/User/Address/CreateAddress/CreateAddress.jsx';

import Dice from '../pages/User/Game/Dice/Dice.jsx';


import CategorySideBar from "../pages/CategorySideBar/CategorySideBar.jsx";
import CheckoutSuccess from "../pages/Success/CheckoutSuccess.jsx";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="detail" element={<ProductDetail />} />
          <Route path="category" element={<Category />} />
          <Route path='/checkout' element={<Payment />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="category/:categoryId" element={<Category />} />

          <Route path='login' element={<SignInSignUp />} />
          <Route path='account' element={<Account />} >
            <Route path='information' element={<AccountInformation />} />
            <Route path='information/phonenumber' element={<UpdatePhoneNumber />} />
            <Route path='information/email' element={<UpdateEmail />} />
            <Route path='information/pasword' element={<ChangePassword />} />
            <Route path='information/pin' element={<UpdatePIN />} />
            <Route path='order' element={<OrderManagement />} />
            <Route path='help-center' element={<HelpCenter />} />
            <Route path='notification' element={<Notification />} />
            <Route path='address' element={<Address />} />
            <Route path='address/create/:Id' element={<CreateAddress />} />
          </Route>
          <Route path='dice' element={<Dice />} />
          <Route path='categorysidesar' element={<CategorySideBar />} />

          <Route path='/checkout/success' element={<CheckoutSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
