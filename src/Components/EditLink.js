import React, {Component} from 'react';
import Footer from "./Footer";
import {NavLink} from "react-router-dom";

class EditLink extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(props)
        this.state = {
            showPopup: false,
            idLink: this.props.match.params.idLink,
            title: "",
        };
    }

    componentDidMount() {
        var url = "http://localhost:8082/link/"+this.state.idLink;

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
              console.log(results);
            this.setState({

                title: results.title,
                content: results.content,
            })
        })
    }


    addApartment(data) {
        console.log(data);
        const url = "http://localhost:8082/link/edit/"+this.state.idLink;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
            })
        });
    }
    handleSubmit =
         event => {
            event.preventDefault();
            this.togglePopup();
            this.addApartment();

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <div id="container">
                    <div id="content">
                        <div id="right-side">
                            <div id="right-side-inner">
                              <div className="place-button">
                                <NavLink className="button-blue" to={`/`}>Powrót do listy</NavLink>
                              </div>
                                <h1>
                                    Dodaj apartament:
                                </h1>
                                <div>
                                    <form onSubmit={this.handleSubmit} className="addapartment" method="none">
                                        <div>
                                            <label htmlFor="name">Tytuł linku:</label>
                                            <input type="text" required id="name" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <button className="button">Edytuj link</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        );
    }
}

export default EditLink;
