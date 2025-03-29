import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { Checkbox } from "primereact/checkbox";
import { Avatar } from "primereact/avatar";
import { Paginator } from "primereact/paginator";
import {
  ReviewsContainer,
  ReviewsHeader,
  ReviewsContent,
  ReviewsStats,
  RatingSummary,
  RatingBars,
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

  // Return Component JSX
  return (
    <ReviewsContainer>
      <ReviewsHeader>Product Reviews</ReviewsHeader>
      <ReviewsContent>
        <ReviewsStats>
          <RatingSummary>
            <div className="rating-circle">{reviewsData.averageRating}</div>
            <div className="reviews-count">
              from {reviewsData.totalReviews} reviews
            </div>
          </RatingSummary>

          <RatingBars>
            {reviewsData.ratingDistribution.map((item) => (
              <RatingBar key={item.stars}>
                <div className="stars">{item.stars}.0</div>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="count">{item.count}</div>
              </RatingBar>
            ))}
          </RatingBars>

          <FilterSection>
            <FilterTitle>
              Reviews Filter
              <i className="pi pi-chevron-up" />
            </FilterTitle>

            <FilterOptions>
              <FilterOption>
                <div className="checkbox-wrapper">
                  <Checkbox
                    inputId="rating-5"
                    checked={filters.rating[5]}
                    onChange={() => handleFilterChange("rating", 5)}
                  />
                </div>
                <label htmlFor="rating-5">
                  <Rating value={5} readOnly stars={5} cancel={false} />
                </label>
              </FilterOption>
              <FilterOption>
                <div className="checkbox-wrapper">
                  <Checkbox
                    inputId="rating-4"
                    checked={filters.rating[4]}
                    onChange={() => handleFilterChange("rating", 4)}
                  />
                </div>
                <label htmlFor="rating-4">
                  <Rating value={4} readOnly stars={5} cancel={false} />
                </label>
              </FilterOption>
              <FilterOption>
                <div className="checkbox-wrapper">
                  <Checkbox
                    inputId="rating-3"
                    checked={filters.rating[3]}
                    onChange={() => handleFilterChange("rating", 3)}
                  />
                </div>
                <label htmlFor="rating-3">
                  <Rating value={3} readOnly stars={5} cancel={false} />
                </label>
              </FilterOption>
              <FilterOption>
                <div className="checkbox-wrapper">
                  <Checkbox
                    inputId="rating-2"
                    checked={filters.rating[2]}
                    onChange={() => handleFilterChange("rating", 2)}
                  />
                </div>
                <label htmlFor="rating-2">
                  <Rating value={2} readOnly stars={5} cancel={false} />
                </label>
              </FilterOption>
              <FilterOption>
                <div className="checkbox-wrapper">
                  <Checkbox
                    inputId="rating-1"
                    checked={filters.rating[1]}
                    onChange={() => handleFilterChange("rating", 1)}
                  />
                </div>
                <label htmlFor="rating-1">
                  <Rating value={1} readOnly stars={5} cancel={false} />
                </label>
              </FilterOption>
            </FilterOptions>
          </FilterSection>

          <FilterSection>
            <FilterTitle>
              Review Topics
              <i className="pi pi-chevron-up" />
            </FilterTitle>

            <FilterOptions>
              {Object.keys(filters.topics).map((topic) => (
                <FilterOption key={topic}>
                  <div className="checkbox-wrapper">
                    <Checkbox
                      inputId={`topic-${topic}`}
                      checked={filters.topics[topic]}
                      onChange={() => handleFilterChange("topics", topic)}
                    />
                  </div>
                  <label htmlFor={`topic-${topic}`}>{topic}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterSection>
        </ReviewsStats>

        <ReviewsList>
          <ReviewsFilter>
            <FilterButton
              active={activeFilter === "All Reviews"}
              onClick={() => handleFilterButtonClick("All Reviews")}
            >
              All Reviews
            </FilterButton>
            <FilterButton
              active={activeFilter === "With Photo & Video"}
              onClick={() => handleFilterButtonClick("With Photo & Video")}
            >
              With Photo & Video ({reviewsData.photoCount})
            </FilterButton>
            <FilterButton
              active={activeFilter === "With Description"}
              onClick={() => handleFilterButtonClick("With Description")}
            >
              With Description
            </FilterButton>
          </ReviewsFilter>

          {reviewsData.reviews.map((review) => (
            <ReviewCard key={review.id}>
              <div className="review-rating">
                <Rating
                  value={review.rating}
                  readOnly
                  stars={5}
                  cancel={false}
                />
              </div>
              <div className="review-title">{review.title}</div>
              <div className="review-content">{review.content}</div>
              <div className="review-date">{review.date}</div>
              <div className="review-author">
                <Avatar
                  image={
                    review.authorImage !== "//tiki.vn/assets/img/avatar.png"
                      ? review.authorImage
                      : null
                  }
                  label={review.author.charAt(0).toUpperCase()}
                  size="xlarge"
                  shape="circle"
                />
                <span className="name">{review.author}</span>
              </div>
              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((image, index) => (
                    <img
                      key={image.id || index}
                      src={image.full_path}
                      alt={`Review image ${index + 1}`}
                      style={{ maxWidth: "100px", margin: "5px" }}
                    />
                  ))}
                </div>
              )}
              <div className="review-actions">
                <button>
                  <i className="pi pi-thumbs-up" />
                  <span>{review.likes}</span>
                </button>
                <button>
                  <i className="pi pi-thumbs-down" />
                </button>
              </div>
              {review.comments && review.comments.length > 0 && (
                <div
                  className="review-comments"
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                  }}
                >
                  {review.comments.map((comment) => (
                    <div
                      key={comment.id}
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <Avatar
                        image={comment.avatar_url}
                        label={comment.fullname.charAt(0).toUpperCase()}
                        size="small"
                        shape="circle"
                      />
                      <div>
                        <div style={{ fontWeight: "bold" }}>
                          {comment.fullname}
                        </div>
                        <div>{comment.content}</div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>
                          {formatDate(comment.create_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ReviewCard>
          ))}

          <PaginationControls>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={reviewsData.totalReviews}
              onPageChange={onPageChange}
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            />
          </PaginationControls>
        </ReviewsList>
      </ReviewsContent>
    </ReviewsContainer>
  );
};

export default ProductReviews;
