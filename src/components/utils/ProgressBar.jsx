import React from 'react'

const colors = {
    intelligence: "#3c096c",
    strength: "#40916c",
    speed: "#0466c8",
    durability: "black",
    power: "#c1121f",
    combat: "#fca311",
}

export default function ProgressBar({ value, name }) {
    const progress = value === "null" ? 0 : value + "%";
    const style = name? {width: progress, backgroundColor: colors[name]} : { width: progress };
    return (
        <div style={style} className="progress-bar progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100">{name? name : progress}</div>
    )
}
