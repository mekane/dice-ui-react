class DiceInput extends React.Component {
    static get propTypes() {
        return {
            size: React.PropTypes.number.isRequired
        };
    }

    constructor(props) {
        super(props);

        this.decrementDice = this.decrementDice.bind(this);
        this.incrementDice = this.incrementDice.bind(this);
        this.setDice = this.setDice.bind(this);

        this.state = {
            dice: 0
        };
    }

    decrementDice(event) {
        if (this.state.dice > 0)
            this.setState({dice: this.state.dice - 1});
    }

    incrementDice(event) {
        this.setState({dice: this.state.dice + 1});
    }

    setDice(event) {
        let value = Number(event.target.value);
        if (value >= 0)
            this.setState({dice: value});
    }

    render() {
        return <div className="dice-input">
            <input className="dice-input__number" type="text" name="number" value={ this.state.dice } onChange={ this.setDice }/>
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