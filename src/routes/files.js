const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const File = require('../models/files')
const sendMail = require('../services/emailService')
const renderMailTemplate = require('../services/emailTemplate')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if(!fs.existsSync('uploads')){
            fs.mkdirSync('uploads')
            return cb(null, 'uploads')
        }
        
        return cb(null, 'uploads')
        
    },
    filename: function (req, file, cb) {

        const filename = `${Date.now()}-${Math.floor(Math.random() * 1E9)}${path.extname(file.originalname)}`

        return cb(null, filename)
    }
})

let upload = multer({ 
    storage,
    limits: {
        fileSize: 1000 * 1000 * 100
    }
})

router.post('/upload', upload.single('file'), async (req, res) => {
    if(!req.file) {
        res.status(400).send({ error: 'All fields are required.'})
    }
    
    try{
        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            uuid: uuidv4()
        })
    
        const response = await file.save()
    
        //redirects to download page
        res.send({ file: `${process.env.BASE_URL}/files/${response.uuid}`})
        
    }catch(e) {
        res.status(500).send({ error: 'Something went wrong' })
    }
})

router.post('/files/send', async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body

    if(!uuid | !emailTo | !emailFrom) {
        res.status(422).send({error: 'All fields are required.'})
    }
    try{
    const file = await File.findOne({ uuid })

    sendMail({
        to: emailTo,
        from: emailFrom,
        subject: `File shared by using File Sharing App`,
        html: renderMailTemplate({
            emailFrom,
            downloadLink: `${process.env.BASE_URL}/files/download/${file.uuid}`,
            size: Math.floor(file.size / 1000 / 1000),
            expiresIn: '24 hours'
        })
    })
    res.send({ success: true})
    }catch (e) {
        res.status(500).send({ success: false, error: 'Something went wrong!'})
    }
    

})





module.exports = router