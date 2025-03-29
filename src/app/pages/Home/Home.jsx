
import React, { useState } from "react";

import Banner from './Partial/Banner';
import CategoryLinks from './Partial/SmallCategory';
import TopDeal from './Partial/TopDeal'
import Branch from './Partial/Branch'
import MainCategory from "./Partial/MainCategory";
import Import from './Partial/Import'
import Like from './Partial/Like'

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
          <MainCategory />
      </div>
      <div className="mt-5">
          <Branch />
      </div>
      <div className="mt-5">
          <Import />
      </div>
      <div className="mt-5">
          <Like />
      </div>
  </div>
    )
}
        