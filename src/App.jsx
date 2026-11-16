import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import CharacterCard from "./components/CharacterCard.jsx";
import SearchInput from "./components/SearchInput.jsx";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = (value) => {
    if (value) {
      setSearchParams({ search: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white py-5">
      <div className="flex flex-col w-11/12 max-w-6xl m-auto bg-gray-800 rounded-lg p-10 gap-10">
        <p className="text-center text-4xl font-bold">Rick and Morty Characters</p>
        <SearchInput search={search} setSearch={handleSearch} />

        {loading ? (
          <p className="text-center text-gray-400">Loading characters...</p>
        ) : filteredCharacters.length === 0 ? (
          <p className="text-center text-gray-400">
            Karakter "{search}" tidak ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                name={character.name}
                image={character.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;