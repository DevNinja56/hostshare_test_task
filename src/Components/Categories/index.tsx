import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Categories: React.FC<{
  setSelectedCategory: (key: string) => void;
  selectedCategory: string;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const [list, setList] = useState<
    { id: string; title: string; type: string }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    axios
      .get<{ id: string; title: string; type: string }[]>(
        "/api/categories.json"
      )
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const scrollContainer = (scrollOffset: number) => {
    if (containerRef.current) {
      const newScrollLeft = containerRef.current.scrollLeft + scrollOffset;
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
      setScrollLeft(newScrollLeft);
    }
  };

  const handlePrevClick = () => {
    scrollContainer(-150);
  };

  const handleNextClick = () => {
    scrollContainer(150);
  };

  return (
    <div>
      <div className="container mx-auto relative my-5">
        <div
          className="flex overflow-x-auto gap-3 no-scrollbar px-7"
          ref={containerRef}
        >
          {list.map((item, i) => (
            <div
              className={`whitespace-nowrap p-3 rounded-md after:w-full after:absolute after:bottom-0 after:right-0 hover:after:bg-black after:h-0.5 cursor-pointer relative ${
                selectedCategory === item.id && "  after:bg-black   "
              }`}
              key={"Categories" + i}
              onClick={() => setSelectedCategory(item.id)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <button
          className="p-1 bg-white border shadow-md rounded-full absolute top-[50%] translate-y-[-50%] left-0 "
          onClick={handlePrevClick}
          disabled={scrollLeft === 0}
        >
          <BiChevronLeft />
        </button>
        <button
          className="p-1 bg-white border shadow-md rounded-full absolute top-[50%] translate-y-[-50%] right-0 "
          onClick={handleNextClick}
          disabled={
            containerRef.current?.scrollWidth ===
              scrollLeft + containerRef?.current?.clientWidth! ?? 0
          }
        >
          <BiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Categories;
