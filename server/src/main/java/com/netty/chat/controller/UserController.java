package com.netty.chat.controller;

import com.netty.chat.common.Result;
import com.netty.chat.entity.User;
import com.netty.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public Result login(String username,String password){
        Result result  = new Result(userService.Sel(username,password));
        return result;
    }

    @RequestMapping("/list")
    public Result userList(String username){
        Result result  = new Result(userService.userList(username));
        return result;
    }
}
