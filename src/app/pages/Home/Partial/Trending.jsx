import React, { useEffect, useState } from 'react';
import { getData } from '../../../context/api';
import { TabView, TabPanel } from 'primereact/tabview';
import Like from './Like';

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
            <div className="sticky top-0 p-4 shadow-xl rounded-lg bg-white  ">
                <TabView className="  w-full flex justify-around">
                    {trending.map((category, index) => (
                        <TabPanel
                            header={
                                <div className="flex items-center justify-between space-x-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="flex justify-between h-6 object-contain"
                                        on
                                    />
                                    <span>{category.name}</span>
                                </div>
                            }
                            key={index}
                        >

                        </TabPanel>
                    ))}
                </TabView>

            </div>
            <div className="">
               
            </div>
        </>
    );
}
