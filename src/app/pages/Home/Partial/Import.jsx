import React from 'react'
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Fake data (dữ liệu giả)
const Imports = [
    {
        id: 1,
        image: "https://i.pinimg.com/736x/33/26/6e/33266efd66b550f7ea6d920ba667bf71.jpg",
        title: "Màn Hình Cong Samsung LC27R500FHEXVV 27 inch",
        price: "2.565.000đ",
        oldPrice: "4.590.000đ",
        discount: "-44%",
        shipping: "Giao siêu tốc 2h"
    },
    {
        id: 2,
        image: "https://i.pinimg.com/736x/33/26/6e/33266efd66b550f7ea6d920ba667bf71.jpg",
        title: "Điện Thoại Oppo A18 4GB/128GB",
        price: "2.819.000đ",
        oldPrice: "3.990.000đ",
        discount: "-29%",
        shipping: "Giao siêu tốc 2h"
    },
    {
        id: 3,
        image: "https://i.pinimg.com/736x/33/26/6e/33266efd66b550f7ea6d920ba667bf71.jpg",
        title: "Tiếng Anh 2 i-Learn Smart Start - Student's Book",
        price: "54.828đ",
        oldPrice: "242.270đ",
        discount: "-32%",
        shipping: "Giao siêu tốc 2h"
    },
    {
        id: 4,
        image: "https://i.pinimg.com/736x/33/26/6e/33266efd66b550f7ea6d920ba667bf71.jpg",
        title: "Combo Sách Giáo Trình Chuẩn HSK 1 - Sách Bài Tập",
        price: "242.270đ",
        oldPrice: "356.000đ",
        discount: "-32%",
        shipping: "Giao siêu tốc 2h"
    },
    {
        id: 5,
        image: "https://i.pinimg.com/736x/33/26/6e/33266efd66b550f7ea6d920ba667bf71.jpg",
        title: "Sự Im Lặng Của Bầy Cừu",
        price: "80.500đ",
        oldPrice: "115.000đ",
        discount: "-30%",
        shipping: "Giao siêu tốc 2h"
    },
    {
        id: 6,
        image: "https://i.pinimg.com/736x/33/26/6e/33266efd66b550f7ea6d920ba667bf71.jpg",
        title: "Miếng Lót Chuột FIRO MXL800 EXTENDED",
        price: "115.000đ",
        oldPrice: "",
        discount: "",
        shipping: "Giao siêu tốc 2h"
    }
];

// Template for each carousel item (sử dụng Tailwind để tạo kiểu)
const itemTemplate = (item) => {
    return (
        <div className="flex flex-col max-w-60 justify-between h-auto bg-slate-50 gap-2 p-4 rounded-lg shadow-lg">
            <img src={item.image} alt={item.title} className="w-full h-52 object-cover  rounded-lg mb-4 " />
            <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis ">{item.title}</h4>
                <div className='min-h-[25px]'>
                   <span className="text-sm text-gray-500 line-through mb-2 " >{item.oldPrice} </span>
                <span className="text-sm text-orange-600 mb-2 ">{item.discount}</span> 
                </div>
                <div className="text-xl font-bold text-red-600 mb-2">{item.price}</div>
                
                <div className="text-sm text-green-500">{item.shipping}</div>
            </div>
        </div>
    );
};

export default function Import() {
    return (
        <div className="top-deal ">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold text-center mb-4">Hàng ngoại giá hot</h2>
                <a href="#" className=" text-blue-500">
                    Xem tất cả
                </a>
            </div>

            <Carousel
                value={Imports}
                itemTemplate={itemTemplate}
                numVisible={5}
                numScroll={5}
                circular={true}

            />
        </div>
    );
}
