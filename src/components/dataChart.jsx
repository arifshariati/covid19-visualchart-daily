import React, { Component } from 'react';
import Axios from 'axios';
import {Container,Row,Col,Table,Form} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { LineChart, Line, XAxis,YAxis, CartesianGrid,Tooltip,Legend} from 'recharts';

class DataChart extends Component{
    constructor (props){
        super(props);
        this.getCountry=this.getCountry.bind(this);
      }
      state={
        temp:[],
        countries:[]
      }
      componentDidMount(){
        this.getData();
      }
      async getData(){
        const res=await Axios.get("https://pomber.github.io/covid19/timeseries.json");
        
        this.setState({
          countries:res.data.China,
          temp:Object.keys(res.data)
        })
        console.log(this.state.temp);
      }
      async getCountry(event){
        event.persist();
        const countryRes=await Axios.get("https://pomber.github.io/covid19/timeseries.json");
        const searchCountry=event.target.value;
        console.log(countryRes.data[searchCountry]);
        
        this.setState({
          countries:countryRes.data[searchCountry]
        })
      }
render(){
    return(
        <div className="dataChart">
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col lg="12" md="12">
                    <h5>Visual Chart of COVID-19 Daily Statistics</h5>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                
                <Row className="justify-content-md-center">
                    <Col lg="12" md="12">
                    <LineChart width={300} height={350} data={this.state.countries} margin={{top: 20, right: 30, left: 0, bottom: 20}}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend  layout={"vertical"}/>
                    <Line type="monotone"  dataKey="confirmed" dot={false}  stroke="#8DB1AB" strokeWidth={3} />
                    <Line type="monotone" dataKey="recovered" dot={false} stroke="#00BCD4" strokeWidth={3} />
                    <Line type="monotone" dataKey="deaths" dot={false}  stroke="#DD2C00" strokeWidth={3} />
                    </LineChart>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg="12" md="auto">
                        <Form title="Date Wise COVID-19 Cases">
                        <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                            <Form.Label>Select Country</Form.Label>
                            <Form.Control as="select" size="sm" onChange={this.getCountry} custom>
                                {
                                this.state.temp.map((items,i)=>
                                <option key={i}>{items}</option>  
                                )
                                }
                            </Form.Control>
                        </Form.Group>
                        </Form>      
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg="12" md="auto">
                    <Table responsive size="sm" striped={true} bordered={true} hover>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.countries.map((list,index)=>
                        <tr key={index}>
                        <td>{list.date}</td>
                        <td><NumberFormat value={list.confirmed} displayType={'text'} thousandSeparator={true} /></td>
                        <td><NumberFormat value={list.recovered} displayType={'text'} thousandSeparator={true} /></td>
                        <td><NumberFormat value={list.deaths} displayType={'text'} thousandSeparator={true} /></td>
                        </tr>
                        )
                        }
                    </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
}
export default DataChart;