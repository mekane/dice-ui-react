const History = (props) => (
    <ul className="history">{
        props.list.map(item => (
            <li key={JSON.stringify(item)} className="history__item">{ JSON.stringify(item) }</li>
        ))
    }</ul>
);