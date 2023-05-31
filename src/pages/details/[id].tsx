import React, { useEffect, useState } from "react";
import { Listing } from "@/Utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai";
import Layout from "@/Utils/Layout";
import { GiConvergenceTarget } from "react-icons/gi";
import Image from "next/image";
import { DateRangePicker } from "react-date-range";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const Details = () => {
  const { query, isReady } = useRouter();
  const [data, setData] = useState<Listing>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [selectionRange, setSelectionRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };

  const handleDatePickerToggle = () => {
    setShowDatePicker((prev) => !prev);
  };

  const details = data?.info! ?? null;

  useEffect(() => {
    isReady &&
      axios
        .get("/api/listing.json")
        .then((res) =>
          setData(res.data.data.find((item: any) => item.info.id === query.id))
        )
        .catch((err) => console.log(err));
  }, [isReady]);

  return (
    <>
      {data && (
        <div>
          <PhotoProvider>
            <div className="container mx-auto">
              <div className="">
                <div className="px-4">
                  <div className="text-2xl text-black">{details.title}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 my-1 ">
                    <AiFillStar />
                    <span>{details.ratings.location} </span>
                    <span>{details.visibleReviewCount} reviews</span>
                    <span>
                      {!!details.host.isSuperhost && "Superhost"}{" "}
                      {details.location.city} , {details.location.country.title}
                    </span>
                  </div>
                </div>
                <div className="img-box flex ">
                  <div className="left w-1/2 px-1.5 py-1">
                    <PhotoView src={details.mainImage.url}>
                      <Image
                        width={600}
                        height={300}
                        alt={"main Image"}
                        src={details.mainImage.url}
                        className="w-full rounded-tl-2xl rounded-bl-2xl aspect-[6/3.1] object-cover "
                      />
                    </PhotoView>
                  </div>
                  <div className="right w-1/2 flex flex-wrap ">
                    {details.images.data.map((image, i) => (
                      <div className={`w-1/2 p-1  ${i > 3 && "hidden"}`}>
                        <PhotoView src={image.url}>
                          <Image
                            width={300}
                            height={150}
                            alt="image"
                            src={image.url}
                            className={`${
                              (i === 1 && "rounded-tr-2xl") ||
                              (i === 3 && "rounded-br-2xl")
                            } aspect-[6/3] object-cover w-full `}
                          />
                        </PhotoView>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-around ">
                <div className="left w-[65%] px-3">
                  <div className="flex justify-between py-3">
                    <div className="">
                      <div className="text-2xl font-bold">
                        Entire condo hosted by {details.host.name}
                      </div>
                      <div className="text-md text-gray-400 font-light capitalize">
                        {details.details.data.map(
                          (item) => `${item.value} ${item.type} `
                        )}
                      </div>
                    </div>
                    <div className="img">
                      <img
                        src={details.host.avatar.url}
                        className="w-[60px] h-[60px] object-cover rounded-full "
                      />
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div className="description">
                    <div className="flex gap-5 items-center">
                      <div className="icon">
                        <GiConvergenceTarget className="text-2xl" />
                      </div>
                      <div className="">
                        <div className="text-lg text-black ">Self check-in</div>
                        <div className="text-md text-gray-400 font-regular ">
                          You can check in with the doorman.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <div className="icon">
                        <GiConvergenceTarget className="text-2xl" />
                      </div>
                      <div className="">
                        <div className="text-lg text-black ">
                          Abdullah is a Superhost
                        </div>
                        <div className="text-md text-gray-400 font-regular ">
                          Superhosts are experienced, highly rated hosts who are
                          committed to providing great stays for guests.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <div className="icon">
                        <GiConvergenceTarget className="text-2xl" />
                      </div>
                      <div className="">
                        <div className="text-lg text-black ">Park for free</div>
                        <div className="text-md text-gray-400 font-regular ">
                          This is one of the few places in the area with free
                          parking.
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div className="desc">
                    <span>{details.description}</span>
                  </div>
                  <hr className="my-5" />
                  <div className="offer">
                    <div className="text-3xl my-4 text-black ">
                      What this place offers
                    </div>

                    <div className="flex flex-wrap">
                      {details.amenities.data.map((amenitie) => (
                        <div className="w-1/2 flex gap-4 text-xl ">
                          <span>
                            <GiConvergenceTarget className="text-2xl" />
                          </span>
                          <span>
                            {amenitie.available ? (
                              amenitie.title
                            ) : (
                              <del className=" list-none ">
                                {amenitie.title}
                              </del>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className="my-5" />
                </div>
                <div className="w-[30%]  pt-8">
                  <div className="w-5/6 ml-auto  p-3 bg-white border rounded-xl sticky top-[80px] ">
                    <div className="flex items-center gap-1 ">
                      <span className="flex items-center">
                        <span className="text-xl">${details.price}</span> night
                      </span>
                      <AiFillStar />
                      <span>{details.ratings.checkin}</span>
                      <span>{details.visibleReviewCount} reviews</span>
                    </div>
                    <div className="buttons-container mt-5">
                      <div className="flex">
                        <div
                          className={`w-[50%] border rounded-tl-md p-3 cursor-pointer select-none`}
                          onClick={handleDatePickerToggle}
                        >
                          <p>Check in</p>
                          <p className="font-normal text-[#a0a0a0]">
                            {selectionRange.startDate
                              ? new Date(
                                  selectionRange?.startDate
                                )?.toLocaleDateString()
                              : "Add dates"}
                          </p>
                        </div>

                        <div
                          className={`w-[50%] border border-l-0 rounded-tr-md p-3 cursor-pointer select-none`}
                          onClick={handleDatePickerToggle}
                        >
                          <p>Check out</p>
                          <p className="font-normal text-[#a0a0a0]">
                            {selectionRange.endDate
                              ? new Date(
                                  selectionRange?.endDate
                                )?.toLocaleDateString()
                              : "Add dates"}
                          </p>
                        </div>
                      </div>
                      {showDatePicker && (
                        <div className="absolute right-[105%] top-0 border rounded-xl overflow-hidden">
                          <DateRangePicker
                            minDate={new Date()}
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            showPreview={false}
                            showDateDisplay={false}
                          />
                        </div>
                      )}

                      <div className="">
                        <label
                          htmlFor="guests"
                          className="w-full border border-t-0 rounded-bl-md rounded-br-md p-3 cursor-pointer block"
                        >
                          <p>Guests</p>
                          <select
                            id="guests"
                            className="w-full p-3 focus:outline-none "
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </label>
                      </div>
                      <div className="my-4">
                        <button className="bg-primary py-3 px-6 w-full text-center text-white rounded-md">
                          Check Availability
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PhotoProvider>
        </div>
      )}
    </>
  );
};

Details.Layout = Layout;

export default Details;
