import { useEffect, useState } from "react";
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
import { getData } from "../../../context/api";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();  // Lấy productID từ URL
  const [productRes, setProductRes] = useState({});
  console.log({id})
  // Gọi API khi component được render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData(`https://tiki.vn/api/v2/products/${id}`);
        setProductRes(res.data);  
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };
    fetchData();
  }, [id]);
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

  const breadcrumbItems = productRes?.breadcrumbs?.map((item) => ({
    label: item.name,
    url: item.url,
  }));

  const breadcrumbHome = { icon: "pi pi-home", url: "#" };
  const lastItem = { label: productRes.name };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productRes?.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + productRes?.images.length) % productRes?.images.length
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
                  src={productRes?.images?.[selectedImage]?.large_url || 'fallback_image_url'}
                  alt={productRes?.name}
                  className="w-full h-auto object-contain transition-transform duration-300 rounded-lg"
                />


                {productRes?.badges_new && productRes?.badges_new.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    {productRes?.badges_new.map(
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
                {productRes?.images?.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="relative cursor-pointer"
                  >
                    <img
                      src={image.base_url}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg transition-all duration-200 ${selectedImage === index
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
                  {productRes?.brand?.name}
                </b>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-gray-600">
                SKU: <span className="font-medium">{productRes?.sku}</span>
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl font-semibold mb-4 text-red-500 leading-tight tracking-tight">
              {productRes?.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mb-5 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Rating
                  value={productRes?.rating_average}
                  readOnly
                  disabled
                  stars={5}
                  cancel={false}
                  className="p-rating-sm"
                />
                <span className="ml-2 text-[15px] font-semibold text-blue-500">
                  {productRes?.rating_average}
                </span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-gray-600">
                <b>{productRes?.review_count}</b> đánh giá
              </span>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <i className="pi pi-shopping-cart text-sm"></i>
                Đã bán <b>{productRes?.all_time_quantity_sold?.toLocaleString()}</b>
              </span>
            </div>

            {/* Price Info */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  {productRes?.discount_rate > 0 && (
                    <span className="text-gray-600 line-through text-base mb-1">
                      {formatPrice(productRes?.list_price)}
                    </span>
                  )}
                  <span className="text-3xl text-blue-500 font-bold tracking-tight">
                    {formatPrice(productRes?.price)}
                  </span>
                </div>

                <Tag
                  value={
                    productRes?.inventory_status === "available"
                      ? "Còn hàng"
                      : "Hết hàng"
                  }
                  severity={
                    productRes?.inventory_status === "available"
                      ? "success"
                      : "danger"
                  }
                  className="text-sm px-3 py-1.5 rounded-lg font-semibold"
                />
              </div>

              {productRes?.current_seller && (
                <div className="mt-4 text-sm flex items-center gap-1.5">
                  <i className="pi pi-store text-sm text-gray-600"></i>
                  <span className="text-gray-900">Cung cấp bởi: </span>
                  <a
                    href={productRes?.current_seller?.link}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    {productRes?.current_seller?.name}
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
                  className={`w-10 h-10 flex items-center justify-center bg-white border-r border-gray-200 text-lg font-bold transition-colors duration-200 ${quantity <= 1
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
            <div className="bg-red-400 rounded-xl p-5 mb-7 flex flex-col gap-4">
              {productRes?.benefits?.map((benefit, index) => (
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
                      __html: productRes?.return_and_exchange_policy?.replace(/<br\s*\/?>/gi, ' '),
                    }}
                    className="text-sm text-gray-600 mt-1"
                  />

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
                  dangerouslySetInnerHTML={createMarkup(productRes?.description)}
                  className="text-[15px] text-red-600"
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
                      {productRes?.specifications?.[0]?.attributes?.length > 0 ? (
                        productRes.specifications[0].attributes.map((attr, index) => (
                          <tr key={index}>
                            <td className="p-5 w-[30%] bg-gray-50 font-semibold text-gray-900 border-r border-gray-200 text-[15px]">
                              {attr?.name}
                            </td>
                            <td className="p-5 text-gray-900 text-[15px] leading-relaxed">
                              {attr?.value}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center text-gray-500">No specifications available</td>
                        </tr>
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
                rating={productRes?.rating_average}
                reviewCount={productRes?.review_count}
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
              src={productRes?.images?.[selectedImage]?.large_url || 'fallback_image_url'}
              alt={productRes?.name || 'Product Name'}
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

            <div className="flex gap-3 bg-red p-3 px-5 rounded-xl items-center overflow-x-auto max-w-[70vw] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {productRes?.images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-[70px] h-[70px] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 flex-shrink-0 ${selectedImage === index
                    ? "border-3 border-blue-500 opacity-100"
                    : "border-3 border-transparent opacity-70"
                    }`}
                >
                  <img
                    src={image?.base_url}
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
            {selectedImage + 1} / {productRes?.images?.length}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductDetail;
