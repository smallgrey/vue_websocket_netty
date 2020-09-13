import React from 'react';
import {HashRouter as Router , Route , Switch} from 'react-router-dom';
import { createBrowserHistory } from "history";

import LoginModule from '../views/login'
import addressBookModule from '../views/addressBook'
import chatAreaModule from '../views/chatArea'



export default class MyRoute extends React.Component{
    render(){
        return(
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route exact path="/" component={LoginModule}/>
                    <Route path="/addressBook" component={addressBookModule} />
                    <Route path="/chatArea" component={chatAreaModule} />
                </Switch>
            </Router>
        )
    }  
}