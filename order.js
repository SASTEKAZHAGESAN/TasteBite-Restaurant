function orderFood() {
  let name = document.getElementById("name").value;
  let mobile = document.getElementById("mobile").value;
  let food = document.getElementById("food").value;
  let location = document.getElementById("location").value;

  if (name === "" || mobile === "" || location === "") {
    alert("Please fill all fields");
    return false;
  }

  alert("✅ Order placed successfully!");

  return false; // stop page reload
}
