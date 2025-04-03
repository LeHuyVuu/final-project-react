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

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Like from "../Home/Partial/Like";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.productToBuy;  // Lấy productToBuy từ location state
  // Nếu productToBuy là một đối tượng (khi mua ngay), thì chuyển thành mảng, nếu không, giữ nguyên là mảng
  const [products, setProducts] = useState(Array.isArray(product) ? product : [product]);

  console.log({ products })
  console.log(JSON.stringify(product, null, 2));

  const toast = useRef(null);
  const orderSummaryRef = useRef(null);
  const [selectAll, setSelectAll] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  const [scrollY, setScrollY] = useState(0);


  const carouselAds = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Up to 50% off on all summer items!",
      image:
        "https://img.freepik.com/free-vector/gradient-sale-background_23-2148934477.jpg",
      buttonText: "Shop Now",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest collection!",
      image:
        "https://img.freepik.com/free-vector/realistic-3d-sale-background_52683-62689.jpg",
      buttonText: "Explore",
    },
    {
      id: 3,
      title: "Flash Deal",
      description: "24 hours only! Special prices on selected items.",
      image:
        "https://img.freepik.com/free-vector/gradient-sale-background_23-2148829809.jpg",
      buttonText: "Don't Miss Out",
    },
  ];


  useEffect(() => {
    if (!product) {
      // Điều hướng về trang mà bạn muốn (ví dụ: trang chủ hoặc trang sản phẩm)
      navigate("/");  // Ví dụ điều hướng về trang chủ
    }
  }, [product, navigate]);
  const confirmRemove = (productName) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa sản phẩm này?",
      header: "Xác nhận xóa",
      icon: "pi pi-info-circle",
      rejectLabel: "Hủy",
      acceptLabel: "Xóa",
      acceptClassName: "p-button-danger", // Nút Xóa màu đỏ
      rejectClassName: "p-button-secondary", // Nút Hủy
      // Tùy chỉnh khoảng cách giữa các nút
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
            label="Xóa hết"
            style={{
              background: "#f44336", // Màu đỏ
              color: "white", // Màu chữ trắng
              border: "none", // Không viền mặc định
              padding: "10px 20px", // Khoảng cách bên trong nút
              borderRadius: "8px", // Bo góc cho nút
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng đổ nhẹ
              fontSize: "16px", // Kích thước chữ
              fontWeight: "600", // Chữ đậm
              cursor: "pointer", // Con trỏ chuột khi hover
              transition: "all 0.3s ease", // Hiệu ứng chuyển tiếp mượt mà khi hover
            }}
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

  const confirmRemoveAll = () => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa tất cả sản phẩm?",
      header: "Xóa tất cả",
      icon: "pi pi-trash",
      acceptLabel: "Xóa hết",
      rejectLabel: "Hủy",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      // Tùy chỉnh khoảng cách giữa các nút
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
            style={{
              background: "#f44336", // Màu đỏ
              color: "white", // Màu chữ trắng
              border: "none", // Không viền mặc định
              padding: "10px 20px", // Khoảng cách bên trong nút
              borderRadius: "8px", // Bo góc cho nút
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng đổ nhẹ
              fontSize: "16px", // Kích thước chữ
              fontWeight: "600", // Chữ đậm
              cursor: "pointer", // Con trỏ chuột khi hover
              transition: "all 0.3s ease", // Hiệu ứng chuyển tiếp mượt mà khi hover
            }}
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



  const [quantity, setQuantity] = useState(product?.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(product?.price * quantity);
  // Update total price when quantity changes
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * product?.price);
  };

  const checkOut = () => {
    const item = {
      id: product?.id,
      name: product?.name,
      current_seller: product?.current_seller?.name,
      price: product?.price,
      quantity: quantity,
      original_price: product?.original_price,
      thumbnail_url: product?.thumbnail_url,
      isPaid: true,
      totalPrice: totalPrice
    };
    localStorage.setItem(product.id, JSON.stringify(item));
  };


  // Template for carousel ad items
  const adTemplate = (ad) => {
    return (
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{ad.title}</h3>
          <p className="mb-3 text-sm">{ad.description}</p>
          <Button label={ad.buttonText} size="small" className="w-max" />
        </div>
      </div>
    );
  };

  return (
    <div className="font-[Montserrat] bg-gray-100 min-h-screen">
      <Toast ref={toast} />
      <ConfirmDialog />

      <main className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <div>
                <div className="flex justify-between items-center mb-10">
                  <div className="font-extrabold text-5xl text-gray-800 leading-tight mb-6">
                    Payment
                  </div>

                  <div className="flex items-center space-x-2">
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
                      Continue shopping
                    </button>
                  </div>
                </div>

                {/* Select All Header */}
                <div className="grid grid-cols-12 items-center rounded-t-md">
                  <div className="col-span-4 flex items-center gap-2">
                    <Checkbox
                      inputId="selectAll"
                      checked={selectAll}
                      onChange={(e) => setSelectAll(e.checked)}
                      pt={{
                        box: { className: "border border-blue-500 " },
                      }}
                    />
                    <label
                      htmlFor="selectAll"
                      className="text-gray-800 font-semibold text-xl ml-2"
                    >
                      Tất cả (2 sản phẩm)
                    </label>
                  </div>
                  <div className="col-span-2 text-center text-gray-500 text-sm font-semibold text-xl">
                    Đơn giá
                  </div>
                  <div className="col-span-3 text-center text-gray-500 text-sm font-semibold text-xl ml-8">
                    Số lượng
                  </div>
                  <div className="col-span-2 text-center text-gray-500 text-sm font-semibold text-xl">
                    Thành tiền
                  </div>
                  <div className="col-span-1 text-center ml-2">
                    <Button
                      icon="pi pi-trash"
                      rounded
                      size="large"
                      text
                      severity="secondary"
                      aria-label="Xóa tất cả"
                      onClick={confirmRemoveAll}
                    />
                  </div>
                </div>










                {/* Loop through products and display each as a card */}
                {products.map((product) => (
                  <div key={product?.id} className="grid grid-cols-12 items-center border-b py-4">
                    <div className="col-span-4 flex items-center">
                      <Checkbox
                        pt={{ box: { className: "border border-blue-500" } }}
                        inputId="item-classic"
                        checked={true}
                        onChange={() => { }}
                      />
                      <img
                        src={product?.thumbnail_url}
                        alt="Product"
                        className="w-20 h-20 object-cover rounded mr-4 ml-2"
                      />
                      <div>
                        <h5 className="text-lg font-semibold text-[#1a1a2e] mb-1">{product?.name}</h5>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <i className="pi pi-shopping-bag mr-1"></i>
                          <span> {product?.current_seller}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-red font-medium">
                      <p className="text-gray-500 m-0">Price: {product?.price}</p>
                      <p className="text-red-600 m-0">OldPrice: {product?.original_price}</p>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <InputNumber
                        value={quantity}
                        min={1}
                        showButtons
                        buttonLayout="horizontal"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        inputClassName="w-14 text-center text-sm px-2 py-1 rounded-md border border-gray-300"
                        className="w-[120px]"
                        onValueChange={(e) => handleQuantityChange(e.value)} // Update quantity on change
                      />
                    </div>
                    <div className="col-span-2 text-center text-red font-medium">
                      <p className="text-gray-500 m-0">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                      </p>
                    </div>
                    <div className="col-span-1 text-center">
                      <Button
                        icon="pi pi-trash"
                        severity="contrast"
                        size="small"
                        className="ml-2"
                      />
                    </div>
                  </div>
                ))}
















              </div>
            </div>


            {/* Order Summary - Smooth Scroll Effect */}
            <div
              ref={orderSummaryRef}
              className="w-full mt-20 lg:w-1/3 self-auto"
              style={{
                transform: `translateY(${Math.min(scrollY, 100)}px)`,
                transition: "transform 0.5s ease-out",
                willChange: "transform",
              }}
            >
              <Card className="shadow-xl rounded-2xl bg-white p-6">
                <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">
                  Order Summary
                </h3>

                <div className="flex justify-between mb-3 text-base">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-800">$210.00</span>
                </div>

                <div className="flex justify-between mb-3 text-base">
                  <span>Tax (10%):</span>
                  <span className="font-semibold text-gray-800">$21.00</span>
                </div>

                <Divider className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-[#1a1a2e]">$231.00</span>
                </div>

                {/* Payment Buttons */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {/* VNPay */}
                  <Button className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#e6e0f4] transition-all border border-[#c9bce9]">
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
                  <Button className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fce0e6] transition-all border border-[#f7c1cc]">
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
                  <Button className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fcf2d9] transition-all border border-[#fbe5a3]">
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

                <button className="mt-10 bg-slate-400" onClick={checkOut}>
                  Thanh toán
                </button>
              </Card>

              {/* Carousel Advertisement Section */}
              <div className="mt-6">
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  navigation
                  loop={true}
                  className="rounded-xl overflow-hidden"
                >
                  {carouselAds.map((ad) => (
                    <SwiperSlide key={ad.id}>{adTemplate(ad)}</SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Suggested Products Section */}
          <div className="mt-16">
            <Like />
          </div>


        </div>
      </main>
    </div>
  );
};

export default Payment;
