import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho useHistory

const CheckoutSuccess = () => {
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const toast = React.useRef(null);

    // Hiển thị thông báo thành công khi component được render
    React.useEffect(() => {
        toast.current.show({
            severity: 'success',
            summary: 'Thanh toán thành công',
            detail: 'Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.',
            life: 3000,
        });
    }, []);

    const handleGoToHome = () => {
        navigate('/'); // Dẫn đến trang chủ
    };

    const handleContinueShopping = () => {
        navigate('/shop'); // Dẫn đến trang cửa hàng
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Toast ref={toast} />
            <Card className="p-8 w-full max-w-lg shadow-2xl rounded-2xl bg-white">
                <h2 className="text-4xl font-extrabold text-green-600 text-center mb-6">Thanh toán thành công!</h2>
                <p className="text-xl text-center text-gray-700 mb-8">
                    Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xử lý thành công.
                </p>

                <Divider className="my-6" />

                <div className="flex justify-between gap-4">
                    <Button 
                        label="Quay lại trang chủ" 
                        icon="pi pi-home" 
                        onClick={handleGoToHome} 
                        className="p-button-success w-full py-3 text-xl"
                    />
                    <Button 
                        label="Tiếp tục mua sắm" 
                        icon="pi pi-shopping-cart" 
                        onClick={handleContinueShopping} 
                        className="p-button-info w-full py-3 text-xl"
                    />
                </div>
            </Card>
        </div>
    );
};

export default CheckoutSuccess;
