import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import '../SwiperStyle.css'
import { getData } from "../../../context/api";

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getData("https://api.tiki.vn/raiden/v2/menu-config");
        const data = res.data.menu_block.items.map((item) => ({
          id: item.link.split("/").pop(),  // Lấy mã ID ở cuối của link để làm id cho từng danh mục
          image: item.icon_url,
          title: item.text,
        }));
        setCategories(data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu danh mục:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh mục sản phẩm</h2>

      <Swiper
        slidesPerView={3}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={10}
        navigation={true}
        modules={[Grid, Navigation]}
        breakpoints={{
          1024: { slidesPerView: 6, grid: { rows: 2 } },
          768: { slidesPerView: 4, grid: { rows: 2 } },
          480: { slidesPerView: 3, grid: { rows: 2 } },
        }}
        className="mySwiper"
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id} className="flex flex-col items-center">
            <div className="w-20 h-20 flex justify-center items-center">
              <img src={item.image} alt={item.title} className="w-14 h-14 object-contain" />
            </div>
            <p className="mt-2 text-center text-sm font-medium">{item.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
