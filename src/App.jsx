import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { fetchCharacters } from "./redux/slices/charactersSlice.js";
import CharacterCard from "./components/CharacterCard.jsx";
import SearchInput from "./components/SearchInput.jsx";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { characters, loading, error } = useSelector(
    (state) => state.characters
  );

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const handleSearch = (name, status) => {
    const params = {};

    if (name) params.search = name;
    if (status) params.status = status;

    setSearchParams(params, { replace: true });
    dispatch(fetchCharacters({ name, status }));
  };

  return (
    <div className="min-h-screen bg-black text-white py-5">
      <div className="flex flex-col w-11/12 max-w-6xl m-auto bg-gray-800 rounded-lg p-10 gap-10">
        <p className="text-center text-4xl font-bold">Rick and Morty Characters</p>
        <SearchInput search={search} status={status} setSearch={handleSearch} />

        {loading ? (
          <p className="text-center text-gray-400">Loading characters...</p>
        ) : error ? (
          <p className="text-center text-gray-400">
            Karakter tidak ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {characters.map((character) => (
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