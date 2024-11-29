
let latitude, longitude;
$(document).ready(function() {
    getAllFields();
    let map = L.map('map').setView([7.8731, 80.7718], 7); // Initial location (Sri Lanka)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker for the selected location
    let marker;

    // Declare latitude and longitude outside of the event listener to make them accessible globally


    // Event listener for map clicks
    map.on('click', function(e) {
        const latlng = e.latlng;
        latitude = latlng.lat.toFixed(6);
        longitude = latlng.lng.toFixed(6);

        // Update the input field with the selected coordinates
        $('#location').val(`${latitude}, ${longitude}`);

        // If a marker already exists, remove it
        if (marker) {
            map.removeLayer(marker);
        }

        // Add a marker at the clicked location
        marker = L.marker([latitude, longitude]).addTo(map);
    });
});

// Now latitude and longitude can be accessed in the addField() function
function addField() {
    // Convert latitude and longitude to integers
    const latitudeInt = parseInt(latitude);
    const longitudeInt = parseInt(longitude);



    let FieldId = $(`#FieldId`).val();
    let name = $(`#name`).val();
    let StaffId = $(`#StaffId`).val();
    let ExtentSize = $(`#ExtentSize`).val();
    let logId = $(`#logId`).val();
    let image1 = $(`#image1`)[0].files[0];
    let image2 = $(`#image2`)[0].files[0];


    let formData = new FormData();
    formData.append("fieldCode", FieldId);
    formData.append("fieldName", name);
    formData.append("fieldLocation[x]", latitudeInt);
    formData.append("fieldLocation[y]", longitudeInt);
    formData.append("extent_size", ExtentSize);
    formData.append("fieldImageOne", image1);
    formData.append("fieldImageTwo", image2);
    formData.append("Field_Staff", StaffId);
    formData.append("logCode", logId);

    let token = localStorage.getItem("token");
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/field",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            console.log(data);
            alert("Field saved successfully!");
            clearForm();
        },
        error: function () {
            alert("Error saving the Field.");
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
function getAllFields() {
    let token = localStorage.getItem("token");
    let id="F001";

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/field/"+id, // Make sure the URL is correct
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log("Fields Data:", data);
            // You can process the data here, e.g., render the fields on the UI
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error); // Log detailed error info
            alert("Error getting the Fields. Please try again.");
        }
    });
}