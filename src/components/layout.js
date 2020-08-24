import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  return <>{children}</>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
