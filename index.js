const express = require('express');
const app = express();
const chat = require('./models/chat');
const gig = require('./models/gig');
const order = require('./models/order');
const socket = require('socket.io');
const cors = require('cors');
const cookie = require('cookie-parser');
require('./config/mongoose');

app.use(express.urlencoded());
app.use(express.json());
app.use(cookie());
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true,
}));

app.use('/', require('./routes/index'));
app.use('/upload/gig', express.static(__dirname+'/upload/gig'));
app.use('/upload/user', express.static(__dirname+'/upload/user'));
app.use('/img', express.static(__dirname+'/img'));

const server = app.listen(8880, (err)=>{
    err ? console.log("Server not run.") : console.log('Server run on port',8880);
})

const io = socket(server,{
    cors :{
        origin : "http://localhost:3000",
        credentials : true,
        methods: ['GET', 'POST']
    }
});

io.on('connection',(socket)=>{    
    console.log('user connected.');

    socket.on('view_chat',async (data)=>{
        let chats = await chat.find({
            $or : [
                {senderId : data.sender_id, receiverId : data.receiver_id},
                {senderId : data.receiver_id, receiverId : data.sender_id},
            ]
        });
        socket.emit('load_chat',{chats : chats});
    });

    socket.on('fetchGig', async (fdata)=>{
        let gigs = await gig.find({userId : fdata.userId});
        socket.emit('loadGig', {data : gigs});
    });

    socket.on('fetchNewGig', async (fdata)=>{
        let gigs = await gig.find({userId : fdata.userId._id});
        socket.broadcast.emit('loadNewGig', {data : gigs});
    });

    socket.on('fetchNewOrder', async (fdata)=>{
        let data = await order.find({gigId : fdata.gigId}).populate('buyerId').populate('gigId');
        socket.broadcast.emit('loadNewOrder', {data : data});
    });

    socket.on('msg_user',async (data)=>{
        let fdata  = await chat.find({receiverId : data.receiver_id}).populate('senderId').exec();
        let outputArray = [];
        let chatLength = [];
        let count = 0;
        let start = false;

        for (let j = 0; j < fdata.length; j++) {
            for (let k = 0; k < outputArray.length; k++) {
                if (fdata[j].senderId == outputArray[k]) {
                    start = true;
                }
            }
            count++;
            if (count == 1 && start == false) {
                outputArray.push(fdata[j].senderId);
            }
            start = false;
            count = 0;
        }
        
        // for (let k = 0; k < outputArray.length; k++) {
        //     var a = await chat.find({
        //         $or : [
        //             {senderId : outputArray[k]._id, receiverId : data.receiver_id},
        //             {senderId : data.receiver_id, receiverId : outputArray[k]._id},
        //         ]
        //     }).countDocuments();
        //     chatLength.push(a);
        // }

        socket.emit('get_user',{data : outputArray
            // , chatNo : chatLength
        });
    })
    
    socket.on('newChat',async (data)=>{
        socket.broadcast.emit('loadNewChat', {data : data});
    });
    
    socket.on('disconnect', ()=>{
        console.log('user connected.');
    })

    socket.on('newChatImg',async (data)=>{
        socket.broadcast.emit('loadNewChatImg', {data : data});
    });

});