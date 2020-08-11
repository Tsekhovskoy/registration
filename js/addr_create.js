$( document ).ready(function() {
    $(".green_btn").click(
        function(){
            sendAjaxForm('ajax_form', 'controller/create.php');
            return false;
        }
    );
});

function sendAjaxForm(ajax_form, url) {
    $.ajax({
        url         :url,
        type        :"POST",
        data        :$("#"+ajax_form).serialize(),
        dataType    : "json",
        success: function(response) {
            $('#template').empty();
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
            $('#template').html('Error! Data not sent.');
        }
    });
}
