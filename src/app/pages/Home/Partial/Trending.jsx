import React, { useEffect, useState } from 'react';
import { getData } from '../../../context/api';
import { TabView, TabPanel } from 'primereact/tabview';
import {Link}from 'react-router-dom';

export default function Trending() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState({}); // Sử dụng một object để lưu các items theo từng category

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await getData("https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=36&version=home-persionalized");
                console.log(res);

                const data = res.data?.tabs || [];
                // Lưu items của mỗi tab trong state items theo key là category id
                const simplified = data.map(item => ({
                    name: item.title, // Tên danh mục
                    image: item.icon, // Hình ảnh biểu tượng
                    items: item.items || [], // Các sản phẩm trong danh mục
                }));

                setTrending(simplified);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu danh mục:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading) return <div className="p-4">Đang tải danh mục...</div>;

    return (
        <>
            <div className="sticky top-0  p-4 ">
                <TabView className="w-full  flex flex-col justify-between">
                    {trending.map((category, index) => (
                        <TabPanel
                            key={index}
                            header={
                                <div className="flex items-center  justify-center space-x-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="flex justify-between h-6 object-contain"
                                    />
                                    <span>{category.name}</span>
                                </div>
                            }
                        >
                            {/* Hiển thị các sản phẩm của tab này */}
                            
                            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.items.map((product, idx) => (
                                     <Link to={`/detail/${product.id}`} >
                                    <div key={idx} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                                        <img src={product.thumbnail_url} alt={product.name} className="w-full h-full object-cover mb-4 rounded-lg" />
                                        <div className="text-center">
                                            <h4 className="'text-sm max-w-60 min-h-10 text-gray-600 line-clamp-2 overflow-hidden text-ellipsis mb-2'"><b>{product.name}</b></h4>
                                            <div className="text-sm text-gray-600">{product.brand_name}</div>
                                            <div className="mt-2">
                                                {product.original_price && product.original_price !== product.price && (
                                                    <span className="line-through text-gray-500">{product.original_price.toLocaleString()}đ</span>
                                                )}
                                                {product.discount_rate && (
                                                    <span className="text-red-500 ml-2">-{product.discount_rate}%</span>
                                                )}
                                            </div>
                                            <div className="text-xl font-bold text-red-600 my-2">{product.price?.toLocaleString()}đ</div>

                                            {/* Hiển thị nhãn Freeship và Chính Hãng */}
                                            {/* <div className="flex space-x-2 mb-2">
                                        {product.badges_v3?.map((badge, idx) => (
                                            <span key={idx} className="text-xs text-white bg-blue-500 p-1 rounded">{badge.code === "freeship" ? "Freeship" : badge.code === "authentic_brand" ? "Chính Hãng" : ""}</span>
                                        ))}
                                    </div> */}

                                        </div>
                                    </div>
                                    </Link>
                                ))}
                            </div>
                            
                        </TabPanel>
                    ))}
                </TabView>
            </div>
        </>
    );
}
