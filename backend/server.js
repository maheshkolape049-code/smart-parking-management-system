const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const db = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "parking",
  password: process.env.DB_PASSWORD || "parking123",
  database: process.env.DB_NAME || "smartparking"
});

app.get("/api/slots", async (req,res) => {
  try {
    const [rows] = await db.query("SELECT * FROM slots ORDER BY slot_number");
    res.json(rows);
  } catch(e) {
    res.status(500).json({message:"Database error"});
  }
});

app.post("/api/book", async (req,res) => {
  const {vehicle, owner, slot} = req.body;
  if(!vehicle || !owner || !slot)
    return res.status(400).json({message:"Please fill all fields."});

  try {
    const [rows] = await db.query(
      "SELECT status FROM slots WHERE slot_number=?",[slot]
    );

    if(!rows.length || rows[0].status !== "available")
      return res.status(400).json({message:"Slot is not available."});

    await db.query(
      "INSERT INTO bookings(vehicle_number,owner_name,slot_number) VALUES(?,?,?)",
      [vehicle.toUpperCase(),owner,slot]
    );

    await db.query(
      "UPDATE slots SET status='booked' WHERE slot_number=?",[slot]
    );

    res.json({message:"Slot booked successfully!"});
  } catch(e) {
    res.status(500).json({message:"Booking failed."});
  }
});

app.listen(3000,"0.0.0.0",() => console.log("Smart Parking running on port 3000"));
