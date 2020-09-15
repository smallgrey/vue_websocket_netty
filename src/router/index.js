import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginModule from '../views/login'
import addressBookModule from '../views/addressBook'
import chatAreaModule from '../views/chatArea'



export default class MyRoute extends React.Component{
    render(){
        return(
            <Router>
                <Route path="/" exact  component={LoginModule}/>
                <Route path="/addressBook" component={addressBookModule} />
                <Route path="/chatArea" component={chatAreaModule} />
            </Router>
        )
    }  
}