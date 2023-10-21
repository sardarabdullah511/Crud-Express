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
















const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
import random from 'random';

const File_PATH = './data.json';


const makeComit = n => {
    if (n===0) return simpleGit().push();
    const x = random.int(0,54);
    const y = random.int(0,5);
const Date = moment().subtract(1,'M').add(1,'d').add(x,'w').add(y,'M');



const data ={
    date:Date
}
console.log(Date)





jsonfile.writeFile(File_PATH, data, ()=>{
    simpleGit().add(File_PATH).commit(Date, {'--date': Date}).push();
makeComit.bind(this, --n) 
} )
}

makeComit(50);









const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

// Get the current date and time
const currentDate = moment();

// Subtract 30 days from the current date
const last30Days = currentDate.subtract(30, 'days');

// Format the result as a string
const formattedDate = last30Days.format();

const data = {
    date: formattedDate
}

jsonfile.writeFile(FILE_PATH, data, (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file written successfully');

        // Commit and push changes to Git
        simpleGit()
            .add(FILE_PATH)
            .commit(formattedDate, { '--date': formattedDate })
            .push((err, update) => {
                if (err) {
                    console.error('Error pushing changes to Git:', err);
                } else {
                    console.log('Changes pushed to Git:', update);
                }
            });
    }
});
