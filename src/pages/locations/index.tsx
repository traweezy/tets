/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import FilterInput from '../../components/filter-input';
import LocationGroup from './components/location-group';
import Api from '../../services/api';
import Spinner from '../../components/spinner';

const api = new Api();

export const groupLocations = (locations: PickedRickAndMortyLocation[]) =>
  locations.reduce(
    (
      acc: Record<string, PickedRickAndMortyLocation[]>,
      location: PickedRickAndMortyLocation,
    ) => {
      const { type } = location;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(location);
      return acc;
    },
    {},
  );

enum LocationsState {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

const Locations = () => {
  const [data, setData] = useState<PickedRickAndMortyLocation[]>([]);
  const [componentState, setComponentState] = useState<LocationsState>(
    LocationsState.LOADING,
  );

  useEffect(() => {
    if (componentState === LocationsState.LOADING) {
      api
        .getLocations()
        .then(locations => {
          setData(locations);
          setComponentState(LocationsState.LOADED);
        })
        .catch(err => {
          setComponentState(LocationsState.ERROR);
          toast.error(err.message);
        });
    }
  }, []);

  const [filter, setFilter] = useState('');
  const [groupedLocations, setGroupedLocations] = useState<
    Record<string, PickedRickAndMortyLocation[]>
  >({});

  useEffect(() => {
    if (data) {
      const filteredLocations = data.filter(
        (location: PickedRickAndMortyLocation) =>
          location.name.toLowerCase().includes(filter.toLowerCase()),
      );
      setGroupedLocations(groupLocations(filteredLocations));
    }
  }, [filter, data]);

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto">
      <div className="pb-8">
        <div className="py-2 pb-2 text-3xl text-white">Locations</div>
        <div className="pb-6 text-sm text-gray-500">
          Search through various locations from rick and morty and learn about
          their residents!
        </div>
        <FilterInput
          onChangeCallback={setFilter}
          mode="dark"
          placeholder="Search locations..."
        />
      </div>
      {componentState === LocationsState.LOADING ? <Spinner /> : null}
      {componentState === LocationsState.LOADED ? (
        <div>
          <div className="overflow-y-auto">
            {Object.keys(groupedLocations)?.length
              ? Object.keys(groupedLocations).map(key => {
                  return (
                    <LocationGroup
                      key={key}
                      name={key}
                      locations={groupedLocations[key]}
                    />
                  );
                })
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Locations;
