import React from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <form action="" className="flex items-center gap-2">
      <Search className="size-4" />
      <input
        type="text"
        placeholder="Search book name"
        className="bg-transparent outline-0 text-sm border-0"
      />
    </form>
  );
};

export default SearchBox;
