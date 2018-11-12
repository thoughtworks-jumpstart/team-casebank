import React, { Component } from 'react';
import {getBackEndData} from './handler/case_data_handler';

class Main extends Component {
    state = {
        results : ''
    }
    async componentDidMount() {
        const results =await getBackEndData();
        if(results) {
            this.setState({results: results.message});
        }
    }

    render() {
        return (
            <h1>
                {this.state.results}
            </h1>
        );
    }
}

export default Main;
