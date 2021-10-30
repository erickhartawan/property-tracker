const express = require("express")

const jsonRouter = express.Router({ mergeParams: true })

const suburbRouter = express.Router()

jsonRouter.route("/").get((req, res) => {})
