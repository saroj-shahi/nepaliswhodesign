import React from 'react'
import axios from 'axios'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { InfiniteScroll } from 'react-simple-infinite-scroll'

import { connect } from 'react-redux';
import { setIsLoading } from '../store/action'

import { apiPath } from '../data/config'

import HelmetData from '../components/HelmetData'
import UserCard from '../components/UserCard'
import NotFound from '../components/NotFound'

class Tag extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            people : [],
            cursor: 0,
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
        axios.get( apiPath + "feed/tag/" + tag +"?count=" + this.state.cursor )
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
        let { isLoading, people, tag, cursor } = this.state


        if(!isLoading && !people) {
            return <div className="mt-5">
                <NotFound title="No designers do this?" subtitle="Looks like there are no designers available with this skill." emoji="🤔" />
            </div>
        } else {
            return <div className="container">
                <HelmetData title={ `Who design ` + tag } />

                <ParallaxProvider>
                    <InfiniteScroll throttle={ 100 } threshold={ 300 } isLoading={ isLoading } hasMore={ !!cursor } onLoadMore={ () => this.loadPeople(tag) }>
                        <div className="row py-5"><div className="col-12 mb-5"></div>
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

export default connect(null, mapDispatchToProps)(Tag);
