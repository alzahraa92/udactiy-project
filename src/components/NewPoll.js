import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import {  handleAddQuestion} from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    };

    handleOption= (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [name]: value
      });
    };
  
    handleSubmit = (e) => {
      const { optionOne, optionTwo } = this.state;
      const { dispatch } = this.props;
  
      e.preventDefault();
  
      this.setState(
        {
          optionOne: '',
          optionTwo: '',
          toHome: true
        },
        () => dispatch(handleAddQuestion(optionOne, optionTwo))
      );
    };

    render() {
      const { optionOne, optionTwo, toHome } = this.state;

      if (toHome === true) return <Redirect to="/" />;
        return (
            <div className="newQu">
              <Fragment>
              <form onSubmit={this.handleSubmit}>
                    <h3>Would You Rather</h3>
                    <ul >
                      <li>
                        <label controlId="optionOne">Option One</label>
                        <input type="text"
                          name="optionOne"
                          value={optionOne}
                          onChange={this.handleOption}
                          placeholder="Option One" />
                      </li>
                      <hr/>
                      <li>
                        <label controlId="optionTwo">Option Two</label>
                        <input type="text"
                          name="optionTwo"
                          value={optionTwo}
                          onChange={this.handleOption}
                          placeholder="Option Two" />
                      </li>
                      <button disabled={optionOne === '' || optionTwo === ''}>Add</button>
                    </ul>
              </form>
              </Fragment>
            </div>
          );
    }
}

export default connect()(NewPoll);
