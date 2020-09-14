import React from "react"
import { NavLink } from 'react-router-dom'
import { apiPath } from '../data/config'

import ScrollAnimation from 'react-animate-on-scroll'
import Arrow from "../img/arrow.svg"

export default class UserCard extends React.Component {
    
    render () {
        let { data } = this.props
        let image = data ? apiPath + "cdn/photos/" + data.photourl : null
        let profile =  data ? data.photourl.replace(".jpg", "") : null

        return <NavLink to={ `/profile/${ profile }` } className="card my-3 my-md-5">
            <ScrollAnimation animateIn="animate__fadeIn" initiallyVisible={ false }>
                <div className="card-content">

                <figure className="card-img-wrapper">
                    <ScrollAnimation animateIn="animate__fadeInUp" initiallyVisible={ false } delay={100}>
                        <img src={ image } className="card-img" alt={ data ? data.name : null } />
                    </ScrollAnimation>
                </figure>

                <span className="card-arrow">
                    <img src={ Arrow } alt="arrow" />
                </span>
                <p className="card-name text-lowercase">{ data ? data.name : null }</p>
                { data.website && <small className="text-uppercase dim">{ data ? data.website : null }</small> }
                </div>
            </ScrollAnimation>
        </NavLink>
    }
}