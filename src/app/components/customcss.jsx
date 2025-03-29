import { BreadCrumb } from "primereact/breadcrumb";
import styled from "styled-components";
// import Link from 'next/link';

// BreadCrumb Components
export const StyledBreadCrumb = styled(BreadCrumb)`
  &.p-breadcrumb {
    background: transparent;
    border: none;
    padding: 0.5rem 1rem;
    margin-bottom: 8px;
  }

  .p-breadcrumb-home {
    font-size: 14px;
  }

  .p-menuitem-text {
    color: #000;
    font-size: 14px;
  }

  .p-menuitem-link:hover .p-menuitem-text {
    text-decoration: underline;
  }

  .p-breadcrumb-chevron {
    margin: 0 0.5rem;
    color: #999;
  }
`;

// export const BreadCrumbCommon = () => {
//   const items = [
//     { label: "Homepage", url: "#" },
//     { label: "Women", url: "#" },
//     { label: "Women's Shirts & Tops", url: "#" },
//     { label: "Long Sleeve Overshirt, Khaki, 6" },
//   ];

//   const home = { icon: "pi pi-home", url: "#" };

//   return <StyledBreadCrumb model={items} home={home} />;
// };

// Product Detail Components
export const Breadcrumb = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  align-items: center;

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #777;
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  padding: 16px;
  gap: 24px;
  margin-bottom: 40px;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  position: relative;
  max-width: 500px;

  .main-image {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    object-fit: contain;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .action-buttons {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      background: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;

      i {
        color: #666;
        font-size: 16px;
      }

      &:hover {
        background: #f5f5f5;
        transform: translateY(-2px);
      }
    }
  }

  .thumbnails {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
    scrollbar-color: #ddd transparent;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 6px;
    }

    img {
      width: 72px;
      height: 72px;
      border-radius: 8px;
      cursor: pointer;
      object-fit: cover;
      border: 2px solid transparent;
      transition: all 0.2s;

      &.selected {
        border-color: #ee4d2d;
      }

      &:hover {
        opacity: 0.8;
        transform: translateY(-2px);
      }
    }
  }

  .navigation {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    padding: 0 8px;

    button {
      background: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      transition: all 0.2s;

      i {
        color: #666;
      }

      &:hover {
        background: #f5f5f5;
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

export const DetailsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Brand = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 5px;

  b {
    color: #333;
    font-weight: 500;
  }
`;

export const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
  line-height: 1.4;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  .original-price {
    font-size: 16px;
    color: #999;
    text-decoration: line-through;
    margin-bottom: 4px;
  }

  .current-price {
    font-size: 28px;
    font-weight: 600;
    color: #ee4d2d;
  }
`;

export const SoldRating = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;

  .sold {
    display: flex;
    align-items: center;
  }

  .rating {
    display: flex;
    align-items: center;

    .p-rating {
      .p-rating-item {
        .p-rating-icon {
          color: #f7a928;
          font-size: 16px;
        }

        &.p-rating-item-active .p-rating-icon {
          color: #f7a928;
        }
      }
    }

    .rating-value {
      margin-left: 4px;
      font-weight: 500;
      color: #333;
    }
  }
`;

export const Description = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }

  p {
    font-size: 15px;
    color: #333;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  ul {
    padding-left: 20px;
    margin: 12px 0;
  }

  li {
    margin-bottom: 8px;
    line-height: 1.5;
  }

  strong {
    font-weight: 600;
    color: #222;
  }

  .see-more {
    color: #2962ff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
    margin-top: 8px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Style for specifications list
export const SpecificationList = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 15px;
  }

  .spec-name {
    font-weight: 500;
    min-width: 200px;
    color: #666;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 0 1px #eee;
  }

  td {
    padding: 12px 16px;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }
`;

// Style for quantity selector
export const QuantitySelector = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    width: fit-content;
    border: 1px solid #e0e0e0;
  }

  button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #333;
    transition: all 0.2s;

    &:hover {
      background: #e0e0e0;
    }

    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    min-width: 48px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: white;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
  }
`;

// Style for benefits
export const BenefitSection = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;

    img {
      height: 20px;
      width: auto;
    }

    span {
      color: #333;

      b {
        font-weight: 600;
        color: #ee4d2d;
      }
    }
  }
`;

export const ColorSection = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #333;
    display: flex;
    align-items: center;

    span {
      margin-left: 8px;
      font-weight: normal;
    }
  }

  .color-options {
    display: flex;
    gap: 8px;

    button {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #ddd;
      cursor: pointer;
      position: relative;
      padding: 0;

      &.selected {
        border: 2px solid #333;
      }
    }
  }
