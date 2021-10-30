const Sideinfo = (api) =>{
    console.log("Sideinfo: ApiResponse:",api.api.data)
    let passedparam = api.api.data
    if(passedparam != undefined){
        let arr = passedparam
        if(passedparam.length > 0){
            return(
                <div>
                    <p>Most recent contract: {arr[arr.length-1].C_Date}</p>
                    <p>Most recent Sale Price: {arr[arr.length-1].P_Price}</p>
                    {arr.map(entry => 
                        <div>
                            <p>{entry.P_H_Num} {entry.P_S_Name}, {entry.P_Sub}</p>
                            <p>Purchased: {entry.C_Date}</p>
                            <p>Price: {entry.P_Price}</p>
                        </div>
                    )}
                </div>
            )
        } else {
            return(
                <div>
                    <p>No entry found for selected building.</p>
                </div>
            )
        }
    } else {
        return(
            <div>
                <p>Nothing here</p>
            </div>
        )
    }
}

export default Sideinfo