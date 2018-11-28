// Socket node
var socket = io();

const messageAdd = 'add'
const messageRemove = 'remove';
const messageMayoTeam = 'event-point-mayo';
const messageKetchupTeam = 'event-point-ketchup';
const messageReloadPart = 'event-reload-part';

$buttonAddPointMayo = $("#button-add-point-mayo");
$buttonRemovePointMayo = $("#button-remove-point-mayo");
$buttonAddPointKetchup = $("#button-add-point-ketchup");
$buttonRemovePointKetchup = $("#button-remove-point-ketchup");

$buttonReloadPart = $("#button-reload-part");

var initEvents = function () {
    $buttonAddPointMayo.click(function () {
        socket.emit(messageMayoTeam, messageAdd);
    });
    $buttonRemovePointMayo.click(function () {
        socket.emit(messageMayoTeam, messageRemove);
    });
    $buttonAddPointKetchup.click(function () {
        socket.emit(messageKetchupTeam, messageAdd);
    });
    $buttonRemovePointKetchup.click(function () {
        socket.emit(messageKetchupTeam, messageRemove);
    });
    $buttonReloadPart.click(function () {
        console.log('je reload');
        socket.emit(messageReloadPart);
    })
}

initEvents();