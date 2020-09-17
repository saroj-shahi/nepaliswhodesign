import React from 'react'
import axios from 'axios'
import { apiPath } from '../data/config'

import ScrollAnimation from 'react-animate-on-scroll'
import { connect } from 'react-redux';
import { setIsLoading } from '../store/action'

import HelmetData from '../components/HelmetData'
import UserCard from '../components/UserCard'
import NotFound from '../components/NotFound'

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            people : []
        }
        this.loadPeople = this.loadPeople.bind(this)
    }

    componentDidMount () {
        this.loadPeople()
    }

    loadPeople = () => {
        this.setState({ isLoading : true })
        this.props.setIsLoading({ isLoading: true })
        axios.get( apiPath )
        .then(response => { 
            this.setState({ 
                isLoading: false,
                people: response.data.data
            })
            this.props.setIsLoading({ isLoading: false })
        })
    }
    
    render (){
        let { isLoading, people } = this.state

        if(!isLoading && !people) {
            return <NotFound title="Where did all the designers go?" subtitle="All the designers were abducted during an alien invasion. We're still figuring out what happened. ¯\_(ツ)_/¯" emoji="👽" />
        } else {
            return <div className="container">
                <HelmetData title="Nepalis Who Design - Designers" />

                <div className="row py-5">
                    { people && people.map((item, index) => <div className="col-lg-4 col-sm-6" key={ index } >
                    <ScrollAnimation animateIn="animate__fadeInUp" animateOnce={true} delay={ 20 }>
                        <UserCard data={ item } />
                    </ScrollAnimation>    
                    </div>) }
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

export default connect(null, mapDispatchToProps)(Home);
