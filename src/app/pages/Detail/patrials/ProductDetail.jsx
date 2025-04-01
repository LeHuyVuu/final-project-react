import { useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { BreadCrumb } from "primereact/breadcrumb";
import "./styleDetail.css";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

// Define custom colors
const COLORS = {
  background: "#ffffff",
  text: "#000000",
  accentBlue: "#4dabf7",
  lightGray: "#f8f9fa",
  mediumGray: "#e0e0e0",
  darkGray: "#666666",
  border: "#dee2e6",
  success: "#51CF66",
  warning: "#FFD43B",
  danger: "#FF6B6B",
  info: "#339AF0",
};

// Main Component
const ProductDetail = () => {
  // Product data from the provided JSON
  const product = {
    id: 274086107,
    master_id: 274086107,
    sku: "4805749149042",
    name: "[Tặng Ca đá 1L] Combo 3 Bịch Cà phê Hòa tan NESCAFÉ CAFÉ VIỆT 35 gói Vị Mạnh đặc trưng",
    url_key:
      "tang-bo-binh-ly-lumiarc-750ml-200ml-nescafe-combo-3-bich-ca-phe-den-hoa-tan-nescafe-cafe-viet-tui-35-goi-x-16g-p274086107",
    url_path:
      "tang-bo-binh-ly-lumiarc-750ml-200ml-nescafe-combo-3-bich-ca-phe-den-hoa-tan-nescafe-cafe-viet-tui-35-goi-x-16g-p274086107.html?spid=274086111",
    price: 506000,
    list_price: 506000,
    original_price: 506000,
    rating_average: 4.9,
    review_count: 26,
    all_time_quantity_sold: 4135,
    thumbnail_url:
      "https://salt.tikicdn.com/cache/280x280/ts/product/b2/2b/15/0da00bcd8ec1f986045e234da7b18972.png",
    short_description:
      "BỘ SẢN PHẨM GỒM:Combo 3 Bịch Cà phê đen hòa tan NESCAFE Café Việt (Túi 35 gói x 16g)Tặng Bộ 4 ly thủy tinh NescafeNESCAFÉ CAFÉ VIỆT được làm từ những hạt cà phê chất lượng trồng tại Việt Nam c...",
    badges: [
      {
        code: "new_pdp",
        text: "v1",
      },
    ],
    badges_new: [
      {
        placement: "left_brand",
        code: "is_authentic",
        type: "is_authentic",
        icon: "https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png",
        text: "Chính hãng",
      },
      {
        placement: "right_authentic",
        code: "return_policy",
        type: "return_policy",
        icon: "https://salt.tikicdn.com/ts/ta/b1/3f/4e/cc3d0a2dd751a7b06dd97d868d6afa56.png",
        text: "Đổi trả trong 30 ngày",
      },
    ],
    brand: {
      id: 33560,
      name: "NESCAFÉ",
      slug: "nescafe",
    },
    images: [
      {
        base_url:
          "https://salt.tikicdn.com/ts/product/b2/2b/15/0da00bcd8ec1f986045e234da7b18972.png",
        is_gallery: true,
        large_url:
          "https://salt.tikicdn.com/cache/w1200/ts/product/b2/2b/15/0da00bcd8ec1f986045e234da7b18972.png",
      },
      {
        base_url:
          "https://salt.tikicdn.com/ts/product/ab/ab/2b/3037677baf2e8776c9199676f83022f7.png",
        is_gallery: true,
        large_url:
          "https://salt.tikicdn.com/cache/w1200/ts/product/ab/ab/2b/3037677baf2e8776c9199676f83022f7.png",
      },
      {
        base_url:
          "https://salt.tikicdn.com/ts/product/1e/d6/5f/dea185fcc72b26b6314f8d3f1f27a948.png",
        is_gallery: true,
        large_url:
          "https://salt.tikicdn.com/cache/w1200/ts/product/1e/d6/5f/dea185fcc72b26b6314f8d3f1f27a948.png",
      },
      {
        base_url:
          "https://salt.tikicdn.com/ts/product/0b/cf/c3/c719f4e4ad4b160fbadcbf3566c890e9.png",
        is_gallery: true,
        large_url:
          "https://salt.tikicdn.com/cache/w1200/ts/product/0b/cf/c3/c719f4e4ad4b160fbadcbf3566c890e9.png",
      },
      {
        base_url:
          "https://salt.tikicdn.com/ts/product/af/1d/e9/ae56528d56f894bc5ff70fd259ba4ec5.png",
        is_gallery: true,
        large_url:
          "https://salt.tikicdn.com/cache/w1200/ts/product/af/1d/e9/ae56528d56f894bc5ff70fd259ba4ec5.png",
      },
      {
        base_url:
          "https://salt.tikicdn.com/ts/product/30/de/80/a99b2c36c28c4f493d43d8b06b66983f.png",
        is_gallery: true,
        large_url:
          "https://salt.tikicdn.com/cache/w1200/ts/product/30/de/80/a99b2c36c28c4f493d43d8b06b66983f.png",
      },
    ],
    breadcrumbs: [
      {
        url: "/bach-hoa-online/c4384",
        name: "Bách Hóa Online",
        category_id: 4384,
      },
      {
        url: "/do-uong/c22998",
        name: "Đồ uống",
        category_id: 22998,
      },
      {
        url: "/ca-phe-tra/c4423",
        name: "Cà phê",
        category_id: 4423,
      },
    ],
    benefits: [
      {
        icon: "https://salt.tikicdn.com/ts/upload/c5/37/ee/76c708d43e377343e82baee8a0340297.png",
        text: "Được đồng kiểm khi nhận hàng",
      },
      {
        icon: "https://salt.tikicdn.com/ts/upload/ea/02/b4/b024e431ec433e6c85d4734aaf35bd65.png",
        text: "<b>Được hoàn tiền 200%</b> nếu là hàng giả.",
      },
      {
        icon: "https://salt.tikicdn.com/ts/upload/d8/c7/a5/1cd5bd2f27f9bd74b2c340b8e27c4d82.png",
        text: "Đổi trả miễn phí trong 30 ngày. Được đổi ý.",
      },
    ],
    specifications: [
      {
        name: "Content",
        attributes: [
          {
            name: "Thương hiệu",
            value: "NESCAFÉ",
          },
          {
            name: "Xuất xứ thương hiệu",
            value: "Thụy Sỹ",
          },
          {
            name: "Hạn sử dụng",
            value: "9 tháng kể từ ngày sản xuất",
          },
          {
            name: "Hướng dẫn bảo quản",
            value:
              "Bảo quản sản phẩm nơi khô ráo và thoáng mát, tránh ánh nắng trực tiếp.",
          },
          {
            name: "Hướng dẫn sử dụng",
            value:
              "- Uống lạnh: Hòa 1 gói NESCAFÉ CAFÉ VIỆT với 50 ml nước nóng, khuấy đều, thêm đá và thưởng thức.",
          },
          {
            name: "Xuất xứ (Made in)",
            value: "Việt Nam",
          },
        ],
      },
    ],
    description:
      '<p>BỘ SẢN PHẨM GỒM:</p>\n<ul>\n<li><span data-sheets-root="1">Combo 3 Bịch Cà phê đen hòa tan NESCAFE Café Việt (Túi 35 gói x 16g)</span></li>\n</ul>\n<style type="text/css"><!--td {border: 1px solid #cccccc;}br {mso-data-placement:same-cell;}--></style>\n<ul>\n<li><span data-sheets-root="1">Tặng Bộ 4 ly thủy tinh Nescafe</span></li>\n</ul>\n<p>NESCAFÉ CAFÉ VIỆT được làm từ những hạt cà phê chất lượng trồng tại Việt Nam cùng chương trình Gắn kết với nông dân.</p>\n<p>NESCAFÉ CAFÉ VIỆT tự hào mang đến cho bạn ly cà phê đen thuần túy Việt Nam với hương vị cà phê mạnh mẽ, lôi cuốn mà không phái mạnh Việt nào có thể cưỡng lại được. <br /><br /><strong>ĐẶC ĐIỂM NỔI BẬT</strong></p>\n<p>- Hương vị cà phê đen đậm đà và mạnh mẽ với hương thơm lôi cuốn <br />- 100% cà phê Việt Nam chất lượng <br />- Vị cực mạnh, nay càng thơm <br /><br /><strong>THÀNH PHẦN</strong></p>\n<p>Đường, hỗn hợp cà phê hòa tan(*)(30 %), chất ổn định 1440, muối i-ốt, chất điều chỉnh độ acid 500(ii), hương liệu tổng hợp, chất tạo ngọt tổng hợp acesulfam kali. <br /><br /><strong>HƯỚNG DẪN SỬ DỤNG</strong></p>\n<p>Uống lạnh: Hòa 1 gói NESCAFÉ CAFÉ VIỆT với 50 ml nước nóng, khuấy đều, thêm đá và thưởng thức. <br /><br /><strong>HƯỚNG DẪN BẢO QUẢN</strong></p>\n<p>Bảo quản sản phẩm nơi khô ráo và thoáng mát, tránh ánh nắng trực tiếp. <br /><br /><strong>LƯU Ý</strong></p>\n<p>(*) Có chứa đậu nành (contain soya). <br />- Sản phẩm có thể chứa sữa (may contain milk) <br />- Không dùng cho người dị ứng với các thành phần của sản phẩm. <br /><br />Xuất xứ Thương hiệu: Thụy Sĩ <br />Nơi sản xuất: Việt Nam <br />Ngày sản xuất: Xem trên bao bì <br />Hạn sử dụng: 9 tháng kể từ ngày sản xuất <br /><br /><strong>THÔNG TIN THƯƠNG HIỆU</strong></p>\n<p>NESCAFÉ là một trong những thương hiệu cà phê hàng đầu trên toàn thế giới với lịch sử phát triên lâu đời. NESCAFÉ luôn nhận được sự tín nhiệm và tin yêu của người tiêu dùng trên toàn thế giới nhờ không ngừng sáng tạo và mang đến những ly cà phê thơm ngon đa hương vị. Các sản phẩm của NESCAFÉ được đóng hộp và đóng gói lẻ theo dây, đảm bảo cung cấp những ly cà phê chất lượng và hợp túi tiền cho mỗi gia đình người Việt.</p>',
    inventory_status: "available",
    quantity_sold: {
      text: "Đã bán 4k",
      value: 4135,
    },
    current_seller: {
      id: 1,
      name: "Tiki Trading",
      link: "https://tiki.vn/cua-hang/tiki-trading",
    },
    return_and_exchange_policy:
      "Đổi trả trong<br><b>30 ngày</b><br>nếu sp lỗi.",
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const breadcrumbItems = product.breadcrumbs.map((item) => ({
    label: item.name,
    url: item.url,
  }));

  const breadcrumbHome = { icon: "pi pi-home", url: "#" };
  const lastItem = { label: product.name };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const features = [
    "Hương vị cà phê đen đậm đà và mạnh mẽ với hương thơm lôi cuốn",
    "100% cà phê Việt Nam chất lượng",
    "Vị cực mạnh, nay càng thơm",
    "Tặng kèm Bộ 4 ly thủy tinh Nescafe cao cấp",
  ];

  return (
    <>
      <div className="bg-white text-black">
        <div className="p-4 mb-2">
          <BreadCrumb
            model={breadcrumbItems}
            home={breadcrumbHome}
            end={lastItem}
            className="bg-transparent border-none p-2"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
          {/* Image Section */}
          <div className="flex-1 max-w-lg lg:max-w-xl">
            <div className="flex flex-col w-full bg-white sticky top-3 gap-4 p-4 border border-gray-200 rounded-xl shadow-sm">
              <div
                className="relative cursor-zoom-in overflow-hidden rounded-lg"
                onClick={() => setImageModalVisible(true)}
              >
                <img
                  src={product.images[selectedImage].large_url}
                  alt={product.name}
                  className="w-full h-auto object-contain transition-transform duration-300 rounded-lg"
                />

                {product.badges_new && product.badges_new.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    {product.badges_new.map(
                      (badge, idx) =>
                        badge.icon && (
                          <img
                            key={idx}
                            src={badge.icon}
                            alt={badge.text || "badge"}
                            className="h-6 drop-shadow-md"
                          />
                        )
                    )}
                  </div>
                )}

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                  <button
                    aria-label="Share"
                    className="bg-white/90 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-all duration-200"
                  >
                    <i className="pi pi-share-alt text-gray-800"></i>
                  </button>
                  <button
                    aria-label="Favorite"
                    className="bg-white/90 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-all duration-200"
                  >
                    <i className="pi pi-heart text-gray-800"></i>
                  </button>
                </div>

                <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2 px-2 pointer-events-none">
                  <button
                    aria-label="Previous"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="bg-white/90 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md hover:bg-white transition-all duration-200 pointer-events-auto"
                  >
                    <i className="pi pi-chevron-left text-gray-800"></i>
                  </button>
                  <button
                    aria-label="Next"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="bg-white/90 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md hover:bg-white transition-all duration-200 pointer-events-auto"
                  >
                    <i className="pi pi-chevron-right text-gray-800"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="relative cursor-pointer"
                  >
                    <img
                      src={image.base_url}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg transition-all duration-200 ${
                        selectedImage === index
                          ? "border-2 border-blue-500 opacity-100"
                          : "border border-gray-300 opacity-80"
                      }`}
                    />
                    {selectedImage === index && (
                      <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-7">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <i className="pi pi-star text-blue-500"></i>
                  Điểm nổi bật:
                </h3>
                <ul className="pl-6 text-gray-900 flex flex-col gap-2.5">
                  {features.map((feature, index) => (
                    <li key={index} className="text-[15px] leading-relaxed">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col bg-white text-gray-900">
            {/* Brand & SKU */}
            <div className="flex items-center gap-3 mb-2">
              <div className="text-sm text-gray-700">
                Thương hiệu:{" "}
                <b className="text-blue-500 font-semibold">
                  {product.brand.name}
                </b>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-gray-600">
                SKU: <span className="font-medium">{product.sku}</span>
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mb-5 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Rating
                  value={product.rating_average}
                  readOnly
                  disabled
                  stars={5}
                  cancel={false}
                  className="p-rating-sm"
                />
                <span className="ml-2 text-[15px] font-semibold text-blue-500">
                  {product.rating_average}
                </span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-gray-600">
                <b>{product.review_count}</b> đánh giá
              </span>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <i className="pi pi-shopping-cart text-sm"></i>
                Đã bán <b>{product.all_time_quantity_sold.toLocaleString()}</b>
              </span>
            </div>

            {/* Price Info */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  {product.discount_rate > 0 && (
                    <span className="text-gray-600 line-through text-base mb-1">
                      {formatPrice(product.list_price)}
                    </span>
                  )}
                  <span className="text-3xl text-blue-500 font-bold tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <Tag
                  value={
                    product.inventory_status === "available"
                      ? "Còn hàng"
                      : "Hết hàng"
                  }
                  severity={
                    product.inventory_status === "available"
                      ? "success"
                      : "danger"
                  }
                  className="text-sm px-3 py-1.5 rounded-lg font-semibold"
                />
              </div>

              {product.current_seller && (
                <div className="mt-4 text-sm flex items-center gap-1.5">
                  <i className="pi pi-store text-sm text-gray-600"></i>
                  <span className="text-gray-900">Cung cấp bởi: </span>
                  <a
                    href={product.current_seller.link}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    {product.current_seller.name}
                  </a>
                </div>
              )}
            </div>

            {/* Gift Box */}
            <div className="mb-7 border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <i className="pi pi-gift text-blue-500"></i>
                Quà tặng kèm
              </h3>
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <img
                  src="https://salt.tikicdn.com/ts/product/1e/d6/5f/dea185fcc72b26b6314f8d3f1f27a948.png"
                  alt="Quà tặng"
                  className="w-[70px] h-[70px] object-contain border border-gray-300 rounded-lg p-1 bg-white"
                />
                <div>
                  <p className="m-0 mb-2 text-[15px] font-semibold text-gray-900">
                    Bộ 4 ly thủy tinh Nescafe
                  </p>
                  <Tag
                    value="MIỄN PHÍ"
                    severity="info"
                    className="text-xs bg-blue-500 text-white rounded px-2 py-0.5 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-7 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-gray-900 text-base font-semibold m-0">
                Số lượng:
              </h3>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className={`w-10 h-10 flex items-center justify-center bg-white border-r border-gray-200 text-lg font-bold transition-colors duration-200 ${
                    quantity <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-900 cursor-pointer"
                  }`}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-[50px] text-center border-none outline-none text-base font-medium py-2"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center bg-white border-l border-gray-200 text-gray-900 text-lg font-bold cursor-pointer transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-7">
              <Button
                className="p-button-raised flex-1 bg-white border-2 border-blue-500 text-blue-500 font-semibold rounded-lg px-5 py-3 text-base transition-all duration-200"
                label="Thêm vào giỏ hàng"
                icon="pi pi-shopping-cart"
              />
              <Button
                className="p-button-outlined flex-1 bg-blue-500 border-2 border-blue-500 text-white font-semibold rounded-lg px-5 py-3 text-base shadow-md transition-all duration-200"
                label="Mua ngay"
                icon="pi pi-check"
              />
            </div>

            <Divider className="mb-6" />

            {/* Benefits Section */}
            <div className="bg-gray-50 rounded-xl p-5 mb-7 flex flex-col gap-4">
              {product.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2.5 bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={benefit.icon}
                    alt="Benefit icon"
                    className="w-7 h-7 object-contain"
                  />
                  <span
                    dangerouslySetInnerHTML={{ __html: benefit.text }}
                    className="text-gray-900 text-sm leading-relaxed"
                  ></span>
                </div>
              ))}
            </div>

            {/* Delivery Information */}
            <div className="mb-7 flex flex-col gap-4 text-gray-900 p-5 border border-gray-200 rounded-xl bg-white">
              <h3 className="text-lg font-semibold m-0 mb-2 text-gray-900 flex items-center gap-2">
                <i className="pi pi-truck text-blue-500"></i>
                Thông tin vận chuyển
              </h3>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <i className="pi pi-truck text-lg text-blue-500"></i>
                <div className="text-[15px]">
                  <span className="font-semibold">Giao hàng miễn phí</span>
                  <div className="text-sm text-gray-600 mt-1">
                    Áp dụng cho đơn hàng từ 500,000₫
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <i className="pi pi-shield text-lg text-blue-500"></i>
                <div className="text-[15px]">
                  <span className="font-semibold">Chính sách đổi trả</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.return_and_exchange_policy,
                    }}
                    className="text-sm text-gray-600 mt-1"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="max-w-7xl mx-auto px-4 mb-10 bg-white">
          <TabView
            activeIndex={activeTab}
            onTabChange={(e) => setActiveTab(e.index)}
            className="text-gray-900 shadow-sm rounded-xl overflow-hidden"
          >
            <TabPanel
              header={
                <span className="flex items-center gap-2 py-2 text-base font-semibold">
                  <i className="pi pi-info-circle"></i>
                  Mô tả sản phẩm
                </span>
              }
            >
              <div className="p-8 text-gray-900 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={createMarkup(product.description)}
                  className="text-[15px]"
                ></div>
              </div>
            </TabPanel>

            <TabPanel
              header={
                <span className="flex items-center gap-2 py-2 text-base font-semibold">
                  <i className="pi pi-list"></i>
                  Thông số kỹ thuật
                </span>
              }
            >
              <div className="p-8">
                <div className="w-full border-collapse bg-white text-gray-900 border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {product.specifications[0].attributes.map(
                        (attr, index) => (
                          <tr
                            key={index}
                            className={`${
                              index <
                              product.specifications[0].attributes.length - 1
                                ? "border-b border-gray-200"
                                : ""
                            }`}
                          >
                            <td className="p-5 w-[30%] bg-gray-50 font-semibold text-gray-900 border-r border-gray-200 text-[15px]">
                              {attr.name}
                            </td>
                            <td className="p-5 text-gray-900 text-[15px] leading-relaxed">
                              {attr.value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>

            <TabPanel
              header={
                <span className="flex items-center gap-2 py-2 text-base font-semibold">
                  <i className="pi pi-star"></i>
                  Đánh giá sản phẩm
                </span>
              }
            >
              <ProductReviews
                rating={product.rating_average}
                reviewCount={product.review_count}
              />
            </TabPanel>
          </TabView>
        </div>

        {/* Related Products Section */}
        <div className="px-4 pb-10">
          <RelatedProducts />
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      <Dialog
        visible={imageModalVisible}
        onHide={() => setImageModalVisible(false)}
        className="w-[90vw] max-w-7xl max-h-[90vh]"
        header={null}
        dismissableMask
        maximizable
        contentStyle={{
          padding: 0,
          overflow: "hidden",
          borderRadius: "12px",
          backgroundColor: COLORS.background,
        }}
        showHeader={false}
      >
        <div className="text-center relative bg-white min-h-[85vh] flex flex-col justify-center py-10">
          {/* Close Button */}
          <button
            onClick={() => setImageModalVisible(false)}
            className="absolute top-5 right-5 bg-blue-500 border-none rounded-full w-11 h-11 flex items-center justify-center cursor-pointer z-10 shadow-lg transition-all duration-200"
          >
            <i className="pi pi-times text-white text-xl"></i>
          </button>

          {/* Main Image */}
          <div className="flex justify-center items-center flex-1">
            <img
              src={product.images[selectedImage].large_url}
              alt={product.name}
              className="max-w-[90%] max-h-[70vh] object-contain mx-auto shadow-lg transition-transform duration-300 rounded-lg"
            />
          </div>

          {/* Thumbnails Navigation */}
          <div className="mt-8 flex justify-center gap-5 items-center px-5">
            <Button
              icon="pi pi-chevron-left"
              onClick={prevImage}
              rounded
              className="bg-blue-500 text-white w-11 h-11 shadow-md"
            />

            <div className="flex gap-3 bg-gray-50 p-3 px-5 rounded-xl items-center overflow-x-auto max-w-[70vw] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-[70px] h-[70px] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 flex-shrink-0 ${
                    selectedImage === index
                      ? "border-3 border-blue-500 opacity-100"
                      : "border-3 border-transparent opacity-70"
                  }`}
                >
                  <img
                    src={image.base_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <Button
              icon="pi pi-chevron-right"
              onClick={nextImage}
              rounded
              className="bg-blue-500 text-white w-11 h-11 shadow-md"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-5 left-0 w-full text-center text-white font-semibold text-[15px] bg-blue-500 py-2.5 opacity-90">
            {selectedImage + 1} / {product.images.length}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductDetail;
