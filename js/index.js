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
  $("#example").on("click", ".edit", function () {
    let user_id = $(this).attr("data-id");
    resetForm();
    $.ajax({
      url: "http://localhost:8080/ci3/get-user",
      type: "POST",
      data: { user_id },
      dataType: "json",
      success: function (response) {
        if (response.status) {
          console.log(response);
          $("#name").val(response.user.name);
          $("#address").val(response.user.address);
          $("#email").val(response.user.email);
          $("#mob").val(response.user.mob);
          $("#user_id").val(user_id);
          $("#modalTitleId").html("Update User");
          $("#userModal").modal("show");
        } else {
          toastr.error(response.message);
        }
      },
      error: function (jqXHR, exception) {
        console.log(getError(jqXHR));
      },
    });
  });
  $("#user_action").validate({
    errorElement: "span",
    submitHandler: function (form) {
      console.log("user_action");
      var button_name = $("#submit_user")
        .attr("disabled", false)
        .html(btnLoading);
      var formData = new FormData($("#user_action")[0]);
      let user_id = $("#user_id").val();
      if (user_id == 0) {
        route = "add-user";
      } else {
        route = "update-user";
      }
      console.log(form);
      $.ajax({
        url: "http://localhost:8080/ci3/" + route,
        type: "POST",
        data: formData,
        async: true,
        dataType: "JSON",
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
          console.log(response.status);
          resetForm();
          $("#userModal").modal("hide");
          if (response.status) {
            toastr.success(response.message);
            setTimeout(function () {
              location.reload();
            }, 2000);
          } else {
            toastr.error(response.message);
          }
          $("#submit_user").attr("disabled", false).html("Submit");
        },
      });

      return false;
    },
  });
  $("#add_user").click(function () {
    resetForm();
    $("#modalTitleId").html("Add User");
    $("#userModal").modal("show");
  });
});
function resetForm() {
  $(".form-inputs").val("");
  $("#user_id").val(0);
}
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
