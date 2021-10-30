// Basic router
const express = require("express")
const cors = require("cors")
const jsonServer = require("json-server")
const { default: axios } = require("axios")
const { SystemUpdate } = require("material-ui-icons")

const app = express()
app.use(express.static("build"))
app.use(express.json())
app.use(cors())

const baseUrl = "https://propertytracker.s3.us-west-1.amazonaws.com/"
const suffix = "_data.json"
//suburb name to be taken from front end and space needs to be replaced with "+".
// also ALL UPPER CASE FOR SUBURB NAME

const subRouter = express.Router()

const constructDbUrl = (string) => {
    const suburbUpper = string.replace(" ", "+").toUpperCase()
    return `${baseUrl}${suburbUpper}${suffix}`
}

/*
    Front end will include these in the request
    1. String suburb => suburb of the address. this will be used to retrieve json file
    2. Array of Array<String> addrs =>  array of address sent back by geocoding api 
        Array<String> first element is street number. second element is st name
*/
subRouter.route("/").post((req, res) => {
    const { suburb, addrs } = req.body
    console.log(`received request for ${addrs}| ${suburb}`)
    // Construct URL by concat strings
    const dbURL = constructDbUrl(suburb)

    axios
        .get(dbURL)
        .then((result) => {
            const awsRes = result.data.Entries
            //Error handling: Suburb not in entries
            if (!awsRes) {
                res.json({ message: "we do not have entry for this suburb" })
            }
            let UpperStreetName = addrs[0][1].toUpperCase()
            let houseNum = addrs[0][0]
            console.log("Street name to look for:", UpperStreetName)
            console.log("House number to look for:", houseNum)
            //Find data in (SUBURB)_data.json
            const filteredData = awsRes.filter(
                (item) =>
                    item.P_H_Num === houseNum &&
                    item.P_S_Name === UpperStreetName
                //console.log(item.P_S_Name == UpperStreetName)
            )
            console.log("filtering complete: ", filteredData.length)
            // suburb found but no data for the particular property
            if (!filteredData) {
                res.json({ message: "we do not have data for your property" })
            }
            //return data to front end
            res.json({ data: filteredData })
        })
        .catch((err) => {
            console.log("unable to retrieve data from server")
            throw err
        })
})
const status_router = require("./routes/server.status.route")
app.use("/api", subRouter, status_router)
module.exports = app
