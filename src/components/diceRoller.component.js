var DiceRoller = React.createClass({
    render() {
        return (
            <div className="dice-roller">
                { [4, 6, 8].map(makeDiceInput) }
            </div>
        )
    }
});

function makeDiceInput(size) {
    return <DiceInput key={`d${size}`} size={size}></DiceInput>
}