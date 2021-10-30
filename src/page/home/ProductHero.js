import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "../../components/Button"
import Typography from "../../components/Typography"
import ProductHeroLayout from "./ProductHeroLayout"
import { Link } from "react-router-dom"
import house from "../../assets/img/House1.jpg"

import { compose } from 'redux'
import { connect } from 'react-redux'

const backgroundImage = house

const styles = (theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
})

const ProductHero = (props) => {
    const { classes } = props

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            <img
                style={{ display: "none" }}
                src={backgroundImage}
                alt="increase priority"
            />
        </ProductHeroLayout>
    )
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired,
}

const enhanced = compose(
    connect(),
    withStyles(styles)
)


export default enhanced(ProductHero)
