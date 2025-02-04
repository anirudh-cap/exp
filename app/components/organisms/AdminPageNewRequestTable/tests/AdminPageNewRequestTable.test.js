import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../../configureStore';
import initialState from '../../../../initialState';
import {AdminPageNewRequestTable} from '../AdminPageNewRequestTable';



const setup = props => {
  let store = configureStore(initialState, history);
  const finalProps = {
    className:"test",
    actions: {
      fetchUserNewRequestedBooks: jest.fn(),
      cancelUserNewRequestedBooks: jest.fn(),
      acceptNewBookRequest: jest.fn(),
    },
    bookRequestsData: { getBookRequests: [
      {
        book_name: 'test name',
        book_author: 'test author',
        email: 'bhavik@gmail.com',
        date: '2024-02-26T05:31:44.940Z',
        state: 'Pending',
        cancel_reason: '',
        data: {},
        _id: 'dD7eXcD80AHqw2bw'
      }], getLoading: true, getError: null, getCount: 0 },
    ...props,
  };
  return (
    <Provider store={store}>
      <AdminPageNewRequestTable {...finalProps} />
    </Provider>
  );
};

describe('BookList component', () => {
  test('checking if request table is present', () => {
    render(setup());
    const item = screen.getByRole('table')
    expect(item).toBeInTheDocument();
  });

  test('checking if row is present', () => {
    render(setup());
    const item = screen.getAllByRole('row')
    expect(item).toHaveLength(2);
  });

  test('checking row header ', () => {
    render(setup());
    const header = screen.getByRole('columnheader', {
      name: /user/i
    })
    expect(header).toBeInTheDocument();
    const title = screen.getByRole('columnheader', {
      name: /book title/i
    })
    expect(title).toBeInTheDocument();
    const author = screen.getByRole('columnheader', {
      name: /book author/i
    })
    expect(author).toBeInTheDocument();
    const date = screen.getByRole('columnheader', {
      name: /request date/i
    })
    expect(date).toBeInTheDocument();
  });

  test("checking data is present", () => {
    render(setup());
    const row = screen.getByRole('row', {
      name: /bhavik@gmail\.com/i
    });
    const email = within(row).getByRole('cell', {
      name: /bhavik@gmail\.com/i
    });
    expect(email).toBeInTheDocument();
    const title = within(row).getByRole('cell', {
      name: /test name/i
    });
    expect(title).toBeInTheDocument();
    const author = within(row).getByRole('cell', {
      name: /test author/i
    });
    expect(author).toBeInTheDocument();
  });

  test('checking if return date is present', () => {
    render(setup());
    const item= screen.getByRole('cell', {
      name: /2024\-02\-26/i
    })
    expect(item).toBeInTheDocument();
  });

  test('checking approve modal', () => {
    render(setup());
    const row = screen.getByRole('row', {
      name: /bhavik@gmail\.com/i
    });
    
    const approveButton = within(row).getByRole('button', {
      name: /approve/i
    });
    expect(approveButton).toBeInTheDocument();
    fireEvent.click(approveButton);
    const modalTitle = screen.getByText(/accept new request/i);
    expect(modalTitle).toBeInTheDocument();
    const document = screen.getByRole('document');

    const title = within(document).getByText(/title/i);
    const author = within(document).getByText(/author/i);
    const genre = within(document).getByText(/genre/i);
    const anticipated_date = within(document).getByText(/anticipated date/i);
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
    expect(anticipated_date).toBeInTheDocument();

    const inputItem = within(document).getAllByRole('textbox');
    expect(inputItem).toHaveLength(4);
    console.log(inputItem.toString())
    fireEvent.change(inputItem[0], { target: { value: 'test value' } });

    const approveModalButton = within(document).getByRole('button', {
      name: /approve/i
    });
    expect(approveModalButton).toBeInTheDocument();
    const closeModalButton = within(document).getAllByRole('button', {
      name: /close/i
    });
    expect(closeModalButton).toHaveLength(2);
    fireEvent.click(approveModalButton);

    fireEvent.click(approveButton);
    fireEvent.click(closeModalButton[0]);

  });

  test('checking cancel modal', () => {
    render(setup());
    const row = screen.getByRole('row', {
      name: /bhavik@gmail\.com/i
    });
    
    const rejectButton = within(row).getByRole('button', {
      name: /reject/i
    });
    expect(rejectButton).toBeInTheDocument();
    fireEvent.click(rejectButton);
    const modalTitle = screen.getByText(/reject request/i)
    expect(modalTitle).toBeInTheDocument();
    const title = screen.getByText(/reason/i);
    expect(title).toBeInTheDocument();
    const document = screen.getByRole('document');
    const rejectModalButton = within(document).getByRole('button', {
      name: /reject/i
    });
    expect(rejectModalButton).toBeInTheDocument();
    const closeModalButton = within(document).getAllByRole('button', {
      name: /close/i
    });
    expect(closeModalButton).toHaveLength(2);
    const inputItem = within(document).getByRole('textbox');
    fireEvent.change(inputItem, { target:{value: 'temp reason'}});
    fireEvent.click(rejectModalButton);

    fireEvent.click(rejectButton);
    fireEvent.click(closeModalButton[0]);
  });
});

