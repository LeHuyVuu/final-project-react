import React, { useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import "./styleDetail.css";

import {
  StyledBreadCrumb,
  ProductContainer,
  ImageSection,
  DetailsSection,
  Brand,
  ProductTitle,
  PriceContainer,
  SoldRating,
  Description,
  ActionButtons,
  DeliveryInfo,
  SpecificationList,
  QuantitySelector,
  BenefitSection,
  RelatedProduct,
} from "./customcss";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
// import { BreadCrumb } from "primereact/breadcrumb";

// Define custom colors
const COLORS = {
  background: "#ffffff",
  text: "#000000",
  accentBlue: "#4dabf7", // Changed to a more vibrant blue
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
      <div style={{ backgroundColor: COLORS.background, color: COLORS.text }}>
        <StyledBreadCrumb
          model={breadcrumbItems}
          home={breadcrumbHome}
          end={lastItem}
          className="product-breadcrumb"
        />

        <ProductContainer>
          <ImageSection>
            <div
              className="image-gallery-container"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                background: COLORS.background,
                position: "sticky",
                top: "12px",
                gap: "16px",
                padding: "16px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  cursor: "zoom-in",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
                onClick={() => setImageModalVisible(true)}
                className="main-image-container"
              >
                <img
                  src={product.images[selectedImage].large_url}
                  alt={product.name}
                  className="main-image"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                    borderRadius: "8px",
                  }}
                />

                {product.badges_new && product.badges_new.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      display: "flex",
                      gap: "8px",
                      zIndex: 2,
                    }}
                  >
                    {product.badges_new.map(
                      (badge, idx) =>
                        badge.icon && (
                          <img
                            key={idx}
                            src={badge.icon}
                            alt={badge.text || "badge"}
                            style={{
                              height: "24px",
                              filter:
                                "drop-shadow(0px 1px 2px rgba(0,0,0,0.2))",
                            }}
                          />
                        )
                    )}
                  </div>
                )}

                <div
                  className="action-buttons"
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    zIndex: 2,
                  }}
                >
                  <button
                    aria-label="Share"
                    style={{
                      background: `${COLORS.background}ee`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i
                      className="pi pi-share-alt"
                      style={{ color: COLORS.text }}
                    ></i>
                  </button>
                  <button
                    aria-label="Favorite"
                    style={{
                      background: `${COLORS.background}ee`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i
                      className="pi pi-heart"
                      style={{ color: COLORS.text }}
                    ></i>
                  </button>
                </div>

                <div
                  className="image-navigation"
                  style={{
                    position: "absolute",
                    top: "50%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    transform: "translateY(-50%)",
                    padding: "0 8px",
                    pointerEvents: "none",
                  }}
                >
                  <button
                    aria-label="Previous"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    style={{
                      background: `${COLORS.background}dd`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      transition: "all 0.2s ease",
                      pointerEvents: "auto",
                    }}
                  >
                    <i
                      className="pi pi-chevron-left"
                      style={{ color: COLORS.text }}
                    ></i>
                  </button>
                  <button
                    aria-label="Next"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    style={{
                      background: `${COLORS.background}dd`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      transition: "all 0.2s ease",
                      pointerEvents: "auto",
                    }}
                  >
                    <i
                      className="pi pi-chevron-right"
                      style={{ color: COLORS.text }}
                    ></i>
                  </button>
                </div>
              </div>

              <div
                className="thumbnails"
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  padding: "8px 4px",
                  scrollbarWidth: "thin",
                  scrollbarColor: `${COLORS.mediumGray} transparent`,
                }}
              >
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={image.base_url}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        border:
                          selectedImage === index
                            ? `2px solid ${COLORS.accentBlue}`
                            : `1px solid ${COLORS.mediumGray}`,
                        borderRadius: "8px",
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                        transition: "all 0.2s ease",
                        opacity: selectedImage === index ? 1 : 0.8,
                      }}
                    />
                    {selectedImage === index && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "24px",
                          height: "2px",
                          backgroundColor: COLORS.accentBlue,
                          borderRadius: "2px",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              {/* Features */}
              <div
                className="features-container"
                style={{ marginBottom: "28px" }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    color: COLORS.text,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <i
                    className="pi pi-star"
                    style={{ color: COLORS.accentBlue }}
                  ></i>
                  Điểm nổi bật:
                </h3>
                <ul
                  style={{
                    paddingLeft: "24px",
                    marginTop: "0",
                    color: COLORS.text,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ImageSection>

          <DetailsSection
            style={{ backgroundColor: COLORS.background, color: COLORS.text }}
          >
            {/* Brand & SKU */}
            <div
              className="product-metadata"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <Brand>
                Thương hiệu:{" "}
                <b style={{ color: COLORS.accentBlue, fontWeight: "600" }}>
                  {product.brand.name}
                </b>
              </Brand>
              <div
                style={{
                  height: "16px",
                  width: "1px",
                  backgroundColor: COLORS.mediumGray,
                }}
              ></div>
              <span style={{ fontSize: "14px", color: COLORS.darkGray }}>
                SKU: <span style={{ fontWeight: "500" }}>{product.sku}</span>
              </span>
            </div>

            {/* Product Title */}
            <ProductTitle
              style={{
                color: COLORS.text,
                fontSize: "28px",
                lineHeight: "1.3",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              {product.name}
            </ProductTitle>

            {/* Ratings & Reviews */}
            <div
              className="ratings-container"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
                background: COLORS.lightGray,
                padding: "8px 12px",
                borderRadius: "8px",
              }}
            >
              <div
                className="rating-stars"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Rating
                  value={product.rating_average}
                  readOnly
                  stars={5}
                  cancel={false}
                  className="p-rating-sm"
                />
                <span
                  className="rating-value"
                  style={{
                    marginLeft: "8px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: COLORS.accentBlue,
                  }}
                >
                  {product.rating_average}
                </span>
              </div>
              <div
                style={{
                  height: "16px",
                  width: "1px",
                  backgroundColor: COLORS.mediumGray,
                }}
              ></div>
              <span style={{ fontSize: "14px", color: COLORS.darkGray }}>
                <b>{product.review_count}</b> đánh giá
              </span>
              <div
                style={{
                  height: "16px",
                  width: "1px",
                  backgroundColor: COLORS.mediumGray,
                }}
              ></div>
              <span
                className="sold"
                style={{
                  fontSize: "14px",
                  color: COLORS.darkGray,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <i
                  className="pi pi-shopping-cart"
                  style={{ fontSize: "14px" }}
                ></i>
                Đã bán <b>{product.all_time_quantity_sold.toLocaleString()}</b>
              </span>
            </div>

            {/* Price Info */}
            <div
              className="price-container"
              style={{
                backgroundColor: COLORS.lightGray,
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <PriceContainer>
                  {product.discount_rate > 0 && (
                    <span
                      className="original-price"
                      style={{
                        color: COLORS.darkGray,
                        textDecoration: "line-through",
                        fontSize: "16px",
                        marginBottom: "4px",
                      }}
                    >
                      {formatPrice(product.list_price)}
                    </span>
                  )}
                  <span
                    className="current-price"
                    style={{
                      fontSize: "32px",
                      color: COLORS.accentBlue,
                      fontWeight: "700",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                </PriceContainer>

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
                  style={{
                    fontSize: "13px",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                  }}
                />
              </div>

              {product.current_seller && (
                <div
                  style={{
                    marginTop: "16px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i
                    className="pi pi-store"
                    style={{ fontSize: "14px", color: COLORS.darkGray }}
                  ></i>
                  <span style={{ color: COLORS.text }}>Cung cấp bởi: </span>
                  <a
                    href={product.current_seller.link}
                    style={{
                      color: COLORS.accentBlue,
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    {product.current_seller.name}
                  </a>
                </div>
              )}
            </div>

            {/* Gift Box */}
            <div
              className="gift-box"
              style={{
                marginBottom: "28px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "12px",
                padding: "20px",
                backgroundColor: COLORS.background,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: COLORS.text,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <i
                  className="pi pi-gift"
                  style={{ color: COLORS.accentBlue }}
                ></i>
                Quà tặng kèm
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  background: COLORS.lightGray,
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                <img
                  src="https://salt.tikicdn.com/ts/product/1e/d6/5f/dea185fcc72b26b6314f8d3f1f27a948.png"
                  alt="Quà tặng"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                    border: `1px solid ${COLORS.mediumGray}`,
                    borderRadius: "8px",
                    padding: "4px",
                    background: COLORS.background,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: COLORS.text,
                    }}
                  >
                    Bộ 4 ly thủy tinh Nescafe
                  </p>
                  <Tag
                    value="MIỄN PHÍ"
                    severity="info"
                    style={{
                      fontSize: "12px",
                      backgroundColor: COLORS.accentBlue,
                      color: COLORS.background,
                      borderRadius: "4px",
                      fontWeight: "600",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <QuantitySelector
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "28px",
                padding: "16px",
                backgroundColor: COLORS.lightGray,
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  color: COLORS.text,
                  fontSize: "16px",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Số lượng:
              </h3>
              <div
                className="quantity-controls"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: COLORS.background,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.background,
                    border: "none",
                    borderRight: `1px solid ${COLORS.border}`,
                    cursor: quantity <= 1 ? "not-allowed" : "pointer",
                    color: quantity <= 1 ? COLORS.mediumGray : COLORS.text,
                    fontSize: "18px",
                    fontWeight: "bold",
                    transition: "background-color 0.2s",
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  style={{
                    width: "50px",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontWeight: "500",
                    padding: "8px 0",
                  }}
                />
                <button
                  onClick={increaseQuantity}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.background,
                    border: "none",
                    borderLeft: `1px solid ${COLORS.border}`,
                    cursor: "pointer",
                    color: COLORS.text,
                    fontSize: "18px",
                    fontWeight: "bold",
                    transition: "background-color 0.2s",
                  }}
                >
                  +
                </button>
              </div>
            </QuantitySelector>

            {/* Action Buttons */}
            <ActionButtons
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "28px",
              }}
            >
              <Button
                className="p-button-raised add-to-cart"
                label="Thêm vào giỏ hàng"
                icon="pi pi-shopping-cart"
                style={{
                  backgroundColor: COLORS.background,
                  borderColor: COLORS.accentBlue,
                  color: COLORS.accentBlue,
                  fontWeight: "600",
                  border: `2px solid ${COLORS.accentBlue}`,
                  borderRadius: "8px",
                  padding: "12px 20px",
                  flex: 1,
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                }}
              />
              <Button
                className="p-button-outlined checkout-now"
                label="Mua ngay"
                icon="pi pi-check"
                style={{
                  borderColor: COLORS.accentBlue,
                  color: COLORS.background,
                  backgroundColor: COLORS.accentBlue,
                  fontWeight: "600",
                  border: `2px solid ${COLORS.accentBlue}`,
                  borderRadius: "8px",
                  padding: "12px 20px",
                  flex: 1,
                  fontSize: "16px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                }}
              />
            </ActionButtons>

            <Divider style={{ margin: "0 0 24px 0" }} />

            {/* Benefits Section */}
            <BenefitSection
              style={{
                backgroundColor: COLORS.lightGray,
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {product.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px",
                    backgroundColor: COLORS.background,
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src={benefit.icon}
                    alt="Benefit icon"
                    style={{
                      width: "28px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                  />
                  <span
                    dangerouslySetInnerHTML={{ __html: benefit.text }}
                    style={{
                      color: COLORS.text,
                      fontSize: "14px",
                      lineHeight: "1.4",
                    }}
                  ></span>
                </div>
              ))}
            </BenefitSection>

            {/* Delivery Information */}
            <DeliveryInfo
              style={{
                marginBottom: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                color: COLORS.text,
                padding: "20px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "12px",
                backgroundColor: COLORS.background,
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                  color: COLORS.text,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <i
                  className="pi pi-truck"
                  style={{ color: COLORS.accentBlue }}
                ></i>
                Thông tin vận chuyển
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  backgroundColor: COLORS.lightGray,
                  borderRadius: "8px",
                }}
              >
                <i
                  className="pi pi-truck"
                  style={{ fontSize: "18px", color: COLORS.accentBlue }}
                ></i>
                <div style={{ fontSize: "15px" }}>
                  <span style={{ fontWeight: "600" }}>Giao hàng miễn phí</span>
                  <div
                    style={{
                      fontSize: "13px",
                      color: COLORS.darkGray,
                      marginTop: "4px",
                    }}
                  >
                    Áp dụng cho đơn hàng từ 500,000₫
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  backgroundColor: COLORS.lightGray,
                  borderRadius: "8px",
                }}
              >
                <i
                  className="pi pi-shield"
                  style={{ fontSize: "18px", color: COLORS.accentBlue }}
                ></i>
                <div style={{ fontSize: "15px" }}>
                  <span style={{ fontWeight: "600" }}>Chính sách đổi trả</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.return_and_exchange_policy,
                    }}
                    style={{
                      fontSize: "13px",
                      color: COLORS.darkGray,
                      marginTop: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </DeliveryInfo>
          </DetailsSection>
        </ProductContainer>

        {/* Product Tabs */}
        <div
          className="product-tabs-container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto 40px auto",
            padding: "0 16px",
            backgroundColor: COLORS.background,
          }}
        >
          <TabView
            activeIndex={activeTab}
            onTabChange={(e) => setActiveTab(e.index)}
            style={{
              color: COLORS.text,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <TabPanel
              header={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  <i className="pi pi-info-circle"></i>
                  Mô tả sản phẩm
                </span>
              }
            >
              <div
                style={{
                  padding: "32px 24px",
                  color: COLORS.text,
                  lineHeight: "1.6",
                }}
              >
                <div
                  dangerouslySetInnerHTML={createMarkup(product.description)}
                  className="product-description"
                  style={{
                    fontSize: "15px",
                  }}
                ></div>
              </div>
            </TabPanel>

            <TabPanel
              header={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  <i className="pi pi-list"></i>
                  Thông số kỹ thuật
                </span>
              }
            >
              <div style={{ padding: "32px 24px" }}>
                <SpecificationList>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      backgroundColor: COLORS.background,
                      color: COLORS.text,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <tbody>
                      {product.specifications[0].attributes.map(
                        (attr, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom:
                                index <
                                product.specifications[0].attributes.length - 1
                                  ? `1px solid ${COLORS.border}`
                                  : "none",
                            }}
                          >
                            <td
                              style={{
                                padding: "14px 20px",
                                width: "30%",
                                backgroundColor: COLORS.lightGray,
                                fontWeight: "600",
                                color: COLORS.text,
                                borderRight: `1px solid ${COLORS.border}`,
                                fontSize: "15px",
                              }}
                            >
                              {attr.name}
                            </td>
                            <td
                              style={{
                                padding: "14px 20px",
                                color: COLORS.text,
                                fontSize: "15px",
                                lineHeight: "1.5",
                              }}
                            >
                              {attr.value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </SpecificationList>
              </div>
            </TabPanel>

            <TabPanel
              header={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
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
        <div style={{ padding: "0 16px 40px 16px" }}>
          <RelatedProducts />
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      <Dialog
        visible={imageModalVisible}
        onHide={() => setImageModalVisible(false)}
        style={{
          width: "90vw",
          maxWidth: "1200px",
          maxHeight: "90vh",
        }}
        header={null}
        dismissableMask
        maximizable
        contentStyle={{
          padding: 0,
          overflow: "hidden",
          borderRadius: "12px",
          backgroundColor: `${COLORS.background}`,
        }}
        showHeader={false}
        className="image-zoom-dialog"
      >
        <div
          className="image-modal-content"
          style={{
            textAlign: "center",
            position: "relative",
            backgroundColor: COLORS.background,
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setImageModalVisible(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: COLORS.accentBlue,
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 5,
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
              transition: "all 0.2s ease",
            }}
          >
            <i
              className="pi pi-times"
              style={{ color: COLORS.background, fontSize: "20px" }}
            ></i>
          </button>

          {/* Main Image */}
          <div
            className="modal-image-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <img
              src={product.images[selectedImage].large_url}
              alt={product.name}
              style={{
                maxWidth: "90%",
                maxHeight: "70vh",
                objectFit: "contain",
                margin: "0 auto",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Thumbnails Navigation */}
          <div
            className="modal-navigation"
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <Button
              icon="pi pi-chevron-left"
              onClick={prevImage}
              rounded
              style={{
                backgroundColor: COLORS.accentBlue,
                color: COLORS.background,
                width: "44px",
                height: "44px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
              }}
            />

            <div
              className="modal-thumbnails"
              style={{
                display: "flex",
                gap: "12px",
                backgroundColor: COLORS.lightGray,
                padding: "12px 20px",
                borderRadius: "12px",
                alignItems: "center",
                overflowX: "auto",
                maxWidth: "70vw",
                scrollbarWidth: "thin",
                scrollbarColor: `${COLORS.mediumGray} transparent`,
              }}
            >
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: "70px",
                    height: "70px",
                    border:
                      selectedImage === index
                        ? `3px solid ${COLORS.accentBlue}`
                        : `3px solid transparent`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    opacity: selectedImage === index ? 1 : 0.7,
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={image.base_url}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            <Button
              icon="pi pi-chevron-right"
              onClick={nextImage}
              rounded
              style={{
                backgroundColor: COLORS.accentBlue,
                color: COLORS.background,
                width: "44px",
                height: "44px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
              }}
            />
          </div>

          {/* Image Counter */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "0",
              width: "100%",
              textAlign: "center",
              color: COLORS.background,
              fontSize: "15px",
              fontWeight: "600",
              backgroundColor: COLORS.accentBlue,
              padding: "10px 0",
              opacity: 0.9,
            }}
          >
            {selectedImage + 1} / {product.images.length}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductDetail;
