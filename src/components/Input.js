import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

export default class Input extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            imageURL : undefined
        }
    }

    handleChange = (e) => {
        if(e.target.type === "file") {
            this.setState({ imageURL: (e.target.files[0])?URL.createObjectURL(e.target.files[0]):null })
        }
    }

    clearPhoto = () => {
        var x = window.confirm("Are you sure you want to remove this image?");
        if(x) {
            this.setState({ imageURL: undefined })
        }
    }

    render (){
        let { label, name, hint, type, isRequired, rows, options, placeholder, min, max, accept, formIcon, prefix } = this.props
        let { imageURL } = this.state
        let inputBox

        switch (type) {
            case "chooser" :
                inputBox = <div className="pt-2">
                    { options.map((item, index) => <label className="form-check-group" id={ index } key={ index } value={ index }>
                        <input type="checkbox" className="form-check-input" aria-checked="false" tabIndex="0" aria-labelledby={ index } name={ name } value={ item.path } />
                        <span className="form-check-label">{ item.title }</span>
                    </label> )}
                </div>
            break;

            case "textarea" : 
                inputBox = <textarea className="form-control" name={ name } id={ name } rows={ rows } placeholder={ placeholder } required={ isRequired } ></textarea>
            break;

            default: 
                inputBox = <input className="form-control" name={ name } id={ name } type={ type } required={ isRequired } placeholder={ placeholder } min={ min } max={ max } accept={ accept } onChange={ this.handleChange } />
            break;
        }

        return <ScrollAnimation animateIn="animate__fadeInUp" initiallyVisible={ false } delay={ 50 } animateOnce={true}>
            <div className={ `form-group` }>
            <label className={type==='file'?'clickable': null} htmlFor={ name }>
                <div className="form-label">{ label }</div>
                { imageURL && <div className="d-flex align-items-start mt-3">
                                <img src={ imageURL } className="form-img mr-4" alt="Preview" />
                                <button type="button" className="btn btn-filled" onClick={ this.clearPhoto }>Remove</button>
                        </div> }
                <div className="d-flex align-items-center">
                    { prefix && <div className="form-prefix">{ prefix }</div> }
                    { inputBox && <div className="flex-fill">{ inputBox }</div> }
                    { formIcon && <img src={ formIcon } className="form-icon" alt="Please select" />}
                </div>

                { hint && <small className="form-hint d-block mt-2">{ hint }</small>}
            </label>
        </div></ScrollAnimation>
    }
}