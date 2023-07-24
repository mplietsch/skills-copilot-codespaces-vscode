//create web server
const express = require('express');
//create a router object
const router = express.Router();
//import db module
const db = require('../models');
//import middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const methodOverride = require('method-override');
//create routes
router.get('/', (req, res) => {
    db.comment.findAll({
        include: [db.user]
    })
    .then(comments => {
        res.render('comments/index', { comments })
    })
    .catch(err => {
        console.log(err)
        res.send('Error')
    })
})
//GET /comments/new
router.get('/new', isLoggedIn, (req, res) => {
    res.render('comments/new')
})
//POST /comments
router.post('/', isLoggedIn, (req, res) => {
    db.comment.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
    })
    .then(comment => {
        console.log('Created comment', comment)
        res.redirect('/comments')
    })
    .catch(err => {
        console.log(err)
        res.render('404')
    })
})
//GET /comments/:id
router.get('/:id', (req, res) => {
    db.comment.findOne({
        where: { id: req.params.id },
        include: [db.user]
    })
    .then(comment => {
        console.log(comment)
        res.render('comments/show', { comment })
    })
    .catch(err => {
        console.log(err)
        res.render('404')
    })
})
//DELETE /comments/:id
router.delete('/:id', (req, res) => {
    db.comment.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        console.log('Deleted comment')
        res.redirect('/comments')
    })
    .catch(err => {
        console.log(err)
        res.render('404')
    })
})
//GET /comments/:id/edit
router.get('/:id/edit', (req, res) => {
    db.comment.findOne({
        where: { id: req.params.id }
    })
    .then(comment => {
        console.log(comment)
        res.render('comments/edit', { comment })
    })
    .catch(err => {
        console.log(err)
        res.render('404')
    })
})
//