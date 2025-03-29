import React, { useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { TabView, TabPanel } from "primereact/tabview";
import ProductReviews from "./ProductReviews";
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
// import { BreadCrumb } from "primereact/breadcrumb";
import RelatedProducts from "./RelatedProducts";

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
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
    "Tiện lợi, dễ pha chế",
  ];

  return (
    <>
      <StyledBreadCrumb
        model={breadcrumbItems}
        home={breadcrumbHome}
        end={lastItem}
      />

      <ProductContainer>
        <ImageSection>
          <div
            className="sticky"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
              background: "white",
              position: "sticky",
              top: "12px",
              gap: "16px",
              padding: "16px 0px 12px 0px",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={product.images[selectedImage].large_url}
                alt={product.name}
                className="main-image"
              />
              {product.badges_new && product.badges_new.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {product.badges_new.map(
                    (badge, idx) =>
                      badge.icon && (
                        <img
                          key={idx}
                          src={badge.icon}
                          alt={badge.text || "badge"}
                          style={{ height: "22px" }}
                        />
                      )
                  )}
                </div>
              )}
              <div className="action-buttons">
                <button aria-label="Share">
                  <i className="pi pi-share-alt"></i>
                </button>
                <button aria-label="Favorite">
                  <i className="pi pi-heart"></i>
                </button>
              </div>
            </div>

            <div className="navigation">
              <button aria-label="Previous" onClick={prevImage}>
                <i className="pi pi-chevron-left"></i>
              </button>
              <button aria-label="Next" onClick={nextImage}>
                <i className="pi pi-chevron-right"></i>
              </button>
            </div>

            <div className="thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.base_url}
                  alt={`Thumbnail ${index + 1}`}
                  className={selectedImage === index ? "selected" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </ImageSection>

        <DetailsSection>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "4px",
            }}
          >
            <Brand>
              Thương hiệu: <b>{product.brand.name}</b>
            </Brand>
            <div
              style={{ height: "14px", width: "1px", backgroundColor: "#ddd" }}
            ></div>
            <span style={{ fontSize: "14px", color: "#666" }}>
              SKU: {product.sku}
            </span>
          </div>

          <ProductTitle>{product.name}</ProductTitle>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div className="rating">
              <Rating
                value={product.rating_average}
                readOnly
                stars={5}
                cancel={false}
              />
              <span
                className="rating-value"
                style={{ marginLeft: "8px", fontSize: "14px" }}
              >
                {product.rating_average} ({product.review_count} đánh giá)
              </span>
            </div>
            <div
              style={{ height: "14px", width: "1px", backgroundColor: "#ddd" }}
            ></div>
            <span className="sold" style={{ fontSize: "14px", color: "#666" }}>
              Đã bán {product.all_time_quantity_sold}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px",
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
                  <span className="original-price">
                    {formatPrice(product.list_price)}
                  </span>
                )}
                <span
                  className="current-price"
                  style={{ fontSize: "32px", color: "#ee4d2d" }}
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
                style={{ fontSize: "12px" }}
              />
            </div>

            {product.current_seller && (
              <div style={{ marginTop: "12px", fontSize: "14px" }}>
                <span style={{ color: "#666" }}>Cung cấp bởi: </span>
                <a
                  href={product.current_seller.link}
                  style={{
                    color: "#0066cc",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  {product.current_seller.name}
                </a>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Điểm nổi bật:
            </h3>
            <ul style={{ paddingLeft: "16px", marginTop: "0" }}>
              {features.map((feature, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "8px", fontSize: "14px" }}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginBottom: "20px",
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#ee4d2d",
              }}
            >
              <i className="pi pi-gift" style={{ marginRight: "8px" }}></i>
              Quà tặng kèm
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src="https://salt.tikicdn.com/ts/product/1e/d6/5f/dea185fcc72b26b6314f8d3f1f27a948.png"
                alt="Quà tặng"
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
              />
              <div>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Bộ 4 ly thủy tinh Nescafe
                </p>
                <Tag
                  value="MIỄN PHÍ"
                  severity="info"
                  style={{ fontSize: "11px" }}
                />
              </div>
            </div>
          </div>

          <QuantitySelector>
            <h3>Số lượng:</h3>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
          </QuantitySelector>

          <ActionButtons>
            <Button
              className="p-button-raised add-to-cart"
              label="Thêm vào giỏ hàng"
              icon="pi pi-shopping-cart"
            />
            <Button
              className="p-button-outlined checkout-now"
              label="Mua ngay"
              icon="pi pi-check"
            />
          </ActionButtons>

          <Divider />

          <BenefitSection>
            {product.benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <img src={benefit.icon} alt="Benefit icon" />
                <span dangerouslySetInnerHTML={{ __html: benefit.text }}></span>
              </div>
            ))}
          </BenefitSection>

          <DeliveryInfo
            style={{
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i
                className="pi pi-truck"
                style={{ fontSize: "16px", color: "#666" }}
              ></i>
              <span>Giao hàng miễn phí toàn quốc</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i
                className="pi pi-shield"
                style={{ fontSize: "16px", color: "#666" }}
              ></i>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.return_and_exchange_policy,
                }}
              ></div>
            </div>
          </DeliveryInfo>
        </DetailsSection>
      </ProductContainer>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <TabView
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
        >
          <TabPanel header="Mô tả sản phẩm">
            <div style={{ padding: "24px 0" }}>
              <div
                dangerouslySetInnerHTML={createMarkup(product.description)}
              ></div>
            </div>
          </TabPanel>
          <TabPanel header="Thông số kỹ thuật">
            <div style={{ padding: "24px 0" }}>
              <SpecificationList>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {product.specifications[0].attributes.map((attr, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid #f0f0f0" }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            width: "30%",
                            backgroundColor: "#f9f9f9",
                            fontWeight: "500",
                          }}
                        >
                          {attr.name}
                        </td>
                        <td style={{ padding: "12px 16px" }}>{attr.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </SpecificationList>
            </div>
          </TabPanel>
          <TabPanel header="Đánh giá sản phẩm">
            <ProductReviews
              rating={product.rating_average}
              reviewCount={product.review_count}
            />
          </TabPanel>
        </TabView>
      </div>
      <RelatedProducts />
    </>
  );
};

export default ProductDetail;
