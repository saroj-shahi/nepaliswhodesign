import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import axios from 'axios'
import { apiPath } from '../data/config'
import { disciplines } from '../data/disciplines'
import { social } from '../data/social'
import ScrollAnimation from 'react-animate-on-scroll'

import { connect } from 'react-redux';
import { setIsLoading } from '../store/action'

import HelmetData from '../components/HelmetData'
import UserCard from '../components/UserCard'
import NotFound from '../components/NotFound'

function getDiscipline(item) {
    return disciplines.find( discipline => discipline.path === item ).title
}

class Profile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            people : undefined
        }
        this.loadPeople = this.loadPeople.bind(this)
    }

    componentDidUpdate (prevProps) {
        if(this.props.location.pathname !== prevProps.location.pathname) {
            let { location: { pathname } } = this.props
            this.loadPeople(pathname)
        }
       
    }

    componentDidMount () {
        let { location: { pathname } } = this.props
        this.loadPeople(pathname)
    }


    loadPeople = (tag) => {

        let tagName = (tag.indexOf("profile") >= 1) ? tag : undefined
        tagName = (tagName)? tagName.replace("/profile/", "") : undefined

        this.setState({ isLoading : true, people: undefined })
        this.props.setIsLoading({ isLoading: true })

        axios.get( apiPath + "feed/profile/" + tagName )
        .then(response => { 
            this.setState({ 
                isLoading: false,
                people: response.data.data[0]
            })
            this.props.setIsLoading({ isLoading: false })
        })
    }
    
    render (){
        let { people, isLoading } = this.state

        if(!isLoading && !people) {
            return <NotFound title="This designer is probably not a designer" subtitle="This designer doesn't exist or has probably moved on to other professions." emoji="🤔" />
        } 

        if(people) {
            let image = people ? apiPath + "cdn/photos/" + people.photourl : null
            let expertise = (people.expertise) ? people.expertise.toString().split(",") : []
            let yearsince = new Date().getFullYear();

            return <div className="container">

            <HelmetData title={ people.name } description={ people.intro } image={ image } />

            <div className="row align-items-center">
                <div className="col-md-5 my-5 my-md-0">
                <ScrollAnimation animateIn="animate__fadeInUp" initiallyVisible={ false } delay={100} animateOnce={true}>
                    <h1 className="title-1 mb-4 text-lowercase">{ people.name }</h1>
                    { people.experience && <p className="text-uppercase">Designer since { yearsince - people.experience }</p> }
                </ScrollAnimation>
                </div>
                <div className="col-md-7">
                    { image && <img src={ image } alt={ people.name } className="img-banner animate__animated animate__fadeIn" /> }
                </div>
            </div>

            <div className="row my-5">
                <div className="col-lg-8 offset-lg-1">
                <ScrollAnimation animateIn="animate__fadeInUp" initiallyVisible={ false } animateOnce={true}>
                    <p className="title-3">{ people.intro }</p>
                </ScrollAnimation>
                </div>

                <div className="col-12 mb-5"></div>

                <div className="col-lg-3 offset-lg-1 mb-3 mb-lg-0">

                    { expertise && expertise.map((item, index) => 
                        <Link to={`/tag/${item}`} key={ index } className={`btn btn-send ${ index%2 ? 'mx-3' : '' } mb-3`}>{ getDiscipline(item) }</Link>
                    )}

                </div>
                
                <div className="col-lg-7">
                    <ScrollAnimation animateIn="animate__fadeInUp" initiallyVisible={ false } animateOnce={true}>
                        <p className="title-4">{ people.bio }</p>
                    </ScrollAnimation>
                </div>
            </div>


            <div className="row social-buttons no-gutters mb-5">
                { social.map((item, index) => {
                    if(people[item.type]) {
                        return <div className="col" key={ index }>
                            <ScrollAnimation animateIn="animate__fadeInDown" initiallyVisible={ false } delay={ 100*index } animateOnce={true}>
                                <a href={ item.prefix + people[item.type] } target="_blank" rel="noopener noreferrer" className="btn btn-social">{ item.type }</a>
                            </ScrollAnimation>
                        </div>
                    } else {
                        return false
                    }
                })}
            </div>


            { people.related && <div className="row py-5">
                <div className="col-12">
                    <p className="text-uppercase">Similar designers</p>
                </div>

                { people.related && people.related.map((item, index) => <div className="col-lg-4 col-sm-6" key={ index }>
                    <UserCard data={ item } />
                </div>)}
            </div> }


        </div>
    
        } else {
            return null
        }
    }
}


  
const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoading: (id) => { dispatch(setIsLoading(id))}
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Profile));
