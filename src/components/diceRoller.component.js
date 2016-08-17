class DiceRoller extends React.Component {
    constructor(props) {
        super(props);

        this.diceChanged = this.diceChanged.bind(this);

        this.state = {
            diceConfig: [
                {number: 0, size: 4},
                {number: 0, size: 6},
                {number: 0, size: 8},
                {number: 0, size: 10},
                {number: 0, size: 12}
            ]
        };

        this.diceString = '';
    }

    diceChanged(size, number) {
        let newConfig = this.state.diceConfig.map(cfg => {
            if (cfg.size === size)
                return {size: cfg.size, number: number};
            else
                return {size: cfg.size, number: cfg.number};
        });
        this.diceString = newConfig.map(cfg => cfg.number ? `${cfg.number}d${cfg.size} ` : '').join('');

        this.setState({diceConfig: newConfig});
        console.log(this.diceString);
    }

    roll() {
        console.log('roll!');
    }

    render() {
        return (
            <div className="dice-roller">
                { this.state.diceConfig.map(cfg =>
                    <DiceInput key={`d${cfg.size}`} number={cfg.number} size={cfg.size} onDiceChange={this.diceChanged}></DiceInput>) }
                <button className="dice-form__roll-button" type="button" onClick={this.roll}>Roll { this.diceString }</button>
            </div>
        )
    }
}
