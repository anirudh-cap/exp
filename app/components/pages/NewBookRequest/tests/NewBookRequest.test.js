import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../../configureStore';
import initialState from '../../../../initialState';
import { NewBookRequest } from '../NewBookRequest';

const setup = props => {
  let store = configureStore(initialState, history);
  const finalProps = {
    className: 'test',
    actions: {
      fetchAllBookRequestsRequest: jest.fn(),
      removeError: jest.fn(),
      addNewBookRequestRequest: jest.fn(),
    },
    bookRequestsData: {
      getBookRequests: [
        {
          book_name: 'test2',
          book_author: 'test2',
          email: 'bhavik@gmail.com',
          date: '2024-02-26T05:31:44.940Z',
          state: 'Pending',
          cancel_reason: '',
          data: {},
          _id: 'dD7eXcD80AHqw2bw',
        },
      ],
      getLoading: true,
      getError: null,
      getTotalCount: 0,
    },
    ...props,
  };
  return (
    <Provider store={store}>
      <NewBookRequest {...finalProps} />
    </Provider>
  );
};
describe('NewBookRequest component', () => {
  test('renders NewBookRequest component', () => {
    render(setup());
    const title = screen.getByText('Books Requested');

    const button = screen.getByRole('button', { name: /create request/i });
    const searchField = screen.getByPlaceholderText('Search');
    const filter = screen.getByRole('combobox');
    fireEvent.click(filter);

    fireEvent.change(searchField, { target: { value: 'test2' } });
    expect(searchField).toHaveValue('test2');

    const table = screen.getByRole('table');

    const header1 = screen.getByRole('columnheader', {
      name: /user email/i,
    });

    const header2 = screen.getByRole('columnheader', {
      name: /book name/i,
    });

    const header3 = screen.getByRole('columnheader', {
      name: /book author/i,
    });

    const header4 = screen.getByRole('columnheader', {
      name: /request-date/i,
    });

    const header5 = screen.getByRole('columnheader', {
      name: /state/i,
    });

    const cell1 = screen.getByRole('cell', {
      name: /bhavik@gmail\.com/i,
    });

    const cell2 = screen.getAllByRole('cell', {
      name: /test2/i,
    });

    const cell3 = screen.getByRole('cell', {
      name: /pending/i,
    });

    const dataRow = screen.getAllByRole('row');
    fireEvent.click(button);
    const doc = screen.getByRole('document');
    const bookInput = within(doc).getByPlaceholderText('Enter Book Name');
    const authorInput = within(doc).getByPlaceholderText('Enter Author Name');
    const submitButton = within(doc).getByRole('button', { name: /submit/i });
    const cancelButton = within(doc).getByRole('button', { name: /cancel/i });

    expect(button).toBeInTheDocument();

    expect(title).toBeInTheDocument();
    expect(searchField).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    expect(header3).toBeInTheDocument();
    expect(header4).toBeInTheDocument();
    expect(header5).toBeInTheDocument();
    expect(cell1).toBeInTheDocument();
    expect(cell2).toHaveLength(2);
    expect(cell3).toBeInTheDocument();
    expect(dataRow).toHaveLength(2);
    expect(bookInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.change(bookInput, { target: { value: 'test3' } });
    expect(bookInput).toHaveValue('test3');
    fireEvent.change(authorInput, { target: { value: 'test3' } });
    expect(authorInput).toHaveValue('test3');

    fireEvent.change(bookInput, { target: { value: 'test3' } });
    fireEvent.change(authorInput, { target: { value: 'test3' } });
    expect(bookInput).toHaveValue('test3');
    expect(authorInput).toHaveValue('test3');
    fireEvent.click(submitButton);

    fireEvent.click(button);

    fireEvent.click(cancelButton);
  });

  test('renders NavBar component', () => {
    render(setup());
    const menu = screen.getByRole('menu');
    const menuItems = within(menu).getAllByRole('menuitem');
    expect(menuItems).toHaveLength(4);
  });

  test('Checking navigation', () => {
    render(setup());
    const menu = screen.getByRole('menu');
    const menuItems = within(menu).getAllByRole('menuitem');
  });
});
