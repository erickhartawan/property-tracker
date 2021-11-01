import React, { Component, useState, useEffect, createRef } from "react"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"
import axios from "axios"
import Autocomplete from "react-google-autocomplete"
import { geocodeByAddress } from "react-google-places-autocomplete"

import st from "./Map.module.css"
import { API } from "./API"
import Sideinfo from "./Sideinfo"

import { compose } from "redux"
import { connect } from "react-redux"

//Map function should take in: Props param: Latitude/Longitude <= search function
//Map function should take in: Marker params to display marker
//Map function outputs: Apiresponse -> redux store

function MapCont(props) {
    const [addrs, setAddrs] = useState([])
    const [target, setTarget] = useState()
    const [markerPos, setMarkerPos] = useState({
        lat: -33.7736594370602,
        lng: 151.11362303011666,
    })
    let mapRef = React.createRef()

    useEffect(() => {
        console.log("useeffect called")
        setMarkerPos(props.latlngarr)
        try {
            mapRef.current.map.panTo(props.latlngarr)
        } catch (err) {
            throw err
        }
    }, [props.latlngarr])

    const constructGeocodeUrl = (stringCoords) => {
        const baseURL =
            "https://maps.googleapis.com/maps/api/geocode/json?latlng="
        const suffixURL = `&result_type=street_address&key=${API}`
        return `${baseURL}${stringCoords}${suffixURL}`
    }

    const onMapClicked = (mapProps, map, clickEvent) => {
        const latLngObj = retrieveLatLng(clickEvent) // array returned
        const latLngStr = latLngToString(latLngObj) // extract array and turn them into string
        //default values set
        props.setPrice("N/A")
        props.setNumSold("N/A")
        props.setApiResponse({data:[]})
        //Marker location
        setMarkerPos(latLngObj)
        map.panTo(latLngObj)
        // construct URLx
        const geocodeUrl = constructGeocodeUrl(latLngStr)
        // send to Google's Geocoding API
        axios
            .get(geocodeUrl)
            .then((res) => {
                const { plus_code, results, status } = res.data
                if (status == "OK") {
                    const suburb = results[0].address_components[2].long_name
                    props.setSuburb(suburb)
                    let listOfAddr = []
                    res.data.results.forEach((el) => {
                        let temp = []
                        temp.push(el.address_components[0].long_name) //number
                        temp.push(el.address_components[1].short_name) //street name
                        listOfAddr.push(temp)
                    })
                    setAddrs(listOfAddr)
                    props.setAddress(listOfAddr[0])
                    axios
                        .post("http://localhost:5000/api", {
                            suburb: suburb,
                            addrs: addrs,
                        })
                        .then((res) => {
                            //console.log(res.data)
                            //setApiResponse(res.data)
                            //mapDispatchToProps(res.data)
                            props.setApiResponse(res.data)
                        })
                } else if (status == "ZERO_RESULTS") {
                    console.log("Zero Result")
                }
            })
            .catch((e) => {
                throw e
            })
    }
    // const onCenterChanged = (mapProps, map) => {
    //     console.log("onCenter Change called")
    //     map.panTo({ lat: -35.7736594370602, lng: 151.11362303011666 })
    //     // map.panTo()
    // }
    const latLngToString = (obj) => {
        return `${obj.lat.toString()},${obj.lng.toString()}`
    }

    // get latlng from clickEvent
    const retrieveLatLng = (clickEvent) => {
        return {
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng(),
        }
    }

    const [opacityState, setOpacity] = useState("80%")

    const noOpacityonClick = (clickEvent) => {
        setOpacity("100%")
    }

    const opacityOnScroll = (scrollEvent) => {
        setOpacity("80%")
    }

    const style = {
        maxWidth: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
        backgroundColor: "black",
    }

    const containerStyle = {
        position: "relative",
        maxWidth: "100%",
        height: "80vh",
        opacity: opacityState,
    }
    const divcontainer = {
        opacity: opacityState,
    }
    document.addEventListener("scroll", opacityOnScroll)
    return (
        <div className={st.container}>
            <div className={st.map} onClick={noOpacityonClick}>
                <div style={divcontainer}>
                    <Map
                        ref={mapRef}
                        resetBoundsOnResize={true}
                        google={props.google}
                        zoom={18}
                        style={style}
                        containerStyle={containerStyle}
                        onClick={onMapClicked}
                        initialCenter={{
                            lat: -33.7736594370602,
                            lng: 151.11362303011666,
                        }}
                    >
                        <Marker position={markerPos} />
                        <InfoWindow visible={true}>
                            <p>HAHAHA</p>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        apiResponse: state.apiResponse,
        latlngarr: state.latlngarr,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setApiResponse: (apiResponse) => {
            dispatch({ type: "SET_API_RES", apiResponse: apiResponse })
        },
        setSuburb: (suburb) => {
            dispatch({ type: "SET_SUBURB", suburb: suburb })
        },
        setAddress: (address) => {
            dispatch({ type: "SET_ADDRESS", address: address })
        },
        setLatLng: (latlngarr) => {
            dispatch({ type: "SET_LATLNG", latlngarr: latlngarr })
        },
        setPrice: (price) => {
            dispatch({ type: "SET_PRICE", price: price })
        },
        setNumSold: (numSold) => {
            dispatch({ type: "SET_NUMSOLD", numSold: numSold })
        },
    }
}

const enhanced = compose(
    connect(mapStateToProps, mapDispatchToProps),
    GoogleApiWrapper({
        apiKey: API,
    })
)

export default enhanced(MapCont)
