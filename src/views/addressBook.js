import React from "react";
import { Input, PageHeader } from 'antd';
import '../assets/css/addressBook.css';
import store from '../store/index';


const { Search } = Input;

class AddressBook extends React.Component{

    constructor (){
        super();
        this.state = {
            listData: [],
            user: {}
        }
    }

    componentDidMount()
    {
        console.log(store.getState())
        this.searchUser()
    }

    searchUser (username) {
        username = username || ''
        fetch("http://localhost:8090/user/list?username="+username)
        .then(res => res.json())
        .then(result => {
            let temp = result.data.filter(item => { // 除去自己
                if(item.headimg === "default1") {
                   item.head_img = require("../assets/img/default1.jpg")
                }else{
                   item.head_img = require("../assets/img/default2.jpg")
                }
                return item.userId !== store.getState().user.userId;
            })
            this.setState({
                listData:temp
            })
        })
    }

    chat (user) {
        let history = this.props.history;
        history.push({
            pathname:'/chatArea',
            query: JSON.stringify(user),
        })
    }

    render (){
        return (
            <div className="addressBook">
                <PageHeader
                    className="site-page-header"
                    title="通讯录"
                    subTitle=""
                    style={{display:'flex',justifyContent:'center'}}
                />
                <div className="addressBook-search">
                   <Search
                        placeholder="输入搜索内容"
                        onSearch={value => this.searchUser(value)}
                        style={{ borderRadius:25}}
                    />                
                </div>
                <div className="list-item">
                    {
                        this.state.listData.map( (item,index) => {
                            return (
                            <div className="section" key = {index} onClick={()=>this.chat(item)}>
                                <img src={item.head_img} alt="" />
                                <span>{item.username}</span>
                            </div>
                            )
                        })
                    }
                </div>
            </div>        
        )
    }
}

export default AddressBook;