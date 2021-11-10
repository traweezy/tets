import { useLocation } from 'react-router-dom';
import LocationItem from './location-item';

interface LocationGroupProps {
  name: string;
  locations: PickedRickAndMortyLocation[];
}

const LocationGroup = ({ name, locations }: LocationGroupProps) => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="pb-4 location-group">
        <div className="pb-2">
          <span className="text-white text-md" data-testid="group-name">
            {name}
          </span>
          <span className="text-sm text-gray-500" data-testid="group-length">
            {' '}
            ({locations.length})
          </span>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          {locations.map(location => {
            const isActive =
              location.id === parseInt(pathname.split('/')[2], 10);
            return (
              <LocationItem
                data-testid="location-items"
                key={location.id}
                location={location}
                isActive={isActive}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LocationGroup;
