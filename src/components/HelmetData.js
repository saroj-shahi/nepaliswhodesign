import React from 'react'
import { Helmet } from 'react-helmet'

export default class HelmetData extends React.Component {
render () {

    let siteName = "Nepali Who Designs"
    let siteURL = "https://nepaliswho.design/"

    let { title, description, image } = this.props

    let pageTitle = (title) ? title + " - " + siteName : siteName;
    let pageDescription = ( description ) ? description : "A repository to celebrate the work of talented Nepali designers and showcase it to the world.";
    let pageBanner = { image } ? siteURL + image : siteURL + "banner.jpg"

    return   <Helmet>
        <title>{ pageTitle }</title>
        <meta name="description" content={ pageDescription } />
        <meta itemProp="image" content={ pageBanner } />

        <meta property="og:title" content={ pageTitle } />
        <meta property="og:description" content={ pageDescription } />
        <meta property="og:url" content={ siteURL } />
        <meta property="og:site_name" content={ siteName } />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ pageBanner } />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={ pageTitle } />
        <meta property="twitter:description" content={ pageDescription } />
        <meta property="twitter:image" content={ pageBanner } />
    </Helmet>
}
}