import { screen, cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ResidentCard from './resident-card';

const residentImageTestId = 'resident-image';
const residentNameTestId = 'resident-name';
const residentStatusTestId = 'resident-status';

describe('Given <ResidentCard />', () => {
  const mockResident: PickedCharacter = {
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
    },
    image: 'https://localhost:1081/image.png',
  };

  afterEach(() => {
    cleanup();
  });

  describe('When rendered', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <ResidentCard resident={mockResident} />
        </MemoryRouter>,
      );
    });

    it('Should render image of resident', () => {
      const residentImage = screen.getByTestId(residentImageTestId);
      expect(residentImage).toHaveProperty('src', mockResident.image);
    });

    it('Should display name of resident', () => {
      const residentName = screen.getByTestId(residentNameTestId);
      expect(residentName).toHaveTextContent(mockResident.name);
    });

    it('Should display status of resident', () => {
      const residentName = screen.getByTestId(residentStatusTestId);
      expect(residentName).toHaveTextContent(
        `${mockResident.status} - ${mockResident.species}`,
      );
    });
  });
});
