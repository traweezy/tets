/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../../services/api';
import ResidentGrid from './components/resident-grid';
import ResidentForm from './components/resident-form';

enum ResidentsState {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

const api = new Api();

const Residents = () => {
  const [data, setData] = useState<PickedCharacter[] | Character[]>([]);
  const [componentState, setComponentState] = useState<ResidentsState>(
    ResidentsState.LOADING,
  );

  useEffect(() => {
    if (componentState === ResidentsState.LOADING) {
      api
        .getCharacters()
        .then(characters => {
          setData(characters);
          setComponentState(ResidentsState.LOADED);
        })
        .catch(err => {
          setComponentState(ResidentsState.ERROR);
          toast.error(err.message);
        });
    }
  }, []);

  const location = useLocation();
  const [selectedResident, setSelectedResident] = useState<
    PickedCharacter | Character | null
  >(null);

  useEffect(() => {
    if (location && (data as unknown)) {
      const foundResident = (data as PickedCharacter[]).find(
        resident =>
          resident.id === parseInt(location.pathname.split('/')[4], 10),
      );
      setSelectedResident((foundResident as PickedCharacter) ?? null);
    }
  }, [location.pathname, data]);

  return (
    <Routes>
      <Route path="/" element={null} />
      <Route
        path="/location/:id"
        element={<ResidentGrid residents={data as PickedCharacter[]} />}
      />
      <Route
        path="/location/:id/resident/:residentId"
        element={<ResidentForm resident={selectedResident as Character} />}
      />
    </Routes>
  );
};

export default Residents;
