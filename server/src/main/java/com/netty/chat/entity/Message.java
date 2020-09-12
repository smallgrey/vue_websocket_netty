package com.netty.chat.entity;

public class Message {
    private String event;
    private String from;
    private String to;
    private String username;
    private String type;
    private String data;

    public String getEvent() {
        return event;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getUsername() {
        return username;
    }

    public String getType() {
        return type;
    }

    public String getData() {
        return data;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Message{" +
                "event='" + event + '\'' +
                ", from=" + from +
                ", to=" + to +
                ", username='" + username + '\'' +
                ", type='" + type + '\'' +
                ", data='" + data + '\'' +
                '}';
    }
}
