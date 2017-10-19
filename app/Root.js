import React, {Component} from  'react';
import {HashRouter} from 'react-router-dom';
import Header from './containers/Header';
import Player from './containers/Player';
import './style/main';


export default class extends Component {
    render() {
        return (
            <div className="components-container">
                <Header/>
                <HashRouter>
                    <Player/>
                </HashRouter>
            </div>
        )
    }
}