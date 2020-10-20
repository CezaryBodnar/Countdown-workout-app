import React from 'react'

const Exercise = ({ items, previous, next, pointer }) => {
    return (
        <div className="exercise-block">
            {pointer !== 1 && <i className="fas fa-angle-left arrows" onClick={previous}></i>}
            <div className="exercise">{items.name}</div>
            {pointer !== 9 && <i className="fas fa-angle-right arrows" onClick={next}></i>}
        </div>
    )
}

export default Exercise
