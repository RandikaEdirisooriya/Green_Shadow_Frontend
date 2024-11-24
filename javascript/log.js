
function addLog() {
    let LogID = $(`#LogID`).val();
    let date = $(`#date`).val();
    let details = $(`#details`).val();
    let observedImage = $(`#observedImage`)[0].files[0];
    let token = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("logCode", LogID);
    formData.append("logDate", date);
    formData.append("logDetails", details);
    formData.append("observedImage", observedImage);

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/logs",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            console.log(data);
            alert("Log saved successfully!");
            clearForm();


        },
        error: function () {
            alert("Error saving the log.");
        }
    });
}



function clearForm() {

    $("#LogID").val('');
    $("#date").val('');
    $("#details").val('');
    $("#observedImage").val('');
    $("#section").val('');
    $("#sectionId").val('');

}
