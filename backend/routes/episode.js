
const express = require('express')
const router = express.Router()

const {removeEP,episodesubject
    ,updateEp,getepisode,removeAllEP,getmedalsub} = require('../controllers/episodeController')



router.post('/episode',episodesubject)
router.get('/getepisode/:getepsode',getepisode)
router.get('/medalsubject/:_id',getmedalsub)
router.delete('/deleteEp/:_id',removeEP)
router.delete("/deleteAllEp/:_id",removeAllEP)
router.put('/editEP/:EP_id',updateEp)
module.exports =router 
