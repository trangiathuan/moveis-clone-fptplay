import React, { useState } from 'react'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        alert(`Tìm kiếm: ${searchTerm}`);
    };
    return (
        <div className=" bg-white ">
            <div className="  items-center">
                <input
                    type="text"
                    className="p-2 border rounded w-72"
                    placeholder="Nhập từ khóa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="bg-orange-600 text-white  rounded"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </button>
            </div>

        </div>
    )
}

export default Search;
