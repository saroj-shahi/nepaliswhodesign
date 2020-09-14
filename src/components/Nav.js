import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";

import { disciplines } from '../data/disciplines'
import Star from '../img/star.svg'

function getDiscipline(item) {
    return disciplines.find( discipline => discipline.path === item ).title
}

class Nav extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            starSize : "normal",
            tagName: undefined
        }
    }


    onRouteChange () {
        let { location: { pathname } } = this.props
        let starSize = (pathname === "/submit" || pathname.indexOf("profile") >= 1) ? "oversized" : "normal"
        this.setState({ starSize })

        let tagName = (pathname.indexOf("tag") >= 1) ? pathname : undefined
        tagName = (tagName)? tagName.replace("/tag/", "") : undefined
        this.setState({ tagName })
    }

    componentDidMount () {
        this.onRouteChange()
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            this.onRouteChange()
        }
    }

    render (){

        let { starSize, tagName } = this.state
        let { isLoading } = this.props

        return <header className="container py-5" role="navigation" aria-label="Main Navigation">
            <div className="row">
                <div className="col-md-auto ml-auto order-md-2 d-flex mb-4 mb-md-0 text-right z-100">
                    <Link to="/about" className="btn btn-send">about</Link>
                    <Link to="/submit" className="ml-3 btn btn-send">submit</Link>
                </div>

                <div className="col-md-8 order-md-1 mb-4 mb-md-0">
                    <img src={ Star } className={ `nav-star ${ starSize } ${ isLoading ? 'animated' : '' } ` } alt="Star" />
                    <div className="nav-logo">
                        <Link to="/" className="d-block title-2"><strong className="d-block">nepalis</strong>who design</Link>
                        { tagName && <div className="nav-strip title-2 text-lowercase">{ getDiscipline(tagName) }</div> }
                    </div>
                </div>
            </div>
        </header>
    }
}


const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading
    };
};
export default withRouter(connect(mapStateToProps)(Nav));
