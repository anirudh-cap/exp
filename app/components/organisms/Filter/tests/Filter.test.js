import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filter, { getPlaceHolderValue } from '../Filter';

describe('Filter Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Filter />);
    expect(container).toBeTruthy();
  });

  it('should render input fields, select dropdown, and a button', () => {
    const { getByPlaceholderText, getByText } = render(<Filter />);
    expect(getByPlaceholderText('Search by book name...')).toBeTruthy();
    expect(getByText('By Name')).toBeTruthy();
  });

  it('should call handleFilterValueChange with correct value when input field changes', () => {
    const handleFilterValueChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Filter handleFilterValueChange={handleFilterValueChangeMock} />,
    );
    fireEvent.change(getByPlaceholderText('Search by book name...'), {
      target: { value: 'New Value' },
    });
    expect(handleFilterValueChangeMock).toHaveBeenCalledWith('New Value');
  });

  it('should return "Search by book genre..." when selectedFilterBy is "BY_GENRE"', () => {
    const result = getPlaceHolderValue('BY_GENRE');
    expect(result).toEqual('Search by book genre...');
  });

  it('should return "Search by author name..." when selectedFilterBy is "BY_AUTHOR"', () => {
    const result = getPlaceHolderValue('BY_AUTHOR');
    expect(result).toEqual('Search by author name...');
  });

  it('should return "Search by book name..." when selectedFilterBy is "BY_NAME"', () => {
    const result = getPlaceHolderValue('BY_NAME');
    expect(result).toEqual('Search by book name...');
  });

  it('should return "Search by book name..." when selectedFilterBy is not recognized', () => {
    const result = getPlaceHolderValue('UNKNOWN_FILTER');
    expect(result).toEqual('Search by book name...');
  });
});
