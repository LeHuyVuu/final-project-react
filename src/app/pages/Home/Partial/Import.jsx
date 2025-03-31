import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';  // Import icon sao từ react-icons
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

import { getData } from '../../../context/api';





const itemTemplate = (item) => {
    return (
        <Link to='*'>
            <div className="flex flex-col bg-slate-400 justify-center item-center rounded-lg shadow-lg p-3 m-1  ">
                <div className="  justify-center items-center ">
                    <div className="relative">
                        <img src={item.icon} alt="icon" className="absolute bottom-0 left-0 " /> {/* Icon */}
                        <img src={item.image} alt={item.title} className=" h-full object-cover rounded-lg " /> {/* Main image */}
                    </div>
                    <div className="text-left">
                        <h4 className="text-lg  font-semibold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.title}
                        </h4>
                        <div className='text-sm max-w-60 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis'><b>{item.brand_name}</b></div>
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
                        {/* <div className="w-full h-px bg-gray-300 my-2"></div>
                <div className="text-sm text-green-500">{item.shipping}</div> */}
                    </div>
                </div>

            </div>
        </Link>

    );
};

export default function Import() {

    const [items, setItems] = useState([]);
    const [title, setTitle] = useState([]);
    useEffect(() => {
        const fetchDataImport = async () => {
            try {
                const res = await getData("https://api.tiki.vn/raiden/v3/widgets/imported_genuine?version=2");
                console.log(res)

                // Tiến hành xử lý dữ liệu

                const title = {
                    title: res.data.header.title,
                    // more_link: res.data.header.more_link,
                    more_link_text: res.data.header.more_link_text,
                };
                setTitle(title);
                console.log(title);

                const extractedItems = res.data.items.map(item => ({
                    icon: item.badges_v3?.[0]?.image || "https://via.placeholder.com/150",
                    image: item.thumbnail_url || "https://via.placeholder.com/150",
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
        <div className=" bg-red-200  ">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold text-center mb-4">{title.title}</h2>
                <Link to='/' className="text-blue-500">{title.more_link_text}</Link>
            </div>
            <div>

                <Carousel className=''
                    value={items}
                    itemTemplate={itemTemplate}
                    numVisible={5}
                    numScroll={2}
                    // responsiveOptions={responsiveOptions}
                    circular={true}
                />
            </div>
        </div>
    );
}
