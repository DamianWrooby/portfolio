import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../theme/GlobalStyle"
import { theme } from "../theme/mainTheme"

// import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
