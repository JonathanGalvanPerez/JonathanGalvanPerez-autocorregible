import React from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from './../utils/ProgressBar';

export default function TeamStats() {
    const team = useSelector(state => state.team);
    const orderedStats = [...team.stats].sort((a, b) => b.value - a.value);
    const meanHeight = (team.heroes.length === 0) ? 0 : (team.totalHeight / team.heroes.length).toFixed(2);
    const meanWeight = (team.heroes.length === 0) ? 0 : (team.totalWeight / team.heroes.length).toFixed(2);

    const backgroundStyle = {
        backgroundImage: "url(/images/comic-background-stats.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
    }
    
    return (
        <div className="col-12 col-xl-10 my-2 py-3 mx-auto rounded-md shadow" style={backgroundStyle}>
            <ol className="row justify-content-around">
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
                    <ProgressBar value={stat.value} name={stat.name} key={stat.name}/>
                ))}
            </div>
            <div className="row row-cols-1 row-cols-md-2 mt-2">
                <div className="col mb-2 mb-md-0">
                    <div className="bg-light rounded-pill py-2">
                        <strong>Altura Promedio: </strong>{meanHeight} cm
                    </div>
                </div>
                <div className="col">
                    <div className="bg-light rounded-pill py-2">
                        <strong>Peso Promedio: </strong>{meanWeight} kg
                    </div>
                </div>
            </div>
        </div>
    )
}
