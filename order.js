document.getElementById("ord1").addEventListener("click", function () {

  const userName = document.getElementById("name").value.trim();
  const mobileNum = document.getElementById("mobileno").value.trim();
  const food = document.getElementById("foods1").value;
  const location = document.getElementById("address1").value.trim();

  if (!userName || !mobileNum || !food || !location) {
    alert("Please fill all fields ❌");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobileNum)) {
    alert("Enter a valid Indian mobile number ❌");
    return;
  }

  fetch("http://localhost:3000/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: userName,
      mobile: mobileNum,
      food,
      location
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Order confirmed ✅");

        document.getElementById("demo3").innerHTML = `
          <b>Name:</b> ${userName}<br>
          <b>Mobile:</b> ${mobileNum}<br>
          <b>Food:</b> ${food}<br>
          <b>Location:</b> ${location}
        `;
      } else {
        alert("Order failed ❌");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error ❌");
    });
});
