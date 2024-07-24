<script>
function loadFacilities() {
    $.ajax({
        url: 'api.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displayFacilities(data);
        },
        error: function () {
            console.error('Failed to load facilities.');
        }
    })
}


function displayFacilities(facilities) {
    var table_body = $(".table_body");

    $.each(facilities, function (index, facility) {
        var tr = $("<tr>").html(`
            <td>${facility.id}</td>
            <td>${facility.schedules}</td>
            <td>${facility.logs}</td>
            <td>${facility.inventory}</td>
            <td><button onClick="editFacility(${facility.id})">Edit</button></td>
            <td><button onClick="deleteFacility(${facility.id})">Delete</button></td>
        `);

        table_body.append(tr);
    })
}

function deleteFacility(id) {
    $.ajax({
        url: 'api.php',
        type: 'DELETE',
        data: 'id=' + id,
        success: function () {
            $('.table_body').empty();
            loadFacilities();
        },
        error: function () {
            console.error('Failed to delete facility.');
        }
    })
}


function editFacility(id) {
    $.ajax({
        url: 'api.php',
        method: 'GET',
        dataType: 'json',
        success: function (facilitiesData) {
            const facility = facilitiesData.find(d => d.id === id);
            if (facility) {
                $('#editId').val(facility.id);
                $('#editSchedules').val(facility.schedules);
                $('#editLogs').val(facility.logs);
                $('#editInventory').val(facility.inventory);
                $('#facilityList').hide();
                $('#editForm').show();
            } else {
                console.error('Failed to fetch facility data for editing.');
            }
        },
        error: function () {
            console.error('Failed to fetch facility data for editing.');
        }
    })
}

function updateFacility() {
    const id = $('#editId').val();
    const schedules = $('#editSchedules').val();
    const logs = $('#editLogs').val();
    const inventory = $('#editInventory').val();

    $.ajax({
        url: 'api.php',
        method: 'POST', // Assuming you're updating data
        data: { id, schedules, logs, inventory },
        success: function () {
            loadFacilities();
            window.location.href = 'facilities.html';
        },
        error: function () {
            console.error('Failed to update facility.');
        }
    })
}


$(document).ready(function() {
    $("#myButton").click(function() {
        var id = 123; // Replace with your actual ID
        var schedules = "some schedules"; // Replace with your actual schedules
        var logs = "some logs"; // Replace with your actual logs
        var inventory = "some inventory"; // Replace with your actual inventory

        $.ajax({
            url: "api.php",
            type: "PUT",
            data: {
                id: id,
                schedules: schedules,
                logs: logs,
                inventory: inventory
            },
            success: function(response) {
                // Handle the response here
            },
            error: function(xhr, status, error) {
                // Handle errors here
            }
        });
    });
});


</script>