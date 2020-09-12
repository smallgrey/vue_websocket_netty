package com.netty.chat.entity;

import io.netty.channel.Channel;

import java.util.HashMap;

public class UserChannel {

    private static HashMap<String, Channel> userChannel = new HashMap<>();

    public static void put(String userId, Channel channel) {
        userChannel.put(userId, channel);
    }

    public static Channel get(String userId) {
        return  userChannel.get(userId);
    }
}
