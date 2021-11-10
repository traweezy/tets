import { Link } from 'react-router-dom';

interface LocationItemProps {
  location: PickedRickAndMortyLocation;
  isActive: boolean;
}

const LocationItem = ({ location, isActive }: LocationItemProps) => {
  const { name, id } = location;

  const isActiveClasses = isActive
    ? 'bg-dark-gray text-white border-white'
    : 'text-black bg-white';

  return (
    <Link to={`/location/${id}`}>
      <div
        data-testid="location-item"
        className={`${isActiveClasses} flex items-center justify-center w-full p-4   border-2 rounded-lg cursor-pointer h-28 text-md transition duration-100 hover:bg-dark-gray hover:text-white hover:border-white ease-in-out`}
      >
        {name}
      </div>
    </Link>
  );
};

export default LocationItem;
