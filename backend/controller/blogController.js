const Joi = require('joi');
const fs = require('fs');
const Blog = require('../models/blogs');
const { BACKEND_SERVER_PATH } = require('../config/index');
const BlogDTO = require('../dto/blog');


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const blogController = {
    async create(req, res, next) {
        //validate req 
        const createBlogSchema = Joi.object({
            title:Joi.string().required(),
            author:Joi.string().regex(mongodbIdPattern).required(),
            content:Joi.string().required(),
            photo:Joi.string().required() //photo from client side->base64 encoded string->decode->store->save photo path in db
        });
        const {error} = createBlogSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {title, author,content,photo} = req.body;
        /*handling picture*/ 

        //read as buffer
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/,''),'base64');
        //allot a random name
        const imagePath = `${Date.now()}-${author}.png`;
        //save locally
        try{
            fs.writeFileSync(`storage/${imagePath}`,buffer);
        }
        catch(error){
            return next(error);
        }

        //add to db
        let newBlog;
        try{
            newBlog = new Blog({
                title,
                author,
                content,
                path:`${BACKEND_SERVER_PATH}/storage/${imagePath}`

            });
            await newBlog.save();
        }
        catch(error){
            return next(error);
        }

        const BlogDto = new BlogDTO(newBlog);

        //return response
        return res.status(201).json({blog:BlogDto});
    },
    async getAll(req, res, next) {

    },
    async getById(req, res, next) {

    },
    async update(req, res, next) {

    },
    async delete(req,res, next) {

    }
}
module.exports = blogController;