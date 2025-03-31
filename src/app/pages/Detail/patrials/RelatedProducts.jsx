import React from "react";
import { RelatedProduct, RelatedSection } from "./customcss";
import { Rating } from "primereact/rating";

// Product data from the provided JSON
const product = {
  breadcrumb: [
    "Homepage",
    "Women",
    "Women's Shirts & Tops",
    "Long Sleeve Overshirt, Khaki, 6",
  ],
  brand: "John Lewis ANYDAY",
  title: "Long Sleeve Overshirt, Khaki, 6",
  originalPrice: "£40.00",
  currentPrice: "£28.00",
  soldCount: 1238,
  rating: 4,
  description:
    "Boba etiam ut bulla tea est potus dilectus singulari compositione saporum et textuum quaen in Taiwan orta 1980 ping sunt. Sidon veniet medicus boba tea permixtione tapiocae gemmis potum exquisitum saporibus et tactus experentia phenomenonvei.",
  colors: [
    { name: "Royal Brown", code: "#5A4632" },
    { name: "Light Gray", code: "#D9D9D9" },
    { name: "Blue", code: "#3B6B93" },
    { name: "Black", code: "#000000" },
  ],
  sizes: ["6", "8", "10", "14", "18", "20"],
  images: [
    "https://salt.tikicdn.com/cache/750x750/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg.webp", // Replace with actual paths
    "https://salt.tikicdn.com/cache/750x750/ts/product/34/c2/ac/a9e979d467a3cf01ef9f95015e52154a.jpg.webp",
    "https://salt.tikicdn.com/cache/750x750/ts/product/5a/a4/13/88c80e92eca3a3c4949c64ee20dbaaa1.jpg.webp",
    "https://salt.tikicdn.com/cache/750x750/ts/product/a9/2b/dd/3b00cc13c501476711d449d8d2a68936.jpg.webp",
    "https://salt.tikicdn.com/cache/750x750/ts/product/96/21/f8/336728a0682882fc7e731f3708e29bf7.jpg.webp",
  ],
  relatedProducts: [
    {
      brand: "Whistles",
      title: "Wide Leg Cropped Jeans, Dark Blue",
      price: "£26",
      rating: 4.2,
      soldCount: 1280,
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg.webp",
    },
    {
      brand: "John Lewis ANYDAY",
      title: "Long-Sleeve Utility Shirt, Navy, 8",
      price: "£28",
      rating: 4.8,
      soldCount: 1280,
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg.webp",
    },
    {
      brand: "John Lewis ANYDAY",
      title: "Stripe Curved Hem Shirt, Blue",
      price: "£32",
      rating: 4.5,
      soldCount: 1050,
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg.webp",
    },
    {
      brand: "John Lewis ANYDAY",
      title: "Denim Overshirt, Mid Wash",
      price: "£40",
      rating: 4.6,
      soldCount: 1260,
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg.webp",
    },
    {
      brand: "John Lewis",
      title: "Linen Blazer, Navy",
      price: "£79",
      rating: 4.8,
      soldCount: 1230,
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/ef/60/09/35bbe0001c2490cfba996527debfaa11.jpg.webp",
    },
  ],
};

function RelatedProducts() {
  return (
    <>
      <RelatedSection>
        <div className="header">
          <h2>Related Product</h2>
          <a href="#">View All</a>
        </div>

        <div className="products">
          {product.relatedProducts.map((item, index) => (
            <RelatedProduct key={index}>
              <img src={item.image} alt={item.title} />
              <span className="brand">{item.brand}</span>
              <div className="title">{item.title}</div>
              <div className="price">{item.price}</div>
              <div className="rating">
                <Rating value={item.rating} readOnly stars={5} cancel={false} />
                <span className="value">{item.rating}</span>
                <span className="count">({item.soldCount} Sold)</span>
              </div>
            </RelatedProduct>
          ))}
        </div>
      </RelatedSection>
      <RelatedSection>
        <div className="header">
          <h2>topdeal Product</h2>
          <a href="#">View All</a>
        </div>

        <div className="products">
          {product.relatedProducts.map((item, index) => (
            <RelatedProduct key={index}>
              <img src={item.image} alt={item.title} />
              <span className="brand">{item.brand}</span>
              <div className="title">{item.title}</div>
              <div className="price">{item.price}</div>
              <div className="rating">
                <Rating value={item.rating} readOnly stars={5} cancel={false} />
                <span className="value">{item.rating}</span>
                <span className="count">({item.soldCount} Sold)</span>
              </div>
            </RelatedProduct>
          ))}
        </div>
      </RelatedSection>
    </>
  );
}

export default RelatedProducts;
