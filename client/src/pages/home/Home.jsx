import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {};

  return (
    <main>
      <div className="search-bar">
        <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => searchQuery(e.target.value)}
        />
        <button onClick={handleClick}>
          <FaSearch />
        </button>
      </div>
    </main>
  );
}

export default Home;
