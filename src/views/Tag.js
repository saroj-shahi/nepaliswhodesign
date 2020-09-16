import React from 'react'
import axios from 'axios'
import { apiPath } from '../data/config'

import HelmetData from '../components/HelmetData'
import { connect } from 'react-redux';
import { setIsLoading } from '../store/action'


import UserCard from '../components/UserCard'
import NotFound from '../components/NotFound'

class Tag extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            people : [],
            tag: undefined
        }
        this.loadPeople = this.loadPeople.bind(this)
    }

    componentDidMount () {
        let { location: { pathname } } = this.props
        let tagName = (pathname.indexOf("tag") >= 1) ? pathname : undefined
        tagName = (tagName)? tagName.replace("/tag/", "") : undefined
        this.setState({ tag: tagName })
        this.loadPeople(tagName)
    }

    loadPeople = (tag) => {
        this.setState({ isLoading : true })
        this.props.setIsLoading({ isLoading: true })
        axios.get( apiPath + "feed/tag/" + tag )
        .then(response => { 
            this.setState({ 
                isLoading: false,
                people: response.data.data
            })
            this.props.setIsLoading({ isLoading: false })
        })
    }
    
    render (){
        let { isLoading, people, tag } = this.state


        if(!isLoading && !people) {
            return <div className="mt-5"><NotFound title="No designers do this?" subtitle="Looks like there are no designers available with this skill." emoji="🤔" /></div>
        } else {
            return <div className="container">
                <HelmetData title={ `Who design ` + tag } />
                <div className="row py-5"><div className="col-12 mb-5"></div>
                        { people && people.map((item, index) => <div className="col-lg-4 col-sm-6" key={ index } >
                        <UserCard data={ item } /></div>) }
                </div>
            </div>
        }
    }
}


  
const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoading: (id) => { dispatch(setIsLoading(id))}
    }
}

export default connect(null, mapDispatchToProps)(Tag);
