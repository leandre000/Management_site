$(document).ready(function() {
    $('#addForm').submit(function(event) {
        event.preventDefault();
        facilityManagement();
    });
});

function facilityManagement() {
    var schedules = $('#schedules').val();
    var logs = $('#logs').val();
    var inventory = $('#inventory').val();
    
    $.ajax({
        url: 'api.php',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            schedules: schedules,
            logs: logs,
            inventory: inventory
        },
        success: function () {
            window.location.href = "facilities.html";
        },
        error: function () {
            console.error('Failed to add facility.');
        }
    });
}
function editFacility(id) {
    console.log(id);
    $.get('api.php', function(facilitiesData) {
        facilitiesData.forEach(function(d) {
            if (d.id == id) {
                $('#editId').val(d.id);
                $('#editSchedules').val(d.schedules);
                $('#editLogs').val(d.logs);
                $('#editInventory').val(d.inventory);
                $('#addForm').hide();
                $('#editForm').show();
            }
        });
    }).fail(function() {
        console.error('Failed to fetch facility data for editing.');
    });
}

function updateFacility() {
    let id = $('#editId').val();
    let schedules = $('#editSchedules').val();
    let logs = $('#editLogs').val();
    let inventory = $('#editInventory').val();

    $.ajax({
        url: 'api.php',
        type: 'PUT',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id,
            schedules: schedules,
            logs: logs,
            inventory: inventory
        },
        success: function () {
            loadFacilities();
            cancelEdit();
        },
        error: function () {
            console.error('Failed to update facility.');
        }
    });
}
function cancelEdit() {
    $('#addForm').show();
    $('#editForm').hide();
}

function clearAddForm() {
    $('#schedules').val('');
    $('#logs').val('');
    $('#inventory').val('');
}









