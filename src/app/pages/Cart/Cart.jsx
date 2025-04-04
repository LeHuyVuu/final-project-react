import { useRef, useState, useEffect } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Checkbox } from "primereact/checkbox";
import "./Cart.css";

import { Link, useNavigate } from "react-router-dom";
import { sCountItem } from "../../context/store";


const Cart = () => {
    const navigate = useNavigate();
    const toast = useRef(null);

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
    // Giả sử các sản phẩm trong giỏ hàng được lưu trong localStorage
    const [cartItems, setCartItems] = useState(() => {
        const storedItems = localStorage.getItem("cartItems");
        return storedItems ? JSON.parse(storedItems) : [];
    });
    const [selectAll, setSelectAll] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

    // Trạng thái để theo dõi việc chọn tất cả trong mỗi cửa hàng
    const [selectAllBySeller, setSelectAllBySeller] = useState({});

    // Tính tổng giá trị giỏ hàng (không phân biệt seller)

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + item.totalPrice, 0);
    };

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity };
                    // Update selectedItems if item is selected
                    if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
                        setSelectedItems(prevSelectedItems => {
                            return prevSelectedItems.map(selItem => {
                                if (selItem.id === item.id) {
                                    return updatedItem;
                                }
                                return selItem;
                            });
                        });
                    }
                    return updatedItem;
                }
                return item;
            });
            localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Cập nhật vào localStorage
            return updatedItems;
        });
    };

    const removeItem = (id) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.filter(item => item.id !== id);
            localStorage.setItem("cartItems", JSON.stringify(updatedItems));
            setSelectedItems(prevSelectedItems => prevSelectedItems.filter(item => item.id !== id)); // Remove from selectedItems if removed
            sCountItem.set(JSON.parse(localStorage.getItem("cartItems"))?.length)
            return updatedItems;
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
            footer: (
                <div className="flex justify-end">
                    <Button
                        label="Hủy"
                        style={{ marginRight: "16px" }}
                        className="p-button-secondary"
                        onClick={() => toast.current.show({ severity: "warn", summary: "Đã hủy", detail: "Không xóa sản phẩm nào", life: 3000 })}
                    />
                    <Button
                        label="Xóa hết"
                        style={{ background: "#f44336", color: "white", border: "none", padding: "10px 20px" }}
                        className="p-button-danger"
                        onClick={() => {
                            setCartItems([]);
                            setSelectedItems([]);
                            localStorage.removeItem("cartItems");
                            sCountItem.set(0);
                            toast.current.show({ severity: "success", summary: "Đã xóa tất cả sản phẩm", detail: "", life: 3000 });
                        }}
                    />
                </div>
            ),
        });
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Handle single item selection
    const handleSelectItem = (id) => {
        setSelectedItems(prevSelectedItems => {
            const isItemSelected = prevSelectedItems.some(item => item.id === id);
            if (isItemSelected) {
                return prevSelectedItems.filter(item => item.id !== id);  // Bỏ chọn sản phẩm
            } else {
                const itemToAdd = cartItems.find(item => item.id === id);
                return [...prevSelectedItems, itemToAdd];  // Thêm sản phẩm vào danh sách đã chọn
            }
        });
    };

    // Handle "select all" toggle for each seller
    const handleSelectAllBySeller = (seller) => {
        setSelectAllBySeller(prev => {
            const newSelectAllBySeller = { ...prev };
            newSelectAllBySeller[seller] = !newSelectAllBySeller[seller];

            if (newSelectAllBySeller[seller]) {
                // Chọn tất cả sản phẩm của seller
                setSelectedItems(prevSelectedItems => [
                    ...prevSelectedItems,
                    ...cartItems.filter(item => item.current_seller === seller && !prevSelectedItems.some(selectedItem => selectedItem.id === item.id))
                ]);
            } else {
                // Bỏ chọn tất cả sản phẩm của seller
                setSelectedItems(prevSelectedItems => prevSelectedItems.filter(item => item.current_seller !== seller));
            }

            return newSelectAllBySeller;
        });
    };

    // Handle "select all" toggle for entire cart

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);  // Bỏ chọn tất cả
        } else {
            setSelectedItems(cartItems);  // Chọn tất cả sản phẩm
        }
        setSelectAll(!selectAll);  // Đổi trạng thái selectAll
    };



    // Handle checkout and pass selected items
    const handleCheckout = () => {
        navigate("/checkout", { state: { productToBuy: selectedItems } });
    };

    // Gom nhóm theo current_seller
    const groupedBySeller = cartItems.reduce((acc, item) => {
        const seller = item.current_seller;
        if (!acc[seller]) {
            acc[seller] = [];
        }
        acc[seller].push(item);
        return acc;
    }, {});

    return (
        <div className="font-[Montserrat] bg-gray-100 min-h-screen">
            <Toast ref={toast} />
            <ConfirmDialog />

            <main className="py-10 px-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="w-full lg:w-2/3">
                            <div>
                                <div className="flex justify-between items-center mb-10">
                                    <div className=" text-3xl text-gray-800 mb-6">
                                        Giỏ Hàng
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link to='/'>
                                            <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform -rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 11-1.414 1.414L11 5.414V14a1 1 0 11-2 0V5.414L7.707 7.707A1 1 0 116.293 6.293l3-3A1 1 0 0110 3z" />
                                                </svg>
                                                Continue shopping
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Select All Header */}
                                <div className="grid grid-cols-12 items-center rounded-t-md">
                                    <div className="col-span-4 flex items-center gap-2">
                                        <Checkbox
                                            inputId="selectAll"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        /> {/* Chọn tất cả trong giỏ */}
                                        <label htmlFor="selectAll" className="text-gray-800 font-semibold text-xl ml-2">
                                            Tất cả sản phẩm ({cartItems.length})
                                        </label>
                                    </div>
                                    <div className="col-span-2 text-center text-gray-500 font-semibold text-xl">
                                        Đơn giá
                                    </div>
                                    <div className="col-span-3 text-center text-gray-500 font-semibold text-xl ml-8">
                                        Số lượng
                                    </div>
                                    <div className="col-span-2 text-center text-gray-500 font-semibold text-xl">
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

                                {/* Shop-wise Selection */}
                                {Object.keys(groupedBySeller).map((seller) => (
                                    <div key={seller} className="bg-white mb-6 ">
                                        <div className="flex  items-center gap-2 mb-4">
                                        <div className=" mr-2">
                                                <Checkbox
                                                    checked={selectAllBySeller[seller] || false}
                                                    onChange={() => handleSelectAllBySeller(seller)}
                                                    inputId={`selectAll-${seller}`}
                                                /> {/* Chọn tất cả trong cửa hàng */}
                                             
                                            </div>
                                            <div className="text-2xl">
                                                <i className="pi pi-shopping-bag mr-1"></i>
                                                <span>  {seller}</span>
                                            </div>

                                            
                                        </div>
                                     
                                        {groupedBySeller[seller].map((item) => (
                                            <div key={item.id} className="grid  grid-cols-12 items-center border-b py-4">
                                                <div className="col-span-4 flex">
                                                    <Checkbox
                                                        checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                                                        onChange={() => handleSelectItem(item.id)}
                                                    /> {/* Chọn sản phẩm */}
                                                    <img src={item.thumbnail_url} alt="Product" className="w-20 h-20 object-cover rounded mr-4 ml-2" />
                                                    <div>
                                                    <h5 className="text-md text-[#1a1a2e] mb-1 min-h-12  line-clamp-2 overflow-hidden text-ellipsis">{item.name}</h5>

                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-center text-red font-medium">
                                                    <p className="text-gray-500 m-0">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                                                </div>
                                                <div className="col-span-3 flex justify-center">
                                                    <InputNumber
                                                        value={item.quantity}
                                                        min={1}
                                                        showButtons
                                                        buttonLayout="horizontal"
                                                        incrementButtonIcon="pi pi-plus"
                                                        decrementButtonIcon="pi pi-minus"
                                                        inputClassName="w-14 text-center text-sm px-2 py-1 rounded-md border border-gray-300"
                                                        className="w-[120px]"
                                                        onValueChange={(e) => handleQuantityChange(item.id, e.value)}
                                                    />
                                                </div>
                                                <div className="col-span-2 text-center text-red font-medium">
                                                    <p className="text-gray-500 m-0">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}
                                                    </p>
                                                </div>
                                                <div className="col-span-1 text-center">
                                                    <Button
                                                        icon="pi pi-trash"
                                                        severity="contrast"
                                                        size="small"
                                                        className="ml-2"
                                                        onClick={() => removeItem(item.id)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full mt-20 lg:w-1/3 self-auto">
                            <Card className="shadow-xl rounded-2xl bg-white p-6">
                                <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">Order Summary</h3>
                                <div className="flex justify-between mb-3 text-base">
                                    <span>Subtotal:</span>
                                    <span className="font-semibold text-gray-800">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal())}
                                    </span>
                                </div>
                                <Divider className="my-4" />
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total:</span>
                                    <span className="text-[#1a1a2e]">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal())}
                                    </span>
                                </div>
                                <button className="mt-10 bg-slate-400" onClick={handleCheckout}>
                                    Thanh toán ngay
                                </button>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cart;
