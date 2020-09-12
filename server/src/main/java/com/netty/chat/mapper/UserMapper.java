package com.netty.chat.mapper;

import com.netty.chat.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    User Sel(String username, String password);

    List<User> userList(String username);
}
