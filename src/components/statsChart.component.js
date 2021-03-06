const StatsChart = (props) => (
    <ul className="stats"> {
        Object.keys(props.stats).map(roll => {
            let percentage = props.stats[roll];
            return (
                <li key={roll} className="stats__item" style={{height: `${percentage * 10}px`}}>
                    <span className="stats__item__roll">{ roll }</span>
                    <span className="stats__item__percentage">{ percentage }%</span>
                </li>
            );
        })
    }</ul>
);