
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
        <div className="my-5 bg-[#ff9ea4] p-5 ">
          <FlashSale />
        </div>
        <div>
          <h2 className="text-2xl bg-red-300 p-3 font-bold text-gray-700 text-center mb-4 rounded-tr-full rounded-br-full w-fit">
            Khám Phá Mua Sắm
          </h2>


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
