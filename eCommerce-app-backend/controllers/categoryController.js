import colors from 'colors'
import { validationResult } from 'express-validator'
import slugify from 'slugify'

import categoryModel from '../models/categoryModel.js'
import e from 'express'


export const createCategoryController = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors.array())
            res.status(400).json({ success: false, msg: "Error creating category" })
        } else {
            const { name } = req.body

            const existingCategory = await categoryModel.findOne({ name });
            if (existingCategory) {
                res.status(200).json({
                    success: true,
                    msg: "Category Already Exisits",
                });
            } else {
                const slug = slugify(name)
                const category = await categoryModel.create({
                    name,
                    slug
                })

                res.json({ success: true, data: category })
            }
        }
    } catch (error) {
        console.log(`Error creating category. Error ${error}`.bgRed.white)
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const categoryControlller = async (req, res) => {
    try {
        const slug = req.params.slug

        if (slug) {
            console.log('category ', slug)
            const category = await categoryModel.find({ slug })

            res.status(200).send({
                success: true,
                data: category,
            });

        } else {

            const categories = await categoryModel.find({});

            res.status(200).send({
                success: true,
                data: categories,
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
        });
    }
};