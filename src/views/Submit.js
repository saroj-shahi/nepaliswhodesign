import React from 'react'
import axios from 'axios'

import { apiPath } from '../data/config'
import { disciplines } from '../data/disciplines'

import { connect } from 'react-redux';
import { setIsLoading } from '../store/action'


import Input from '../components/Input'
import Dialog from '../components/Dialog'

import FormIcon from '../img/arrow_dark.svg'


class Submit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isSubmitted: false,
            error: undefined
        }
        this.sendForm = this.sendForm.bind(this)
        this.closeAction = this.closeAction.bind(this)
    }

    sendForm (e) {
        e.preventDefault()
        let theForm = document.getElementById("theFormData")
        let theFormData = new FormData(theForm)
        this.props.setIsLoading({ isLoading: true })
        this.setState({ isLoading: true })

        axios.post( apiPath + "submit", theFormData)
            .then(response => { 
                if(response.data.status === "error") {
                    this.setState({ error: response.data.errors})
                } else {
                    this.setState({ isSubmitted: true })
                }
             })
           .catch(error => { this.setState({ error }) })

           this.props.setIsLoading({ isLoading: false })
           this.setState({ isLoading: false })
           
    }

    closeAction = () => {
        this.setState({ error : undefined })
    }

    componentDidMount() {
        this.props.setIsLoading({ isLoading: false })
    }
    
    render (){
        let { error, isLoading, isSubmitted } = this.state
        return <div className="container">
            { error && <Dialog message={ error } button="Retry" closeAction={ this.closeAction } /> }
            <div className="row">
                <div className="col-md-3 pt-md-5 pb-5 pb-md-0">
                        <p className="mb-4 mt-5">Please note that you will be vetted against the online profiles your submit and the content we see there.</p>
                        <p className="mb-4">We cannot guarantee all submissions that we receive will be approved after vetting.</p>
                        <p>Vetting generally takes about 3-4 days if the mods aren’t super-busy.</p>
                </div>

                { isSubmitted && <div className="col-md-8 offset-md-1 pb-5">
                    <h1 className="title-1 mb-4">thank you!</h1>
                    <p className="title-3 mb-3">We have received your submission. Our mods will review your work and send you en email if you're approved.</p>
                    <p className="mb-5">Good luck! Until then, why not spread the word about Nepalis who Design?</p>

                    <a href="https://twitter.com/tweet" target="_blank" rel="noopener noreferrer" className="btn btn-send">Tweet about Nepalis who Design</a>
                </div>}

                { !isSubmitted && <div className="col-md-8 offset-md-1 pb-5 mb-5">
                    <h1 className="title-1 mb-4">submit</h1>
                    <form encType="multipart/form-data" method="post" name="form" id="theFormData" onSubmit={ this.sendForm } aria-label="Submit entry">
                        <Input label="Your name" name="name" type="text" placeholder="eg. Ram Bahadur" required />
                        <Input label="Select your expertise (recommended up to 3)" name="expertise[]" type="chooser" required={ true } options={ disciplines } />

                        <Input label="Introduce yourself in 100 characters" name="intro" type="textarea" rows={ 2 } required={ true } placeholder="eg. I am an experienced designer who has..." />
                        <Input label="Upload a photo (preferably a wide-ish shot)" hint="Please only upload wide .jpg images (recommended 1400x1000px) below 2 megabytes" name="photo" type="file" required={ true } accept="image/jpeg" formIcon={ FormIcon } />

                        <Input label="How many years to total experience do you have?" hint="Please enter number of years" name="experience" type="number" required={ true } min="1" max="15" placeholder="No. of years: eg. 4" />
                        <Input label="Describe the work you do in few paragraphs" name="bio" type="textarea" rows={ 5 } required={ true } placeholder="Write in detail who you are, what you do and why you do it..." />

                        <h3 className="mt-5 mb-3">Your online profiles (leave blank if you don’t have one)</h3>
                        <Input label="Personal Website URL" name="website" type="url" placeholder="https://" />
                        <Input label="Facebook Page URL" hint="Only pages are accepted. No personal profile, groups or events." name="facebook" type="url" placeholder="https://" />
                        <Input label="Twitter URL" hint="Only personal accounts are accepted. No brand or community accounts." name="twitter" type="url" placeholder="https://" />
                        <Input label="Dribbble URL" name="dribbble" type="url" placeholder="https://" />

                        <button type="submit" name="submit" value="1" className="btn btn-send btn-filled btn-lg" disabled={ isLoading }>
                            { !isLoading && <span>Request access</span> }
                            { isLoading && <span>Sending.... Please wait.</span> }
                        </button>
                    </form>
                </div>}
            </div>
            </div>
    }
}


  
const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoading: (id) => { dispatch(setIsLoading(id))}
    }
}

export default connect(null, mapDispatchToProps)(Submit);