`;

export const SizeSection = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #333;
    display: flex;
    align-items: center;

    span {
      margin-left: 8px;
      font-weight: normal;
    }

    a {
      margin-left: auto;
      font-size: 14px;
      font-weight: normal;
      color: #333;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .size-options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    button {
      min-width: 40px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #333;

      &.selected {
        border: 2px solid #333;
        font-weight: 600;
      }

      &:hover:not(.selected) {
        border-color: #999;
      }
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  .p-button {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .add-to-cart {
    background-color: #ff3945;
    border-color: #ff3945;
    color: white;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: #e52c37;
      border-color: #e52c37;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(229, 44, 55, 0.2);
    }

    .p-button-icon {
      font-size: 18px;
      margin-right: 8px;
    }
  }

  .checkout-now {
    border-color: #ff3945;
    color: #ff3945;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: rgba(255, 57, 69, 0.08);
      transform: translateY(-2px);
    }

    .p-button-icon {
      font-size: 18px;
      margin-right: 8px;
    }
  }
`;

export const DeliveryInfo = styled.div`
  font-size: 14px;
  color: #666;

  .link {
    color: #333;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  i {
    color: #666;
    margin-right: 8px;
  }
`;

export const RelatedSection = styled.div`
  padding: 0 16px 40px;
  max-width: 1200px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      color: #333;
    }

    a {
      font-size: 14px;
      color: #333;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .products {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
`;

export const RelatedProduct = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .brand {
    font-size: 14px;
    color: #666;
  }

  .title {
    font-size: 14px;
    color: #333;
    margin: 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;

    .value {
      font-size: 12px;
      color: #666;
    }

    .count {
      font-size: 12px;
      color: #999;
    }
  }
`;

// Product Reviews Components
export const ReviewsContainer = styled.div`
  padding: 0 16px 40px;
  max-width: 1200px;
  border-top: 1px solid #eee;
  padding-top: 24px;
`;

export const ReviewsHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #333;
`;

export const ReviewsContent = styled.div`
  display: flex;
  gap: 24px;
`;

export const ReviewsStats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  width: 240px;
  height: max-content;
`;

export const RatingSummary = styled.div`
  position: relative;
  margin-bottom: 24px;

  .rating-circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid #f7a928;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin: 0 auto 8px;
  }

  .reviews-count {
    font-size: 12px;
    color: #666;
    text-align: center;
  }
`;

export const RatingBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .stars {
    width: 40px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    color: #f7a928;
  }

  .bar-container {
    flex: 1;
    height: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background-color: #333;
    border-radius: 4px;
  }

  .count {
    width: 40px;
    font-size: 12px;
    color: #666;
  }
`;

export const FilterSection = styled.div`
  margin-top: 24px;
  border-top: 1px solid #eee;
  padding-top: 16px;
`;

export const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;

  i {
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }
`;

export const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;

  .checkbox-wrapper {
    display: flex;
    align-items: center;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .p-checkbox {
    margin-right: 0;
  }

  .p-checkbox-box {
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 3px;

    &.p-highlight {
      border-color: #333;
      background: #333;
    }
  }

  .p-checkbox-icon {
    font-size: 10px;
  }
`;

export const ReviewsList = styled.div`
  flex: 1;
`;

export const ReviewsFilter = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const FilterButton = styled.button`
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 6px 16px;
  background: ${(props) => (props.active ? "#333" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.active ? "#222" : "#f5f5f5")};
  }
`;

export const ReviewCard = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #eee;

  .review-rating {
    display: flex;
    margin-bottom: 8px;
  }

  .review-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #333;
  }

  .review-date {
    font-size: 12px;
    color: #666;
    margin-bottom: 16px;
  }

  .review-author {
    display: flex;
    margin-bottom: 16px;
    align-items: center;
    gap: 8px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
  }

  .review-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    button {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: #666;
      font-size: 14px;

      i {
        font-size: 16px;
      }

      &:hover {
        color: #333;
      }
    }
  }
`;

export const PaginationControls = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;

  .p-paginator {
    background: transparent;
    border: none;
  }

  .p-paginator-page,
  .p-paginator-first,
  .p-paginator-prev,
  .p-paginator-next,
  .p-paginator-last {
    border-radius: 4px;
    width: 32px;
    height: 32px;
    margin: 0 4px;

    &.p-highlight {
      background: #333;
      color: white;
    }
  }
`;
