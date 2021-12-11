import React from 'react';
import * as Utils from "../utilites";

const formatPhrase = (usersCount)=>{
    if (usersCount !==0){
        return `${usersCount} ${Utils.numeralsWithNouns(usersCount,['человек', 'человека', 'человек'])}
${Utils.numeralsWithNouns(usersCount,['тусанёт', 'тусанут', 'тусанёт'])} с тобой сегодня`
    } else {
        return `Никто с тобой не тусанёт`
    }
}
const getPhraseClasses = (usersCount)=> usersCount !==0 ? 'primary' : 'danger'
const searchStatus = (props)=>{
    const {usersCount} = props
    return (
        <h3>
            <span className={`badge bg-${getPhraseClasses(usersCount)}`}>{formatPhrase(usersCount)}</span>
        </h3>
    )
}

export default searchStatus;