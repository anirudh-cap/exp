import { defineMessages } from 'react-intl';

export const scope = 'loyaltyPlus.components.pages.NewBookRequest';

export default defineMessages({
  headingText: {
    id: `${scope}.headingText`,
    defaultMessage: 'All Books',
  },
  bookName: {
    id: `${scope}.bookName`,
    defaultMessage: 'Book Name:',
  },
  authorName: {
    id: `${scope}.authorName`,
    defaultMessage: 'Author Name:',
  },
  buttonText: {
    id: `${scope}.buttonText`,
    defaultMessage: 'Profile',
  },
});
