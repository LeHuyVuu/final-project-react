import React, { useEffect, useState } from 'react';

import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { getData } from '../../../context/api';
import { Link } from 'react-router-dom';


const itemTemplate = (item) => {

    return (
        <Link to='*'>
            <div className="flex flex-col bg-slate-400 justify-center item-center rounded-lg shadow-lg p-3 m-1  ">
            <div className="  justify-center items-center ">
                    <div className="relative">
                        <img src={item.icon} alt="icon" className="absolute bottom-0 left-0 " /> {/* Icon */}
                        <img src={item.image} alt={item.title} className=" h-full object-cover rounded-lg mb-4" /> {/* Main image */}
                    </div>
                    <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.title}
                        </h4>
                        <div className='text-sm max-w-60 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis'><b>{item.brand_name}</b></div>
                        {/* <div className='text-sm text-gray-500'>Mã thương hiệu: <b>{item.brand_id}</b></div> */}
                        <div className='min-h-[25px]'>
                            <span className="text-sm text-gray-500 line-through mb-2">{item.oldPrice}</span>
                            <span className="text-sm text-orange-600 mb-2">{item.discount}</span>
                        </div>
                        <div className="text-xl font-bold text-red-600 mb-2">{item.price}</div>
                        {/* <div>
                            {item.rate}
                        </div> */}
                        {/* <div className="card flex justify-content-center">
                            <Rating value={item.rate} disabled cancel={false} />
                        </div> */}
                        {/* <div className="flex items-center mt-2">
                            {getStars(item.rate)}
                           
                        </div> */}
                        {/* <div className="w-full h-px bg-gray-300 my-2"></div>
                        <div className="text-sm text-green-500">{item.shipping}</div> */}
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default function Like() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchDataLike = async () => {
            try {
                const res = await getData("https://api.tiki.vn/raiden/v3/widgets/maybe_you_like?_rf=rotate_by_ctr");
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


        fetchDataLike();
    }, []);
    return (
        <div className=" py-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold text-center mb-4">Bạn có thể thích</h2>
                <a href="#" className=" text-blue-500">
                    Xem tất cả
                </a>
            </div>

            <Carousel
                value={items}
                itemTemplate={itemTemplate}
                numVisible={5}
                numScroll={5}
                circular={true}

            />
        </div>
    );
}
