$buttonMayo = $('#buzz-button-mayo');
$buttonKetchup = $('#buzz-button-ketchup');

// La base de l'url de redirection
const baseRedirectUrl = '/buzzer';

const initEvents = function () {
    $buttonMayo.click(function () {
        location.href = baseRedirectUrl + '?team=team-mayo';
    });
    $buttonKetchup.click(function () {
        location.href = baseRedirectUrl + '?team=team-ketchup';
    });
}

initEvents();