import withRoot from "../../withRoot"
// --- Post bootstrap -----
import React from "react"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Markdown from "../../../src/components/Markdown"
import Typography from "../../../src/components/Typography"
import AppAppBar from "../../layout/AppAppBar"
import privacy from "./md/privacy.md"
import AppFooter from "../../layout/AppFooter"

function Privacy() {
    return (
        <React.Fragment>
            <AppAppBar />
            <Container>
                <Box mt={7} mb={12}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        marked="center"
                        align="center"
                    >
                        Privacy
                    </Typography>
                    <Markdown>{privacy}</Markdown>
                </Box>
            </Container>
            <AppFooter />
        </React.Fragment>
    )
}

export default withRoot(Privacy)
