import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import Blog from './model/blog.model.js'
import blogRoutes from './routes/blog.routes.js'

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/blogs", blogRoutes);
  
// app.get("/blogs", async(req,res) => {
//   try{
//     const getBlog = await Blog.find({});
//     res.status(200).json(getBlog);
//   }catch(error){
//     res.status(500).json({message:error.message});
//   }
// })





mongoose.connect('mongodb+srv://ashishkalbande60:wlYsCV6bARyehtqm@userdb2.13u0s.mongodb.net/?retryWrites=true&w=majority&appName=userDB2')
  .then(() => {
    console.log('Connected !')
    app.listen(8080, () => {
      try{
        console.log("server is active on port 8080");
      }catch(error) {
        console.log("There is an error: ", error.message);
      }
    })
})
.catch((error) => console.log(error.message));
