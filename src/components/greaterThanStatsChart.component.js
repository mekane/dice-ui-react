function getGreaterThanProbabilityForRoll(roll, stats) {
    return Object.keys(stats)
        .filter((item) => Number(item) >= Number(roll))
        .reduce((acc, item) => Number(acc) + Number(stats[item]), 0)
        .toFixed(1);
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