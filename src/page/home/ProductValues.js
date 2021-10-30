import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Typography from "../../components/Typography"
import { white } from "material-ui/styles/colors"
import HouseIcon from "@material-ui/icons/HouseOutlined"
import BarChartOutlinedIcon from "@material-ui/icons/BarChartOutlined"
import Icon from "@material-ui/core/Icon"
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined"

import { compose } from "redux"
import { connect } from "react-redux"

const styles = (theme) => ({
    root: {
        display: "flex",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
        flexDirection: "column",
    },
    container: {
        marginLeft: 0,
        marginRight: 0,
        padding: "0px",
        display: "flex",
        position: "relative",
        width: "100vw",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "no-wrap",
    },
    item: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 55,
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    curvyLines: {
        pointerEvents: "none",
        position: "absolute",
        top: -180,
    },

    resultStyle: {
        backgroundColor: theme.palette.primary.dark,
        width: "100vw",
        height: "19vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },

    HLine: {
        width: "18vw",
    },

    resultData: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    resText: {
        color: "#35ca9b",
        fontSize: "xx-large",
        marginBottom: "0.25em",
    },
    resCaption: {
        color: "white",
        fontSize: "x-large",
    },
    threeAbout: {
        width: "100vw",
        height: "25vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
})

const ProductValues = (props) => {
    const { classes } = props
    var apiArr = props.apiResponse.data
    var currSuburb = props.suburb.toUpperCase()
    var currAddress = props.address
    var currPrice = props.price
    var currNumSold = props.numSold
    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <div className={classes.resultStyle}>
                    <div className={classes.resultData}>
                        <p className={classes.resText}>
                            {currAddress[0].toUpperCase()},{" "}
                            {currAddress[1].toUpperCase()}
                        </p>
                        <hr className={classes.HLine} />
                        <p className={classes.resCaption}>{currSuburb}</p>
                    </div>
                    <div className={classes.resultData}>
                        <p className={classes.resText}>{currPrice}</p>
                        <hr className={classes.HLine}></hr>
                        <p className={classes.resCaption}>PRICE</p>
                    </div>
                    <div className={classes.resultData}>
                        <p className={classes.resText}>{currNumSold}</p>
                        <hr className={classes.HLine}></hr>
                        <p className={classes.resCaption}>TIMES SOLD</p>
                    </div>
                </div>
                <img
                    src="/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <div className={classes.threeAbout}>
                    <div className={classes.resultData}>
                        <div className={classes.item}>
                            <BarChartOutlinedIcon style={{ fontSize: 70 }} />
                            <Typography variant="h6" className={classes.title}>
                                Current Data Set
                            </Typography>
                            <Typography variant="h5">
                                {
                                    "Our app currently uses data from 2001-2020, this data is acquired from official publicly available NSW Property Sales Information."
                                }
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.resultData}>
                        <div className={classes.item}>
                            <HistoryOutlinedIcon style={{ fontSize: 70 }} />
                            <Typography variant="h6" className={classes.title}>
                                Pricing History
                            </Typography>
                            <Typography variant="h5">
                                {
                                    "Find official sale pricing history and other relevant information of a number of NSW properties by searching or clicking on any property on the map "
                                }
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.resultData}>
                        <div className={classes.item}>
                            <HouseIcon style={{ fontSize: 70 }} />
                            <Typography variant="h6" className={classes.title}>
                                Our Purpose
                            </Typography>
                            <Typography variant="h5">
                                {
                                    "We wish to create an easy to use app that could help inform real-estate investors and first-home buyers before purchasing property"
                                }
                            </Typography>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

ProductValues.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        apiResponse: state.apiResponse,
        suburb: state.suburb,
        address: state.address,
        price: state.price,
        numSold: state.numSold,

    }
}

const enhanced = compose(connect(mapStateToProps), withStyles(styles))

export default enhanced(ProductValues)
