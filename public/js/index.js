var socket = io(); //initiate the request... variable to communicate

socket.on('connect', function ()  {
    console.log('Connected to server');
});

socket.on('disconnect', function ()  {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:  ${message.text}`);

    jQuery('#messages').append(li);
});
/*
socket.emit('createMessage', {
    from: "Felix",
    text: "Hi"
}, function (data) {
    console.log('Got it',data);  //Add acknowledgment for the client
});
*/
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});