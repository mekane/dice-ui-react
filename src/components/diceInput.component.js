class DiceInput extends React.Component {
    static get propTypes() {
        return {
            number: React.PropTypes.number,
            size: React.PropTypes.number.isRequired,
            onDiceChange: React.PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            number: 1
        };
    }

    constructor(props) {
        super(props);

        this.decrementDice = this.decrementDice.bind(this);
        this.incrementDice = this.incrementDice.bind(this);
        this.setDice = this.setDice.bind(this);
    }

    decrementDice() {
        this.setDiceState(this.props.number - 1);
    }

    incrementDice(event) {
        this.setDiceState(this.props.number + 1);
    }

    setDice(event) {
        this.setDiceState(Number(event.target.value));
    }

    setDiceState(number) {
        if ( number >= 0 ) {
            this.props.onDiceChange(this.props.size, number);
        }
    }

    render() {
        return <div className="dice-input">
            <input className="dice-input__number" type="text" name="number" value={ this.props.number } onChange={ this.setDice }/>
            <span className="dice-input__d">d</span>
            <span className="dice-input__size">{ this.props.size }</span>
            <div className="dice-input__controls">
                <button className="dice-input__button" type="button" onClick={ this.decrementDice }>-</button>
                <button className="dice-input__button" type="button" onClick={ this.incrementDice }>+</button>
            </div>
        </div>
    }
}

//DiceInput.propTypes = { size: React.PropTypes.number.isRequired };