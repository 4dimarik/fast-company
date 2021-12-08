import React, {useState} from 'react';
import api from '../api'
import * as Utils from '../utilites';

const Users=()=>{
    const [users, setUsers] = useState(api.users.fetchAll());

    const formatPhrase = ()=>{
        if (users.length !==0){
            return `${users.length} человек
${Utils.numeralsWithNouns(users.length,['тусанёт', 'тусанут', 'тусанёт'])} с тобой сегодня`
        } else {
            return `Никто с тобой не тусанёт`
        }
    }
    const getPhraseClasses = ()=> users.length !==0 ? 'primary' : 'danger'

    const handleUserChange = (id)=>{
        setUsers(prevState => prevState.filter(user=>user._id !== id))
    }

    const renderTable = ()=>{
        return users.length !==0
            ? <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {users.map(user=>(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{
                        user.qualities.map(quality=>(
                            <div key={quality._id} className={`badge d-inline bg-${quality.color} m-1`}>{quality.name}</div>
                        ))
                    }</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td><button type="button" className="btn btn-sm btn-danger" onClick={()=>handleUserChange(user._id)}>Удалить</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        : ''
    }


     return <div className="container my-2">
        <h3>
            <span className={`badge bg-${getPhraseClasses()}`}>{formatPhrase()}</span>
        </h3>
         {renderTable()}

    </div>
};

export default Users;