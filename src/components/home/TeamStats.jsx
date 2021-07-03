import React from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from './../utils/ProgressBar';

export default function TeamStats() {
    const stats = useSelector(state => state.team.stats);
    const orderedStats = [...stats].sort((a, b) => b.value - a.value);
    console.log('stats ordenados: ', orderedStats);

    const backgroundStyle = {
        backgroundImage: "url(/images/comic-background-stats.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }
    return (
        <div className="col-12 col-xl-10 my-2 py-3 mx-auto rounded-md shadow" style={backgroundStyle}>
            <ol className="row justify-content-around mb-2">
                {orderedStats.map((stat) => (
                    <li className="col-6 col-md-4 col-lg-2 mb-2" key={stat.name}>
                        <div className="bg-light rounded-pill py-2">
                        <strong>{stat.name}: </strong>{stat.value}
                        </div>
                    </li>
                ))}
            </ol>
            <div className="progress rounded-xs" style={{height: "25px"}}>
                {orderedStats.map((stat) => (
                    <ProgressBar value={stat.value} name={stat.name} />
                ))}
            </div>
        </div>
    )
}
