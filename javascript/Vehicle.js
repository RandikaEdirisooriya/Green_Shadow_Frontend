$(document).ready(function () {
    getAllVehicles();
    getNextID()
    getStaffIds()
});

function AddVehicle() {
    let vehicleId = $("#vehicleId").val();
    let plateNumber = $("#plateNumber").val();
    let category = $("#category").val();
    let status = $("#status").val();
    let fuelType = $("#fuelType").val();
    let staff = $("#staff").val();

    let token = localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/vehicle",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: "application/json",
        data: JSON.stringify({
            "vehicleCode": vehicleId,
            "licensePlateNumber": plateNumber,
            "vehicleCategory": category,
            "fuelType": fuelType,
            "status": status,
            "staffId": staff
        }),
        success: function (response) {
            getNextID();
            clearForm();
            getAllVehicles(); // Refresh the table after adding
            Swal.fire({
                icon: 'success',
                title: 'Vehicle Added!',
                text: 'The Vehicle was added successfully!',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error saving the Vehicle.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

function clearForm() {
    $("#vehicleId").val("");
    $("#plateNumber").val("");
    $("#category").val("");
    $("#status").val("");
    $("#fuelType").val("");
    $("#staff").val("");
}

function getAllVehicles() {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/vehicle",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function (vehicle) {
                    let row = `<tr>
                        <td>${vehicle.vehicleCode}</td>
                        <td>${vehicle.status}</td>
                        <td>${vehicle.licensePlateNumber}</td>
                        <td>${vehicle.vehicleCategory}</td>
                        <td>${vehicle.fuelType}</td>
                        <td>${vehicle.staffId || 'N/A'}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-link text-warning p-0 me-2 edit-btn" data-id="${vehicle.vehicleCode}" data-log='${JSON.stringify(vehicle)}'>
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-link text-danger p-0 delete-btn" data-id="${vehicle.vehicleCode}">
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
                $("table tbody").append("<tr><td colspan='7' class='text-center'>No vehicles available</td></tr>");
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error get the Vehicles.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

function addEditAction() {
    $(".edit-btn").click(function () {
        let vehicleData = $(this).data("log");

        // Populate the form fields with the vehicle data for editing
        $("#vehicleId1").val(vehicleData.vehicleCode);
        $("#plateNumber1").val(vehicleData.licensePlateNumber);
        $("#category1").val(vehicleData.vehicleCategory);
        $("#status1").val(vehicleData.status);
        $("#fuelType1").val(vehicleData.fuelType);
        $("#staff1").val(vehicleData.staffId);
        $("#exampleModalLong1").modal('show');
    });
}

function UpdateVehicle() {
    let token = localStorage.getItem("token");
    let vehicleCode = $("#vehicleId1").val();
    let updatedVehicle = {
        licensePlateNumber: $("#plateNumber1").val(),
        vehicleCategory: $("#category1").val(),
        fuelType: $("#fuelType1").val(),
        status: $("#status1").val(),
        staffId: $("#staff1").val()
    };

    $.ajax({
        method: "PUT",
        url: `http://localhost:8080/api/v1/vehicle/${vehicleCode}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: "application/json",
        data: JSON.stringify(updatedVehicle),
        success: function (response) {
            clearForm();
            getAllVehicles(); // Refresh the table after updating
            Swal.fire({
                icon: 'success',
                title: 'Log Updated!',
                text: 'The vehicle was updated successfully!',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error updating the vehicle.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

function addDeleteAction() {
    $(".delete-btn").click(function () {
        let vehicleId = $(this).data("id");
        Swal.fire({
            title: `Are you sure you want to delete vehicle ID: ${vehicleId}?`,
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: 'rgba(65,65,66,0.18)'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVehicle(vehicleId);
            }
        });
    });
}

function deleteVehicle(vehicleId) {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/v1/vehicle/${vehicleId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (response) {
            getAllVehicles(); // Refresh the table after deletion
            Swal.fire({
                icon: 'success',
                title: 'Vehicle Deleted',
                text: 'The vehicle has been deleted successfully!',
                confirmButtonText: 'OK'
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete vehicle: ' + error,
                confirmButtonText: 'OK'
            });
        }
    });
}
function getNextID(){
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/vehicle/nextcode",
        headers: {
            "Authorization": "Bearer " + token
        },

        success: function (data) {
            console.log(data.data)
            $(`#vehicleId`).val(data.data);

        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error get the ID.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}
function getStaffIds(){
let token = localStorage.getItem("token");
$.ajax({
    method: "GET",
    url: "http://localhost:8080/api/v1/staff/ids",
    headers: {
        "Authorization": "Bearer " + token
    },
    success: function (data) {
        $("#staff").empty().append(`<option value="">Select Staff</option>`);
        // Empty and populate #FieldId1
        $("#staff1").empty().append(`<option value="">Select Staff</option>`);

        data.forEach(function (id) {
            $("#staff").append(`<option value="${id}">${id}</option>`);
            $("#staff1").append(`<option value="${id}">${id}</option>`);
        });
    },
    error: function () {
        alert("Error fetching staff IDs.");
    }
});
}