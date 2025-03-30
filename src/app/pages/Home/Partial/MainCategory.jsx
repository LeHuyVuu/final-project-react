import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import '../SwiperStyle.css'

const categories = [
    { id: 1, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Máy Ảnh & Quay Phim" },
    { id: 2, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Đồng Hồ" },
    { id: 3, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Giày Dép Nam" },
    { id: 4, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Thiết Bị Gia Dụng" },
    { id: 5, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Thể Thao & Du Lịch" },
    { id: 6, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Ô Tô & Xe Máy" },
    { id: 7, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Balo & Túi Ví Nam" },
    { id: 8, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Đồ Chơi" },
    { id: 9, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Chăm Sóc Thú Cưng" },
    { id: 10, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Dụng Cụ & Tiện Ích" },
    { id: 11, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Sức Khỏe" },
    { id: 12, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Thời Trang Trẻ Em" },
    
    // Fake thêm dữ liệu
    { id: 13, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Phụ Kiện Thời Trang" },
    { id: 14, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Đồ Gia Dụng" },
    { id: 15, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Điện Thoại & Phụ Kiện" },
    { id: 16, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Máy Tính & Laptop" },
    { id: 17, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Phụ Kiện Xe Hơi" },
    { id: 18, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Trang Sức & Đồng Hồ" },
    { id: 19, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Đồ Chơi Trẻ Em" },
    { id: 20, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Sách & Văn Phòng Phẩm" },
    { id: 21, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Dụng Cụ Thể Thao" },
    { id: 22, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Làm Đẹp & Mỹ Phẩm" },
    { id: 23, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Thời Trang Nữ" },
    { id: 24, image: "https://i.pinimg.com/736x/76/04/93/7604938a9868a0ed0ba6abbc6cfc397e.jpg", title: "Thời Trang Nam" },
  ];
  

export default function CategoryCarousel() {
  return (
    <div className=" ">
      <Swiper
        slidesPerView={3} 
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={10}
        navigation={true}
        modules={[Grid, Navigation]}
        breakpoints={{
          1024: { slidesPerView: 5, grid: { rows: 2 } },
          768: { slidesPerView: 3, grid: { rows: 2 } },
          480: { slidesPerView: 2, grid: { rows: 2 } },
        }}
        className="mySwiper"
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id} className="flex flex-col items-center">
            <div className="w-20 h-20 flex justify-center items-center">
              <img src={item.image} alt={item.title} className="w-14 h-14 object-contain" />
            </div>
            <p className=" text-center text-sm font-medium">{item.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
