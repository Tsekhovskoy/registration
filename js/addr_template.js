/**
 * Rendering actual addresses on the page when it loads
 */

$( document ).ready(function() {
            templateAddress('controller/template.php');
            return false;
});

function templateAddress(url) {
    $.ajax({
        url         :url,
        type        :"POST",
        dataType    :"json",
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                $('#template').append('<div class="item" id="'+ response[i].id + '">' + '<br> ' +
                    '<h3>' + response[i].name + '</h3>' + '<p>' + 'Country: ' + response[i].country + ', ' +
                    'City: ' + response[i].city + ', ' + 'Street: ' + response[i].street + ', ' +
                    'Home number: ' + response[i].home_number + '</p>' +
                    '<p>' + 'Addition information: ' + response[i].information + '</p>' + '<div class="actbox" > ' +
                    '<a class="bcross" data-id="' + response[i].id + '"></a></div></div>');
            }
        },
        error: function(response) {
            swal("Add the address please!", "You don't have any shipping addresses yet.", "info");
        }
    });
}
