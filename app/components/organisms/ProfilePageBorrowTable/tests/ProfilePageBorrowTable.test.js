// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import ProfilePageBorrowTable from '../ProfilePageBorrowTable';

// describe('User Profile borrowed book', () => {
//   test('should render the components', () => {
//     render(<ProfilePageBorrowTable />);

//     const linkElement = screen.getByText(/Book Title/);
//     expect(linkElement).toBeInTheDocument();

//     const capTable = screen.findByRole('columnheader', {
//       name: /Book Author/i
//     })
    
//     expect(capTable).toBeInTheDocument();
//   });
 
// });

import React from 'react';
import { render, screen,within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../configureStore';
import initialState from '../../../../initialState';
import ProfilePageBorrowTable from '../ProfilePageBorrowTable';
import moment from 'moment';
describe('Profile borrowed component', () => {
  test('renders Profile borrowed component', () => {
    render(setup());
    const columnheader = screen.getByRole('columnheader', {
      name: /book author/i
    });
    
    within(columnheader).getByText(/book author/i);
    screen.debug();

  });
});

const setup = props => {
  let store = configureStore(initialState, history);
  const finalProps = {
    className:"test",
    actions: {
      FETCH_USER_BORROWED_BOOKS: jest.fn(),
      RETURN_USER_BORROWED_BOOKS: jest.fn(),
    },
    bookBorrowedData: { getBookRequests: [
      {
        book_name: 'test2',
        book_id: '4',
        book_author: 'test2',
        book_genre: 'Self-Help',
        request_date: '2024-02-26T05:31:44.940Z',
        due_date: moment('2024-02-26T05:31:44.940Z').add('days',7).format('YYYY-MM-DD'),
        _id: 'dD7eXcD80AHqw2bw'
        
      }], getLoading: true, getError: null, getCount: 0 },
    ...props,
  };
  return (
    <Provider store={store}>
      <ProfilePageBorrowTable {...finalProps} />
    </Provider>
  );
};