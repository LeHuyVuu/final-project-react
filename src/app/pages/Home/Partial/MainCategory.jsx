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
    <div className="mx-auto p-4 text-right">

      <Swiper
        slidesPerView={4}
        grid={{ rows: 3, fill: "row" }}
        spaceBetween={10}
        navigation={true}
        modules={[Grid, Navigation]}
        breakpoints={{
          1024: { slidesPerView: 4, grid: { rows: 3 } },
          768: { slidesPerView: 3, grid: { rows: 3 } },
          480: { slidesPerView: 2, grid: { rows: 3 } },
        }}
        className=""
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id} className="">
            <Link to={`/category/${item.id}`}>
              <div className="w-20 h-20 flex justify-center items-center">
                <img src={item.image} alt={item.title} className=" " />
              </div>
              <div className="text-sm font-medium ">{item.title}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
