import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  CapButton,
  CapHeading,
  CapInput,
  CapRow,
  CapSelect,
} from '@capillarytech/cap-ui-library';
import withStyles from '../../../utils/withStyles';
import style from './styles';
import { FILTER_BY_OPTIONS } from './constants';
import messages from './messages';

export function getPlaceHolderValue(selectedFilterBy) {
  switch (selectedFilterBy) {
    case 'BY_GENRE':
      return 'Search by book genre...';
    case 'BY_AUTHOR':
      return 'Search by author name...';
    case 'BY_NAME':
      return 'Search by book name...';
    default:
      return 'Search by book name...';
  }
}

const Filter = ({
  className,
  selectedFilterBy,
  filterValue,
  handleFilterByChange,
  handleFilterValueChange,
}) => (
  <>
    <CapRow className="top-section" type="flex">
      <CapHeading type="h1" className="heading-text">
        <FormattedMessage {...messages.headingText} />
      </CapHeading>
    </CapRow>
    <CapRow className="search-section" type="flex">
      <CapInput
        className="search-field"
        value={filterValue}
        disabled={selectedFilterBy === 'NO_FILTER'}
        onChange={event => handleFilterValueChange(event.target.value)}
        placeholder={getPlaceHolderValue(selectedFilterBy)}
      />
      <CapSelect
        className="search-field"
        value={selectedFilterBy ? selectedFilterBy : 'By Name'}
        onChange={val => handleFilterByChange(val)}
        options={[...FILTER_BY_OPTIONS]}
      />
    </CapRow>
  </>
);

Filter.propTypes = {
  className: PropTypes.string,
  selectedFilterBy: PropTypes.func,
  filterValue: PropTypes.string,
  handleFilterByChange: PropTypes.func,
  handleFilterValueChange: PropTypes.func,
};

export default withStyles(Filter, style);
