import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { getData } from '../../../context/api';

// Template for each carousel item (sử dụng Tailwind để tạo kiểu)
const itemTemplate = (item) => {
    return (
        <div className="flex flex-col max-w-60 h-auto bg-slate-50 gap-2 p-4 rounded-lg shadow-lg">
            <img src={item.image} alt={item.title} className="w-full h-52 object-cover rounded-lg mb-4 " />
            <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis ">{item.title}</h4>
                <div className="text-sm text-gray-500 line-through mb-2">{item.oldPrice}</div>
                <div className="text-xl font-bold text-red-600 mb-2">{item.price}</div>
                <div className="text-sm text-orange-600 mb-2">{item.discount} - {item.imported}</div>
                {item.availability && <div className="text-sm text-green-500">Available: {item.availability}</div>}
                {item.product_url && <a href={item.product_url} className="text-blue-500">View Product</a>}
            </div>
        </div>
    );
};

export default function TopDeal() {
    const [topDealData, setTopDealData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await getData("https://api.tiki.vn/raiden/v3/widgets/top_choise?version=2&_v=2");

                // Chuyển dữ liệu từ API vào định dạng sử dụng trong component
                const items = res.data.items.map((item) => ({
                    productId: item.seller_product_id,
                    image: item.thumbnail_url,
                    title: item.name,
                    oldPrice: item.original_price,
                    price: item.price,
                    discount: item.discount,
                    shipping: item.shipping_info,
                    category_ids: item.category_ids,  // Lấy category_ids từ API
                    brandName: item.brand_name,      // Lấy brandName từ API
                    imported: item.imported,         // Lấy imported từ API
                    rating: item.rating_average,    // Lấy rating từ API
                    review_count: item.review_count, // Lấy review_count từ API
                    availability: item.availability, // Lấy availability nếu có
                    product_url: item.product_url   // Lấy product_url nếu có
                }));

                setTopDealData(items);  // Cập nhật state với dữ liệu lấy từ API
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu danh mục:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="top-deal py-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold text-center mb-4">Top Deals - Siêu Rẻ</h2>
                <a href="#" className="text-blue-500">
                    Xem tất cả
                </a>
            </div>

            <Carousel
                value={topDealData}
                itemTemplate={itemTemplate}
                numVisible={6}
                numScroll={6}
                circular={true}
            />
        </div>
    );
}
