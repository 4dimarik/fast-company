import React from 'react';

export default function bookmark({ status, ...rest }) {
  return (
    <button type="button" className="btn btn-info" {...rest}>
      <i className={`${status ? 'fas' : 'far'} fa-bookmark`} />
    </button>
  );
}
