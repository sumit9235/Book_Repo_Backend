const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    Title:String,
    Author:String,
    Genre:String,
    Description:String,
    Price:Number
},{
    versionKey:false
})


const BookModel=mongoose.model("book",bookSchema)

module.exports={
    BookModel
}