import { fromJS } from 'immutable';
import * as types from './constant';

export const initialState = fromJS({
  allBookList: [],
  totalBooks: 0,
  isLoading: false,
  error: null,
});

const bookListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_BOOKLIST_SUCCESS:
      return state
        .set('allBookList', action.result.result)
        .set('totalBooks', action.result.totalBooks);
    case types.FETCH_ALL_BOOKLIST_FAILED:
      return state.set('allBookList', []).set('error', action.error);
    case types.SET_LOADING_STATE:
      return state.set('isLoading', action.loadingState);
    case types.ISSUE_BOOK:
      return state.update('allBookList', allBookList =>
        allBookList.map(book => {
          if (book._id === action.payload.book_id) {
            return {
              ...book,
              current_count: book.current_count - 1,
            };
          }
          return book;
        }),
      );

    case types.ISSUE_BOOK_SUCCESS:
      return state.update('allBookList', allBookList =>
        allBookList.map(book => {
          if (book.book_id === action.result.updatedBook.book_id) {
            return {
              ...action.result.updatedBook,
            };
          }
          return book;
        }),
      );

    case types.ISSUE_BOOK_FAILURE:
      return state.set('error', action.error);
    case types.RESERVE_BOOK:
      return state;
    case types.RESERVE_BOOK_SUCCESS:
      return state.update('allBookList', allBookList =>
        allBookList.map(book => {
          if (book.book_id === action.result.updatedBook.book_id) {
            return {
              ...action.result.updatedBook,
            };
          }
          return book;
        }),
      );
    case types.RESERVE_BOOK_FAILURE:
      return state.set('error', action.error);
    case types.CANCEL_ISSUE_BOOK:
      return state.update('allBookList', allBookList =>
        allBookList.map(book => {
          if (book.book_id === action.payload.book_id) {
            return {
              ...book,
              current_count: book.current_count + 1,
            };
          }
          return book;
        }),
      );
    default:
      return state;
  }
};

export default bookListReducer;
