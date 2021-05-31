const path = require('path')
const router = require('express').Router()
const File = require('../models/files')

router.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid

    try{
        const file = await File.findOne({ uuid })

        if(!file){  
            res.render('download', {
                error: 'File download link has been expired!'
            })
        }

        res.render('download', {
            filename: file.filename,
            size: file.size,
            download: `${process.env.BASE_URL}/files/download/${file.uuid}`
        })

    }catch(e) {
        res.render('download', { error: 'Something went wrong!' })
    }
    

})

router.get('/download/:uuid', async (req, res) => {
    uuid = req.params.uuid

    try{
        const file = await File.findOne({ uuid })

        if(!file) {
            res.render('Error', {
                message: 'File download link has been expired!'
            })
        }

        res.download(path.join(__dirname, `../../${file.path}`))

    }catch(e){
        req.status(500).send({ error: 'Something went wrong!' })
    }
})



module.exports = router