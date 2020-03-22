import React, {Component} from 'react'
import Card from '../../components/Card/Card'

class Cards extends Component {
    state = {
        cards: []
    }
    componentDidUpdate(prevProps)  {
        if (!this.props.newCardToAdd) return
        if (!prevProps.newCardToAdd || (prevProps.newCardToAdd.node.id !== this.props.newCardToAdd.node.id)) {
            this.addCard()
        }
    }

    addCard = () =>{
        const newCardsValue = [...this.state.cards]
        newCardsValue.push(this.props.newCardToAdd)
        this.setState({cards: newCardsValue})
    }

    handleRemoveCard = (id) => {
        const cardIndexToRemove = this.state.cards.findIndex(card => card.node.id === id)
        const newCardsValue = [...this.state.cards]
        if (cardIndexToRemove !== -1) {
            newCardsValue.splice(cardIndexToRemove, 1)
            this.setState({cards: newCardsValue})
        }

    }
    render () {
        return (
                <div className="flex-grow">
                <h4>Saved Repositories</h4>
                    {this.state.cards.map(card => {
                        return <Card repo={card} key={card.node.id} clicked={() => this.handleRemoveCard(card.node.id)}/>
                    })}
                </div>
        )
    }
}

export default Cards