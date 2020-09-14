import React from 'react'
import {Siblings} from '../data/siblings'


export default class About extends React.Component {
    render () {
        return <div className="container my-5">
            <div className="row">
                <div className="col-lg-8 offset-lg-3">
                    <h1 className="title-1">about</h1>

                    <h2 className="title-3 my-4">Nepalis Who Design is an active directory of Nepali designers who design. Well, that’s about it — we welcome all types of designers here, from graphic to architecture to motion design. If something is designable and you design it, then this is where you should be.</h2>
                    <p className="title-4 mb-5">This is not a showcase like Dribbble or Behance. We simply call it a directory. We may expand this further in the future, but for the first pass, this is it! Please feel free to look around get inspired in ways more than one. </p>


                    <h3 className="title-4 my-4">How did you come up with this idea?</h3>
                    <p>We didn’t. This project is inspired by our fantastic sibling sites.</p>
                    {
                        Siblings.map((item, index) => <p className="m-0 my-3" key={ index}><a href={ item.url } className="title-4 text-external" rel="noopener noreferrer" target="_blank">{ item.name }</a></p>)
                    }
                    <p>and a ton of others. You get the idea. ;)</p>

                    <div className="row my-5">
                        <div className="col-md-6">
                            <h3 className="title-4 mb-4">How can I join?</h3>
                            <p>Simply fill up the form in the “Submit” page. Make sure to provide details most important to you. Also get creative with it, make it informative and fun! Do not forget to provide a photo as well — if you were to describe yourself in one shot, what would it be? Make your case appealing.</p>

                            <h3 className="title-4 mb-4 mt-5">I am new to this field, can I join?</h3>
                            <p>Yes, if we like what you show us, then why not? We will check your online portfolio and links you provide and we will make our decision based on what we see.</p>
                        </div>
                        <div className="col-md-6 mt-5 mt-md-0">
                            <h3 className="title-4 mb-4">Do I need to be living and working in Nepal?</h3>
                            <p>No. You could be anywhere in the world. If you belong to Nepal, you belong here.</p>

                            <h3 className="title-4 mb-4 mt-5">How long does it take to get featured?</h3>
                            <p>We will try to make is as quick as possible. Please allow us a week’s time. Our moderators are working people with day jobs. They will do this in their free time, so please have some patience.</p>

                            <h3 className="title-4 mb-4 mt-5">I don’t want to be listed. What do I do?</h3>
                            <p>If you change your mind and do not want to be featured, contact us.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}