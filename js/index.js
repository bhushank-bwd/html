btnLoading =
  '<span class="spinner-border spinner-border-sm"></span>&nbspLoading..';
toastr.options = {
  closeButton: true,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
$(document).ready(function () {
  $("#example").DataTable({
    serverSide: true,
    ajax: {
      url: "http://localhost:8080/ci3/get-all-users",
      type: "GET",
    },
    order: [[1, "asc"]],
    columnDefs: [{ orderable: false, targets: [0, 5] }],
    columns: [
      { data: "srno" },
      { data: "name" },
      { data: "mob" },
      { data: "email" },
      { data: "address" },
      { data: "action" },
    ],
  });
  $("#example").on("click", ".del", function () {
    let user_id = $(this).attr("data-id");
    console.log(user_id);
    swal({
      title: "Are you sure?",
      text: "You are deleting user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $(this).attr("disabled", true).html(btnLoading);
        $.ajax({
          url: "http://localhost:8080/ci3/delete-user",
          type: "POST",
          data: { user_id },
          dataType: "json",
          success: function (response) {
            if (response.status) {
              toastr.success(response.message);
              $(this).attr("disabled", false).html("delete");
              setTimeout(function () {
                location.reload();
              }, 2000);
            } else {
              toastr.error(response.message);
            }
          },
          error: function (jqXHR, exception) {
            console.log(getError(jqXHR));
          },
        });
      }
    });
  });
});
function getError(jqXHR) {
  var msg = "";
  if (jqXHR.status === 0) {
    msg = "Not connect.\n Verify Network.";
  } else if (jqXHR.status == 404) {
    msg = "Requested page not found. [404]";
  } else if (jqXHR.status == 500) {
    msg = "Internal Server Error [500].";
  } else if (exception === "parsererror") {
    msg = "Requested JSON parse failed.";
  } else if (exception === "timeout") {
    msg = "Time out error.";
  } else if (exception === "abort") {
    msg = "Ajax request aborted.";
  } else {
    msg = "Uncaught Error.\n" + jqXHR.responseText;
  }
}
