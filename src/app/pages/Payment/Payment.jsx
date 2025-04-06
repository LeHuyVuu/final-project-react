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

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Like from "../Home/Partial/Like";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sCountItem } from "../../context/store";
import UserInfo from "../../components/LocationUser/UserInfo";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.productToBuy;
  console.log({ product })
  const [products, setProducts] = useState(Array.isArray(product) ? product : [product]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toast = useRef(null);

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

          // Nếu sản phẩm đã được chọn, cập nhật lại trong selectedItems
          if (selectedItems.some(item => item.id === id)) {
            setSelectedItems(prevItems =>
              prevItems.map(item => item.id === id ? updatedProduct : item)
            );
          }

          return updatedProduct;
        }
        return product;
      });
    });
  };

  // Tính tổng giá trị trong Order Summary
  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item?.totalPrice, 0);
  };

  // Cập nhật selectedItems khi chọn hoặc bỏ chọn sản phẩm
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const isItemSelected = prevSelectedItems.some((item) => item.id === id);
      if (isItemSelected) {
        return prevSelectedItems.filter((item) => item.id !== id);
      } else {
        const itemToAdd = products.find((item) => item.id === id);
        return [...prevSelectedItems, itemToAdd];
      }
    });
  };

  // Hàm chọn hoặc bỏ chọn tất cả sản phẩm
  const handleSelectAll = () => {
    if (selectAll) {
      // Nếu tất cả đã được chọn, bỏ chọn tất cả
      setSelectedItems([]);
    } else {
      // Nếu chưa chọn tất cả, chọn tất cả sản phẩm
      setSelectedItems(products);
    }
    setSelectAll(!selectAll);
  };

  // Tự động chọn sản phẩm khi có duy nhất 1 sản phẩm trong giỏ
  useEffect(() => {
    if (products.length === 1) {
      setSelectedItems(products);
      setSelectAll(true); // Chọn tất cả khi chỉ có một sản phẩm
    }
  }, [products]);

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

        // Lưu vào localStorage cho sản phẩm cụ thể
        // localStorage.setItem(item.id, JSON.stringify(item));

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
        navigate('/step/checkout/success', { state: { item } });
      });
    } else {
      console.error("Invalid product data");
    }

  };



  // Xác nhận xóa sản phẩm
  const confirmRemove = (productName) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa sản phẩm này?",
      header: "Xác nhận xóa",
      icon: "pi pi-info-circle",
      rejectLabel: "Hủy",
      acceptLabel: "Xóa",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      footer: (
        <div className="flex justify-end">
          <Button
            label="Hủy"
            style={{ marginRight: "16px" }}
            className="p-button-secondary"
            onClick={() =>
              toast.current.show({
                severity: "warn",
                summary: "Đã hủy",
                detail: "Không xóa sản phẩm nào",
                life: 3000,
              })
            }
          />
          <Button
            label="Xóa"
            className="p-button-danger"
            onClick={() =>
              toast.current.show({
                severity: "success",
                summary: "Đã xóa",
                detail: "Đã xóa sản phẩm " + productName,
                life: 3000,
              })
            }
          />
        </div>
      ),
    });
  };

  // Xác nhận xóa tất cả sản phẩm
  const confirmRemoveAll = () => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa tất cả sản phẩm?",
      header: "Xóa tất cả",
      icon: "pi pi-trash",
      acceptLabel: "Xóa hết",
      rejectLabel: "Hủy",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      footer: (
        <div className="flex justify-end">
          <Button
            label="Hủy"
            style={{ marginRight: "16px" }}
            className="p-button-secondary"
            onClick={() => {
              toast.current.show({
                severity: "warn",
                summary: "Đã hủy",
                detail: "Không xóa sản phẩm nào",
                life: 3000,
              });
            }}
          />
          <Button
            label="Xóa hết"
            className="p-button-danger"
            onClick={() =>
              toast.current.show({
                severity: "success",
                summary: "Đã xóa",
                detail: "Đã xóa tất cả sản phẩm",
                life: 3000,
              })
            }
          />
        </div>
      ),
    });
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      <Toast ref={toast} />
      <ConfirmDialog />

      <main className="pt-10 px-12">

        <div className="container mx-auto px-4">
          {/* <div className="flex justify-between items-center mb-10">
            <div className="font-semibold text-3xl text-gray-800 leading-tight mb-6">
              <i className="pi pi-check-circle mr-2 text-3xl"></i> Payment
            </div>
            <div className="flex items-center space-x-2">
              <Link to='/'>
                <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 transform -rotate-90"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 11-1.414 1.414L11 5.414V14a1 1 0 11-2 0V5.414L7.707 7.707A1 1 0 116.293 6.293l3-3A1 1 0 0110 3z" />
                  </svg>
                  Tiếp tục mua sắm
                </button>
              </Link>
            </div>
          </div> */}

          <div className="flex justify-between flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full  rounded-md">
              <div>
                {/* Select All Header */}
                <div className=" bg-blue-200 py-3 grid grid-cols-12 items-center rounded-t-md">
                  <div className="col-span-6 flex items-center gap-2">
                    {/* <Checkbox
                      inputId="selectAll"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll()} // Chỉnh lại hàm handleSelectAll
                    /> */}
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
                  {/* <div className="col-span-1 text-center ml-2">
                    <Button
                      icon="pi pi-trash"
                      rounded
                      size="large"
                      text
                      severity="secondary"
                      aria-label="Xóa tất cả"
                      onClick={confirmRemoveAll}
                    />
                  </div> */}
                </div>

                {/* Loop through products and display each as a card */}
                {products.map((product) => (
                  <div key={product?.id} className="rounded-md grid grid-cols-12 bg-white items-center border-b py-4">
                    <div className="col-span-6 flex items-center">
                      {/* <Checkbox
                        inputId={`item-${product.id}`}
                        checked={selectedItems.some((item) => item.id === product.id)}
                        onChange={() => handleSelectItem(product.id)}
                      /> */}
                      <img
                        src={product?.thumbnail_url}
                        alt="Product"
                        className="w-20 h-20 object-cover rounded mr-4 ml-2"
                      />
                      <div>
                        <h5 className="text-md text-[#1a1a2e] mb-1 min-h-12  line-clamp-3 overflow-hidden text-ellipsis">{product?.name}</h5>
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
                    {/* <div className="col-span-1 text-center">
                      <Button
                        icon="pi pi-trash"
                        severity="contrast"
                        size="small"
                        className="ml-2"
                      />
                    </div> */}
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
                  {/* VNPay */}

                  <Button onClick={checkOut} className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#e6e0f4] transition-all border border-[#c9bce9]">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                      alt="VNPay"
                      className="w-8 h-8 object-contain mb-1"
                    />
                    <span className="text-xs font-medium text-[#5f4b8b]">
                      VNPay
                    </span>
                  </Button>

                  {/* Momo */}
                  <Button onClick={checkOut} className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fce0e6] transition-all border border-[#f7c1cc]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                      alt="Momo"
                      className="w-8 h-8 object-contain mb-1"
                    />
                    <span className="text-xs font-medium text-[#cc2b5e]">
                      MoMo
                    </span>
                  </Button>

                  {/* PayPal */}
                  <Button onClick={checkOut} className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fcf2d9] transition-all border border-[#fbe5a3]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      alt="PayPal"
                      className="w-8 h-8 object-contain mb-1"
                    />
                    <span className="text-xs font-medium text-[#003087]">
                      PayPal
                    </span>
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
