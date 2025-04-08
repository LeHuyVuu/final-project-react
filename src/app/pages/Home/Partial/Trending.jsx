import React, { useEffect, useState } from 'react';
import { getData } from '../../../context/api';
import { Link } from 'react-router-dom';
import FormattedSold from '../FormattedSold';
import { Rating } from 'primereact/rating';
import { Button } from "primereact/button";

export default function Trending() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [loadedProductIds, setLoadedProductIds] = useState(new Set()); // dùng Set sẽ không bị trùng id nữa
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await getData(
                    "https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=36&version=home-persionalized"
                );
                const data = res.data?.tabs || [];
                const simplified = data.map((item) => ({
                    name: item.title,
                    image: item.icon,
                    items: item.items || [],
                    link: item.more_link,
                }));

                setTrending(simplified);
                setProducts(simplified[activeTab]?.items || []);
            } catch (err) {
                console.error("Error fetching trending data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, [activeTab]);

    const fetchMoreProducts = async () => {
        try {
            const newres = await getData(trending[activeTab]?.link || "https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=36&version=home-persionalized");
            console.log(newres);
            const items = newres.data?.items || [];
            const newItems = items.filter(item => !loadedProductIds.has(item.id)); // loại id trùng

            const newIds = new Set(newItems.map(item => item.id));
            setLoadedProductIds(prev => new Set([...prev, ...newIds]));

            setProducts(prev => [...prev, ...newItems]);

            // Cập nhật trạng thái hasMore: Nếu không còn sản phẩm mới, ẩn nút "Xem thêm"
            if (newItems.length === 0) {
                setHasMore(false);  // Tắt nút Xem thêm nếu không có sản phẩm mới
            }
        } catch (err) {
            console.error("Error loading more products:", err);
            setHasMore(false); // Tắt nút xem thêm nếu có lỗi
        }
    };

    const handleTabChange = (index) => {
        setActiveTab(index);
        setLoadedProductIds(new Set());
        setProducts([]);
        setHasMore(true);
    };

    return (
        <div className="flex flex-col">
            {/* Tab Header */}
            <div className="bg-white sticky top-0 z-0 p-4">
                <div className="flex space-x-4 justify-evenly">
                    {trending.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabChange(index)}
                            className={`p-2 text-xl font-semibold ${activeTab === index
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-700'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-6 object-contain"
                                />
                                <span>{category.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((product, idx) => {
                            const isPriceEqual = product.original_price === product.price;
                            return (
                                <Link key={idx} to={`/detail/${product.id}`}>
                                    <div className=" flex flex-col p-4 rounded-lg shadow-lg">
                                        <div className='relative'>
                                            <img
                                                src={product.thumbnail_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover mb-4 rounded-lg"
                                            />
                                            {product.badges_v3?.map((badge, badgeIdx) => (
                                                <img
                                                    key={badgeIdx}
                                                    src={badge.image}
                                                    alt="icon"
                                                    className="w-full absolute bottom-0 left-0"
                                                />
                                            ))}
                                        </div>

                                        <div>
                                            <h4 className="max-w-60 min-h-12 line-clamp-2 overflow-hidden text-ellipsis mb-2">
                                                {product.name}
                                            </h4>
                                            <div className="min-h-[25px]">
                                                {!isPriceEqual &&
                                                    product.original_price &&
                                                    product.original_price !== product.price && (
                                                        <span className="text-sm text-gray-500 line-through italic mb-2">
                                                            {product.original_price.toLocaleString()}đ
                                                        </span>
                                                    )}
                                                {!isPriceEqual && product.discount_rate && (
                                                    <span
                                                        className={`ml-3 mb-2 rounded-sm ${product.discount_rate
                                                            ? 'bg-[#ff424e] px-1 py-1 text-xs text-white'
                                                            : 'bg-transparent px-0 py-0'
                                                            }`}
                                                    >
                                                        {product.discount_rate ? `-${product.discount_rate}%` : ''}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xl font-bold text-[#ff424e] my-2">
                                                {product.price?.toLocaleString()}đ
                                            </div>

                                            {/* Display Sold Count */}
                                            <div className="card flex justify-between">
                                                <Rating value={product.rating_average} disabled cancel={false} />
                                                <div className="text-sm text-gray-600">
                                                    Đã bán <FormattedSold sold={product.quantity_sold?.value} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Hiển thị nút "Xem thêm" nếu còn sản phẩm */}
                {hasMore && (
                    <div className="flex justify-center my-8">
                        <Button
                            label={`Xem thêm `}
                            icon="pi pi-chevron-down"
                            className="p-button-outlined p-button-lg"
                            onClick={fetchMoreProducts}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
