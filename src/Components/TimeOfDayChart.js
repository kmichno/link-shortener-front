import React, {PureComponent, Component} from 'react';
import Footer from "./Footer";
import {NavLink} from "react-router-dom";
import {
  BarChart, ResponsiveContainer, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import NavBar from "./NavBar";

class TimeOfDayChart extends PureComponent {

    constructor(props, context) {
        super(props, context);
        console.log(props)
        this.state = {
            showPopup: false,
            idLink: this.props.match.params.idLink,
            shortUrl: '',
            longUrl: '',
            numberUniqueEntries: '',
            numberAllEntries: '',
            data: [],
            activeIndex: 0,
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
        };


    }

  handleClick = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }

    componentDidMount() {
      var myselect = document.getElementById("year"),
        startYear = new Date().getFullYear(),
        count = 5;

      (function(select, val, count) {
        do {
          select.add(new Option(val--, count--), null);
        } while (count);
      })(myselect, startYear, count);

        var url = "http://localhost:8080/link/"+this.state.idLink;

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
                shortUrl: results.shortUrl,
                longUrl: results.longUrl,
                numberUniqueEntries: results.numberUniqueEntries,
                numberAllEntries: results.numberAllEntries,
            })
        });
      this.getStatistics();
    }


    getStatistics() {
      let url = "http://localhost:8080/statistic/times/"+this.state.idLink;

      fetch(url, {
        mode: 'cors',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'http://localhost:3000',
        },
        body: JSON.stringify({
          month: this.state.month,
          year: this.state.year,
        }),
        method: 'POST',
      })
        .then(results => {
          console.log(results);
          return results.json();
        }).then(results => {
        console.log(results);
        this.setState({

          data: results
        })
      })
    }
    handleSubmit =
         event => {
            event.preventDefault();
            this.togglePopup();
            this.getStatistics();

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
      const { activeIndex, data } = this.state;
      const activeItem = data[activeIndex];
        return (
            <React.Fragment>
                <div id="container">
                    <div id="content">
                      <h1 className="title-app">Panel administracyjny - Skracacz linków</h1>
                      <div id="left-side">
                        <NavBar idLink={this.state.idLink} longUrl={this.state.longUrl}/>
                      </div>
                        <div id="right-side">
                            <div id="right-side-inner">
                              <div className="place-button">
                                <NavLink className="button-blue" to={`/`}>Powrót do listy</NavLink>
                              </div>
                                <h2>
                                    Docelowy link: {this.state.longUrl}
                                </h2>
                              <p>Skrócony link: <b>localhost:8080/{this.state.shortUrl}</b></p>
                              <p>Liczba wszystkich wejść: <b>{this.state.numberAllEntries}</b></p>
                                <div>
                                  <p>Wybierz okres:</p>
                                    <form onSubmit={this.handleSubmit} className="addapartment" method="none">
                                        <div>
                                            <select className="date-select" value={this.state.month} name="month" onChange={(e) => this.handleChange(e)} >
                                              <option value="1">Styczeń</option>
                                              <option value="2">Luty</option>
                                              <option value="3">Marzec</option>
                                              <option value="4">Kwiecień</option>
                                              <option value="5">Maj</option>
                                              <option value="6">Czerwiec</option>
                                              <option value="7">Lipiec</option>
                                              <option value="8">Sierpień</option>
                                              <option value="9">Wrzesień</option>
                                              <option value="10">Październik</option>
                                              <option value="11">Listopad</option>
                                              <option value="12">Grudzień</option>
                                            </select>
                                            <select className="date-select" id="year" value={this.state.year} name="year" onChange={(e) => this.handleChange(e)} ></select>
                                            <button className="button-blue">Zaaktualizuj statystyki</button>
                                        </div>
                                    </form>
                                </div>
                              <div className="container-chart">
                                <ResponsiveContainer>
                                  <BarChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }} data={data}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis name="Dzień" dataKey="day" unit="d"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend />
                                    <Bar stackId="a" name="Liczba wejść rano" dataKey="entryInMorning" fill="#8884d8" />
                                    <Bar stackId="a" name="Liczba wejść po południu" dataKey="entryInAfternoon" fill="#82ca9d" />
                                    <Bar stackId="a" name="Liczba wejść wieczorem" dataKey="entryInEvening" fill="#ffc658" />
                                    <Bar stackId="a" name="Liczba wejść w nocy" dataKey="entryAtNight" fill="red" />
                                  </BarChart>
                                </ResponsiveContainer>
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

export default TimeOfDayChart;
