import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { Checkbox } from "primereact/checkbox";
import { Avatar } from "primereact/avatar";
import { Paginator } from "primereact/paginator";
import {
  RatingBar,
  FilterSection,
  FilterTitle,
  FilterOptions,
  FilterOption,
  ReviewsList,
  ReviewsFilter,
  FilterButton,
  ReviewCard,
  PaginationControls,
} from "./customcss";

const ProductReviews = ({ rating = 0, reviewCount = 0 }) => {
  const [activeFilter, setActiveFilter] = useState("All Reviews");
  const [filters, setFilters] = useState({
    rating: {
      5: false,
      4: false,
      3: false,
      2: false,
      1: false,
    },
    topics: {
      "Product Quality": false,
      "Seller Services": false,
      "Product Price": false,
      Shipment: false,
      "Match with Description": false,
    },
  });
  const [first, setFirst] = useState(0);
  const [rows] = useState(4);

  const reviewsData = {
    averageRating: rating,
    totalReviews: reviewCount,
    ratingDistribution: [
      { stars: 5, count: 25, percentage: 97 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 1, percentage: 3 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ],
    photoCount: 3,
    reviews: [
      {
        id: 19861487,
        rating: 5,
        title: "Cực kì hài lòng",
        content: "Đã nhận được hàng và cả hàng khuyến mãi!",
        date: formatDate(1714749701),
        author: "Anh Ng",
        authorImage: "//tiki.vn/assets/img/avatar.png",
        hasPhoto: true,
        hasVideo: false,
        hasDescription: true,
        likes: 0,
        images: [
          {
            id: 4354382,
            full_path:
              "https://salt.tikicdn.com/ts/review/3a/42/36/240b08211c1f67d3bf5bb284e3f9014f.jpg",
          },
          {
            id: 4354383,
            full_path:
              "https://salt.tikicdn.com/ts/review/9a/db/b9/67f0734b67e416a1a4a3db3efd123295.jpg",
          },
        ],
        comments: [
          {
            id: 3189278,
            fullname: "Tiki Trading",
            avatar_url:
              "https://vcdn.tikicdn.com/ts/seller/d1/3f/ae/13ce3d83ab6b6c5e77e6377ad61dc4a5.jpg",
            content:
              "Cảm ơn bạn đã tin tưởng Tiki và cho Tiki 5⭐️! Tiki yêu bạn nhiều ❤️",
            create_at: 1714801888,
          },
        ],
      },
      {
        id: 19869233,
        rating: 5,
        title: "Cực kì hài lòng",
        content:
          "Bộ bình ly được tặng rất đẹp , dày dặn , giá lại hợp lý, cảm ơn shop hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
        date: formatDate(1715340176),
        author: "Nguyễn Quyên",
        authorImage: "//tiki.vn/assets/img/avatar.png",
        hasPhoto: true,
        hasVideo: false,
        hasDescription: true,
        likes: 0,
        images: [
          {
            id: 4355784,
            full_path:
              "https://salt.tikicdn.com/ts/review/0e/62/df/1c590479ae6d9f7b04b1a7202a244c8a.jpg",
          },
        ],
        comments: [
          {
            id: 3196065,
            fullname: "Tiki Trading",
            avatar_url:
              "https://vcdn.tikicdn.com/ts/seller/d1/3f/ae/13ce3d83ab6b6c5e77e6377ad61dc4a5.jpg",
            content:
              "Cảm ơn chị Quyên đã tin tưởng dịch vụ và lựa chọn sản phẩm của Tiki. Tiki rất mong sẽ tiếp tục được đồng hành cùng chị trong thời gian tới ạ❤️.",
            create_at: 1715411543,
          },
        ],
      },
      {
        id: 19853262,
        rating: 5,
        title: "Cực kì hài lòng",
        content:
          "Rất vừa ý. Giao hàng rất nhanh đóng gói cẩn thận cà phê ngon còn được tặng thêm bộ ly bình nữa cảm thấy rất vừa ý anh shipper dễ thương",
        date: formatDate(1713954843),
        author: "Ngọc nguyên",
        authorImage: "//tiki.vn/assets/img/avatar.png",
        hasPhoto: false,
        hasVideo: false,
        hasDescription: true,
        likes: 0,
        comments: [
          {
            id: 3185781,
            fullname: "Tiki Trading",
            avatar_url:
              "https://vcdn.tikicdn.com/ts/seller/d1/3f/ae/13ce3d83ab6b6c5e77e6377ad61dc4a5.jpg",
            content:
              "Tiki rất vui khi nhận được đánh giá 5⭐️ từ bạn Ngọc Nguyên. Sự hài lòng của bạn là động lực to lớn với Tiki đó ạ. Hy vọng bạn sẽ tiếp tục ủng hộ Tiki nha!",
            create_at: 1714024815,
          },
        ],
      },
      {
        id: 20029915,
        rating: 5,
        title: "Cực kì hài lòng",
        content: "Hình ảnh mang tính chất minh họa\r\nNen mua nha moi nguoi",
        date: formatDate(1731486458),
        author: "Apple User",
        authorImage: "//tiki.vn/assets/img/avatar.png",
        hasPhoto: true,
        hasVideo: false,
        hasDescription: true,
        likes: 0,
        images: [
          {
            id: 4387650,
            full_path:
              "https://salt.tikicdn.com/ts/review/ae/31/70/4e9d18fe4df76ae28fd84f9f6b27c7c4.jpg",
          },
        ],
        comments: [
          {
            id: 3281325,
            fullname: "Tiki Trading",
            avatar_url:
              "https://vcdn.tikicdn.com/ts/seller/d1/3f/ae/13ce3d83ab6b6c5e77e6377ad61dc4a5.jpg",
            content:
              "Cảm ơn bạn đã tin tưởng Tiki và cho Tiki 5⭐️! Thật tuyệt vời khi Tiki có một khách hàng là bạn ❤️",
            create_at: 1731575801,
          },
        ],
      },
    ],
  };

  // Format date from timestamp
  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const handleFilterChange = (section, key) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleFilterButtonClick = (filter) => {
    setActiveFilter(filter);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      <div style={{ padding: "24px 0" }}>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 280px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "24px",
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "700",
                  color: "#000000",
                }}
              >
                {reviewsData.averageRating.toFixed(1)}
              </div>
              <div style={{ marginBottom: "16px" }}>
                <Rating
                  value={reviewsData.averageRating}
                  readOnly
                  cancel={false}
                  stars={5}
                />
              </div>
              <div style={{ fontSize: "14px", color: "#000000" }}>
                {reviewsData.totalReviews} đánh giá
              </div>
            </div>

            {reviewsData.ratingDistribution && (
              <div style={{ marginBottom: "24px" }}>
                {reviewsData.ratingDistribution.map((item) => (
                  <RatingBar key={item.stars}>
                    <div className="stars">
                      {item.stars} <i className="pi pi-star-fill"></i>
                    </div>
                    <div className="bar-container">
                      <div
                        className="bar-fill"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="count">{item.count}</div>
                  </RatingBar>
                ))}
              </div>
            )}

            <FilterSection>
              <FilterTitle>
                Filter by Rating
                <i className="pi pi-refresh"></i>
              </FilterTitle>
              <FilterOptions>
                {[5, 4, 3, 2, 1].map((star) => (
                  <FilterOption key={star}>
                    <Checkbox
                      inputId={`rating-${star}`}
                      checked={filters.rating[star]}
                      onChange={() => handleFilterChange("rating", star)}
                    />
                    <label htmlFor={`rating-${star}`}>
                      {star}{" "}
                      <i
                        className="pi pi-star-fill"
                        style={{ color: "#f7a928" }}
                      ></i>
                    </label>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>

            <FilterSection>
              <FilterTitle>
                Filter by Topics
                <i className="pi pi-refresh"></i>
              </FilterTitle>
              <FilterOptions>
                {Object.keys(filters.topics).map((topic) => (
                  <FilterOption key={topic}>
                    <Checkbox
                      inputId={`topic-${topic}`}
                      checked={filters.topics[topic]}
                      onChange={() => handleFilterChange("topics", topic)}
                    />
                    <label htmlFor={`topic-${topic}`}>{topic}</label>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>
          </div>

          <div style={{ flex: "1" }}>
            <ReviewsFilter>
              <FilterButton
                active={activeFilter === "All Reviews"}
                onClick={() => handleFilterButtonClick("All Reviews")}
              >
                All Reviews
              </FilterButton>
              <FilterButton
                active={activeFilter === "With Photos"}
                onClick={() => handleFilterButtonClick("With Photos")}
              >
                With Photos ({reviewsData.photoCount})
              </FilterButton>
              <FilterButton
                active={activeFilter === "With Videos"}
                onClick={() => handleFilterButtonClick("With Videos")}
              >
                With Videos (0)
              </FilterButton>
              <FilterButton
                active={activeFilter === "With Comments"}
                onClick={() => handleFilterButtonClick("With Comments")}
              >
                With Comments (4)
              </FilterButton>
            </ReviewsFilter>

            <ReviewsList>
              {reviewsData.reviews.slice(first, first + rows).map((review) => (
                <ReviewCard key={review.id}>
                  <div className="review-rating">
                    <Rating
                      value={review.rating}
                      readOnly
                      cancel={false}
                      stars={5}
                    />
                  </div>
                  <div className="review-title">{review.title}</div>
                  <div className="review-date">{review.date}</div>

                  <div className="review-author">
                    <Avatar
                      image={review.authorImage}
                      shape="circle"
                      alt={review.author}
                    />
                    <span className="name">{review.author}</span>
                  </div>

                  <div
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.5",
                      marginBottom: "16px",
                      color: "#000000",
                    }}
                  >
                    {review.content}
                  </div>

                  {review.images && review.images.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "16px",
                        flexWrap: "wrap",
                      }}
                    >
                      {review.images.map((image) => (
                        <img
                          key={image.id}
                          src={image.full_path}
                          alt="Review"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {review.comments && review.comments.length > 0 && (
                    <div
                      style={{
                        marginTop: "16px",
                        padding: "16px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                      }}
                    >
                      {review.comments.map((comment) => (
                        <div
                          key={comment.id}
                          style={{
                            display: "flex",
                            gap: "12px",
                          }}
                        >
                          <Avatar
                            image={comment.avatar_url}
                            shape="circle"
                            alt={comment.fullname}
                            style={{ width: "36px", height: "36px" }}
                          />
                          <div>
                            <div
                              style={{
                                fontWeight: "500",
                                marginBottom: "4px",
                                color: "#000000",
                              }}
                            >
                              {comment.fullname}
                            </div>
                            <div style={{ fontSize: "14px", color: "#000000" }}>
                              {comment.content}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#555555",
                                marginTop: "4px",
                              }}
                            >
                              {formatDate(comment.create_at)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="review-actions">
                    <button>
                      <i className="pi pi-thumbs-up"></i> Hữu ích (
                      {review.likes})
                    </button>
                    <button>
                      <i className="pi pi-flag"></i> Báo cáo
                    </button>
                  </div>
                </ReviewCard>
              ))}

              <PaginationControls>
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={reviewsData.reviews.length}
                  onPageChange={onPageChange}
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                />
              </PaginationControls>
            </ReviewsList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
