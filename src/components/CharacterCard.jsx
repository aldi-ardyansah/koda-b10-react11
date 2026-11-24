import { Link } from "react-router";

function CharacterCard({id, name, image, status}) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden text-center">
      <Link to={`/character/${id}`}>
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-auto object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </Link>
      <p className="mt-4 text-lg font-semibold">{name}</p>
      <p className="mb-4 text-lg font-semibold">{status}</p>
    </div>
  );
}

export default CharacterCard;