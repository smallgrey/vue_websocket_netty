package com.netty.chat.chatRoom;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;

public class HeartBeatHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        //super.userEventTriggered(ctx, evt);
        // 判断evt是否是idleStateEvent 读空闲/写空闲/读写空闲
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent event = (IdleStateEvent) evt;

            if (event.state() == IdleState.READER_IDLE) {
                System.out.println("读空闲...");
            } else if (event.state() == IdleState.WRITER_IDLE) {
                System.out.println("写空闲...");
            } else if (event.state() == IdleState.ALL_IDLE) {
                //System.out.println(CustomChannelHandler.clients.size());
                Channel channel = ctx.channel();
                channel.close();
                //System.out.println(CustomChannelHandler.clients.size());
            }
        }

    }
}
