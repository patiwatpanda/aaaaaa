const express = require('express')
const router = express.Router()
const {addvideo,getVideoEP,removeVideoEP,getVideoEdit
    ,removeAllVideoSub,removeAllVideoEP,updateVideo} = require('../controllers/videoController')


router.post('/addEpVideo',addvideo)
router.get('/getVideoEP/:_id',getVideoEP)
router.get('/getEditVideo/:video_id',getVideoEdit)
router.delete("/deleteVideo/:EP_id",removeVideoEP)
router.put('/editVideo/:EPvideo_id',updateVideo)
router.delete("/deleteAllVideoSub/:_id",removeAllVideoSub)
router.delete("/deleteAllVideoEp/:_id",removeAllVideoEP)
module.exports = router