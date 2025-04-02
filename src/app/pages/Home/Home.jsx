
import React, { useState } from "react";

import Banner from './Partial/Banner';
import CategoryLinks from './Partial/SmallCategory';
import TopDeal from './Partial/TopDeal'
import Branch from './Partial/Branch'
import MainCategory from "./Partial/MainCategory";
import Import from './Partial/Import'
import Like from './Partial/Like'
import Trending from "./Partial/Trending";
import FlashSale from "./Partial/FlashSale";

export default function Home() {


  return (
    <div className=" mx-10" >
      <div className="mt-5">
        <Banner />
      </div>

      <div className="mt-5">
        <CategoryLinks />
      </div>
      <div className="mt-5">
        <TopDeal />
      </div>
      <div className="mt-5">
        <FlashSale />
      </div>
      <div>
        <h2 className="text-2xl font-bold  mb-4">Khám phá mua sắm</h2>

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
  )
}
