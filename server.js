const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"Azhval@2511",
    database:"foodhub",
    port:3306

});

db.connect((err)=>{

    if(err){

        console.log(err);

    }

    else{

        console.log("✅ MySQL Connected");

    }

});


// Home Page

app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/home.html");

});


// Place Order

app.post("/order",(req,res)=>{

    const{

        name,
        mobile,
        food,
        price,
        quantity,
        total,
        location

    }=req.body;


    if(

        !name ||
        !mobile ||
        !food ||
        !price ||
        !quantity ||
        !total ||
        !location

    ){

        return res.json({

            success:false,
            message:"Please Fill All Fields"

        });

    }


    const sql=`

    INSERT INTO user_orders

    (

        name,
        mobile,
        food,
        price,
        quantity,
        total,
        location

    )

    VALUES(?,?,?,?,?,?,?)

    `;


    db.query(

        sql,

        [

            name,
            mobile,
            food,
            price,
            quantity,
            total,
            location

        ],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.json({

                    success:false,
                    message:"Database Error"

                });

            }

            res.json({

                success:true,
                orderId:result.insertId

            });

        }

    );

});


app.listen(3000,()=>{

    console.log("🚀 Server Running on http://localhost:3000");

});