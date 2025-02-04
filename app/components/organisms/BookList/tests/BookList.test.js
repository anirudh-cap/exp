import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import configureStore from '../../../../configureStore';
import initialState from '../../../../initialState';
import { BookList } from '../BookList';

const setup = props => {
  let store = configureStore(initialState, history);
  const finalProps = {
    ...props,
  };
  return (
    <Provider store={store}>
      <BookList {...finalProps} />
    </Provider>
  );
};

describe('BookList component', () => {
  test('renders BookList component', () => {
    render(setup());
    const table = screen.getByTestId('main-table');
    expect(table).toBeInTheDocument();
  });

  test('checks for get-book button', () => {
    render(
      setup({
        dataSource: [
          {
            book_id: 1,
            book_name: 'To Kill a Mockingbird',
            book_author: 'Harper Lee',
            book_genre: 'Fiction',
            total_count: 5,
            current_count: 3,
            request: [],
            _id: 'KNvIsmyJSvCxOCQm',
            borrowers: [
              {
                userId: '135',
                borrowedDate: '2024-02-23T10:29:10.971Z',
              },
            ],
          },
        ],
      }),
    );
    const getBookBtn = screen.getByText(/Get Book/i);
    expect(getBookBtn).toBeInTheDocument();
  });

  test('checks for reserve button', () => {
    render(
      setup({
        dataSource: [
          {
            book_id: 1,
            book_name: 'To Kill a Mockingbird',
            book_author: 'Harper Lee',
            book_genre: 'Fiction',
            total_count: 5,
            current_count: 0,
            request: [],
            _id: 'KNvIsmyJSvCxOCQm',
            borrowers: [
              {
                userId: '135',
                borrowedDate: '2024-02-23T10:29:10.971Z',
              },
            ],
          },
        ],
      }),
    );
    const reserveBtn = screen.getByText(/Reserve/i);
    expect(reserveBtn).toBeInTheDocument();
  });
});

test('testing local storage', () => {
  const setLocalStorage = (user_id, id) => {
    window.localStorage.setItem(user_id, id);
  };

  const mockId = 'userId';
  const mockJson = 'rkfbqk6lsMCBOVt5';
  setLocalStorage(mockId, mockJson);
  expect(localStorage.getItem(mockId)).toEqual(mockJson);

  const mockBooks = [
    {
      _id: '1',
      book_name: 'Book 1',
      book_author: 'Author 1',
      book_genre: 'Genre 1',
      current_count: 0,
      total_count: 5,
    },
  ];

  const mockActions = {
    reserveBook: jest.fn(),
  };

  const { rerender } = render(
    <BookList dataSource={mockBooks} actions={mockActions} />,
  );

  const reserveBookButton = screen.getByTestId('request-btn');
  expect(reserveBookButton).toBeInTheDocument();
  userEvent.click(reserveBookButton);

  expect(mockActions.reserveBook).toHaveBeenCalledWith({
    book_id: '1',
    user_id: 'rkfbqk6lsMCBOVt5',
  });

  rerender(
    <BookList
      dataSource={[
        {
          ...mockBooks[0],
          requests: [
            {
              userId: 'rkfbqk6lsMCBOVt5',
            },
          ],
        },
      ]}
      actions={mockActions}
    />,
  );
  expect(reserveBookButton).not.toBeInTheDocument();
  expect(mockActions.reserveBook).toHaveBeenCalledTimes(1);
});

test('Testing the get book functionality', () => {
  const setLocalStorage = (user_id, id) => {
    window.localStorage.setItem(user_id, id);
  };

  const mockId = 'userId';
  const mockJson = 'rkfbqk6lsMCBOVt5';
  setLocalStorage(mockId, mockJson);
  expect(localStorage.getItem(mockId)).toEqual(mockJson);
  const mockBooks = [
    {
      _id: '1',
      book_name: 'Book 1',
      book_author: 'Author 1',
      book_genre: 'Genre 1',
      current_count: 3,
      total_count: 5,
    },
  ];

  const mockActions = {
    issueBook: jest.fn(),
  };

  const { rerender } = render(
    <BookList dataSource={mockBooks} actions={mockActions} />,
  );

  const getBookButton = screen.getByRole('button', { name: /get book/i });
  fireEvent.click(getBookButton);

  expect(mockActions.issueBook).toHaveBeenCalledWith({
    book_id: '1',
    user_id: 'rkfbqk6lsMCBOVt5',
  });

  rerender(
    <BookList
      dataSource={[
        {
          ...(mockBooks[0].current_count = 2),
          borrowers: [
            {
              userId: 'rkfbqk6lsMCBOVt5',
            },
          ],
        },
      ]}
      actions={mockActions}
    />,
  );
  expect(getBookButton).not.toBeInTheDocument();
  expect(mockActions.issueBook).toHaveBeenCalledTimes(1);
  expect(mockBooks[0].current_count).toEqual(2);
});

test('checking onchange', () => {});
