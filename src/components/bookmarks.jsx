import React from 'react';

export default function bookmarks({ id, bookmark, handleToggleBookmark }) {
  return (
    <button type="button" className="btn btn-info" onClick={() => handleToggleBookmark(id)}>
      <i className={`${bookmark ? 'fas' : 'far'} fa-bookmark`} />
    </button>
  );
}
