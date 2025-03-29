import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';

const banners = [
    {
        id: 1,
        image: 'https://i.pinimg.com/736x/19/5c/2e/195c2e1cb4ae14837237fe846b757b9a.jpg',
        title: 'Thực phẩm bổ sung\nNăng lượng bền bỉ',
        buttonText: 'Mua ngay',
        link: '#',
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/736x/19/5c/2e/195c2e1cb4ae14837237fe846b757b9a.jpg',
        title: 'Sản phẩm thuần chay\nChuẩn xanh lành tính',
        buttonText: 'Mua ngay',
        link: '#',
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/736x/19/5c/2e/195c2e1cb4ae14837237fe846b757b9a.jpg',
        title: 'Sản phẩm thuần chay\nChuẩn xanh lành tính',
        buttonText: 'Mua ngay',
        link: '#',
    },
    {
        id: 4,
        image: 'https://i.pinimg.com/736x/19/5c/2e/195c2e1cb4ae14837237fe846b757b9a.jpg',
        title: 'Sản phẩm thuần chay\nChuẩn xanh lành tính',
        buttonText: 'Mua ngay',
        link: '#',
    }
];

export default function Banner() {
    const bannerTemplate = (banner) => (
        <div className="flex justify-center items-center">
            
            <img src={banner.image} alt={banner.title} className=" rounded-lg  shadow-lg" />
            </div>
    );

    return (
        <div >
            <Carousel value={banners}
             itemTemplate={bannerTemplate}
              numVisible={2}
               numScroll={1}
               circular 
               autoplayInterval={4000} />
        </div>
        
    );
}
