const History = (props) => (
    <ul className="history">{
        props.list.map(item => (
            <li key={JSON.stringify(item)} className="history__item">
                <button onClick={function() { props.loadConfig(item); }}><DiceString data={ item }></DiceString></button>
            </li>
        ))
    }</ul>
);