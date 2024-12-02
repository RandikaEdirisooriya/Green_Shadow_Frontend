$(document).ready(function() {
    getAllStaff();
});

function AddStaff(){
    let staffCode = $(`#staffCode`).val();
    let firstName = $(`#firstName`).val();
    let lastName = $(`#lastName`).val();
    let designation = $(`#designation`).val();
    let buildingName = $(`#buildingName`).val();
    let laneName = $(`#laneName`).val();
    let city = $(`#city`).val();
    let postalCode = $(`#postalCode`).val();
    let gender = $(`#gender`).val();
    let email = $(`#email`).val();
    let role = $(`#role`).val();
    let logId = $(`#logId`).val();
    let Province = $(`#Province`).val();
    let contact_No = $(`#contact_No`).val();
    let dob = $(`#dob`).val();
    let joinedDate = $(`#joinedDate`).val();

    let token = localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/staff",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: "application/json",
        data: JSON.stringify({
            "staffId": staffCode,
            "firstName": firstName,
            "lastName": lastName,
            "designation": designation,
            "gender": gender,
            "joinedDate": joinedDate,
            "dob": dob,
            "addressOne": buildingName,
            "addressTwo": laneName,
            "addressThree": city,
            "addressFour": Province,
            "addressFive": postalCode,
            "contact_No": contact_No,
            "email": email,
            "role": role,
            "logCode": logId

        }),
        success: function (data) {
            clearForm();
            getAllStaff();

            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: `Staff has been added successfully.`,
                showConfirmButton: false,
                timer: 2000,
                background: 'rgba(65,65,66,0.18)'
            });
        },
        error: function () {
            alert("Error");
        }
    });


}
function clearForm() {

    $(`#firstName`).val(" ");
    $(`#lastName`).val(" ");
    $(`#designation`).val(" ");
    $(`#buildingName`).val(" ");
    $(`#laneName`).val(" ");
    $(`#city`).val(" ");
    $(`#postalCode`).val(" ");
    $(`#gender`).val(" ");
    $(`#email`).val(" ");
    $(`#role`).val(" ");
    $(`#logId`).val(" ");
    $(`#Province`).val(" ");
    $(`#contact_No`).val(" ");
    $(`#dob`).val(" ");
    $(`#joinedDate`).val(" ");
}


function getAllStaff() {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/staff",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log(data);
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function (staff) {

                    let row = `<tr class="tbody">
                        <td>${staff.staffId}</td>
                        <td>${staff.role}</td>
                        <td>${staff.firstName}</td>
                        <td>${staff.lastName}</td>
                        <td>${staff.designation}</td>
                        <td>${staff.gender}</td>
                        <td>${staff.joinedDate}</td>
                        <td>${staff.dob}</td>
                        <td>${staff.addressTwo}</td>
                        <td>${staff.contact_No}</td>
                        <td>${staff.email}</td>
                       
                       
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-link text-warning p-0 me-2 edit-btn" data-id="${staff.staffId}" data-log='${JSON.stringify(staff)}'>
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-link text-danger p-0 delete-btn" data-id="${staff.staffId}">
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
                $("table tbody").append("<tr><td colspan='12' class='text-center'>No available</td></tr>");
            }
        },
        error: function () {
            alert("Error");
        }
    });
}

function addDeleteAction() {
    $(".delete-btn").off("click").on("click", function () {
        let staffId = $(this).data("id");
        Swal.fire({
            title: `Are you sure you want to delete Staff ID: ${staffId}?`,
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
                deleteLog(staffId);
            }
        });
    });
}

function deleteLog(staffId) {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/v1/staff/${staffId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `Staff ID ${staffId} has been deleted successfully.`,
                showConfirmButton: false,
                timer: 2000,
                background: 'rgba(65,65,66,0.18)'
            });
            getAllStaff();
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error deleting the log. Please try again.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}
function addEditAction() {
    $(".edit-btn").off("click").on("click", function () {
        let staff = $(this).data("log");

        // Populate modal fields with staff data
        $("#staffCode2").val(staff.staffId);  // Check that this ID matches your modal field
        $("#firstName1").val(staff.firstName);
        $("#lastName1").val(staff.lastName);
        $("#designation1").val(staff.designation);
        $("#buildingName1").val(staff.addressOne);
        $("#laneName1").val(staff.addressTwo);
        $("#city1").val(staff.addressThree);
        $("#Province1").val(staff.addressFour);
        $("#postalCode1").val(staff.addressFive);
        $("#gender1").val(staff.gender);
        $("#email1").val(staff.email);
        $("#role1").val(staff.role);
        $("#logId1").val(staff.logCode);
        $("#contact_No1").val(staff.contact_No);
        $("#dob1").val(staff.dob);
        $("#joinedDate1").val(staff.joinedDate);

        // Show the edit modal
        $("#exampleModalLong1").modal('show');
    });
}
function UpdateStaff(){
    let staffCode = $(`#staffCode2`).val();
    let firstName = $(`#firstName1`).val();
    let lastName = $(`#lastName1`).val();
    let designation = $(`#designation1`).val();
    let buildingName = $(`#buildingName1`).val();
    let laneName = $(`#laneName1`).val();
    let city = $(`#city1`).val();
    let postalCode = $(`#postalCode1`).val();
    let gender = $(`#gender1`).val();
    let email = $(`#email1`).val();
    let role = $(`#role1`).val();
    let logId = $(`#logId1`).val();
    let Province = $(`#Province1`).val();
    let contact_No = $(`#contact_No1`).val();
    let dob = $(`#dob1`).val();
    let joinedDate = $(`#joinedDate1`).val();
    let token = localStorage.getItem("token");
    $.ajax({
        method: "PUT",
        url: `http://localhost:8080/api/v1/staff/${staffCode}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: "application/json",
        data: JSON.stringify({
            staffId: staffCode,
            firstName: firstName,
            lastName: lastName,
            designation: designation,
            addressOne: buildingName,
            addressTwo: laneName,
            addressThree: city,
            addressFour: Province,
            addressFive: postalCode,
            gender: gender,
            email: email,
            role: role,
            logCode: logId,
            contact_No: contact_No,
            dob: dob,
            joinedDate: joinedDate
        }),
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `Staff ID ${staffCode} has been updated successfully.`,
                showConfirmButton: false,
                timer: 2000,
                background: 'rgba(65,65,66,0.18)'
            });
            getAllStaff();
        },
        error: function () {
            alert("Error");
        }
    });
}