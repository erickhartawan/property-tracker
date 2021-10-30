import axios from 'axios';

const getAdd = (finalURL, setSuburb, setResult, setAddrs, addrs, setApiResponse) => {
    axios
    .get(finalURL)
    .then((res) => {
        const { plus_code, results, status } = res.data
        if (status == "OK") {
            const suburb =
                res.data.results[0].address_components[2].long_name
            setSuburb(suburb)

            setResult(res.data)
            let listOfAddr = []
            res.data.results.forEach((el) => {
                let temp = []
                let num = el.address_components[0].long_name
                let stName = el.address_components[1].short_name
                temp.push(num)
                temp.push(stName)
                listOfAddr.push(temp)
            })
            setAddrs(listOfAddr)

            axios
                .post("http://localhost:5000/api", {
                    suburb: suburb,
                    addrs: addrs,
                })
                .then((res) => {
                    console.log(res.data)
                    setApiResponse(res.data)
                })
        } else if (status == "ZERO_RESULTS") {
            alert("No result")
        }
    })
    .catch((e) => {
        throw e
    })
}

export default { getAdd } 