import React, { useEffect, useState } from 'react';

import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Rating } from "primereact/rating";
import { getData } from '../../../context/api';
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader.jsx';  // Import SkeletonLoader
import { Link } from 'react-router-dom';

// Template hiển thị từng sản phẩm
const itemTemplate = (item) => {
    return (
        <Link to={`/detail/${item.id}`} >
            <div className="flex flex-col justify-center item-center rounded-lg shadow-lg p-3 m-1">
                <div className="justify-center items-center">
                    <div className="relative">
                        <img src={item.icon} alt="icon" className="absolute bottom-0 left-0" /> {/* Icon */}
                        <img src={item.image} alt={item.name} className="h-full object-cover rounded-lg mb-4" /> {/* Main image */}
                    </div>
                    <div className="text-left">
                        <h4 className="text-sm max-w-60 min-h-10 text-gray-600 line-clamp-2 overflow-hidden text-ellipsis mb-2">
                            <b>{item.brand_name}</b>
                        </h4>
                        <div className="min-h-[25px]">
                            <span className="text-sm text-gray-500 line-through mb-2">{item.oldPrice}</span>
                            <span className="text-sm text-orange-600 mb-2">{item.discount}</span>
                        </div>
                        <div className="text-xl font-bold text-red-600 mb-2">{item.price}</div>

                        {/* Hiển thị rating bằng sao */}
                        <div className="flex items-center">
                            <Rating value={item.rate} readonly cancel={false} stars={5} />
                            <span className="ml-2 text-sm text-gray-500">({item.rate} đánh giá)</span>
                        </div>

                    </div>
                </div>
            </div>
        </Link>
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

                const items = res.data.items.map((item) => ({
                    id: item.id,
                    icon: item.badges_v3?.[0]?.image || "https://via.placeholder.com/150", // Thêm icon
                    image: item.thumbnail_url || "https://via.placeholder.com/150", // Hình ảnh sản phẩm
                    oldPrice: item.original_price && item.original_price !== item.price ? `${item.original_price.toLocaleString()}đ` : "",
                    price: item.price ? `${item.price.toLocaleString()}đ` : "",  // Giá hiện tại
                    discount: item.discount ? `-${item.discount_rate}%` : "",
                    rate: item.rating_average, // Đánh giá
                    rating_count: item.rating_count || 0, // Số lượng đánh giá
                    brand_name: item.name || "Không rõ", // Tên thương hiệu
                    shipping: item.shipping_info || "Giao hàng tiêu chuẩn",  // Thông tin giao hàng
                    availability: item.availability || "Còn hàng", // Tình trạng sản phẩm
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
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-center mb-4">Top Deals - Siêu Rẻ</h2>
                <a href="#" className="text-blue-500">Xem tất cả</a>
            </div>

            {loading ? (
                <div className="grid grid-cols-5 gap-4">
                    <SkeletonLoader type="card" count={5} width="100%" height="300px" />
                </div>
            ) : (
                <Carousel
                    value={topDealData}
                    itemTemplate={itemTemplate}
                    numVisible={5}
                    numScroll={5}
                    circular={true}
                />
            )}
        </div>
    );
}
