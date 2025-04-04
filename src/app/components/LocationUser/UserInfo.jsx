import { Card } from 'primereact/card'
import React, { useState } from 'react'
import { Divider } from 'primereact/divider'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

const UserInfo = () => {
    // Lấy dữ liệu từ localStorage
    const keyUser = localStorage.getItem('LoginUser');
    const name = localStorage.getItem('name' + keyUser);
    const phone = localStorage.getItem('phoneNumber' + keyUser);
    const address = localStorage.getItem('address' + keyUser) || 'Nhà, tân hiệp II, Xã Bù Nho, Huyện Phú Riềng, Bình Phước';

    const [displayDialog, setDisplayDialog] = useState(false); // Mở/Đóng Dialog
    const [newName, setNewName] = useState(name);
    const [newPhone, setNewPhone] = useState(phone);
    const [newAddress, setNewAddress] = useState(address);

    const handleChange = () => {
        // Cập nhật thông tin vào localStorage
        localStorage.setItem('name' + keyUser, newName);
        localStorage.setItem('phoneNumber' + keyUser, newPhone);
        localStorage.setItem('address' + keyUser, newAddress);

        // Đóng dialog
        setDisplayDialog(false);
    };

    return (
        <>
            <Card className="shadow-xl rounded-2xl bg-white mb-5">
                <h3 className="text-2xl font-bold mb-6 text-[#1a1a2e]">Giao tới</h3>
                <div className="flex justify-between mb-3 text-base">
                    <div>
                        <span className="font-semibold text-gray-800">{name}</span>
                        <div className="text-sm text-gray-600">{phone}</div>
                        <div className="text-sm text-gray-600">{address}</div>
                    </div>
                    <button 
                        className="text-blue-500"
                        onClick={() => setDisplayDialog(true)} // Mở dialog khi bấm nút "Thay đổi"
                    >
                        Thay đổi
                    </button>
                </div>
                <Divider className="my-4" />
            </Card>

            {/* Dialog để thay đổi thông tin */}
            <Dialog 
                header="Cập nhật thông tin" 
                visible={displayDialog} 
                style={{ width: '50vw' }} 
                onHide={() => setDisplayDialog(false)}
            >
                <div className="p-fluid">
                    <div className="field mb-4">
                        <label htmlFor="name">Tên</label>
                        <InputText
                            id="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Nhập tên"
                        />
                    </div>
                    <div className="field mb-4">
                        <label htmlFor="phone">Số điện thoại</label>
                        <InputText
                            id="phone"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div className="field mb-4">
                        <label htmlFor="address">Địa chỉ</label>
                        <InputText
                            id="address"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            placeholder="Nhập địa chỉ"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button label="Lưu" icon="pi pi-check" onClick={handleChange} className="p-button-primary" />
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default UserInfo;
