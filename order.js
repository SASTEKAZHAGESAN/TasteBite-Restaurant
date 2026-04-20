
document.getElementById("ord1").onclick = function () {
  
  let name = document.getElementById("name").value;
  let mobile = document.getElementById("mobileno").value;
  let food = document.getElementById("foods1").value;
  let address = document.getElementById("address1").value;

  // Validation
  if (name === "" || mobile === "" || food === "" || address === "") {
    alert("Please fill all fields");
    return;
  }

  // Mobile number validation (10 digits)
  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("Enter valid 10-digit mobile number");
    return;
  }

  // Success message
  document.getElementById("demo3").innerHTML =
    "✅ Order placed successfully!<br>" +
    "Name: " + name + "<br>" +
    "Food: " + food + "<br>" +
    "Location: " + address;

};
