const express = require('express');
const {mock} = require('mockjs');

const router = new express.Router();


router.get('/banner', (req, res)=>{
    let data = mock({
        code: 0,
        message: 'ok',
        'data|5': [
            {'id|+1': 1, bgColor:"@color", imgPath: '@image(320x240, @bgColor, @id)'}
        ]
    });
    res.json(data);
})


module.exports =router;