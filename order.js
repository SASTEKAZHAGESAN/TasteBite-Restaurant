const foodPrices = {

    "Veggie Cheese Burger":149,
    "Large Chicken Burger":199,
    "Peri Peri Burger":179,

    "Cheesy Pizza":249,
    "Chicken Pizza":299,
    "Peri Peri Pizza":279,

    "Mojito":99,
    "Strawberry Milkshake":149,
    "Kitkat MilkShake":169

};

// Update Price & Total
function updateTotal(){

    const food=document.getElementById("foods1").value;

    const quantity=parseInt(document.getElementById("quantity").value);

    const price=foodPrices[food] || 0;

    const total=price*quantity;

    document.getElementById("price").value="₹"+price;

    document.getElementById("total").innerHTML=total;

}

document.getElementById("foods1").addEventListener("change",updateTotal);

document.getElementById("quantity").addEventListener("change",updateTotal);


// Place Order

document.getElementById("ord1").addEventListener("click",async()=>{

    const name=document.getElementById("name").value.trim();

    const mobile=document.getElementById("mobileno").value.trim();

    const food=document.getElementById("foods1").value;

    const quantity=parseInt(document.getElementById("quantity").value);

    const location=document.getElementById("address1").value.trim();

    const price=foodPrices[food] || 0;

    const total=price*quantity;

    if(name=="" || mobile=="" || food=="" || location==""){

        alert("Please Fill All Fields");

        return;

    }

    if(mobile.length!=10){

        alert("Enter Valid Mobile Number");

        return;

    }

    try{

        const response=await fetch("http://localhost:3000/order",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name,
                mobile,
                food,
                price,
                quantity,
                total,
                location

            })

        });

        const data=await response.json();

        if(data.success){

            const orderId=Math.floor(Math.random()*900000)+100000;

            alert(

`🍽️ FOOD HUB

━━━━━━━━━━━━━━━━━━

✅ Order Confirmed

Order ID : ${orderId}

Customer : ${name}

Food : ${food}

Price : ₹${price}

Quantity : ${quantity}

Total : ₹${total}

Delivery Address :

${location}

Estimated Delivery

25 - 30 Minutes

Thank You ❤️

Visit Again 😊`

);

            document.getElementById("name").value="";
            document.getElementById("mobileno").value="";
            document.getElementById("foods1").value="";
            document.getElementById("price").value="";
            document.getElementById("quantity").value="1";
            document.getElementById("address1").value="";
            document.getElementById("total").innerHTML="0";

        }

        else{

            alert(data.message);

        }

    }

    catch(err){

        console.log(err);

        alert("Server Error");

    }

});