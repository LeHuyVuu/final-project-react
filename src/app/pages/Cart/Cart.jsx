import React, { useRef, useState, useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Checkbox } from 'primereact/checkbox';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Cart = () => {
    const toast = useRef(null);
    const orderSummaryRef = useRef(null);
    const [selectAll, setSelectAll] = useState(true);
    const [isChecked, setIsChecked] = useState(true);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const confirmRemove = (itemId) => {
        confirmDialog({
            message: 'Bạn có chắc muốn xóa sản phẩm này?',
            header: 'Xác nhận xóa',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Hủy',
            acceptLabel: 'Xóa',
            acceptClassName: 'p-button-danger', // Nút Xóa màu đỏ
            rejectClassName: 'p-button-secondary', // Nút Hủy
            // Tùy chỉnh khoảng cách giữa các nút
            footer: (
                <div className="flex justify-end">
                    <Button
                        label="Hủy"
                        style={{ marginRight: '16px' }}
                        className="p-button-secondary"
                        onClick={() => toast.current.show({ severity: 'warn', summary: 'Đã hủy', detail: 'Không xóa sản phẩm nào', life: 3000 })}
                    />
                    <Button
                        label="Xóa hết"
                        style={{
                            background: '#f44336', // Màu đỏ
                            color: 'white', // Màu chữ trắng
                            border: 'none', // Không viền mặc định
                            padding: '10px 20px', // Khoảng cách bên trong nút
                            borderRadius: '8px', // Bo góc cho nút
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Hiệu ứng bóng đổ nhẹ
                            fontSize: '16px', // Kích thước chữ
                            fontWeight: '600', // Chữ đậm
                            cursor: 'pointer', // Con trỏ chuột khi hover
                            transition: 'all 0.3s ease', // Hiệu ứng chuyển tiếp mượt mà khi hover
                        }}
                        className="p-button-danger"
                        onClick={() => toast.current.show({ severity: 'success', summary: 'Đã xóa', detail: 'Đã xóa tất cả sản phẩm', life: 3000 })}
                    />
                </div>
            ),
        });
    };

    const confirmRemoveAll = () => {
        confirmDialog({
            message: 'Bạn có chắc muốn xóa tất cả sản phẩm?',
            header: 'Xóa tất cả',
            icon: 'pi pi-trash',
            acceptLabel: 'Xóa hết',
            rejectLabel: 'Hủy',
            acceptClassName: 'p-button-danger',
            rejectClassName: 'p-button-secondary',
            // Tùy chỉnh khoảng cách giữa các nút
            footer: (
                <div className="flex justify-end">
                    <Button
                        label="Hủy"
                        style={{ marginRight: '16px' }}
                        className="p-button-secondary"
                        onClick={() => {
                            toast.current.show({ severity: 'warn', summary: 'Đã hủy', detail: 'Không xóa sản phẩm nào', life: 3000 });
                        }}
                    />
                    <Button
                        label="Xóa hết"
                        style={{
                            background: '#f44336', // Màu đỏ
                            color: 'white', // Màu chữ trắng
                            border: 'none', // Không viền mặc định
                            padding: '10px 20px', // Khoảng cách bên trong nút
                            borderRadius: '8px', // Bo góc cho nút
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Hiệu ứng bóng đổ nhẹ
                            fontSize: '16px', // Kích thước chữ
                            fontWeight: '600', // Chữ đậm
                            cursor: 'pointer', // Con trỏ chuột khi hover
                            transition: 'all 0.3s ease', // Hiệu ứng chuyển tiếp mượt mà khi hover
                        }}
                        className="p-button-danger"
                        onClick={() => toast.current.show({ severity: 'success', summary: 'Đã xóa', detail: 'Đã xóa tất cả sản phẩm', life: 3000 })}
                    />
                </div>

            ),
        });
    };


    return (
        <div className="font-[Montserrat] bg-gray-100 min-h-screen">
            <Toast ref={toast} />
            <ConfirmDialog  />

            <main className="py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Cart Items */}
                        <div className="w-full lg:w-2/3">
                            <div>
                                <div className="flex justify-between items-center mb-10">
                                    <div className="font-extrabold text-5xl text-gray-800 leading-tight mb-6">
                                        My Cart
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform -rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                                                box: { className: 'border border-blue-500 ' }
                                            }}
                                        />
                                        <label htmlFor="selectAll" className="text-gray-800 font-semibold text-xl ml-2">
                                            Tất cả (2 sản phẩm)
                                        </label>
                                    </div>
                                    <div className="col-span-2 text-center text-gray-500 text-sm font-semibold text-xl">Đơn giá</div>
                                    <div className="col-span-3 text-center text-gray-500 text-sm font-semibold text-xl ml-8">Số lượng</div>
                                    <div className="col-span-2 text-center text-gray-500 text-sm font-semibold text-xl">Thành tiền</div>
                                    <div className="col-span-1 text-center ml-2">
                                        <Button
                                            icon="pi pi-trash"
                                            rounded
                                            size='large'
                                            text
                                            severity="secondary"
                                            aria-label="Xóa tất cả"
                                            onClick={confirmRemoveAll}
                                        />
                                    </div>
                                </div>

                                {/* Cart Item */}
                                <div className="grid grid-cols-12 items-center border-b py-4">

                                    <div className="col-span-4 flex items-center">
                                        <Checkbox pt={{
                                            box: { className: 'border border-blue-500' }
                                        }} inputId="item-classic" checked={isChecked} onChange={e => setIsChecked(e.checked)} />
                                        <img src="https://cdnv2.tgdd.vn/mwg-static/common/News/1569924/9.jpg" alt="Product" className="w-20 h-20 object-cover rounded mr-4 ml-2" />
                                        <div>
                                            <h5 className="text-lg font-semibold text-[#1a1a2e] mb-1">Classic Wall Clock</h5>
                                            <p className="text-gray-500 m-0">Price: $90.00</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-center text-red font-medium">$90.00</div>
                                    <div className="col-span-3 flex justify-center">
                                        <InputNumber
                                            value={1}
                                            min={1}
                                            showButtons
                                            buttonLayout="horizontal"
                                            incrementButtonIcon="pi pi-plus"
                                            decrementButtonIcon="pi pi-minus"
                                            inputClassName="w-14 text-center text-sm px-2 py-1 rounded-md border border-gray-300"
                                            className="w-[120px]"
                                        />
                                    </div>
                                    <div className="col-span-2 text-center text-red font-medium">$90.00</div>
                                    <div className="col-span-1 text-center">
                                        <Button
                                            icon="pi pi-trash"
                                            severity="contrast"
                                            size="small"
                                            className="ml-2"
                                            onClick={() => confirmRemove('Classic Wall Clock')}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 items-center border-b py-4">

                                    <div className="col-span-4 flex items-center">
                                        <Checkbox pt={{
                                            box: { className: 'border border-blue-500 ' }
                                        }} inputId="item-classic" checked={isChecked} onChange={e => setIsChecked(e.checked)} />
                                        <img src="https://cdnv2.tgdd.vn/mwg-static/common/News/1569924/9.jpg" alt="Product" className="w-20 h-20 object-cover rounded mr-4 ml-2" />
                                        <div>
                                            <h5 className="text-lg font-semibold text-[#1a1a2e] mb-1">Classic Wall Clock</h5>
                                            <p className="text-gray-500 m-0">Price: $90.00</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-center text-red font-medium">$90.00</div>
                                    <div className="col-span-3 flex justify-center">
                                        <InputNumber
                                            value={1}
                                            min={1}
                                            showButtons
                                            buttonLayout="horizontal"
                                            incrementButtonIcon="pi pi-plus"
                                            decrementButtonIcon="pi pi-minus"
                                            inputClassName="w-14 text-center text-sm px-2 py-1 rounded-md border border-gray-300"
                                            className="w-[120px]"
                                        />
                                    </div>
                                    <div className="col-span-2 text-center text-red font-medium">$90.00</div>
                                    <div className="col-span-1 text-center">
                                        <Button
                                            icon="pi pi-trash"
                                            severity="contrast"
                                            size="small"
                                            className="ml-2"
                                            onClick={() => confirmRemove('Classic Wall Clock')}
                                        />
                                    </div>
                                </div>

                                {/* Repeat the above Cart Item for others */}
                                {/* Add responsiveness classes for each item */}
                            </div>
                        </div>

                        {/* Order Summary - Smooth Scroll Effect */}
                        <div
                            ref={orderSummaryRef}
                            className="w-full lg:w-1/3 self-auto"
                            style={{
                                transform: `translateY(${Math.min(scrollY, 300)}px)`,
                                transition: 'transform 1s ease-out',
                                willChange: 'transform'
                            }}
                        >
                            <Card className="shadow-xl rounded-2xl bg-white p-6">
                                <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">Order Summary</h3>

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
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s" alt="VNPay" className="w-8 h-8 object-contain mb-1" />
                                        <span className="text-xs font-medium text-[#5f4b8b]">VNPay</span>
                                    </Button>

                                    {/* Momo */}
                                    <Button className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fce0e6] transition-all border border-[#f7c1cc]">
                                        <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" className="w-8 h-8 object-contain mb-1" />
                                        <span className="text-xs font-medium text-[#cc2b5e]">MoMo</span>
                                    </Button>

                                    {/* PayPal */}
                                    <Button className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-white hover:bg-[#fcf2d9] transition-all border border-[#fbe5a3]">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-8 h-8 object-contain mb-1" />
                                        <span className="text-xs font-medium text-[#003087]">PayPal</span>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cart;
