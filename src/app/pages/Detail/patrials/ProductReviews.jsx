import React, { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { Checkbox } from "primereact/checkbox";
import { Avatar } from "primereact/avatar";
import { Paginator } from "primereact/paginator";
import { getData } from "../../../context/api";

const ProductReviews = ({ rating = 0, reviewCount = 0, id = "", review = {} }) => {
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
    // Chuyển đổi chuỗi timestamp thành đối tượng Date
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric", // Nếu bạn cần hiển thị cả giây
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
    <div className="bg-white text-black">
      <div className="py-6">
        <div className="flex gap-8 flex-wrap">
          <div className="flex justify-between items-center gap-10 w-full">
            {/* Rating Summary Section */}
            <div className="flex-none w-[280px]">
              <div className="flex flex-col items-center mb-6 bg-white p-5 rounded-lg shadow-sm">
                <div className="text-5xl font-bold text-black">
                  {rating.toFixed(1)}
                </div>
                <div className="mb-4">
                  <Rating
                    value={rating}
                    readOnly
                    cancel={false}
                    stars={5}
                  />
                </div>
                <div className="text-sm text-black">
                  {reviewCount} đánh giá
                </div>
              </div>
              {/* Rating Distribution */}
              {review?.stars && (
                <div className="mb-6">
                  {Object.entries(review.stars).reverse().map(([star, data]) => (
                    <div
                      key={star}
                      className="flex items-center gap-2 mb-2"
                    >
                      <div className="flex items-center gap-1 w-16">
                        {star} <i className="pi pi-star-fill text-yellow-400"></i>
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: `${data.percent}%` }}
                        />
                      </div>
                      <div className="w-8 text-sm text-gray-600">
                        {data.count}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Reviews Filter</h2>
              {/* Rating Filter Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">Rating</h3>
                </div>
                <div className="flex gap-6 flex-wrap">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
                        <Checkbox
                          inputId={`rating-${star}`}
                          checked={filters.rating[star]}
                          onChange={() => handleFilterChange("rating", star)}
                        />
                      </div>
                      <label
                        htmlFor={`rating-${star}`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <i className="pi pi-star-fill text-yellow-400"></i>
                        <span>{star}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Topics Filter Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">Topics</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(filters.topics).map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-2 p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
                        <Checkbox
                          inputId={`topic-${topic}`}
                          checked={filters.topics[topic]}
                          onChange={() => handleFilterChange("topics", topic)}
                        />
                      </div>
                      <label
                        htmlFor={`topic-${topic}`}
                        className="flex items-center gap-1 cursor-pointer text-gray-700 text-sm"
                      >
                        {topic}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List Section */}
          <div className="">
            <div className="space-y-6">
              {review?.data?.slice(first, first + rows).map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg p-6 border border-gray-200"
                >
                  <div className="mb-2">
                    <Rating
                      value={review?.rating}
                      readOnly
                      cancel={false}
                      stars={5}
                    />
                  </div>
                  <div className="font-semibold mb-1">{review?.title}</div>
                  <div className="text-sm text-gray-500 mb-4">
                    {formatDate(review?.timeline?.review_created_date)}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <Avatar
                      image={review?.created_by?.avatar_url}
                      shape="circle"
                      alt={review?.created_by?.full_name}
                    />
                    <span className="font-medium">{review?.created_by?.full_name}</span>
                  </div>

                  <div className="text-[15px] leading-relaxed mb-4 text-black">
                    {review?.content}
                  </div>

                  {review?.images && review?.images?.length > 0 && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {review?.images?.map((image) => (
                        <img
                          key={image?.id}
                          src={image?.full_path}
                          alt="Review"
                          className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  )}

                  {review?.comments && review?.comments?.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      {review?.comments?.map((comment) => (
                        <div key={comment?.id} className="flex gap-3">
                          <Avatar
                            image={comment?.avatar_url}
                            shape="circle"
                            alt={comment?.fullname}
                            className="w-9 h-9"
                          />
                          <div>
                            <div className="font-medium mb-1 text-black">
                              {comment?.fullname}
                            </div>
                            <div className="text-sm text-black">
                              {comment?.content}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatDate(comment?.create_at)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 mt-4">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                      <i className="pi pi-thumbs-up"></i> Hữu ích (
                      {review?.likes || 0})
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                      <i className="pi pi-flag"></i> Báo cáo
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={review?.data?.length}
                  onPageChange={onPageChange}
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;