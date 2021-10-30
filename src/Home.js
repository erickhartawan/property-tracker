// --- Post bootstrap -----
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import withRoot from "./withRoot"
import SignIn from "./page/auth/SignIn"
import SignUp from "./page/auth/SignUp"
import Privacy from "./page/legal/Privacy"
import Terms from "./page/legal/Terms"
import Map from "./page/map/Map"
import AppAppBar from "./layout/AppAppBar"
import AppFooter from "./layout/AppFooter"
import ProductCategories from "./page/home/ProductCategories"
import ProductHero from "./page/home/ProductHero"
import ProductHowItWorks from "./page/home/ProductHowItWorks"
import ProductSmokingHero from "./page/home/ProductSmokingHero"
import ProductValues from "./page/home/ProductValues"

import { compose } from "redux"
import { connect } from "react-redux"

const App = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route exact path="/map">
                    <Map />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/terms">
                    <Terms />
                </Route>
                <Route path="/privacy">
                    <Privacy />
                </Route>
            </Switch>
        </Router>
    )
}

const Index = () => {
    return (
        <React.Fragment>
            <AppAppBar />
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductHowItWorks />

            <ProductSmokingHero />
            <AppFooter />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        apiResponse: state.apiResponse,
        suburb: state.suburb,
        address: state.address,
    }
}

export default withRoot(compose(connect(mapStateToProps))(App))
