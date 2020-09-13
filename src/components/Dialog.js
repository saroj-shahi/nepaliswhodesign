import React from "react"

export default class Dialog extends React.Component {

    render () {
        let { message, button, closeAction } = this.props
        return <div className="dialog" role="dialog">
            <div className="container">
                <div className="row">
                    <div className="col-md-auto col-12">
                        <h3 className="title-3 text-error">There seems to be an error</h3>
                        <p className="title-4">{ message }</p>
                    </div>
                    <div className="col-auto ml-auto">
                        <button className="btn btn-filled btn-lg" type="button" onClick={ closeAction }>{ button }</button>
                    </div>
                </div>
            </div>
        </div>
    }
}