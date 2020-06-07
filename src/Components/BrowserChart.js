import React, {PureComponent, Component} from 'react';
import Footer from "./Footer";
import {NavLink} from "react-router-dom";
import {
  PieChart, Pie, Sector, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart,
} from 'recharts';
import NavBar from "./NavBar";
const LINK_SHORTENER_SERVER = "http://localhost:8080";
const BROWSER_STATISTIC = "/statistic/browser";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
class BrowserChart extends PureComponent {

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
      let url = LINK_SHORTENER_SERVER + BROWSER_STATISTIC + "/" + this.state.idLink;

      fetch(url, {
        mode: 'cors',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: this.state.month,
          year: this.state.year,
        }),
        method: 'POST',
      })
        .then(results => {
          return results.json();
        }).then(data => {
        this.setState({
          data: data
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
      console.log("sfasfasdf");
      console.log(data);
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
                                <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                                  <Tooltip/>
                                  <Legend />
                                  <Pie
                                    data={data}
                                    cx={300}
                                    cy={200}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                  >
                                    {
                                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                  </Pie>
                                </PieChart>
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

export default BrowserChart;
