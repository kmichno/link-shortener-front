import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

class LinkList extends Component {

    constructor() {
        super();
        this.state = {
            linksList: [],
            title: "",
            longUrl: "",
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/links";

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
            this.setState({linksList: results.links})
        })
    }

    deleteLink(idLink) {
        const url = "http://localhost:8080/link/delete/"+idLink;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    handleDelete (idLink) {
        return event => {
            event.preventDefault();
            this.deleteLink(idLink);
            let filteredArray = this.state.linksList.filter(item => {
                console.log(item.id);
                return idLink !== item.id;
            });
            console.log(filteredArray);
            this.setState({linksList: filteredArray});

        }
    }

    shortLink() {
        const url = `http://localhost:8082/link/short`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                longUrl: this.state.longUrl,
            })
        }).then(results => results.json())
        .then((body)=>{
                console.log(body.link);
                let filteredArray = [];
                if(Array.isArray(this.state.linksList) && this.state.linksList.length) {
                  filteredArray = this.state.linksList;
                  filteredArray.unshift(body.link);
                } else {
                  console.log(body.link);
                  filteredArray.push(body.link);
                }
                this.setState({linksList: filteredArray})
        })
    }

    handleSubmit =
        event => {
            event.preventDefault();
            this.shortLink();

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
      let links
      if(Array.isArray(this.state.linksList) && this.state.linksList.length) {
        links = this.state.linksList.map((link) => {
          console.log(link);
          return (
            <div className="link-details" key={link.id}>
              <div className="title">
                <h3>{link.longUrl}</h3>
                <a href={`http://localhost:8080/${link.shortUrl}`} target="_blank" className="short-url">localhost:8080/{link.shortUrl}</a>
              </div>
              <div className="description-content">
                <div className="number-entries">
                  <p>Ilość kliknięć: {link.numberUniqueEntries}</p>
                </div>
                <div className="place-button">
                  <NavLink className="button-blue" to={`/link/days/${link.id}`}>Details</NavLink>
                </div>
              </div>
            </div>
          )
        });
      }
        return (
            <React.Fragment>
                <div id="container">
                    <div id="content">
                      <h1 className="title-app">Panel administracyjny - Skracacz linków</h1>
                      <div id="left-side">
                        <NavBar idLink={null} longUrl={null}/>
                      </div>
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h2>
                                    Popularne linki:
                                </h2>
                                {links}
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

export default LinkList;
