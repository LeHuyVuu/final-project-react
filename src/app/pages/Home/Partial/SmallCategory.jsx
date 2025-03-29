import React from 'react';

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
    return (
        <div className="flex overflow-x-auto space-x-4 p-4 justify-between shadow-xl rounded-lg">
            {categories.map((category) => (
                <a key={category.id} href={category.link} className="flex flex-col items-center min-w-[100px]">
                    <i className={`${category.icon} text-2xl text-blue-500`} /> {/* thay bằng ảnh của tiki*/ }
                    <span className="text-sm mt-2 text-center">{category.label}</span>
                </a>
            ))}
        </div>
    );
}
