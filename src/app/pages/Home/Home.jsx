
import React from "react";

import Banner from './Partial/Banner';
import Branch from './Partial/Branch';
import FlashSale from "./Partial/FlashSale";
import Import from './Partial/Import';
import Like from './Partial/Like';
import MainCategory from "./Partial/MainCategory";
import CategoryLinks from './Partial/SmallCategory';
import TopDeal from './Partial/TopDeal';
import Trending from "./Partial/Trending";


export default function Home() {


  return (
    <div classNam=''>
      <div className=" mx-28" >
        <div className="mt-5">
          <Banner />
        </div>

        <div className="mt-5">
          <CategoryLinks />
        </div>
        <div className="mt-5">
          <TopDeal />
        </div>
        <div className="my-5 bg-red-200 p-5 ">
          <FlashSale />
        </div>
        <div>
          <div className='flex'>
            <div className='p-2 bg-red-300 rounded-bl-full '></div>
            <h2 className="text-2xl bg-red-300 p-3 font-bold border-b-4 border-red-400  text-gray-800 text-center mb-4 rounded-tr-full rounded-br-full">
            Khám Phá Mua Sắm
            </h2>
          </div>

          <div className="flex items-center">
            <div className=" w-1/5">
              <Branch />
            </div>
            <div className=" w-4/5">
              <MainCategory />
            </div>
          </div>
        </div>

        <div className="mt-5 ">
          <Import />
        </div>

        <div className="mt-5">
          <Like />
        </div>

        <div className="mt-5">
          <Trending />
        </div>
        {/* <div className="mt-5">
        <Product />
      </div> */}
      </div>
    </div>
  )
}
