let latitude, longitude;
let updatedlatitude, updatedlongitude;

$(document).ready(function () {
    getAllFields();

    // Initialize map with initial view (Sri Lanka)
    let map = L.map('map').setView([7.8731, 80.7718], 7);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker for the selected location
    let marker;

    // Event listener for map clicks
    map.on('click', function (e) {
        const latlng = e.latlng;
        latitude = latlng.lat.toFixed(6);
        longitude = latlng.lng.toFixed(6);

        // Update the input field with the selected coordinates
        $('#location').val(`${latitude}, ${longitude}`);


        // If a marker already exists, remove it
        if (marker) {
            map.removeLayer(marker);
        }

        // Add a new marker at the clicked location
        marker = L.marker([latitude, longitude]).addTo(map);
    });
});

// Function to add a new field
function addField() {
    // Convert latitude and longitude to integers if needed
    const latitudeFloat = parseFloat(latitude);
    const longitudeFloat = parseFloat(longitude);

    let FieldId = $(`#FieldId`).val();
    let name = $(`#name`).val();
    let StaffId = $(`#StaffId`).val();
    let ExtentSize = $(`#ExtentSize`).val();
    let logId = $(`#logId`).val();
    let image1 = $(`#image1`)[0].files[0];
    let image2 = $(`#image2`)[0].files[0];

    // FormData to send to the backend
    let formData = new FormData();
    formData.append("fieldCode", FieldId);
    formData.append("fieldName", name);
    formData.append("fieldLocation[x]", latitudeFloat);
    formData.append("fieldLocation[y]", longitudeFloat);
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
            getAllFields(); // Refresh the table
        },
        error: function () {
            alert("Error saving the Field.");
        }
    });
}

// Function to clear the form inputs
function clearForm() {
    $("#FieldId").val("");
    $("#name").val("");
    $("#StaffId").val("");
    $("#ExtentSize").val("");
    $("#logId").val("");
    $("#image1").val("");
    $("#image2").val("");
    $('#location').val("");
}

// Function to retrieve all fields and display in a table
function getAllFields() {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/field",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log(data);
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function (field) {
                    let Image1 = field.fieldImageOne;
                    let Image2 = field.fieldImageTwo;
                    let row = `<tr class="tbody">
                        <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.fieldLocation.x}, ${field.fieldLocation.y}</td>
                        <td>${field.extent_size}</td>
                        <td><img src="data:image/jpeg;base64,${Image1}" alt="Image 1" class="img-fluid img-thumbnail" style="width: 30px; height: 30px; border-radius: 30px;" /></td>
                        <td><img src="data:image/jpeg;base64,${Image2}" alt="Image 2" class="img-fluid img-thumbnail" style="width: 30px; height: 30px; border-radius: 30px;" /></td>
                        <td>${field.logCode}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-link text-warning p-0 me-2 edit-btn" data-id="${field.fieldCode}" data-log='${JSON.stringify(field)}'>
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-link text-danger p-0 delete-btn" data-id="${field.fieldCode}">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
                    $("table tbody").append(row);
                });
                addEditAction();
                addDeleteAction();
            } else {
                $("table tbody").empty();
                $("table tbody").append("<tr><td colspan='8' class='text-center'>No fields available</td></tr>");
            }
        },
        error: function () {
            alert("Error getting the Fields. Please try again.");
        }
    });
}

// Function to handle the delete action
function addDeleteAction() {
    $(".delete-btn").off("click").on("click", function () {
        let fieldId = $(this).data("id");
        Swal.fire({
            title: `Are you sure you want to delete Field ID: ${fieldId}?`,
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteField(fieldId);
            }
        });
    });
}

// Function to delete the field
function deleteField(fieldId) {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/v1/field/${fieldId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function () {
            Swal.fire('Deleted!', `Field ID ${fieldId} has been deleted successfully.`, 'success');
            getAllFields();
        },
        error: function () {
            Swal.fire('Error!', 'Error deleting the Field. Please try again.', 'error');
        }
    });
}

// Function to handle the edit action
// Function to handle the edit action
function addEditAction() {
    $(".edit-btn").off("click").on("click", function () {
        let field = $(this).data("log");

        // Pre-fill form with field data
        $("#FieldId1").val(field.fieldCode);
        $("#name1").val(field.fieldName);
        $("#StaffId1").val(field.Field_Staff);
        $("#ExtentSize1").val(field.extent_size);
        $("#logId1").val(field.logCode);
        $('#location1').val(`${field.fieldLocation.x}, ${field.fieldLocation.y}`);

        // Initialize map with the existing field location
        let map = L.map('map1').setView([field.fieldLocation.x, field.fieldLocation.y], 7);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add an initial marker for the current location
        let marker = L.marker([field.fieldLocation.x, field.fieldLocation.y]).addTo(map);

        // Event listener for map clicks to update latitude and longitude
        map.on('click', function (e) {
            const latlng = e.latlng;
            updatedlatitude = latlng.lat.toFixed(6);
            updatedlongitude = latlng.lng.toFixed(6);

            // Update the input field with the new coordinates
            $('#location1').val(`${updatedlatitude}, ${updatedlongitude}`);

            // If a marker already exists, remove it
            if (marker) {
                map.removeLayer(marker);
            }

            // Add a new marker at the clicked location
            marker = L.marker([updatedlatitude, updatedlongitude]).addTo(map);
        });

        $("#exampleModalLong1").modal('show');
    });
}

// Function to update a field
function UpdateField() {
    // Convert updated latitude and longitude to float
    const latitudeFloat1 = parseFloat(updatedlatitude);
    const longitudeFloat1 = parseFloat(updatedlongitude);


    let lat=parseInt(latitudeFloat1)
    let lon=parseInt(longitudeFloat1)
    let token = localStorage.getItem("token");
    let FieldId = $(`#FieldId1`).val();
    let name = $(`#name1`).val();
    let StaffId = $(`#StaffId1`).val();
    let ExtentSize = $(`#ExtentSize1`).val();
    let logId = $(`#logId1`).val();
    let image1 = $(`#image11`)[0].files[0];
    let image2 = $(`#image21`)[0].files[0];

    // FormData to send to the backend
    let formData = new FormData();
    formData.append("fieldName", name);
    formData.append("fieldLocation[x]", lon); // Correct updated latitude
    formData.append("fieldLocation[y]", lat); // Correct updated longitude
    formData.append("extent_size", ExtentSize);
    formData.append("fieldImageOne", image1);
    formData.append("fieldImageTwo", image2);
    formData.append("Field_Staff", StaffId);
    formData.append("logCode", logId);

    $.ajax({
        method: "PUT",
        url: `http://localhost:8080/api/v1/field/${FieldId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function () {
            $("#exampleModalLong1").modal('hide');
            getAllFields(); // Refresh the field list
            alert("Field updated successfully!");
        },
        error: function () {
            alert("Error updating the Field. Please try again.");
        }
    });
}
