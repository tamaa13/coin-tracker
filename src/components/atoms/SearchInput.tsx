import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import useStore from "../../../store";
import { Loaders } from "./Loaders";
import { formatLength } from "../../../utils/helper/formatLength";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate()
  const { searchData, listData, loadingSearch } = useStore();
  const [searchValue, setSearchValue] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSlug = (el: any) => {
    navigate(`/${el.id}`)
    searchData("");
    setSearchValue("")
  }

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (searchValue) {
      const timeout = setTimeout(() => {
        searchData(searchValue);
      }, 1800);

      setDebounceTimeout(timeout);
    } else {
      searchData("");
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col h-[20px] mb-3 items-center drop-shadow-md">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-center">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            className="px-4 py-[6px] pr-12 border rounded-md border-neutral-700 focus:outline-none"
            placeholder="Search..."
          />
          <FiSearch className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4"
      >
        {loadingSearch ? (
          <div className="relative bg-white border border-black rounded-md">
            <Loaders />
          </div>
        ) : (
          <>
            {Array.isArray(listData) &&
              listData
                .slice(0, 3)
                .map((el: any) => (
                  <div key={el.id} onClick={() => handleSlug(el)} className="flex gap-3 p-4 mb-2 border rounded-md bg-slate-100 hover:cursor-pointer">
                    <img src={el.thumb} alt={el.name} />
                    <h3 className="font-semibold">{formatLength(el.name)}</h3>
                  </div>
                ))}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SearchInput;
