import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ children }) => {
  return <table className="table">{children}</table>;
};

Table.propTypes = {
  children: PropTypes.array,
};

export default Table;
