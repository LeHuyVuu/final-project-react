import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Branch() {
  // Danh sách thương hiệu nổi bật
  const featuredBrands = [
    { id: 1, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
    { id: 2, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
    { id: 3, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
    { id: 4, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
    { id: 5, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
    { id: 6, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
    { id: 7, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
    { id: 8, image: "https://salt.tikicdn.com/ts/tikimsp/9b/27/62/2bf1fad2b1b4e64b89c37de7275d246d.png" },
  ];

  return (
    <div className="">

      <Swiper
        slidesPerView={1} // 1 logo trên mỗi slide
        spaceBetween={20} // Khoảng cách giữa các item
        autoplay={{ delay: 2500, disableOnInteraction: false }} // Tự động trượt
        pagination={{ clickable: true }} // Hiển thị dot
        navigation={false} // Nút next/prev
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          1024: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          320: { slidesPerView: 1 },
        }}
        className="mySwiper"
      >
        {featuredBrands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="flex justify-center items-center   rounded-lg shadow-md">
              <img src={brand.image} alt="Brand" className=" h-80 w-auto object-contain" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
