import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResidentCard from './resident-card';
import FilterInput from '../../../components/filter-input';

interface ResidentsGridProps {
  residents: PickedCharacter[];
}

const ResidentssGrid = ({ residents }: ResidentsGridProps) => {
  const location = useLocation();
  const [filteredResidents, setFilteredResidents] = useState<PickedCharacter[]>(
    [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const locationId = location.pathname.replace('/location/', '');
    const newFilteredResidents = residents.filter(resident => {
      const splitUrl = (resident.location as RickAndMortyLocation).url.split(
        '/',
      );
      return (
        splitUrl[splitUrl.length - 1] === locationId &&
        resident.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
    setFilteredResidents(newFilteredResidents);
  }, [location.pathname, residents, filter]);

  return (
    <div className="bg-white rounded-lg h-100">
      <div className="p-2 pb-2 text-3xl text-black">Residents</div>
      <div className="px-2">
        <FilterInput
          data-testid="filter-input"
          onChangeCallback={setFilter}
          mode="light"
          placeholder="Search residents..."
        />
      </div>
      <div className="p-4 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {!filteredResidents.length ? (
          <p data-testid="no-residents">No residents...</p>
        ) : (
          filteredResidents.map(resident => (
            <ResidentCard resident={resident} key={resident.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ResidentssGrid;
