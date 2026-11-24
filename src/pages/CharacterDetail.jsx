import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

function CharacterDetail() {
  const { id } = useParams();
  const { characters, loading } = useSelector(
    (state) => state.characters
  );

  const character = characters.find(
    (character) => character.id === Number(id)
  );

  if (loading) {
    return (
      <p className="text-center text-white mt-10">
        Loading character...
      </p>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-black text-white py-5">
        <div className="flex flex-col w-11/12 m-auto bg-gray-800 rounded-lg p-10 gap-10">
          <p>Character not found.</p>
          <Link
            to="/"
            className="inline-flex w-fit bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
          >
            Back to Characters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-5">
      <div className="flex flex-col w-11/12 m-auto bg-gray-800 rounded-lg p-10 gap-10">
        <div className="flex items-center justify-center w-full">
          <img
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            className="w-48 h-auto rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <h1 className="text-3xl font-bold">{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type || "Unknown"}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>

        <Link
          to="/"
          className="flex w-fit bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded font-semibold"
        >
          Back to Characters
        </Link>
      </div>
    </div>
  );
}

export default CharacterDetail;