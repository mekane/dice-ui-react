class DiceRoller extends React.Component {
    constructor(props) {
        super(props);

        this.diceChanged = this.diceChanged.bind(this);
        this.modifierChanged = this.modifierChanged.bind(this);
        this.roll = this.roll.bind(this);

        this.state = {
            diceConfig: [
                {number: 0, size: 4},
                {number: 0, size: 6},
                {number: 0, size: 8},
                {number: 0, size: 10},
                {number: 0, size: 12}
            ],
            modifier: 0,
            stats: {}
        };
    }

    getDiceString() {
        return this.state.diceConfig
            .map(cfg => cfg.number ? `${cfg.number}d${cfg.size} ` : '')
            .join('')
            .concat(this.state.modifier ? ` + ${this.state.modifier}` : '');
    }

    diceChanged(size, number) {
        let newConfig = this.state.diceConfig.map(cfg => {
            if (cfg.size === size)
                return {size: cfg.size, number: number};
            else
                return {size: cfg.size, number: cfg.number};
        });

        this.setState({diceConfig: newConfig});
    }

    modifierChanged(event) {
        this.setState({modifier: Number(event.target.value)})
    }

    roll() {
        let stats = window.dice.getStatsForDice(this.state.diceConfig, this.state.modifier, 9);
        this.setState({stats: stats});
        this.props.history.add({diceConfig: this.state.diceConfig, modifier: this.state.modifier});
    }

    render() {
        return (
            <div className="dice-roller">
                { this.state.diceConfig.map(cfg =>
                    <DiceInput key={`d${cfg.size}`} number={cfg.number} size={cfg.size} onDiceChange={this.diceChanged}></DiceInput>)
                }
                <span className="dice-form__plus">+</span>
                <input className="dice-form__modifier" type="text" value={this.state.modifier} onChange={this.modifierChanged} />
                <button className="dice-form__roll-button" type="button" onClick={this.roll}>Roll { this.getDiceString() }</button>
                <StatsChart stats={this.state.stats}></StatsChart>
                <GreaterThanStatsChart stats={this.state.stats}></GreaterThanStatsChart>
                <History list={this.props.history.list()}></History>
            </div>
        )
    }
}
