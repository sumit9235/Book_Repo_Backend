const express= require('express')
const bookRouter=express.Router()
const {BookModel}=require("../model/book.model")


bookRouter.get("/getBook",async(req,res)=>{

    try {
        const data = await BookModel.find()
        res.status(200).send({"'books":data});
    } catch (err) {
        res.status(200).send(err.message);
    }

})

bookRouter.post("/add",async(req,res)=>{

    const payload=req.body;
    try {
        const book = new BookModel(payload);
        await book.save()
        res.send({"msg":"Book added successfully"});
    } catch (err){
        res.send({"error":err.message})
    }

})

bookRouter.delete("/delete/:id",async(req,res)=>{

    const id = req.params.id;
    try {
        await BookModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Deleted sucessfully"})
    } catch (err) {
        res.send({"error":err.message})
    }

})

bookRouter.get('/sorted-ASC', async (req, res) => {

    try {
      const sortedBooks = await BookModel.find().sort({ Price: 1 });
      res.json(sortedBooks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sorted books' });
    }

  });

  bookRouter.get('/sorted-DEC', async (req, res) => {

    try {
      const sortedBooks = await BookModel.find().sort({ Price: -1 });
      res.json(sortedBooks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sorted books' });
    }

  });

  bookRouter.get('/filter', async (req, res) => {

    try {
      const { genre } = req.query;
      const pipeline = [{$match: {Genre: genre}},{$sort: {Price: 1}}];
      const FilteredBooks = await BookModel.aggregate(pipeline);
      res.status(200).send({FilteredBooks});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  });

module.exports={
    bookRouter
}