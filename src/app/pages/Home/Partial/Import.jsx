import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';  // Import icon sao từ react-icons
import { Rating } from "primereact/rating";

import { getData } from '../../../context/api';

// const getStars = (rate) => {
//     const roundedRate = Math.round(rate * 10) / 10; // Làm tròn đến 1 chữ số sau dấu thập phân

//     const fullStars = Math.floor(roundedRate); // Số sao đầy đủ
//     const halfStar = roundedRate % 1 !== 0; // Kiểm tra sao nửa
//     const totalStars = 5; // Tổng số sao có thể

//     let stars = [];

//     for (let i = 0; i < totalStars; i++) {
//         if (i < fullStars) {
//             stars.push(<FaStar key={i} className="text-yellow-400" />);
//         } else if (i === fullStars && halfStar) {
//             stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//         } else {
//             stars.push(<FaRegStar key={i} className="text-gray-300" />);
//         }
//     }

//     return stars;
// };


// Template hiển thị từng sản phẩm
const itemTemplate = (item) => {
    return (
        <div className="flex flex-col max-w-60 justify-between h-auto bg-slate-50 gap-2 p-4 rounded-lg shadow-lg">
            <div className="relative">
        <img src={item.icon} alt="icon" className="absolute bottom-0 left-0 " /> {/* Icon */}
        <img src={item.image} alt={item.title} className="w-full h-52 object-cover rounded-lg mb-4" /> {/* Main image */}
    </div>
            <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                </h4>
                <div className='text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis'><b>{item.brand_name}</b></div>
                {/* <div className='text-sm text-gray-500'>Mã thương hiệu: <b>{item.brand_id}</b></div> */}
                <div className='min-h-[25px]'>
                    <span className="text-sm text-gray-500 line-through mb-2">{item.oldPrice}</span>
                    <span className="text-sm text-orange-600 mb-2">{item.discount}</span>
                </div>
                <div className="text-xl font-bold text-red-600 mb-2">{item.price}</div>
                <div>
                    {item.rate}
                </div>
                <div className="card flex justify-content-center">
            <Rating value={item.rate} disabled cancel={false} />
        </div>
                {/* <div className="flex items-center mt-2">
                    {getStars(item.rate)}
                   
                </div> */}
                {/* <div className="w-full h-px bg-gray-300 my-2"></div>
                <div className="text-sm text-green-500">{item.shipping}</div> */}
            </div>
        </div>
    );
};

export default function Import() {
    // const responsiveOptions = [
    //     {
    //         breakpoint: '1400px',
    //         numVisible: 2,
    //         numScroll: 2
    //     },
    //     {
    //         breakpoint: '1199px',
    //         numVisible: 3,
    //         numScroll: 3
    //     },
    //     {
    //         breakpoint: '767px',
    //         numVisible: 2,
    //         numScroll: 2
    //     },
    //     {
    //         breakpoint: '575px',
    //         numVisible: 1,
    //         numScroll: 1
    //     }
    // ];
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchDataImport = async () => {
            try {
                const res = await getData("https://api.tiki.vn/raiden/v3/widgets/imported_genuine?version=2&trackity_id=44658fd6-8dcf-fb8b-e548-529e90e5e33b&_rf=rotate_by_ctr");
                console.log(res)

                // Tiến hành xử lý dữ liệu
                const extractedItems = res.data.items.map(item => ({
                    icon: item.badges_v3?.[0]?.image || "https://via.placeholder.com/150",
                    image: item.thumbnail_url || "https://via.placeholder.com/150",
                    // brand_id: item.brand_id || "Không có",
                    brand_name: item.name || "Không rõ",
                    price: item.price ? `${item.price.toLocaleString()}đ` : "",
                    oldPrice: item.original_price && item.original_price !== item.price ? `${item.original_price.toLocaleString()}đ` : "",
                    discount: item.discount ? `-${item.discount_rate}%` : "",
                    rate: item.rating_average,
                    shipping: item.badges_new?.find(b => b.code === "delivery_info_badge")?.text || "Giao hàng tiêu chuẩn",
                }));

                setItems(extractedItems);
                console.log(extractedItems);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };


        fetchDataImport();
    }, []);

    return (
        <div className="">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold text-center mb-4">Hàng ngoại giá hot</h2>
                <a href="#" className="text-blue-500">Xem tất cả</a>
            </div>

            <Carousel
                value={items}
                itemTemplate={itemTemplate}
                numVisible={5}
                numScroll={5}
                // responsiveOptions={responsiveOptions}
                circular={true}
            />
        </div>
    );
}
