import React, {useState} from 'react';
import Users from "./components/users";
import SearchStatus from './components/searchStatus'
import api from "./api";

export default function App() {

    const [users, setUsers] = useState(api.users.fetchAll());
    const handleUserChange = (id)=>{
        setUsers(prevState => prevState.filter(user=>user._id !== id))
    }
    const handleToggleBookmark = (id)=>{
        // setUsers(prevState => {
        //         return prevState.map((user) => {
        //             if (user._id === id) {
        //                 user.bookmark = !user.bookmark
        //             }
        //             return user;
        //         })
        //     }
        // )
        const newState = users.map(user => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
            }
            return user;
        });
        setUsers(newState)
    }
    return (
        <div className="container my-2">
            <SearchStatus usersCount={users.length}/>
            <Users users={users} handleUserChange={handleUserChange} handleToggleBookmark={handleToggleBookmark}/>
        </div>
    )

}