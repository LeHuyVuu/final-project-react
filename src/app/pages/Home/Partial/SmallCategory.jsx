import React, { useEffect, useState } from 'react';
import { getData } from '../../../context/api';

const categories = [
    { id: 1, icon: 'pi pi-thumbs-up', label: 'TOP DEAL', link: '#' },
    { id: 2, icon: 'pi pi-tags', label: 'Coupon siêu hot', link: '#' },
    { id: 3, icon: 'pi pi-box', label: 'Xả kho giảm nửa giá', link: '#' },
    { id: 4, icon: 'pi pi-globe', label: 'Hàng ngoại giá hot', link: '#' },
    { id: 5, icon: 'pi pi-sun', label: 'Bật Mood Du Hí', link: '#' },
    { id: 6, icon: 'pi pi-sun', label: 'Hạ Nhiệt Thần Tốc', link: '#' },
    { id: 7, icon: 'pi pi-heart', label: 'Bắt Trend Làm Đẹp', link: '#' },
    { id: 8, icon: 'pi pi-refresh', label: 'F5 Tổ Ấm', link: '#' },
    { id: 9, icon: 'pi pi-shopping-bag', label: 'Tã bỉm cho bé', link: '#' },
    { id: 10, icon: 'pi pi-sun', label: 'Bật Mood Du Hí', link: '#' },
    { id: 11, icon: 'pi pi-sun', label: 'Hạ Nhiệt Thần Tốc', link: '#' },
    { id: 12, icon: 'pi pi-heart', label: 'Bắt Trend Làm Đẹp', link: '#' },
    { id: 13, icon: 'pi pi-shopping-bag', label: 'Tã bỉm cho bé', link: '#' }

];

export default function SmallCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getData("https://api.tiki.vn/raiden/v3/widgets/quick_link_v2");
                const items = res.data?.items || [];

                // Lấy ra name, thumbnail_url và url
                const simplified = items.map(item => ({
                    name: item.name,
                    image: item.thumbnail_url,
                    link: item.url,
                }));
                console.log({ simplified })
                setCategories(simplified);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu danh mục:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div className="p-4">Đang tải danh mục...</div>;

    return (
        <div className="flex overflow-x-auto space-x-4 p-4 justify-between shadow-xl rounded-lg bg-white">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center min-w-[100px] hover:scale-105 transition-transform duration-200"
                >
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-12 h-12 object-contain"
                    />
                    <span className="text-sm mt-2 text-center">{category.name}</span>
                </div>
            ))}
        </div>

    );
}

