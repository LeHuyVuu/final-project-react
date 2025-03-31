import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Rating } from "primereact/rating";
import { getData } from '../../../context/api';
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader.jsx';  // Import SkeletonLoader

// Template hiển thị từng sản phẩm
const itemTemplate = (item) => {
    return (
        <div className="flex flex-col max-w-60 justify-between h-auto bg-slate-50 gap-2 p-4 rounded-lg shadow-lg">
            <div className="relative">
                <img src={item.icon} alt="icon" className="absolute bottom-0 left-0" /> {/* Icon */}
                <img src={item.image} alt={item.title} className="w-full h-52 object-cover rounded-lg mb-4" /> {/* Main image */}
            </div>
            <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                </h4>
                <div className='text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis'>
                    <b>{item.brand_name}</b>
                </div>
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
                    icon: item.badges_v3?.[0]?.image || "https://via.placeholder.com/150", // Thêm icon
                    image: item.thumbnail_url || "https://via.placeholder.com/150", // Hình ảnh sản phẩm
                    title: item.name || "Không rõ",  // Tên sản phẩm
                    oldPrice: item.original_price ? `${item.original_price.toLocaleString()}đ` : "", // Giá cũ
                    price: item.price ? `${item.price.toLocaleString()}đ` : "",  // Giá hiện tại
                    discount: item.discount ? `-${item.discount}%` : "", // Chiết khấu
                    rate: item.rating_average, // Đánh giá
                    brand_name: item.brand_name || "Không rõ", // Tên thương hiệu
                    shipping: item.shipping_info || "Giao hàng tiêu chuẩn",  // Thông tin giao hàng
                    availability: item.availability || "Còn hàng", // Tình trạng sản phẩm
                    product_url: item.product_url || "#", // Liên kết sản phẩm
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
                <a href="#" className="text-blue-500">Xem tất cả</a>
            </div>

            {loading ? (
                <div className="grid grid-cols-5 gap-4">
                    <SkeletonLoader type="card" count={5} width = '100%' height = '300px'/>
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
