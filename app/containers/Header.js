import React,{Component} from 'react';
import logo from '../images/logo.png';

export default class extends Component{
    render(){
        return(
            <div className = "components-header">
                <img src={logo} alt="logo"/>
                <h1>music player in react.js</h1>
            </div>
        )
    }
}
