import React, { Component } from 'react';

import CurrencyTransaction from '../CurrencyTransation/CurrencyTransaction';
import TransactionList from '../TransactionList/TransactionList';

import './App.css';


class App extends Component {
    
    constructor(props) {
      super(props);
      
      this.state = {
        currencyRate: 0,
        currencyAmount: 0,
        convertedPlnAmout: 0.00,
        transactionName: '',
        transactions: []
      };
      this.handleEurRateInput = this.handleEurRateInput.bind(this);
      this.handleConvert = this.handleConvert.bind(this);
      this.convertToPLN = this.convertToPLN.bind(this);
      this.handleNameInput = this.handleNameInput.bind(this);
      this.handleTranSave = this.handleTranSave.bind(this);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }
    
    handleEurRateInput(inputValue) {
      this.setState({currencyRate: inputValue}, this.convertToPLN);
    }
    
    handleConvert(value) {
      this.setState({currencyAmount: value}, this.convertToPLN);
    }
    
    convertToPLN() {
      const {currencyRate, currencyAmount} = this.state;
      const convertedAmount = (currencyRate * currencyAmount) > 0 ? currencyRate * currencyAmount : 0;
      
      this.setState({convertedPlnAmout: convertedAmount.toFixed(2)});
    }
    
    handleNameInput(name) {
      this.setState({transactionName: name});
    }
    
    handleTranSave() {
      this.setState((prevState, props) => {
        
        return {
          transactions: [
            ...this.state.transactions,
            {
              id: 0,
              currencyAmount: prevState.currencyAmount,
              convertedPlnAmout: prevState.convertedPlnAmout,
              transactionName: prevState.transactionName
            }
          ],
          nextItemId: 0
        }
      });
    }
    
    handleDeleteItem(id) {
      const transactions = this.state.transactions.filter((item, id) => item.id !== id);
      
      this.setState({transactions});
    }
  
    render() {
      const {convertedPlnAmout, transactions} = this.state;
        return(
          <div className="app-container">
            <CurrencyTransaction 
              onInputChange={ this.handleEurRateInput } 
              onCurrencyConvert={ this.handleConvert }
              convertedPlnAmout={ convertedPlnAmout }
              onNameChange={ this.handleNameInput }
              onTransactionSave={ this.handleTranSave }
            />
            <TransactionList 
              transactions={ transactions }
              onDeleteItem={ this.handleDeleteItem }
            />
          </div>
        );
    }
}

export default App;