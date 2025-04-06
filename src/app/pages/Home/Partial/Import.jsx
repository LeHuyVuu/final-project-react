import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Carousel } from 'primereact/carousel';
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader.jsx';
import { getData } from '../../../context/api';
import FormattedSold from '../FormattedSold.jsx';



const itemTemplate = (item) => {
    return (
        <Link to={`/detail/${item.id}`} >
            <div className="flex flex-col justify-center bg-white items-center rounded-lg shadow-lg p-3 m-1 ">
                <div className="  justify-center items-center ">
                    <div className="relative">
                        <img src={item.icon} alt="icon" className="absolute bottom-0 left-0 " /> {/* Icon */}
                        <img src={item.image} alt={item.title} className=" h-full object-cover rounded-lg mb-2 " /> {/* Main image */}
                    </div>
                    <div className="text-left">
                        <div className='max-w-60 min-h-12  line-clamp-2 overflow-hidden text-ellipsis mb-2'>
                            {item.brand_name}</div>
                        <div className='min-h-[25px]'>
                            <span className="text-sm text-gray-500 line-through italic mb-2">{item.oldPrice}</span>
                            <span className={`ml-2 mb-2 rounded-sm ${item.discount ? 'bg-[#ff424e] px-1 py-1 text-xs text-white' : 'bg-transparent'}`}>
                                {item.discount}
                            </span>
                        </div>
                        <div className="text-xl font-bold text-[#ff424e] mb-2">{item.price}</div>

                        <div className="card flex justify-between">
                            <Rating value={item.rate} disabled cancel={false} />
                            <div className='text-sm text-gray-600'>Đã bán <FormattedSold sold={item.sold} /></div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </Link>

    );
};

export default function Import() {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDataImport = async () => {
            setLoading(true);

            try {
                const res = await getData("https://api.tiki.vn/raiden/v3/widgets/imported_genuine?version=2");
                console.log(res)

                const title = {
                    title: res.data.header.title,
                    more_link_text: res.data.header.more_link_text,
                };
                setTitle(title);
                // console.log(title);

                const extractedItems = res.data.items.map(item => ({
                    id: item.id,
                    icon: item.badges_v3?.[0]?.image || "https://via.placeholder.com/150",
                    image: item.thumbnail_url || "https://via.placeholder.com/150",
                    brand_name: item.name || "Không rõ",
                    price: item.price ? `${item.price.toLocaleString()}đ` : "",
                    oldPrice: item.original_price && item.original_price !== item.price ? `${item.original_price.toLocaleString()}đ` : "",
                    discount: item.discount ? `-${item.discount_rate}%` : "",
                    rate: item.rating_average,
                    shipping: item.badges_new?.find(b => b.code === "delivery_info_badge")?.text || "Giao hàng tiêu chuẩn",
                    sold: item.quantity_sold?.value,
                }));
                setItems(extractedItems);
                console.log(extractedItems);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataImport();
    }, []);

    return (
        <div className="   ">
            <div className='flex justify-between '>
                <div className='flex '>
                    <div className='p-2 bg-red-300 rounded-bl-full '></div>
                    <h2 className="text-2xl bg-red-300 p-3 font-bold border-b-4 border-red-400  text-gray-800 text-center mb-4 rounded-tr-full rounded-br-full">
                        Hàng Ngoại Giá Hot</h2>
                </div>
                {/* <Link to='/' className="text-blue-500">{title.more_link_text}</Link> */}

            </div>
            <div>
                {loading ? (
                    <div className="grid grid-cols-5 gap-4">
                        <SkeletonLoader type="card" count={5} width='100%' height='300px' />
                    </div>
                ) : (
                    <Carousel className=''
                        value={items}
                        itemTemplate={itemTemplate}
                        numVisible={5}
                        numScroll={5}
                        // responsiveOptions={responsiveOptions}
                        circular={true}
                    />
                )}
            </div>
        </div>
    );
}
