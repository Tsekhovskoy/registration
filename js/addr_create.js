/**
 * Adding a new address and rendering actual addresses without reloading the page
 */

$( document ).ready(function() {
    $(".green_btn").click(
        function(){
            if($('#name').val() && $('#countrySel').val() && $('#citySel').val()) {
                sendAjaxForm('ajax_form', 'controller/create.php');
            } else {
                swal("Required fields are empty!", "Fill in the form, please", "error");
            }
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
            $('#ajax_form')[0].reset();
            $('#citySel').val('');

            for (var i = 0; i < response.length; i++) {
                $('#template').append('<div class="item" id="'+ response[i].id + '">' + '<br> ' +
                    '<h3>' + response[i].name + '</h3>' + '<p>' + 'Country: ' + response[i].country + ', ' +
                    'City: ' + response[i].city + ', ' + 'Street: ' + response[i].street + ', ' +
                    'Home number: ' + response[i].home_number + '</p>' +
                    '<p>' + 'Addition information: ' + response[i].information + '</p>' + '<div class="actbox" > ' +
                    '<a class="bcross" data-id="' + response[i].id + '"></a></div></div>');
            }
            swal("Added!", "Address created.", "success");
        },
        error: function(response) {
            swal("Address Not Added!", "No address added. Check your internet connection or contact technical support.", "error");
        }
    });
}
