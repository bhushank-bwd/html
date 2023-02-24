$(document).ready(function () {
  $("#example").DataTable({
    serverSide: true,
    ajax: {
      url: "http://localhost:8080/ci3/get-all-users",
      type: "GET",
    },
    order: [[1, "asc"]],
    columnDefs: [{ orderable: false, targets: [0] }],
    columns: [
      { data: "srno" },
      { data: "name" },
      { data: "mob" },
      { data: "email" },
      { data: "address" },
    ],
  });
});
