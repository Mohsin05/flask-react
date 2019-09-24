import React, { Component } from 'react';

import './NewPost.css';
import {RadioGroup, ReversedRadioButton} from 'react-radio-buttons';
import axiosInstance from "../../axios";

class questionnaire extends Component {

    constructor(props) {
        super(props);
        this.state = {
                isLoading: null,
                question : null,
                options : [],
                answer: null,
                history: [],
                level:1
            }
        }

    componentWillReceiveProps(props) {
        this.setState({question : props.question,
                             options : props.options,
                             isLoading : props.isLoading}
                      );
    }

    postDataHandler = () => {

      this.setState({ history: this.state.history.concat([this.state.answer])},function () {
          const data = {
              answer:   this.state.answer,
              history:  this.state.history,
              level:    this.state.level
          }
          axiosInstance.post( '/questionnaire', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})
              .then( response => {

               this.setState({level: this.state.level+1, question: response.data.message, options: response.data.options})
              } )
              .catch(error => {
                  console.log(error);
                  this.setState({error: true});
              });
      });
  }

    render () {
      let buttons = function (options, self) {
          let questionnaire = self;
          return (<span>
              <RadioGroup onChange={function (value) {
              questionnaire.setState({answer: value })
          }}>
              {options.map(value => {
                  return <ReversedRadioButton key={value} value={value}> {value} </ReversedRadioButton>
              })}
          </RadioGroup>
              <button onClick={questionnaire.postDataHandler}>Submit</button>
      </span>)
      }
       return (
            <div className="questionnaire">
                <h3>{this.state.question}</h3>
                {(this.state.options == null) ? '' : buttons(this.state.options, this) }

            </div>
        );
    }
}

export default questionnaire;