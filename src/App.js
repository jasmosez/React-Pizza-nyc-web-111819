import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const url = "http://localhost:3000/pizzas"
const emptyEditablePizza = { id: "", topping: "", size: "", vegetarian: "" }

class App extends Component {

  state = {
    pizzas: [],
    editablePizza: emptyEditablePizza
  }

  componentDidMount() {
    fetch(url)
    .then(resp => resp.json())
    .then(pizzas => {
      this.setState({
        pizzas
      })
    })
  }

  editPizza = (id) => {
    const editablePizza = this.state.pizzas.find(pizza => pizza.id === id)
    this.setState({
      editablePizza
    })
  }

  submitHandler = (event) => {
    // event.preventDefault()
    
    let patchObj = {}
    
    let newPizzas = this.state.pizzas.map(pizza => {
      if (pizza.id === this.state.editablePizza.id) {
        pizza = {...this.state.editablePizza}
        patchObj = {...pizza}
      }
      return pizza
    })
    
    this.setState({
      pizzas: newPizzas,
      editablePizza: emptyEditablePizza
    })
    
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(patchObj)
    }

    fetch((url + '/' + patchObj.id), configObj)
    .then(resp => resp.json())
    .then(data => console.log(data))
    
  }

  changeHandler = (value, key) => {
    this.setState({
      editablePizza: {...this.state.editablePizza,
      [key]: value}
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm {...this.state.editablePizza} submitHandler={this.submitHandler} changeHandler={this.changeHandler} />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
