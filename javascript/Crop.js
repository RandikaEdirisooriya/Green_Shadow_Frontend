function addCrop(){
    let CropId = $(`#cropId`).val();
    let category = $(`#category`).val();
    let commonName = $(`#commonName`).val();
    let scientificName = $(`#scientificName`).val();
    let image = $(`#image`)[0].files[0];
    let season = $(`#season`).val();
    let field = $(`#field`).val();
    let log = $(`#log`).val();

    let formData = new FormData();
    formData.append("cropCode", CropId);
    formData.append("commonName", commonName);
    formData.append("scientificName", scientificName);
    formData.append("cropImage", image);
    formData.append("category", category);
    formData.append("cropSeason", season);
    formData.append("fieldCode", field);
    formData.append("logCode", log);

    let token = localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/crop",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            console.log(data);
            alert("Crop saved successfully!");
            clearForm();
        },
        error: function () {
            console.log("Error saving crop");
        }
    });
}
function clearForm() {

    $("#category").val('');
    $("#commonName").val('');
    $("#scientificName").val('');
    $("#image").val('');
    $("#season").val('');
    $("#field").val('');
    $("#log").val('');
}