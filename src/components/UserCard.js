import React from "react"
import { NavLink } from 'react-router-dom'
import { apiPath } from '../data/config'

import ScrollAnimation from 'react-animate-on-scroll'
import Arrow from "../img/arrow.svg"

export default class UserCard extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         imgLoaded: false
    //     }
    //     this.handleLoaded = this.handleLoaded.bind(this)
    // }
    // handleLoaded () {
    //     this.setState({ imgLoaded: true })
    // }
    
    render () {
        let { data } = this.props
        let image = data ? apiPath + "cdn/photos/" + data.photourl : null
        let profile =  data ? data.photourl.replace(".jpg", "") : null

        if( data ) {
            return <NavLink to={ `/profile/${ profile }` } className="card my-3 my-md-5">
                        <div className="card-content">

                        <figure className="card-img-wrapper bg-white">
                            <ScrollAnimation animateIn={ `animate__fadeInUp` } animatePreScroll={ true } delay={100} animateOnce={true}>
                                <img src={ image } className="card-img" alt={ data ? data.name : null }/>
                            </ScrollAnimation>
                        </figure>

                        <ScrollAnimation animateIn="animate__fadeIn" initiallyVisible={ false }>
                            <span className="card-arrow">
                                <img src={ Arrow } alt="arrow" />
                            </span>
                            <p className="card-name text-lowercase">{ data ? data.name : null }</p>
                        </ScrollAnimation>

                        </div>
                </NavLink>
        } else {
            return <div></div>
        }
    }
}