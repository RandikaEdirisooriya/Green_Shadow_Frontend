$(document).ready(function() {
    getAllCrops(); // Load all crops on page load
});

// Function to add a new crop
function addCrop() {
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
            Swal.fire({
                icon: 'success',
                title: 'Crop Added!',
                text: 'The Crop was added successfully!',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
            getAllCrops(); // Refresh the crop list
            clearForm(); // Clear the form fields
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error saving the Crop.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

// Function to clear form inputs
function clearForm() {
    $("#cropId").val('');
    $("#category").val('');
    $("#commonName").val('');
    $("#scientificName").val('');
    $("#image").val('');
    $("#season").val('');
    $("#field").val('');
    $("#log").val('');
}

// Function to fetch all crops
function getAllCrops() {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/crop",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            if (Array.isArray(data) && data.length > 0) {
                populateTable(data);
            } else {
                $("table tbody").empty();
                $("table tbody").append("<tr><td colspan='8' class='text-center'>No crops available</td></tr>");
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch crops.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}
function populateTable(crops) {
    $(".table tbody").empty(); // Clear existing rows

    crops.forEach(crop => {
        let base64Image = crop.cropImage; // Base64 image string
        // Modify the image element to allow for preview
        let imgElement = `<img src="data:image/png;base64,${base64Image}" alt="${crop.commonName}" class="img-fluid img-thumbnail preview-image" data-bs-toggle="modal" data-bs-target="#imagePreviewModal" data-image="data:image/png;base64,${base64Image}" style="width: 30px; height: 30px; border-radius: 30px; margin-right: 50%;">`;

        let row = `
            <tr>
                <td>${crop.cropCode}</td>
                <td>${crop.category}</td>
                <td>${crop.commonName}</td>
                <td>${crop.scientificName}</td>
                <td>${imgElement}</td>
                <td>${crop.cropSeason}</td>
                <td>${crop.fieldCode}</td>
                <td>${crop.logCode}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-link text-warning p-0 me-2 edit-btn" data-crop='${JSON.stringify(crop)}'>
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button class="btn btn-link text-danger p-0 delete-btn">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        $(".table tbody").append(row);
    });

    addDeleteAction();
    addEditAction();
}

// JavaScript for opening image in modal
$(document).on("click", ".preview-image", function() {
    var imageSrc = $(this).data("image"); // Get the image source from the data attribute
    $("#previewImage").attr("src", imageSrc); // Set the modal image source to the clicked image source
});


// Function to handle delete action
function addDeleteAction() {
    $(".delete-btn").off('click').on('click', function () {
        let cropCode = $(this).closest('tr').find('td:first').text(); // Get cropCode from the first <td> of the row
        let token = localStorage.getItem("token");

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    method: "DELETE",
                    url: `http://localhost:8080/api/v1/crop/${cropCode}`,
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The Crop has been deleted.',
                            background: 'rgba(65,65,66,0.18)',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        getAllCrops(); // Refresh the crop list
                    },
                    error: function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete the Crop.',
                            background: 'rgba(65,65,66,0.18)',
                            showConfirmButton: true
                        });
                    }
                });
            }
        });
    });
}

// Function to handle edit action and show modal with crop data
function addEditAction() {
    $(".edit-btn").off("click").on("click", function () {
        let crop = $(this).data("crop"); // Get the crop data from the button's data attribute
        // Populate the modal with the crop data
        $("#cropId1").val(crop.cropCode);
        $("#category1").val(crop.category);
        $("#commonName1").val(crop.commonName);
        $("#scientificName1").val(crop.scientificName);
        $("#season1").val(crop.cropSeason);
        $("#field1").val(crop.fieldCode);
        $("#log1").val(crop.logCode);
        $("#exampleModalLong1").modal('show'); // Show the modal
    });
}

// Function to update a crop
function UpdateCrop() {
    let cropId = $("#cropId1").val();
    let category = $("#category1").val();
    let commonName = $("#commonName1").val();
    let cropImage = $("#image1")[0].files[0];
    let scientificName = $("#scientificName1").val();
    let season = $("#season1").val();
    let field = $("#field1").val();
    let log = $("#log1").val();

    let formData = new FormData();
    formData.append("cropCode", cropId);
    formData.append("commonName", commonName);
    formData.append("scientificName", scientificName);
    formData.append("cropImage", cropImage);
    formData.append("category", category);
    formData.append("cropSeason", season);


    let token = localStorage.getItem("token");

    $.ajax({
        method: "PUT",
        url: `http://localhost:8080/api/v1/crop/${cropId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Crop Updated!',
                text: 'The Crop was updated successfully!',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
            getAllCrops(); // Refresh the crop list
            $("#exampleModalLong1").modal('hide'); // Hide the modal
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update the Crop.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}
