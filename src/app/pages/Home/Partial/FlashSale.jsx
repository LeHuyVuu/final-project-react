import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { getData } from '../../../context/api';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader.jsx';
import CountTime from '../FlashSaleComponent/CountTime.jsx';
import ProgressBar from '../FlashSaleComponent/ProgressBar.jsx';

const itemTemplate = (item) => {
    return (
           <Link to={`/detail/${item.id}`} >
            <div className="flex flex-col justify-center items-center rounded-lg shadow-lg p-3 m-1">
                <div className="justify-center items-center">
                    <div className="relative">
                        <img src={item.image} alt={item.title} className="h-full object-cover rounded-lg mb-4" />
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
                         <ProgressBar progress={item.progress} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function FlashSale() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(0);  

    useEffect(() => {
        const fetchDataFlashSale = async () => {
            setLoading(true);

            try {
                const res = await getData("https://api.tiki.vn/flashsale/v2/widget/deals/collection?per_page=20&_rf=rotate_by_ctr&trackity_id=44658fd6-8dcf-fb8b-e548-529e90e5e33b");
                console.log(res);

                const extractedItems = res?.data?.data?.map(item => ({
                    image: item.product.thumbnail_url, 
                    brand_name: item.product.name || "Không rõ",  
                    price: item.product.price,  
                    oldPrice: item.product.original_price,  
                    discount: item.product.discount_rate + "%",  
                    rate: item.product.rating_average,  
                }));
                setItems(extractedItems);
                setTime(res?.data?.data?.[0]?.special_to_date); 
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataFlashSale();
    }, []);

    return (
        <div className="py-6">
            <div className='flex justify-between'>
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-center ">Flash Sale</h2>
                    {time > 0 && <CountTime targetTime={time} onExpire={() => console.log("Flash Sale Ended!")} />} 
                </div>
                <a href="#" className="text-blue-500">
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
