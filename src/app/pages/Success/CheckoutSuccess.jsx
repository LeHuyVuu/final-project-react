import React, { useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { sCoin, sProductsToBuy } from '../../context/store';
import emailjs from 'emailjs-com';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const toast = React.useRef(null);

  const products = sProductsToBuy.use(); // Lấy dữ liệu từ context
  const coin = sCoin.use(); // Lấy dữ liệu từ context
  // Hàm tính tổng giá trị đơn hàng
  const calculateTotal = () => {
    if (!Array.isArray(products)) {
      // Nếu products không phải là mảng, trả về 0
      return 0;
    }

    return products.reduce((total, product) => {
      // Kiểm tra xem product có thuộc tính totalPrice không và có giá trị hợp lệ
      if (product && product.totalPrice && !isNaN(product.totalPrice)) {
        return total + product.totalPrice;
      }
      return total; // Nếu không có totalPrice hợp lệ, không cộng vào tổng
    }, 0);
  };


  // Hàm gửi email
  const sendEmail = () => {
    // Kiểm tra nếu products là một mảng hoặc một đối tượng duy nhất
    const productsArray = Array.isArray(products) ? products : [products];

    const orderItems = productsArray.map(product => ({
      name: product.name,
      units: product.quantity,
      price: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price), // Hiển thị giá đơn vị
      thumbnail_url: product.thumbnail_url // Đảm bảo rằng thumbnail_url có dữ liệu đúng
    }));

    let orderTotal = calculateTotal();  // Tính tổng đơn hàng
    const keyUser = localStorage.getItem("LoginUser"); // Lấy email từ localStorage

    // Tạo templateParams chứa thông tin gửi email
    const templateParams = {
      email_to: localStorage.getItem("email" + keyUser), // Đây là email người dùng nhập
      store_name: "TukuTiki", // Tên cửa hàng
      from_name: "TukuTiki Team", // Tên người gửi
      order_id: `#${Math.floor(Math.random() * 1000000)}`, // Tạo một ID ngẫu nhiên cho đơn hàng
      orders: orderItems.map(item => `
      <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #f0f0f0; border-radius: 8px; background-color: #fafafa;">
        <p><strong>${item.name}</strong></p>
        <p><img src="cid:${item.name}_image" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; margin-right: 10px;"/> </p>
        <p>Quantity: ${item.units}</p>
        <p>Price: ${item.price}</p>
      </div>`).join(''),  // Duyệt qua các sản phẩm và tạo danh sách với ảnh
      cost: {
        shipping: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(0), // Giá vận chuyển, giả sử là 0
        tax: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(0), // Thuế, giả sử là 0
        total: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(orderTotal - coin), // Tổng giá trị đơn hàng
      },
      email: localStorage.getItem("email" + keyUser), // Thông tin email người nhận
    };

    // Đính kèm ảnh vào email (sử dụng cid)
    const attachments = orderItems.map(item => ({
      filename: `${item.name}_image`,
      path: item.thumbnail_url,
      cid: `${item.name}_image`, // Tên CID phải trùng với tên sử dụng trong template
    }));

    // Gửi email qua EmailJS
    emailjs.send(
      'service_8dd36os', // Service ID của bạn
      'template_f26gy0c', // Template ID của bạn
      templateParams,
      'PL8gMYLSA7J6k-atS', // User ID của bạn
      attachments // Đính kèm ảnh trong email
    ).then((response) => {
      console.log('Email sent successfully', response);
      toast.current.show({
        severity: "success",
        detail: "Đã gửi email thành công! Chúng tôi sẽ gửi email cho bạn.",
        life: 3000,
      });
    }, (err) => {
      console.error('Error sending email', err);
      toast.current.show({
        severity: "danger",
        summary: "Error",
        detail: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        life: 3000,
      });
    });
  };





  useEffect(() => {
    // Gọi hàm sendEmail ngay khi trang CheckoutSuccess được render
    sendEmail();
    // Hiển thị toast thông báo thanh toán thành công
    toast.current.show({
      severity: 'success',
      summary: 'Thanh toán thành công',
      detail: 'Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.',
      life: 3000,
    });
    sCoin.set(0); // Cập nhật số dư coin sau khi thanh toán
  }, []);

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-10">
      <Toast ref={toast} />
      <Card className="w-full max-w-2xl shadow-lg rounded-xl bg-white p-8">
        <h2 className="text-4xl font-bold text-green-600 text-center mb-4">
          Thanh toán thành công!
        </h2>
        <p className="text-xl text-center text-gray-700 mb-8">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xử lý thành công.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Button
            label="Quay lại trang chủ"
            icon="pi pi-home"
            onClick={handleGoToHome}
            className="p-button-success w-full py-3 text-xl rounded-md custom-button"
          />
          <Button
            label="Tiếp tục mua sắm"
            icon="pi pi-shopping-cart"
            onClick={handleContinueShopping}
            className="p-button-info w-full py-3 text-xl rounded-md custom-button"
          />
        </div>
      </Card>

      {/* Thêm CSS tùy chỉnh */}
      <style jsx>{`
        .custom-button .p-button-icon {
          margin-right: 0.1rem !important;
        }
      `}</style>
    </div>
  );
};

export default CheckoutSuccess;
