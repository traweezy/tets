import { screen, cleanup, fireEvent, render } from '@testing-library/react';

import FilterInput from './index';

const filterInputTestId = 'filter-input';

describe('Given <FilterInput />', () => {
  afterEach(() => {
    cleanup();
  });

  describe('When rendered', () => {
    const mockOnChangeCallback = jest.fn();
    beforeEach(() => {
      render(
        <FilterInput
          onChangeCallback={mockOnChangeCallback}
          mode="dark"
          placeholder="Filter..."
        />,
      );
    });

    it('Should render the basic fields', () => {
      const filterInputEl = screen.getByTestId(filterInputTestId);

      expect(filterInputEl).toBeInTheDocument();
    });
  });

  describe("When input's onChange is fired", () => {
    const mockOnChangeCallback = jest.fn();
    beforeEach(() => {
      render(
        <FilterInput
          onChangeCallback={mockOnChangeCallback}
          mode="dark"
          placeholder="Filter..."
        />,
      );
    });

    it('Should call onChangeCallback prop', async () => {
      fireEvent.change(screen.getByTestId(filterInputTestId));
      expect(mockOnChangeCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('When input is dark mode', () => {
    const mockOnChangeCallback = jest.fn();
    beforeEach(() => {
      render(
        <FilterInput
          onChangeCallback={mockOnChangeCallback}
          mode="dark"
          placeholder="Filter..."
        />,
      );
    });

    it('Should have dark mode classes', async () => {
      const filterInputEl = screen.getByTestId(filterInputTestId);

      expect(filterInputEl).toHaveClass('bg-dark-gray text-white');
    });
  });

  describe('When input is light mode', () => {
    const mockOnChangeCallback = jest.fn();
    beforeEach(() => {
      render(
        <FilterInput
          onChangeCallback={mockOnChangeCallback}
          mode="light"
          placeholder="Filter..."
        />,
      );
    });

    it('Should have light mode classes', async () => {
      const filterInputEl = screen.getByTestId(filterInputTestId);

      expect(filterInputEl).toHaveClass('bg-gray-100 text-gray-800');
    });
  });
});
