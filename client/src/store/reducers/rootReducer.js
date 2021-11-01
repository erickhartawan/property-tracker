const initState = {
    apiResponse: {data:[]}, //array of entries in form of apiResponse.data = [[0],[1],[2]...]
    suburb: "No Data", //Current suburb selected
    address: ["none", "none"], //address String[] array [HOUSE_NUM, STREET NAME]
    price: "N/A",
    maxPrice: 1000000,
    numSold: "N/A",
    latlngarr: {
        lat: -33.7736594370602,
        lng: 151.11362303011666,
    },
}

const rootReducer = (state = initState, action) => {
    console.log("REDUCER CALLED")

    if (action.type === "SET_API_RES") {
        console.log("REDUX SET_API CALL RECEIVED:", action.apiResponse)
        //check if apiResponse has data
        //check if address is == address in address arr
        //set data
        var res = action.apiResponse.data
        var curr = res[res.length - 1]
        if (res.length > 0) {
            if (
                state.address[0] == curr.P_H_Num &&
                state.address[1].toUpperCase() == curr.P_S_Name
            ) {
                console.log("DATA MATCHED TO APIRESPONSE", res)
                return {
                    ...state,
                    apiResponse: action.apiResponse,
                    price: currencyFormat.format(parseInt(curr.P_Price)),
                    numSold: res.length,
                    maxPrice: getMaxPrice(res)
                }
            } else {
                console.log("DATA NO MATCH TO APIRESPONSE")
                return {
                    ...state,
                    apiResponse: action.apiResponse,
                    price: "N/A",
                    numSold: "N/A",
                    maxPrice: 0,
                }
            }
        }
        console.log("APIRESPONSE NO DATA")
        return {
            ...state,
            apiResponse: action.apiResponse,
        }
    }

    if (action.type === "SET_SUBURB") {
        console.log("REDUX SET_SUBURB CALL RECEIVED:", action.suburb)
        return {
            ...state,
            suburb: action.suburb,
        }
    }
    if (action.type === "SET_ADDRESS") {
        console.log("REDUX SET_ADDRESS CALL RECEIVED:", action.address)
        return {
            ...state,
            address: action.address,
        }
    }
    if (action.type === "SET_PRICE") {
        console.log("REDUX SET_PRICE CALL RECEIVED:", action.price)
        return {
            ...state,
            price: action.price,
        }
    }
    if (action.type === "SET_NUMSOLD") {
        console.log("REDUX SET_NUMSOLD CALL RECEIVED:", action.numSold)
        return {
            ...state,
            numSold: action.numSold,
        }
    }
    if (action.type === "SET_LATLNG") {
        console.log("REDUX SET_ADDRESS CALL RECEIVED:", action.latlngarr)
        return {
            ...state,
            latlngarr: action.latlngarr,
        }
    }
    return state
}

var currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

const getMaxPrice = (data) => {
    var max = 0
    data.map(d => {
        var intPrice = parseInt(d.P_Price)
        if(intPrice > max){
            max = intPrice
        }
    })
    return max
}

export default rootReducer
