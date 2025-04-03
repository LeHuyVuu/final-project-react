import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import '../SwiperStyle.css';
import { getData } from "../../../context/api";
import { Link } from "react-router-dom";
import SkeletonLoader from '../../../components/SkeletonLoader/SkeletonLoader.jsx';

// Hàm tạo màu pastel ngẫu nhiên
const generatePastelColor = (index) => {
  const r = (index * 60 + 170) % 256;  // Tăng giá trị của r để thay đổi tông màu đỏ
  const g = (index * 50 + 170) % 256;  // Tăng giá trị của g để thay đổi tông màu xanh lá
  const b = (index * 100 + 170) % 256;  // Tăng giá trị của b để thay đổi tông màu xanh dương
  return `rgba(${r}, ${g}, ${b}, 0.15)`;  // Sử dụng độ trong suốt 0.2 cho nền mờ
};

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);


  // Hàm tạo màu pastel ngẫu nhiên
  const generatePastelColor = (index) => {
    const r = (index * 60 + 170) % 256;  // Tăng giá trị của r để thay đổi tông màu đỏ
    const g = (index * 50 + 170) % 256;  // Tăng giá trị của g để thay đổi tông màu xanh lá
    const b = (index * 100 + 170) % 256;  // Tăng giá trị của b để thay đổi tông màu xanh dương
    return `rgba(${r}, ${g}, ${b}, 0.15)`;  // Sử dụng độ trong suốt 0.2 cho nền mờ
  };


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getData("https://api.tiki.vn/raiden/v2/menu-config");
        const data = res.data.menu_block.items.map((item, index) => ({
          id: item.link.split("/").pop().slice(1),
          image: item.icon_url,
          title: item.text,
          backgroundColor: generatePastelColor(index), 
          urlKey: item.link.split("/")[3] // Tạo màu pastel cho mỗi phần tử
        }));
        setCategories(data);
        console.log({ data });
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

      {loading ? (
        <SkeletonLoader type="image" count={4} width="100%" height="200px" />  // Skeleton khi đang tải
      ) : (
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
        >
          {categories.map((item) => (
            <SwiperSlide
              key={item.id}
              className="border-gray-300 flex rounded-lg flex-col items-center justify-center"
              style={{ backgroundColor: item.backgroundColor }}
            >
            <Link to={`/category/${item.id}?urlKey=${item.urlKey}`} className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center mb-2">
                  <img src={item.image} alt={item.title} className="object-contain" />
                </div>
                <div className="text-sm font-medium text-left">{item.title}</div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
