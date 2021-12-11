import React from 'react';

export default function bookmarks(props){
    const {id, bookmark, handleToggleBookmark} = props;
    return (
        <button type="button" className="btn btn-info" onClick={()=>handleToggleBookmark(id)}>
            <i className={`${bookmark ? 'fas' : 'far'} fa-bookmark`}></i>
        </button>
    )
}

