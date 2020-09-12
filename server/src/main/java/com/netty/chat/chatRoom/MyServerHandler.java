package com.netty.chat.chatRoom;

import com.netty.chat.entity.Message;
import com.netty.chat.entity.UserChannel;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.concurrent.GlobalEventExecutor;
import net.sf.json.JSONObject;

public class MyServerHandler extends
        SimpleChannelInboundHandler<TextWebSocketFrame> {

    public static ChannelGroup clients = new DefaultChannelGroup(
            GlobalEventExecutor.INSTANCE);

    public static  UserChannel userChannel = new UserChannel();

    /**
     * 监听客户端注册
     */
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        // 新客户端连接,加入队列
        clients.add(ctx.channel());
    }

    /**
     * 监听客户端断开
     */
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        // 整理队列
        clients.remove(ctx.channel());
    }

    /**
     * 读取客户端发过来的消息
     */
    @Override
    public void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame tmsg)
            throws Exception {

        JSONObject jsonobject = JSONObject.fromObject(tmsg.text());
        Message message= (Message)JSONObject.toBean(jsonobject, Message.class);

        UserChannel.put(message.getFrom(),ctx.channel());

        if(message.getEvent().equals("heartbeat")){
            //心跳消息不做处理
            System.out.println("心跳");
            return;
        }

        if(message.getTo().equals("all")){
            // 处理群聊消息
            System.out.println("群聊");

            for (Channel channel : clients) {
                // 判断是否是当前用户的消息
                if (channel != ctx.channel()) {
                    channel.writeAndFlush(msgPot(tmsg.text()));
                } else {
                    // 自己
                }
            }
        }else{
           //
            System.out.println("单聊");
            Channel targetChannel = UserChannel.get(message.getTo());
           targetChannel.writeAndFlush(msgPot(tmsg.text()));
        }
    }

    /**
     * 监听连接异常
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
            throws Exception {
        ctx.close(); // 关闭
    }

    /**
     * 封装消息
     *
     * @param msg
     * @return
     */
    public TextWebSocketFrame msgPot(String msg) {
        return new TextWebSocketFrame(msg);
    }

}
