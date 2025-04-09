import React, { useEffect, useState } from 'react';
import { getData } from '../../../context/api';
import { Link } from 'react-router-dom';
import FormattedSold from '../FormattedSold';
import { Rating } from 'primereact/rating';
import { Button } from "primereact/button";
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader.jsx';

export default function Trending() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [loadedProductIds, setLoadedProductIds] = useState(new Set());
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Fetch trending data
    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
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
                setProducts(simplified[0]?.items || []); // Tải sản phẩm đầu tiên khi có dữ liệu
            } catch (err) {
                console.error("Error fetching trending data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    const fetchMoreProducts = async () => {
        if (!trending[activeTab]?.link) return; 

        try {
            const newres = await getData(trending[activeTab].link);
            const items = newres.data?.items || [];
            const newItems = items.filter(item => !loadedProductIds.has(item.id));

            const newIds = new Set(newItems.map(item => item.id));
            setLoadedProductIds(prev => new Set([...prev, ...newIds]));
            setProducts(prev => [...prev, ...newItems]);

            if (newItems.length === 0) {
                setHasMore(false); 
            }
        } catch (err) {
            console.error("Error loading more products:", err);
            setHasMore(false);
        }
    };

    const handleTabChange = (index) => {
        if (index === activeTab) return; // tránh rerender lại
        setActiveTab(index);
        setLoadedProductIds(new Set());
        setProducts([]);
        setHasMore(true);

        const selectedTabItems = trending[index]?.items || [];
        setProducts(selectedTabItems);
    };

    return (
        <div className="flex flex-col">
            {/* Tab Header */}
            <div className="bg-white sticky top-0 z-0 p-4">
                <div className="flex space-x-4 justify-evenly">
                    {loading
                        ? Array(5).fill(0).map((_, index) => (
                            <div key={index} className="p-2">
                                <SkeletonLoader type="text" width="100px" height="20px" />
                            </div>
                        ))
                        : trending.map((category, index) => (
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <SkeletonLoader type="card" count={5} width="100%" height="300px" />
                    </div>
                ) : ( 
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((product, idx) => {
                            const isPriceEqual = product.original_price === product.price;
                            return (
                                <Link key={idx} to={`/detail/${product.id}`}>
                                    <div className="flex flex-col p-4 rounded-lg border border-gray-200">
                                        <div className="relative">
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
                                            <div className="max-w-60 min-h-10 line-clamp-2 text-sm text-ellipsis hover:text-blue-600 transition-colors mb-2">
                                                {product.name}
                                            </div>
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

                {/* Load More Button */}
                {hasMore && !loading && (
                    <div className="flex justify-center my-8">
                        <Button
                            label="Xem thêm"
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
