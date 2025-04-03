import React, { useEffect, useState } from 'react';
import { getData } from '../../../context/api';
import { TabView, TabPanel } from 'primereact/tabview';
import { Link } from 'react-router-dom';
import FormattedSold from '../FormattedSold';
import { Rating } from 'primereact/rating';

export default function Trending() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState({}); // Use an object to store items by category

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await getData("https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=36&version=home-persionalized");
                console.log(res);

                const data = res.data?.tabs || [];
                // Simplify the data
                const simplified = data.map(item => ({
                    name: item.title,  // Category name
                    image: item.icon,  // Category image
                    items: item.items || [],  // Products in the category
                }));

                setTrending(simplified);
            } catch (err) {
                console.error("Error fetching trending data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    return (
        <>
            <div className="sticky top-0 p-4">
                <TabView className="w-full flex flex-col justify-between">
                    {trending.map((category, index) => (
                        <TabPanel
                            key={index}
                            header={
                                <div className="flex items-center justify-center space-x-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="flex justify-between h-6 object-contain"
                                    />
                                    <span>{category.name}</span>
                                </div>
                            }
                        >
                            {/* Display products of this tab */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.items.map((product, idx) => {
                                    const isPriceEqual = product.original_price === product.price;
                                    return (
                                        <Link key={idx} to={`/detail/${product.id}`}>
                                            <div className="flex flex-col  p-4 rounded-lg shadow-lg">
                                                <img
                                                    src={product.thumbnail_url}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover mb-4 rounded-lg"
                                                />
                                                <div>
                                                    <h4 className="max-w-60 min-h-12 line-clamp-2 overflow-hidden text-ellipsis mb-2">
                                                        {product.name}
                                                    </h4>
                                                    <div className=" min-h-[25px]">
                                                        {/* Only show Original Price and Discount if they are different from the current price */}
                                                        {!isPriceEqual && product.original_price && product.original_price !== product.price && (
                                                            <span className="text-sm text-gray-500 line-through italic mb-2">
                                                                {product.original_price.toLocaleString()}đ
                                                            </span>
                                                        )}
                                                        {!isPriceEqual && product.discount_rate && (
                                                           <span
                                                           className={`ml-3 mb-2 rounded-sm ${product.discount_rate ? 'bg-[#ff424e] px-1 py-1 text-xs text-white' : 'bg-transparent px-0 py-0'}`}
                                                       >
                                                           {product.discount_rate ? `-${product.discount_rate}%` : ''}
                                                       </span>
                                                       
                                                        )}
                                                    </div>
                                                    {/* Current Price */}
                                                    <div className="text-xl font-bold text-[#ff424e]  my-2">
                                                        {product.price?.toLocaleString()}đ
                                                    </div>

                                                    {/* Display Sold Count */}
                                                    <div className="card flex justify-between">
                                                        <Rating value={product.rating_average} disabled cancel={false} />
                                                        <div className='text-sm text-gray-600'>Đã bán <FormattedSold sold={product.quantity_sold?.value} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </TabPanel>
                    ))}
                </TabView>
            </div>
        </>
    );
}
