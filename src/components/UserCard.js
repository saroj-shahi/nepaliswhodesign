import React from "react"
import { NavLink } from 'react-router-dom'
import { apiPath } from '../data/config'

import Arrow from "../img/arrow.svg"

export default class UserCard extends React.Component {
    
    render () {
        let { data } = this.props
        let image = data ? apiPath + "cdn/photos/" + data.photourl : null
        let profile =  data ? data.photourl.replace(".jpg", "") : null

        return <NavLink to={ `/profile/${ profile }` } className="card my-3 my-md-5">
            <div className="card-content">

            <figure className="card-img-wrapper">
                <img src={ image } className="card-img" alt={ data ? data.name : null } />
            </figure>

            <span className="card-arrow">
                <img src={ Arrow } alt="arrow" />
            </span>
            <p className="card-name text-lowercase">{ data ? data.name : null }</p>
            </div>
        </NavLink>
    }
}