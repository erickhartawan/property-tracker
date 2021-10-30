
test('Mapping', () => {
    const latLngToString = (arr) => {
        let finalString = ""
        let latStr = arr[0].lat.toString()
        let lngStr = arr[1].lng.toString()
        finalString = `${latStr},${lngStr}`
        console.log(finalString)
        return finalString
    }

    expect(latLngToString([
        {lat: 2, lng: 3},{lat: 1, lng: 9}
    ])).toBe("2,9")
});