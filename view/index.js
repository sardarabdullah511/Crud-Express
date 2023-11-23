const express = require("express");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

const connectionUrl = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(connectionUrl);

client
  .connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

const db = client.db("schoolDb");
const student = db.collection("student");
app.post("/student", (req, res, next) => {
    const {name,email,age, dept}=req.body;
  student
    .insertOne({
      name: name,
      email: email,
      age: age,
      dept: dept,
    })
    .then(() => res.status(201).send("student add successfull"))
    .catch((error) => res.status(500).send(error.message));
});


//get student
app.get("/student", (req, res, next) => {
  const {name}= req.query
    student
  .findOne({name:name})
  .then((data) => res.send(data))
  .catch((error)=> res.send(error.message));
  });


// update student 
app.put("/student",(req,res,next)=>{
    const {email}= req.query;
    const {name}= req.body;
    student.findOneAndUpdate({email},{$set:{name:name}})
    .then((data)=>{
        res.status(200).json({message:"student updated"});
        })
    .catch((error)=>{
        res.status(500).json({message:error.message});
        })
})

// delet student 
app.delete("/student",(req,res,next)=>{
    const {email}= req.query;
    student.findOneAndDelete({email:email})
    .then((data)=>{
        
        res.status(200).json({message:"student deleted successfully"});
        })
    .catch((error)=>{
        res.status(500).json({message:error.message});
        })
})






const errorMiddleware = (error, req, res, next) => {
  res.status(500).send(error.message);
};

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
