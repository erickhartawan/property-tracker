import { API } from "./API"
import React, { Component, useState } from "react"
import axios from "axios"
import { connect } from 'react-redux'

//Function sends API response to backend and returns the result of the response
//Params: Latitude/Longitude array 
//Return: JSON String
const SendAPI = (latlngarr, props) => {
    const latLngStr = latLngToString(latlngarr)
    const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    const suffixURL = `&result_type=street_address&key=${API}`
    const finalURL = `${baseURL}${latLngStr}${suffixURL}`
    axios
    .get(finalURL)
    .then((res) => {
        const { plus_code, results, status } = res.data
        if (status == "OK") {
            const suburb = res.data.results[0].address_components[2].long_name
            props.setSuburb(suburb) //REDUX SUBURB SET
            let listOfAddr = []
            res.data.results.forEach((el) => {
                let temp = []
                let num = el.address_components[0].long_name
                let stName = el.address_components[1].short_name
                temp.push(num)
                temp.push(stName)
                listOfAddr.push(temp)
            })
            props.setAddress(listOfAddr[0]) //REDUX ADDRESS SET
            axios
                .post("http://localhost:5000/api", {
                    suburb: suburb,
                    addrs: listOfAddr, //if it breaks I suspect it is this line
                })
                .then((res) => {
                    console.log(res.data)
                    props.setApiResponse(res.data) //REDUX API RESPONSE SET
                })
        } else if (status == "ZERO_RESULTS") {
            alert("No result")
        }
    })
    .catch((e) => {
        throw e
    })
}

const latLngToString = (arr) => {
    let finalString = ""
    let latStr = arr[0].lat.toString()
    let lngStr = arr[1].lng.toString()
    finalString = `${latStr},${lngStr}`
    return finalString
}

const mapDispatchToProps = (dispatch) => {
    return{
        setApiResponse: (apiResponse) => { dispatch({type: 'SET_API_RES', apiResponse: apiResponse})},
        setSuburb: (suburb) => { dispatch({type: 'SET_SUBURB', suburb: suburb})},
        setAddress: (address) => { dispatch({type: 'SET_ADDRESS', address: address})},
        setLatLng: (latlngarr) => { dispatch({type: 'SET_LATLNG', latlngarr: latlngarr})}
    }
}

export default connect(mapDispatchToProps)(SendAPI)