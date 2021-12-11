import React from 'react';

const quality = (props)=>{
    const {quality} = props;
    return (
        <div className={`badge d-inline bg-${quality.color} m-1`}>{quality.name}</div>
    )
}

export default quality;

