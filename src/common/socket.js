/**
 * wesocket
 */
import config from './config'

const pingMessaage = '1'

var option={}
const WebSock = {
    socket:null,
    timevaler:null,
    timeouter:null,
    open:function(){
        this.socket = new WebSocket(config.wsuri),
        this.socket.onopen = this.onopen
        this.socket.onerror = this.onerror
        this.socket.onclose = this.onclose
        this.socket.onmessage = this.onmessage
    },
    init:function(options){
        option = options
        if(!this.socket){
            this.open()
        }
        let that = this;//保存当前对象this
        this.timeouter=setTimeout(function () {
            that.send(pingMessaage)
        }, 500);

        this.timevaler=setInterval(function () {
            that.send(pingMessaage)
        }, 5000);

        return this.socket;
    },
    onopen : function(e){
        console.log("WebSocket连接成功");
    },
    onerror : function(e){
        console.log("WebSocket连接发生错误");
    },
    onclose : function(e){
        console.log('close')
    },
    onmessage : function(e){
        if(option && option.onmessage){
            const redata = JSON.parse(e.data);
            option.onmessage(redata)
        }
    },
    send:function(message){
        try{
            if(this.socket.readyState==1){
                this.socket.send(message);
            }
        }catch(e){
            this.close()
        }
    },
    close:function(){
        console.log('WebSocket关闭')
        this.timeouter && window.clearTimeout(this.timeouter)
        this.timevaler && window.clearInterval(this.timevaler)
        this.socket && this.socket.close()
    }
 };

export default WebSock;
