import React, { useEffect, useState } from 'react';
import { getData } from '../../../context/api';
import { TabView, TabPanel } from 'primereact/tabview';

export default function Trending() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await getData("https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=36&version=home-persionalized");
                console.log(res);

                const items = res.data?.tabs || [];

                // Lấy ra name, thumbnail_url và url
                const simplified = items.map(item => ({
                    name: item.title,
                    image: item.icon,
                    link: item.url,
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
            <div className="sticky top-0 flex overflow-x-auto space-x-4 p-4 justify-between shadow-xl rounded-lg bg-white">
                <TabView className="w-full">
                    {trending.map((category, index) => (
                        <TabPanel 
                            header={
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-6 h-6 object-contain"
                                    />
                                    <span>{category.name}</span>
                                </div>
                            }
                            key={index}
                        >
                            <div className="flex flex-col items-center">
                                <a href={category.link} className="text-blue-500 text-sm">
                                    Xem thêm
                                </a>{/*nội dung từng tab */}
                            </div>
                        </TabPanel>
                    ))}
                </TabView>
            </div>
        </>
    );
}
