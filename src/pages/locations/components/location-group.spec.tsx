import { screen, cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LocationGroup from './location-group';

const groupNameTestId = 'group-name';
const groupLengthTestId = 'group-length';
const locationItemTestId = 'location-item';

describe('Given <LocationGroup />', () => {
  const mockName = 'test group name';
  const mockLocations: PickedRickAndMortyLocation[] = [
    {
      name: 'test location',
      id: 0,
      type: 'Planet',
    },
  ];
  afterEach(() => {
    cleanup();
  });

  describe('When rendered', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <LocationGroup locations={mockLocations} name={mockName} />
        </MemoryRouter>,
      );
    });

    it('Should display location group name', () => {
      const locationGroupEl = screen.getByTestId(groupNameTestId);

      expect(locationGroupEl).toHaveTextContent(mockName);
    });

    it('Should display location group length', () => {
      const locationGroupLengthEl = screen.getByTestId(groupLengthTestId);

      expect(locationGroupLengthEl).toHaveTextContent(
        mockLocations.length.toString(),
      );
    });

    it('Should render a location item component for each location', () => {
      const locationItemEl = screen.getAllByTestId(locationItemTestId);

      expect(locationItemEl).toHaveLength(mockLocations.length);
    });
  });
});
