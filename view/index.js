const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connectionUrl = "mongodb://localhost:27017/schoolDb";
mongoose.connect(connectionUrl).then(()=>

    console.log("connected to MongoDB"))
    .catch((err)=> console.log(err));



const studentSchema = mongoose.Schema({
    name: String,
    email: String,
    age:Number,
    dept:String, 
})

const Student = mongoose.model("student",studentSchema)


//Add Student
//Add Student
//Add Student
//Add Student
//Add Student
//Add Student
//Add Student
app.post("/student/single", async (req, res, next)=>{
    try{const {name,email,age,dept}= req.body;
const newStudent = new Student({
    name,email,age,dept});
await newStudent.save();
res.status(200).json({message:"student added"});
}catch(err){
    res.status(500).json({message:err.message});
    }
})




//update data 

app.put("/student/single",async (req,res, next)=>{
    try{
        const {email}= req.query;
        const {dept}= req.body;
await Student.findOneAndUpdate({email},{dept});
res.status(200).json({message:"data updated"});
    } catch (error){
        res.status(400).json({message: error.message});

    }
});


const errorMiddleware = (error, req, res, next) => {
  res.status(500).send(error.message);
};

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
