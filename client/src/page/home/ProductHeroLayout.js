import React, { Component, useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import Search from "../map/Search"
import Map from "../map/Map"

import { compose } from "redux"
import { connect } from "react-redux"

const styles = (theme) => ({
    root: {
        color: theme.palette.common.black,
        position: "relative",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("sm")]: {
            height: "75vh",
            minHeight: 500,
            maxHeight: 1300,
        },
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    backdrop: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: 0,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
    },
    arrowDown: {
        position: "absolute",
        bottom: theme.spacing(1),
    },
})

const ProductHeroLayout = (props) => {
    const { backgroundClassName, children, classes } = props

    const [Zind, setZ] = useState(3)
    const zIndexOnClick = () => {
        setZ(-2)
    }
    const zIndexOnScroll = () => {
        setZ(3)
    }

    const divStyleO = {
        position: "absolute",
        zIndex: Zind,
    }

    document.addEventListener("scroll", zIndexOnScroll)
    return (
        <section className={classes.root}>
            <div style={divStyleO}>
                <Search />
            </div>
            <Container className={classes.container} onClick={zIndexOnClick}>
                {
                    //on top of background
                }
                {children}
                <div className={classes.backdrop} />
                <div className={classes.background}>
                    <Map />
                </div>
                <img
                    className={classes.arrowDown}
                    src="/productHeroArrowDown.png"
                    height="20"
                    width="20"
                    alt="arrow down"
                />
            </Container>
        </section>
    )
}

ProductHeroLayout.propTypes = {
    backgroundClassName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
}

const enhanced = compose(connect(), withStyles(styles))

export default enhanced(ProductHeroLayout)
