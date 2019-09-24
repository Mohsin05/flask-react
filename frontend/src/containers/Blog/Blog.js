import React, { Component } from 'react';

import Questionaire from '../../components/Questionnaire/Questionnaire';
import './Blog.css';
import axiosInstance from "../../axios";

class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: null,
            options: null,
            isLoading: false,
            error: false,
        }
    }

    componentDidMount () {
    axiosInstance.get( '/questionnaire' )
      .then( response => {
        this.setState({question: response.data.message, options: response.data.options, isLoading: true});
      } )
      .catch(error => {
        console.log(error);
        this.setState({error: true});
      });
    }

    render () {
    return (
      <div>
        <section className="Container">
            <h1>Welcome to Smart Restaurant of ArbiSoft!</h1>
            {this.state.error == true ? <h2 className={'Container'}>Internal Server Error</h2> :
            <Questionaire
                question={this.state.question}
                options={this.state.options}
                isLoading={this.state.isLoading}
          />}
        </section>
      </div>
    );
    }
}

export default Blog;