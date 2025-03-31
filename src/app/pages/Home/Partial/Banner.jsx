import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import axios from 'axios';
import { getData } from '../../../context/api';

export default function Banner() {
    const [banners, setBanners] = useState([]);


    const bannerTemplate = (banner) => (
        <div className="flex justify-center items-center">
            <img src={banner.image_url} alt={banner.title} className="rounded-lg shadow-lg" />
        </div>
    );

    useEffect(() => {
        const fetchDataCarousel = async () => {
            try {
                // Fetching data from API, replace with your API endpoint
                const res = await getData("https://tka.tiki.vn/widget/api/v1/banners-group?group=banner_carousel_2_8");
                const bannersData = res.data.data[0].banners;

                // Map and extract necessary fields from each banner
                const extractedBanners = bannersData.map(banner => ({
                    id: banner.id,
                    title: banner.title,
                    image_url: banner.image_url, // Ensure to use the correct field for image URL
                    url: banner.url,
                }));

                // Update state with the extracted banner data
                setBanners(extractedBanners);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchDataCarousel();
    }, []);

    return (
        <div>
            <Carousel value={banners}
                itemTemplate={bannerTemplate}
                numVisible={2}
                numScroll={1}
                circular
                autoplayInterval={4000} />
        </div>
    );
}
