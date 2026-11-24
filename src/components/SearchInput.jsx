import { useState } from "react";

function SearchInput({search, status, setSearch}) {
  const [name, setName] = useState(search);
  const [characterStatus, setCharacterStatus] = useState(status);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(name, characterStatus);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        className="bg-amber-50 text-black p-2 rounded"
        type="text"
        placeholder="Search character by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="bg-amber-50 text-black p-2 rounded"
        value={characterStatus}
        onChange={(e) => setCharacterStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded font-semibold"
      >
        Search
      </button>
    </form>
  );
}

export default SearchInput;