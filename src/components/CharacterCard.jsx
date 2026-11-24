function CharacterCard({name, image, status}) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden text-center">
      <img src={image} alt={name} className="w-full h-auto object-cover" />
      <p className="mt-4 text-lg font-semibold">{name}</p>
      <p className="mb-4 text-lg font-semibold">{status}</p>
    </div>
  );
}

export default CharacterCard;