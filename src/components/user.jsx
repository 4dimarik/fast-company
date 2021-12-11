import React from 'react';
import Quality from './quality'
import '@fortawesome/fontawesome-free/css/all.css'

export default function user(props){
    const {user, onDelete, handleToggleBookmark} = props

    return (
        <tr>
            <td>{user.name}</td>
            <td>{
                user.qualities.map(quality=>(
                    <Quality key={quality._id} quality={quality}/>
                ))
            }</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <button type="button" className="btn btn-info" onClick={()=>handleToggleBookmark(user._id,user.bookmark)}>
                    <i className={`${user.bookmark ? 'fas' : 'far'} fa-bookmark`}></i>
                </button>
            </td>
            <td><button type="button" className="btn btn-sm btn-danger" onClick={()=>onDelete(user._id)}>Удалить</button></td>
        </tr>
    )
}