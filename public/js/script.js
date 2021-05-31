$(document).ready(function () {
    $("#upload-form").on("change", function () {
        var form_data = new FormData();
        form_data.append("file", document.getElementById('file').files[0]);
        $.ajax({
            url: "api/upload/",
            method: "POST",
            data: form_data,
            contentType: false,
            processData: false,
            success: function (response) {
                $('#downloadLink').attr('href', response.file)
                $('#downloadLink').text(response.file)
                $('#result').css('display', 'block')
            }
        });
    });
});

$('#emailForm').on('submit', function (e) {
    e.preventDefault();
    const link = $('#downloadLink').attr('href');
    const uuid = link.split('/').slice(-1)[0]

    var form_data = {
        uuid,
        emailTo: emailForm.receiver.value,
        emailFrom: emailForm.sender.value
    }
    this.reset();

    $.ajax({
        url: 'api/files/send',
        method: 'POST',
        data: JSON.stringify(form_data),
        processData: false,
        contentType: 'application/json',
        beforeSend: function () {
            $('#sendButton').attr('disabled','disabled');
        },
        success: function (response) {
            $('#emailSent').html('<h3>Email sent successfully</h3>');
            $('#sendButton').removeAttr('disabled');
        }   
    })

})
