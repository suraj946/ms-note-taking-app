const express = require('express');
const router = express.Router();
const Note = require("../Models/Note");
const {body, validationResult} = require('express-validator');
const fetchUser = require("../middleware/fetchuser");

router.get('/fetchnotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.status(200).json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Enter a valid description').isLength({min:5})
], async(req, res)=>{
    const errors = validationResult(req)
    const {title, description, tag} = req.body;
    if(!errors.isEmpty){
        return res.status(400).json({error:errors.array()});
    }
    try {
        const note = await Note.create({
            title, description, tag, user:req.user.id
        });
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

router.put('/updatenote/:id', fetchUser, async(req, res)=>{
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note does not exists");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

router.delete('/deletenote/:id', fetchUser, async(req, res)=>{
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note does not exists");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({success:"Note has been deleted", note:note});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;