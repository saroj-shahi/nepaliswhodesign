import React from "react"
import { Link } from 'react-router-dom'

export default class Dialog extends React.Component {

    render () {
        let { title, subtitle, emoji } = this.props
        return <div className="container py-6">
        <div className="row">
            <div className="col-md-6 my-5">
                <p className="title-1">{ emoji }</p>
                <p className="title-3 my-4">{ title }</p>
                <p className="mb-5">{ subtitle }</p>

                <Link to="/" className="btn btn-send">Go back home</Link>
            </div>
        </div>
    </div>
    }
}