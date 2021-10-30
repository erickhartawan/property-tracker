var express = require('express');
var router = express.Router();

const User = require("../Models/User")
const Admin = require("../Models/Admin.js")

router.post('/normal', async function(req, res, next) {
    const details = req.body
    const user = await User.findOne({email: details.email, password: details.password}).exec()
    if(user != null) {

        const resp = {
            data: user
        }

        resp.status = "Success"
        resp.status_code = 200
        resp.data.password = null

        delete resp.data.password

        return res.json(resp)
    }

    res.json({
        status: "Error",
        status_code: "400",
        message : "IncorrectPassword"
    })

});


router.post('/admin', async function(req, res, next) {
    const details = req.body
    const user = await Admin.findOne({email: details.email, password: details.password}).exec()
    if( user != null) {


        const resp = {
            data: user
        }

        resp.status = "Success"
        resp.status_code = 200
        resp.data.password = null

        delete resp.data.password

        return res.json(resp)
    }

    res.json({
        status: "Error",
        status_code: "400",
        message : "IncorrectPassword"
    })

});

module.exports = router;