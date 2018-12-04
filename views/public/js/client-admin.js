// Socket node
var socket = io();

const messageAdd = 'add'
const messageRemove = 'remove';
const messageMayoTeam = 'event-point-mayo';
const messageKetchupTeam = 'event-point-ketchup';
const messageReloadPart = 'event-reload-part';
const messageLockBuzz= 'event-lock-buzz';
const messageUnLockBuzz= 'event-unlock-buzz';

$buttonAddPointMayo = $('#button-add-point-mayo');
$buttonRemovePointMayo = $('#button-remove-point-mayo');
$buttonAddPointKetchup = $('#button-add-point-ketchup');
$buttonRemovePointKetchup = $('#button-remove-point-ketchup');

$buttonLockBuzzer = $('#button-lock-buzz');
$buttonUnLockBuzzer = $('#button-unlock-buzz');
$buttonReloadPart = $('#button-reload-part');

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
        socket.emit(messageReloadPart);
    })
    $buttonLockBuzzer.click(function () {
        socket.emit(messageLockBuzz);
    })
    $buttonUnLockBuzzer.click(function () {
        socket.emit(messageUnLockBuzz);
    })
}

initEvents();