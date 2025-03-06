import express from "express";
import {Book} from "../model/books.js";

const router = express.Router(); 



router.get("/",async (req,res)=>{
   
    try {
        const books = await Book.find();
        res.status(200).json({ total: books.length, books });
      } catch (error) {
        res.status(500).json({ error: "Error fetching books", details: error.message });
      }


    });
router.get("/view/:id",async (req,res)=>{
    const id=req.params.id;
     const book= await Book.findById(id);
     res.json(book);

})
router.put("/update/:id", async (req,res)=>{
    const id=req.params.id;

  
 
        const update= await Book.findByIdAndUpdate(id, req.body
      
        );

           res.json(update);
  
}
)

router.post("/create",async (req,res)=>{
    try{
        const {title,author,publishedYear}=req.body;
        const book = await Book.create({
            title,
            author,
            publishedYear
        });
        res.json(book);
    }
    catch{
        res.send("baba ji ka thullu");
    }
})

router.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    const book= await Book.findByIdAndDelete(id);
    res.send("done");

})
export default router
