import { useEffect, useState, useRef } from "react";
import { dataSet } from "../constants";

export default function InputSection() {
  const [data, setData] = useState(dataSet || {});
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItem] = useState([]);
  const inputRef = useRef("");

  const handleInputChange = (value, e) => {
    e.preventDefault();
    setInputValue(Number(value));
    inputRef.current.value = "";
  };

  useEffect(() => {
    setData(dataSet);
  }, []);

  useEffect(() => {
    const maxItems = Math.min(inputValue, Object.keys(data).length);
    setListItem([]);
    const items = [];
    for (let index = 1; index <= maxItems; index++) {
      items.push(
        <li className="" key={index}>
          {data[`data${index}`]}
        </li>
      );
    }

    setListItem([...items]);
    // Make sure listItems is an array
  }, [inputValue, data]); // Added data to dependency array

  return (
    <div className="flex flex-col justify-center w-90 mx-auto h-full items-center px-10">
      {/* <ol className=" h-[70dvh]  flex flex-col gap-10  items-center overflow-y-auto text-white">{listItems}</ol> */}
      <ol className="h-[70vh] flex flex-col gap-10 items-center overflow-y-auto text-white">
        {listItems.map((item, index) => (
          <li className="" key={index}>
            {index + 1}.){item}
          </li>
        ))}
      </ol>

      <div className="w-full md:w-1/2 flex gap-4 absolute bottom-0 justify-center items-center px-3 mb-2">
        <input
          className="py-2 px-3 flex-1 border border-gray-500 rounded focus:outline-none focus:ring focus:ring-teal-300"
          type="number"
          min="0"
          ref={inputRef}
          max="9"
          placeholder="Enter Number Between  0-9"
          id="number-input"
          aria-label="Enter a number between 0 and 9"
        />
        <button
          type="button"
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
          onClick={(e) => handleInputChange(inputRef.current.value, e)}
          aria-label="Generate"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
