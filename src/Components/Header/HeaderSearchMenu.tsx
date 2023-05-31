import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import HeaderDropdowMenu from "./HeaderDropdowMenu";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

const locations = [
  "Terlingua",
  "Telluride",
  "Perryville",
  "Hardwick",
  "Los Angeles",
  "East Point",
  "Hurricane",
  "Kerhonkson",
  "Maryville",
  "West Farmington",
  "Grandview",
  "Lake Arrowhead",
  "Putney",
  "Greentown",
  "La Grange",
  "China Grove",
  "Joshua Tree",
  "Miami",
];
const wholist = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

const HeaderSeachMenu: React.FC<{ onClickSearch: () => void }> = ({
  onClickSearch,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationsToShow, setLocationsToShow] = useState(locations);

  const [selectedGuest, setSelectedGuest] = useState("");
  const [selectedGuestsToShow, setSelectedGuestsToShow] = useState(wholist);
  const router = useRouter();

  const [selectionRange, setSelectionRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  // Functions
  // Handle location input change
  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
    setLocationsToShow(
      [...locations].filter((item) =>
        item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      )
    );
  };

  const handleGuestChange = (e: any) => {
    setSelectedGuest(e.target.value);
    setSelectedGuestsToShow(
      [...wholist].filter((item) =>
        item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      )
    );
  };
  const handleSearch = () => {
    onClickSearch();
    if (!!selectedLocation) {
      router.push({ pathname: "/search", query: { city: selectedLocation } });
    } else {
      router.push({ pathname: "/search" });
    }
  };
  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };

  return (
    <div>
      <div>
        <div className="flex flex-row justify-center items-center gap-8 text-lg font-extralight">
          <div className="border-b-2 border-transparent hover:border-[#0000003d] cursor-pointer transition-all duration-700 ease-in-out">
            Stays
          </div>
          <div className="border-b-2 border-transparent hover:border-[#0000003d] cursor-pointer transition-all duration-700 ease-in-out">
            Experiences
          </div>
          <div className="border-b-2 border-transparent hover:border-[#0000003d] cursor-pointer transition-all duration-700 ease-in-out">
            Online Experiences
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div
          className={`bg-[#ebebeb] flex flex-row justify-center items-center text-base font-semibold rounded-[5rem] border relative`}
        >
          <div
            className={`px-5 py-2 rounded-[3rem] cursor-pointer hover:bg-[#08080817] ${
              selectedOption === "where" && "bg-white"
            }`}
            onClick={() => {
              setSelectedOption("where");
            }}
          >
            <p>Where</p>
            <input
              className="focus-visible:outline-none bg-transparent"
              type="text"
              placeholder="Search destinations"
              onChange={handleLocationChange}
              value={selectedLocation}
            />
          </div>

          <div
            className={`px-5 py-2 rounded-[3rem] cursor-pointer hover:bg-[#08080817] transition-all duration-700 ease-in-out ${
              selectedOption === "check in" && "bg-white"
            }`}
            onClick={() => {
              setSelectedOption("check in");
            }}
          >
            <p>Check in</p>
            <p className="font-normal text-[#a0a0a0]">
              {selectionRange.startDate
                ? new Date(selectionRange?.startDate)?.toDateString()
                : "Add dates"}
            </p>
          </div>

          <div
            className={`px-5 py-2 rounded-[3rem] cursor-pointer hover:bg-[#08080817] transition-all duration-700 ease-in-out ${
              selectedOption === "check out" && "bg-white"
            }`}
            onClick={() => {
              setSelectedOption("check out");
            }}
          >
            <p>Check out</p>
            <p className="font-normal text-[#a0a0a0]">
              {selectionRange.endDate
                ? new Date(selectionRange?.endDate)?.toDateString()
                : "Add dates"}
            </p>
          </div>

          <div
            className={`px-5 py-2 rounded-[3rem] cursor-pointer hover:bg-[#08080817] transition-all duration-700 ease-in-out flex justify-between items-center gap-[10px] pr-[10px] ${
              selectedOption === "who" && "bg-white"
            }`}
          >
            <div
              className=""
              onClick={() => {
                setSelectedOption("who");
              }}
            >
              <p>Who</p>
              <input
                className="focus-visible:outline-none bg-transparent max-w-[100px]"
                type="text"
                placeholder="Add Guests"
                onChange={handleGuestChange}
                value={selectedGuest}
              />
            </div>

            <button
              className="flex justify-center items-center bg-primary p-[10px] rounded-[5rem] gap-3 text-[#ffffff]"
              onClick={handleSearch}
            >
              {" "}
              <FaSearch /> Search
            </button>
          </div>

          {/* // Body of me */}
          <div className="">
            {selectedOption !== "" && (
              <div className="absolute top-[125%] left-0 bg-transparent max-h-[500px] overflow-auto rounded-3xl border">
                <div className="bg-white rounded-3xl p-3">
                  {selectedOption === "where" && (
                    <HeaderDropdowMenu
                      data={locationsToShow}
                      dataSetter={setSelectedLocation}
                    />
                  )}

                  {(selectedOption === "check in" ||
                    selectedOption === "check out") && (
                    <div className="">
                      <DateRangePicker
                        minDate={new Date()}
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        showPreview={false}
                        showDateDisplay={false}
                      />
                    </div>
                  )}

                  {selectedOption === "who" && (
                    <HeaderDropdowMenu
                      data={selectedGuestsToShow}
                      dataSetter={setSelectedGuest}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* // */}
        </div>
      </div>
    </div>
  );
};

export default HeaderSeachMenu;
