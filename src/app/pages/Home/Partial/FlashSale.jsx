import React, { useEffect, useState } from 'react';

import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { getData } from '../../../context/api';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader.jsx';


const itemTemplate = (item) => {

    return (
        <Link to='*'>
            <div className="flex flex-col  justify-center item-center rounded-lg shadow-lg p-3 m-1  ">
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
                        <div className='min-h-[25px]'>
                            <span className="text-sm text-gray-500 line-through mb-2">{item.oldPrice}</span>
                            <span className="text-sm text-orange-600 mb-2">{item.discount}</span>
                        </div>
                        <div className="text-xl font-bold text-red-600 mb-2">{item.price}</div>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default function FlashSale() {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDataFlashSale = async () => {
            setLoading(true);

            try {
                const res = await getData("https://api.tiki.vn/flashsale/v2/widget/deals/collection?");
                console.log(res)
                // const title = {
                //     title: res.data.header.title,
                //     more_link_text: res.data.header.more_link_text,
                // };
                // setTitle(title);

                // const extractedItems = res.data.product.map(item => ({
                    
                //     image: item.thumbnail_url,
                //     brand_name:item.name || "Không rõ",
                //     price:item.price   ,
                //     oldPrice:item.original_price ,
                //     discount: ,
                //     rate: ,
                //     shipping:|| "Giao hàng tiêu chuẩn",
                // }));

                setItems(extractedItems);
                console.log(extractedItems);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchDataFlashSale();
    }, []);

    return (
        <div className=" py-6">
            <div className='flex justify-between'>
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-center mb-4">{title.title}</h2>
                </div>
                <a href="#" className=" text-blue-500">
                    Xem tất cả
                </a>
            </div>
            {loading ? (
                <div className="grid grid-cols-5 gap-4">
                    <SkeletonLoader type="card" count={5} width='100%' height='300px' />
                </div>
            ) : (
                <Carousel
                    value={items}
                    itemTemplate={itemTemplate}
                    numVisible={5}
                    numScroll={5}
                    circular={true}
                />
            )}
        </div>
    );
}
