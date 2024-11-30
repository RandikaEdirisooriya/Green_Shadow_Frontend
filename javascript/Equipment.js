$(document).ready(function () {
    getAllEquipment();
});

function addEquipment() {
    let EquipmentId = $("#EquipmentId").val().trim();
    let name = $("#name").val().trim();
    let status = $("#status").val().trim();
    let type = $("#type").val().trim();
    let field = $("#field").val().trim();
    let staff = $("#staff").val().trim();
    let token = localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/equipment",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: "application/json",
        data: JSON.stringify({
            "equipmentId": EquipmentId,
            "name": name,
            "type": type,
            "status": status,
            "staffId": staff,
            "fieldCode": field
        }),
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Equipment Added!',
                text: 'The equipment has been added successfully.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
            clearForm();
            getAllEquipment(); // Reload the equipment list
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Error adding equipment: ${xhr.responseText || error}`,
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
            console.error("Error adding equipment:", error);
        }
    });
}

function clearForm() {
    $("#EquipmentId").val('');
    $("#name").val('');
    $("#status").val('');
    $("#type").val('');
    $("#field").val('');
    $("#staff").val('');
}

function getAllEquipment() {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/equipment",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function (equipment) {
                    let row = `<tr class="tbody">
                        <td>${equipment.equipmentId}</td>
                        <td>${equipment.name}</td>
                        <td style="background: rgba(227, 242, 253, 0.14); color: rgba(118, 255, 179, 0.54);">${equipment.status}</td>
                        <td>${equipment.type}</td>
                        <td>F001</td>
                        <td>${equipment.staffId}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-link text-warning p-0 me-2 edit-btn" data-id="${equipment.equipmentId}" data-log='${JSON.stringify(equipment)}'>
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-link text-danger p-0 delete-btn" data-id="${equipment.equipmentId}">
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
                $("table tbody").append("<tr><td colspan='7' class='text-center'>No equipment available</td></tr>");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error getting the equipment list. Please try again.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

function addEditAction() {
    $(".edit-btn").off("click").on("click", function () {
        let equipment = $(this).data('log');

        $("#EquipmentId1").val(equipment.equipmentId).prop("disabled", true); // Disable editing ID
        $("#name1").val(equipment.name);
        $("#status1").val(equipment.status);
        $("#type1").val(equipment.type);
        $("#field1").val("F001");
        $("#staff1").val(equipment.staffId);

        $("#exampleModalLong1").modal('show');
    });
}

function updateEquipment() {
    let equipmentId = $("#EquipmentId1").val()
    let name = $("#name1").val().trim();
    let status = $("#status1").val().trim();
    let type = $("#type1").val().trim();
    let field = $("#field1").val().trim();
    let staff = $("#staff1").val().trim();
    let token = localStorage.getItem("token");

    $.ajax({
        method: "PUT",
        url: `http://localhost:8080/api/v1/equipment/`+equipmentId,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: "application/json",
        data: JSON.stringify({
            "name": name,
            "type": type,
            "status": status,
            "staffId": staff,
            "fieldCode": field
        }),
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Equipment Updated!',
                text: 'The equipment has been updated successfully.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
            clearForm();
            getAllEquipment(); // Reload the equipment list
            $("#addEquipmentBtn").text("Add Equipment").off("click").on("click", addEquipment);
            $("#EquipmentId").prop("disabled", false);
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Error updating equipment: ${xhr.responseText || error}`,
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
            console.error("Error updating equipment:", error);
        }
    });
}

function addDeleteAction() {
    $(".delete-btn").off("click").on("click", function () {
        let equipmentId = $(this).data("id");
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            background: 'rgba(65,65,66,0.18)'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEquipment(equipmentId);
            }
        });
    });
}

function deleteEquipment(equipmentId) {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/v1/equipment/${equipmentId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The equipment has been deleted.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
            getAllEquipment(); // Reload the equipment list
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Error deleting equipment: ${xhr.responseText || error}`,
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
            console.error("Error deleting equipment:", error);
        }
    });
}
