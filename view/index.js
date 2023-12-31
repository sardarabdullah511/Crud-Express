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




app.put("/student/single/:id",async (req,res, next)=>{
    try{
        const {id}= req.params;
        const {dept}= req.body;

        const student = await Student.findById(id);
        student.dept = dept;
        await student.save();
res.status(200).json({message:"data updated"});
    } catch (error){
        res.status(400).json({message: error.message});

    }
});



//getting student record

app.get("/student/single/:studentId",async (req,res, next)=>{
    try{
        const {studentId}= req.params;

        const student = await Student.findById(studentId);
res.status(200).json({data: student});
    } catch (error){
        res.status(400).json({message: error.message});

    }
});


//getting multiple student record

app.get("/student/multiple",async (req,res, next)=>{
    try{
        const {dept}= req.query;

        const students = await Student.find({dept});
res.status(200).json({data: students});
    } catch (error){
        res.status(400).json({message: error.message});

    }
});




app.get("/student/single",async (req,res, next)=>{
    try{
        const {email}= req.query;

        const student = await Student.findOne({email});
       if(!student) return res.status(400).json({message:'Student not found'});

res.status(200).json({data: student});
    } catch (error){
        res.status(400).json({message: error.message});

    }
});


app.delete("/student/single",async (req,res, next)=>{
    try{
        const {email}= req.query;

      const student= await Student.findOneAndDelete({email});
      if(!student) return res.status(400).json({message:'Student not found'});


res.status(200).json({message:"student deleted successfuly"});
    } catch (error){
        res.status(400).json({message: error.message});

    }
});




app.delete("/student/single/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const student = await Student.findById(id);
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      const deletedStudent = await Student.findByIdAndDelete(id);
  
      if (!deletedStudent) {
        return res.status(500).json({ message: "Failed to delete student" });
      }
  
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


const errorMiddleware = (error, req, res, next) => {
  res.status(500).send(error.message);
};

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
