import React from 'react'
import axios from 'axios'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { InfiniteScroll } from 'react-simple-infinite-scroll'

import { connect } from 'react-redux';
import { setIsLoading } from '../store/action'

import {apiPath} from '../data/config'

import HelmetData from '../components/HelmetData'
import UserCard from '../components/UserCard'
import NotFound from '../components/NotFound'

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            people : [],
            cursor: 0
        }
        this.loadPeople = this.loadPeople.bind(this)
    }

    componentDidMount () {
        this.loadPeople()
    }

    loadPeople = () => {
        this.setState({ isLoading : true })
        this.props.setIsLoading({ isLoading: true })
        axios.get( apiPath + "?count=" + this.state.cursor )
            .then(response => { 
                this.setState(state => ({ 
                    isLoading: false,
                    cursor: response.data.cursor,
                    people: [...state.people, ...response.data.data]
                }))
                this.props.setIsLoading({ isLoading: false })
            }).catch(e => {
                this.setState({
                    isLoading: false,
                    people: null,
                    cursor: 0
                })
            })
    }
    
    render (){
        let { isLoading, people, cursor } = this.state

        if(!isLoading && !people) {
            return <NotFound title="Where did all the designers go?" subtitle="All the designers were abducted during an alien invasion. We're still figuring out what happened. ¯\_(ツ)_/¯" emoji="👽" />
        } else {
            return <div className="container">
                <HelmetData title="Nepalis Who Design - Designers" />

                <ParallaxProvider>
                    <InfiniteScroll throttle={ 100 } threshold={ 300 } isLoading={ isLoading } hasMore={ !!cursor } onLoadMore={ this.loadPeople }>
                        <div className="row py-5">
                            { people && people.map((item, index) => <Parallax className="col-lg-4 col-sm-6" key={ index } y={[0, 20*(index%2)]}>
                                <UserCard data={ item } />
                            </Parallax>) }

                            { isLoading && <div className="col-12 text-center"><div className="loader-inline"></div></div>}

                        </div>                    
                    </InfiniteScroll>
                </ParallaxProvider>
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
