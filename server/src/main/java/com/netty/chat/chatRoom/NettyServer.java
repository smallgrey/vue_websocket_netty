package com.netty.chat.chatRoom;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class NettyServer implements CommandLineRunner {
    private static NettyServer nettyServer;
    private ServerBootstrap server;
    private EventLoopGroup boss;
    private EventLoopGroup woker;
    private ChannelFuture future;



    @PostConstruct
    public void init(){
        nettyServer = this;
    }

    @Value("${netty.tcp.server.port}")
    private  int port;

    private static class SingletionNettyServer{
        static final NettyServer instance = new NettyServer();
    }

    public static NettyServer getInstance(){
        return SingletionNettyServer.instance;
    }


    public void start() {

        // 创建服务类
        server = new ServerBootstrap();

        // 创建boss和woker
        boss = new NioEventLoopGroup();
        woker = new NioEventLoopGroup();

        try {
            // 设置线程池
            server.group(boss, woker);

            // 设置channel工厂
            server.channel(NioServerSocketChannel.class);

            // 设置管道
            server.childHandler(new WSServerInitializer());

            log.info("通道配置");

            // 服务器异步创建绑定
            this.future = server.bind(nettyServer.port);
            log.info("netty server 启动完毕,启动端口为："+nettyServer.port);

            // 等待服务端关闭
            this.future.channel().closeFuture().sync();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            boss.shutdownGracefully();
            woker.shutdownGracefully();
        }
    }

    @Override
    public void run(String... args) throws Exception {
        this.start();
    }

}
