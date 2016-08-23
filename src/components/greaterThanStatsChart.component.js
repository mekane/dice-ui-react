function getGreaterThanProbabilityForRoll(roll, stats) {
    return Object.keys(stats)
        .reduce((probability, stat) => {
            let summedDudes = Number(probability) + Number(stats[stat]);
            if(Number(stat) >= Number(roll))
                return summedDudes.toFixed(1);
            else
                return probability;
        }, 0);
}

const GreaterThanStatsChart = (props) => (
    <ul className="stats"> {
        Object.keys(props.stats).map(roll => {
            let percentage = getGreaterThanProbabilityForRoll(roll, props.stats);
            return (
                <li key={roll} className="stats__item" style={{height: `${percentage * 3}px`}}>
                    <span className="stats__item__roll">{ roll }</span>
                    <span className="stats__item__percentage">{ percentage }%</span>
                </li>
            );
        })
    }</ul>
);