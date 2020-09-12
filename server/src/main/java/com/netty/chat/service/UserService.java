package com.netty.chat.service;

import com.netty.chat.entity.User;
import com.netty.chat.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    public User Sel(String username,String password){
        return userMapper.Sel(username,password);
    }

    public List<User> userList(String username){
        return userMapper.userList(username);
    }


}
