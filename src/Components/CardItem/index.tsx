import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Listing } from "@/Utils/types";
import { nanoid } from "nanoid";
import Link from "next/link";

const CardItem: React.FC<{ totalSlides?: number; item: Listing }> = ({
  item,
}) => {
  return (
    <Link href={`/details/${item.info.id}`}>
      <div className="flex flex-col relative group cursor-pointer ">
        <button
          className="absolute top-5 right-5 z-10 cursor-pointer "
          onClick={() => alert("Add to Favorite..")}
        >
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: "block",
              fill: "rgba(0, 0, 0, 0.5)",
              height: "24px",
              width: "24px",
              stroke: "#fff",
              strokeWidth: 2,
              overflow: "visible",
            }}
          >
            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
          </svg>
        </button>
        <Carousel
          selectedItem={Math.floor(item.info.images.count / 2)}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          className=" rounded-lg overflow-hidden "
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                className="absolute z-50 bg-white p-2 rounded-full hidden group-hover:inline-block top-[50%] left-2 "
                onClick={onClickHandler}
                title={label}
              >
                <BiChevronLeft />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                className="absolute z-50 bg-white p-2 rounded-full hidden group-hover:inline-block top-[50%] right-2 "
                onClick={onClickHandler}
                title={label}
              >
                <BiChevronRight />
              </button>
            )
          }
        >
          {item.info.images.data.map((img, i) => (
            <Image
              key={"slider_image" + nanoid()}
              src={img.url}
              width={300}
              height={300}
              quality={70}
              alt={"image alt"}
              className="aspect-[2/2] object-cover  "
            />
          ))}
        </Carousel>
        <div className="my-2">
          <div className="city-name flex justify-between ">
            <p>
              {item.info.location.city +
                " , " +
                item.info.location.country.title}
            </p>
            <span className="flex items-center ">
              <AiFillStar /> {item.info.ratings.location}
            </span>
          </div>
          <div className="text-gray-400 text-sm leading-4 my-1.5 ">
            {item.info.title}
          </div>
          <div className="price">${item.info.price} Night</div>
        </div>
      </div>
    </Link>
  );
};

export default CardItem;
