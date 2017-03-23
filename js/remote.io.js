(function() {
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    var verbs = [];
    var room = (function() {
        var _room = localStorage.getItem("room.1")
        return (_room==undefined) ? "Lobby" : _room;
    })();
    var remoteIO = {
        onIntent:function(intent) { console.log('intent'); }
    };

    var socket = io({});
    socket.on('connect', function() {
        console.log("connect", guid, room);
        socket.emit('/room/join', {name: room});
    });
    socket.on('/room/join/success', function(data) {
        console.log("/room/join/success");
    });
    socket.on('/room/message', function(data) {
        console.log("/room/message", data);
        switch(data.cmd) {
        case 'intent':
            remoteIO.onIntent(data.intent);
            break;
        }
    });
    window.remoteIO = remoteIO;
})()

 
