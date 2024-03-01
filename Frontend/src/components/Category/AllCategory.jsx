import React from "react";
import { MdNavigateNext } from "react-icons/md";
import Carousel from "../Carousel/Carousel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// hard coded categories
const AllCategory = () => {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categorySlice);
  console.log(categories);

  const navgigateCatgeory = (id) => {
    navigate(`/category/${id}/all`);
  };

  return (
    <div className="mt-5 font-poppins px-5 md:px-0">
      <div className="flex justify-between items-center font-semibold text-xl">
        <h1>Explore By Category </h1>
        <div className="flex justify-center items-center cursor-pointer primary-color-darker-pink text-lg">
          <h1>See All </h1>
          <MdNavigateNext className="text-xl " />
        </div>
      </div>
      <Carousel>
        <div className=" flex gap-4">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className=" grid w-[13rem] h-[14rem] shadow-md border rounded-md cursor-pointer"
                style={{ gridTemplateRows: "10rem 1fr" }}
                onClick={() => {
                  navgigateCatgeory(category.id);
                }}
              >
                <img
                  src={category.imageUrl}
                  className=" w-full h-full object-contain p-2"
                />
                <h1 className=" text-center font-semibold">{category.name}</h1>
              </div>
            );
          })}
        </div>
      </Carousel>
    </div>
  );
};

export default AllCategory;