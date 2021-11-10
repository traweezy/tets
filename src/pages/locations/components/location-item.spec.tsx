import { screen, cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LocationItem from './location-item';

const locationItemTestId = 'location-item';

describe('Given <LocationItem />', () => {
  const mockLocation: PickedRickAndMortyLocation = {
    name: 'test location',
    id: 0,
    type: 'Planet',
  };
  afterEach(() => {
    cleanup();
  });

  describe('When rendered', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <LocationItem location={mockLocation} isActive />
        </MemoryRouter>,
      );
    });

    it('Should display location name', () => {
      const locationItemEl = screen.getByTestId(locationItemTestId);

      expect(locationItemEl).toHaveTextContent(mockLocation.name);
    });
  });

  describe('When location item is active', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <LocationItem location={mockLocation} isActive />
        </MemoryRouter>,
      );
    });

    it('Should have active classes', async () => {
      const locationItemEl = screen.getByTestId(locationItemTestId);

      expect(locationItemEl).toHaveClass(
        'bg-dark-gray text-white border-white',
      );
    });
  });

  describe('When location item is not active', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <LocationItem location={mockLocation} isActive={false} />
        </MemoryRouter>,
      );
    });

    it('Should have not have active classes', async () => {
      const locationItemEl = screen.getByTestId(locationItemTestId);

      expect(locationItemEl).toHaveClass('text-black bg-white');
    });
  });
});
