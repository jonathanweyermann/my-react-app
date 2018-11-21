import React, { Component } from 'react';
import Amplify, { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";
import aws_config from "./aws-exports";
import './App.css';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(aws_config);

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      when: '',
      where: '',
      description: '',
    };
  }

  handleChange(name, ev) {
      this.setState({ [name]: ev.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    var input = {
      name: this.state.name,
      when: this.state.when,
      where: this.state.where,
      description: this.state.description
    }
    console.log(input);
    await onCreate({input}).then(response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });
  }

  render(){
    return (
        <div>
            <input
                name="name"
                placeholder="name"
                onChange={(ev) => { this.handleChange('name', ev)}}
            />
            <input
                name="when"
                placeholder="when"
                onChange={(ev) => { this.handleChange('when', ev)}}
            />
            <input
                name="where"
                placeholder="where"
                onChange={(ev) => { this.handleChange('where', ev)}}
            />
            <input
                name="description"
                placeholder="description"
                onChange={(ev) => { this.handleChange('description', ev)}}
            />
            <button onClick={this.submit.bind(this)}>
                Add
            </button>
        </div>
    );
  }
}

class App extends Component {
    render() {

        const ListView = ({ todos }) => (
            <div>
                <h3>All Events</h3>
                <ul>
                    {todos.map(todo => <li key={todo.id}>{todo.name} -> at {todo.where} on {todo.when} - ({todo.description})</li>)}
                </ul>
            </div>
        );

        return (
          <div className="App">
            <Connect mutation={graphqlOperation(mutations.createEvent)}>
              {({mutation}) => (
                <AddEvent onCreate={mutation} />
              )}
            </Connect>

            <Connect query={graphqlOperation(queries.listEvents)}
              subscription={graphqlOperation(subscriptions.subscribeToEventComments)}
              onSubscriptionMsg={(prev, {onCreateEvent}) => {
                  console.log('Subscription data:', onCreateEvent)
                  return prev;
                }
              }>
              {({ data: { listEvents }, loading, error }) => {
                if (error) return (<h3>Error</h3>);
                if (loading || !listEvents) return (<h3>Loading...</h3>);
                return <ListView todos={listEvents ? listEvents.items : []} />
              }}
            </Connect>
          </div>
        )
    }
}

export default App;
