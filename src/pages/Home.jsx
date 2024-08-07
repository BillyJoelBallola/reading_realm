import React from "react";
import CustomButton from "../components/CustomButton";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl overflow-hidden relative h-[82vh]">
      <img
        src="/bg-home.jpg"
        alt="home background"
        className="brightness-50 absolute h-full w-full z-10 object-cover object-center"
      />
      <div className="text-white absolute z-20 size-full flex flex-col justify-center items-center text-center gap-4 px-8 py-12">
        <h1 className="text-4xl lg:text-5xl">Happy Reading, Billy Joel</h1>
        <p className="w-full md:w-[65%] lg:w-[50%] text-sm md:text-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
          doloribus possimus quibusdam illum itaque ratione dignissimos
          consequatur dolorem? Nesciunt, porro.
        </p>
        <CustomButton
          handleOnClick={() => navigate("/books")}
          style={"mt-2 flex items-center w-fit"}
          type={"normal"}
        >
          Browse Books <ArrowUpRight className="size-4" />
        </CustomButton>
      </div>
    </div>
  );
};

export default Home;
