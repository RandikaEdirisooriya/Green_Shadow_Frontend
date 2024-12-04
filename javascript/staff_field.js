let firstname, lastname, designation, buildingName, laneName, city, postalCode, gender, email, role, logId, Province, contact_No, dob, joinedDate;
$(document).ready(function() {
    getAllStaff();

});
function getstaffById(StaffID, callback) {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/staff/" + StaffID,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log(data);
            // Assign staff data to variables
            firstname = data.firstName;
            lastname = data.lastName;
            designation = data.designation;
            buildingName = data.buildingName;
            laneName = data.laneName;
            city = data.city;
            postalCode = data.postalCode;
            gender = data.gender;
            email = data.email;
            role = data.role;
            logId = data.logId;
            Province = data.Province;
            contact_No = data.contact_No;
            dob = data.dob;
            joinedDate = data.joinedDate;

            // Call the callback function after data is fetched
            callback();
        },
        error: function () {
            alert("Error fetching staff details.");
        }
    });
}

function addFieldStaff() {
    let FieldId = $("#FieldId").val();
    let StaffID = $("#StaffID").val();

    // Fetch staff data before proceeding
    getstaffById(StaffID, function() {
        let token = localStorage.getItem("token");

        $.ajax({
            method: "PUT",
            url: "http://localhost:8080/api/v1/staff/" + StaffID,
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json",
            data: JSON.stringify({
                "firstName": firstname,
                "lastName": lastname,
                "designation": designation,
                "gender": gender,
                "joinedDate": joinedDate,
                "dob": dob,
                "addressOne": buildingName,
                "addressTwo": laneName,
                "addressThree": city,
                "addressFour": postalCode,
                "addressFive": Province,
                "contact_No": contact_No,
                "email": email,
                "role": role,
                "fields": [
                    {
                        "fieldCode": FieldId
                    }
                ],
                "LogId": logId
            }),
            success: function () {
                getAllStaff(); // Refresh staff list after adding field
                alert("Field Added");
            },
            error: function () {
                alert("Error updating staff.");
            }
        });
    });
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
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function (staff) {
                    let fieldsList = staff.fields.map(field => field.fieldCode).join(", ");
                    let row = `<tr class="tbody">
                        <td style="padding-left: 100px">${staff.staffId}</td>
                        <td>${fieldsList}</td>
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
            } else {
                $("table tbody").empty();
                $("table tbody").append("<tr><td colspan='12' class='text-center'>No available</td></tr>");
            }
        },
        error: function () {
            alert("Error fetching staff data.");
        }
    });
}
