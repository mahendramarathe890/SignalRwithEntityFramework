"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();

connection.start().then(function () {
    console.log('connected to hub');
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("OnConnected", function () {
    OnConnected();
});

function OnConnected() {
    var username = $('#hfUsername').val();
    connection.invoke("SaveUserConnection", username).catch(function (err) {
        return console.error(err.toString());
    })
}

connection.on("ReceivedNotification", function (message) {
    // alert(message);
    DisplayGeneralNotification(message, 'General Message');
});

connection.on("ReceivedPersonalNotification", function (message, username) {
    // alert(message + ' - ' + username);
    DisplayPersonalNotification(message, 'hey ' + username);
});

connection.on("ReceivedGroupNotification", function (message, username) {
    // alert(message + ' - ' + username);
    DisplayPersonalNotification(message, '');
});

document.getElementById("joinGroup").addEventListener("click", function (event) {
    connection.invoke("JoinGroup", "PrivateGroup").catch(function (err) {
        return console.error(err.toString());
    });
    DisplayPersonalNotification("You have joined the private group", '');
    event.preventDefault();
})

document.getElementById("removeGroup").addEventListener("click", function (event) {
    connection.invoke("RemoveFromGroup", "PrivateGroup").catch(function (err) {
        return console.error(err.toString());
    });
    DisplayRemovedNotification("You are removed from private group", '');
    event.preventDefault();
})