import { screen, cleanup, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ResidentGrid from './resident-grid';

const filterInputTestId = 'filter-input';
const residentCardTestId = 'resident-card';
const noResidentsTestId = 'no-residents';

describe('Given <ResidentGrid />', () => {
  const mockResidents: PickedCharacter[] = [
    {
      id: 0,
      name: 'mock name',
      status: 'mock status',
      species: 'mock species',
      type: 'mock type',
      gender: 'mock gender',
      location: {
        id: 0,
        name: 'mock location',
        type: 'mock planet type',
        url: 'https://rickandmortyapi.com/api/location/0',
      },
      image: 'https://localhost:1081/image.png',
    },
    {
      id: 1,
      name: 'mock name',
      status: 'mock status',
      species: 'mock species',
      type: 'mock type',
      gender: 'mock gender',
      location: {
        id: 1,
        name: 'mock location 2',
        type: 'mock planet type',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      image: 'https://localhost:1081/image.png',
    },
  ];
  const mockLocation: any = {
    pathname: '/location/0',
  };

  afterEach(() => {
    cleanup();
  });

  describe('When rendered', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={[{ pathname: mockLocation.pathname }]}>
          <ResidentGrid residents={mockResidents} />
        </MemoryRouter>,
      );
    });

    it('Should render residents of given location', () => {
      const residentCards = screen.getAllByTestId(residentCardTestId);
      const locationId = mockLocation.pathname.replace('/location/', '');
      const filteredMockResidents = mockResidents.filter(resident => {
        const splitUrl = (resident.location as RickAndMortyLocation).url.split(
          '/',
        );
        return splitUrl[splitUrl.length - 1] === locationId;
      });
      expect(residentCards).toHaveLength(filteredMockResidents.length);
    });
  });

  describe('When user inputs a filter', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={[{ pathname: mockLocation.pathname }]}>
          <ResidentGrid residents={mockResidents} />
        </MemoryRouter>,
      );
    });

    it('Should render residents of given location and the value of the filter input', () => {
      const filterInputEl = screen.getByTestId(filterInputTestId);
      const mockFilter = 'mock name';
      fireEvent.change(filterInputEl, { target: { value: mockFilter } });

      const residentCardsEls = screen.getAllByTestId(residentCardTestId);
      const locationId = mockLocation.pathname.replace('/location/', '');
      const filteredMockResidents = mockResidents.filter(resident => {
        const splitUrl = (resident.location as RickAndMortyLocation).url.split(
          '/',
        );
        return (
          splitUrl[splitUrl.length - 1] === locationId &&
          resident.name.toLowerCase().includes(mockFilter.toLowerCase())
        );
      });
      expect(residentCardsEls).toHaveLength(filteredMockResidents.length);
    });
  });

  describe('When there are no residents for given locations', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/location/10' }]}>
          <ResidentGrid residents={mockResidents} />
        </MemoryRouter>,
      );
    });

    it('Should render "No residents..." message', () => {
      const noResidentEls = screen.getByTestId(noResidentsTestId);
      expect(noResidentEls).toBeInTheDocument();
    });
  });
});
