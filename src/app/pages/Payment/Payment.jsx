import { useRef, useState, useEffect } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Checkbox } from "primereact/checkbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import emailjs from 'emailjs-com';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Like from "../Home/Partial/Like";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sCoin, sCountItem, sProductsToBuy } from "../../context/store";
import UserInfo from "../../components/LocationUser/UserInfo";
const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.productToBuy;
  console.log({ product })
  sProductsToBuy.set(product); // Lưu sản phẩm vào store
  const [products, setProducts] = useState(Array.isArray(product) ? product : [product]);
  const toast = useRef(null);
  const coin = sCoin.use(); // Lấy dữ liệu xu từ context
  const [usePoints, setUsePoints] = useState(false); // Thêm state cho việc sử dụng xu


  // Hàm cập nhật số lượng và tính lại giá cho từng sản phẩm
  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === id) {
          const updatedProduct = {
            ...product,
            quantity: newQuantity,
            totalPrice: newQuantity * product.price, // Cập nhật lại giá thành tiền cho sản phẩm
          };
          return updatedProduct;
        }
        return product;
      });
    });
  };

  // Tính tổng giá trị trong Order Summary cho tất cả sản phẩm
  const calculateTotal = () => {
    let total = products.reduce((total, item) => total + item?.totalPrice, 0);
    if (usePoints) {
      total -= coin; // Giảm giá 50,000 VND khi sử dụng xu (có thể thay đổi số lượng xu)
    }
    return total;
  };

  const checkOut = () => {
    if (products && Array.isArray(products) && products.length > 0) {
      products.forEach((prod) => {
        const item = {
          id: prod?.id,
          name: prod?.name,
          current_seller: prod?.current_seller, // Dữ liệu là chuỗi, không cần thuộc tính '.name'
          price: prod?.price,
          quantity: prod?.quantity,
          original_price: prod?.original_price,
          thumbnail_url: prod?.thumbnail_url,
          isPaid: true,
          totalPrice: prod?.totalPrice,
        };

        // Log item để kiểm tra
        console.log({ item });

        // Lưu vào danh sách đơn hàng đã đặt (orderHistory) trong localStorage
        let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];  // Nếu chưa có, tạo mảng rỗng
        orderHistory.push(item);  // Thêm sản phẩm vào danh sách đơn hàng
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));  // Cập nhật lại orderHistory

        // Xóa sản phẩm khỏi cartItems trong localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);  // Loại bỏ sản phẩm đã thanh toán
        localStorage.setItem('cartItems', JSON.stringify(cartItems));  // Cập nhật lại cartItems trong localStorage

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        sCountItem.set(JSON.parse(localStorage.getItem("cartItems"))?.length);

        // Chuyển hướng đến trang thanh toán thành công
        navigate('/step/checkout/success');

      });
    } else {
      console.error("Invalid product data");
    }
  };

  return (
    <div className="min-h-screen">
      <Toast ref={toast} />
      <ConfirmDialog />
      <sProductsToBuy.DevTool name="Products to Buy" />
      <main className="pt-10 px-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full  rounded-md">
              <div>
                {/* Select All Header */}
                <div className=" bg-blue-200 py-3 grid grid-cols-12 items-center rounded-t-md">
                  <div className="col-span-6 flex items-center gap-2">
                    <label
                      htmlFor="selectAll"
                      className="text-gray-800 font-semibold text-md ml-2"
                    >
                      {products.length} sản phẩm
                    </label>
                  </div>
                  <div className="col-span-2 text-center text-gray-800  font-semibold text-md">
                    Đơn giá
                  </div>
                  <div className="col-span-2 text-center text-gray-800  font-semibold text-md">
                    Số lượng
                  </div>
                  <div className="col-span-2 text-center text-gray-800  font-semibold text-md">
                    Thành tiền
                  </div>
                </div>

                {/* Loop through products and display each as a card */}
                {products.map((product) => (
                  <div key={product?.id} className="rounded-md grid grid-cols-12 bg-white items-center border-b py-4">
                    <div className="col-span-6 flex items-center">
                      <img
                        src={product?.thumbnail_url}
                        alt="Product"
                        className="w-20 h-20 object-cover rounded mr-4 ml-2"
                      />
                      <div>
                        <h5 className="text-md text-[#1a1a2e] mb-1 min-h-12 line-clamp-3 overflow-hidden text-ellipsis">{product?.name}</h5>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <i className="pi pi-shopping-bag mr-1"></i>
                          <span> {product?.current_seller}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-red-400 font-medium">
                      <p className="flex flex-col m-0">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product?.price)}
                        {product?.original_price && product?.original_price !== product?.price && (
                          <span className="text-xs text-gray-500 line-through italic ml-2">
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product?.original_price)}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <InputNumber
                        value={product?.quantity}
                        min={1}
                        max={1000}
                        showButtons
                        buttonLayout="horizontal"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        inputClassName="w-14 text-center text-sm px-2 py-1 rounded-md border border-gray-300"
                        className="w-[120px]"
                        onValueChange={(e) => handleQuantityChange(product.id, e.value)}
                      />
                    </div>
                    <div className="col-span-2 text-center text-red font-medium">
                      <p className="text-red-400 m-0">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product?.totalPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 sticky h-full left-0 top-40 self-auto">
              <UserInfo />
              <Card className="shadow-xl rounded-2xl bg-white p-6">
                <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">Phương thức thanh toán</h3>

                <Divider className="my-4" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng tiền:</span>
                  <span className="text-[#1a1a2e]">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(calculateTotal())}
                  </span>
                </div>

                {/* Payment Buttons */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {/* Add checkbox for using points */}
                  <div className="col-span-3 flex items-center gap-2">
                    <Checkbox
                      inputId="usePoints"
                      checked={usePoints}
                      onChange={(e) => setUsePoints(e.checked)} // Toggle usePoints state
                    />
                    <label htmlFor="usePoints" className="text-sm font-medium">
                      Sử dụng xu ({new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(coin)})
                    </label>
                  </div>
                  <Button onClick={checkOut} className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#e6e0f4] transition-all border border-[#c9bce9]">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                      alt="VNPay"
                      className="w-8 h-8 object-contain mb-1"
                    />
                    <span className="text-xs font-medium text-[#5f4b8b]">VNPay</span>
                  </Button>

                  <Button onClick={checkOut} className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fce0e6] transition-all border border-[#f7c1cc]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                      alt="Momo"
                      className="w-8 h-8 object-contain mb-1"
                    />
                    <span className="text-xs font-medium text-[#cc2b5e]">MoMo</span>
                  </Button>

                  <Button onClick={checkOut} className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fcf2d9] transition-all border border-[#fbe5a3]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      alt="PayPal"
                      className="w-8 h-8 object-contain mb-1"
                    />
                    <span className="text-xs font-medium text-[#003087]">PayPal</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-10">
            <Like />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
