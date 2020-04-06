import React, { Component } from 'react';
import Axios from 'axios';
import {Container,Row,Col,Table,Form} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { LineChart, Line, XAxis,YAxis, CartesianGrid,Tooltip,Legend} from 'recharts';
import Pagination from './pagination';

class DataChart extends Component{
    constructor (props){
        super(props);
        this.getCountry=this.getCountry.bind(this);
        this.paginate=this.paginate.bind(this);
      }
      state={
        currentData:[],
        currentPage:1,
        dataPerPage:7,
        selectedCountry:"China",
        temp:[],
        countries:[],
        tableCountries:[]
      }
      componentDidMount(){
        this.getData();
      }
      async getData(){
        const res=await Axios.get("https://pomber.github.io/covid19/timeseries.json");
        
        const byConfirmed=res.data.China.slice(0);
        byConfirmed.sort(function(a,b){
            return b.confirmed - a.confirmed;
        });

        this.setState({
          countries:res.data.China,
          tableCountries:byConfirmed,
          temp:Object.keys(res.data)
        })

        const indexOfLastData=this.state.currentPage * this.state.dataPerPage;
        const indexOfFirstData=indexOfLastData - this.state.dataPerPage;
        this.setState({
            currentData:this.state.tableCountries.slice(indexOfFirstData,indexOfLastData)
        })
        
      }
      async getCountry(event){
        event.persist();
        const countryRes=await Axios.get("https://pomber.github.io/covid19/timeseries.json");
        const searchCountry=event.target.value;
        
        const byConfirmed=countryRes.data[searchCountry].slice(0);
        byConfirmed.sort(function(a,b){
            return b.confirmed - a.confirmed;
        });

        this.setState({
            selectedCountry:searchCountry,
            countries:countryRes.data[searchCountry],
            tableCountries:byConfirmed
        })
        const indexOfLastData=this.state.currentPage * this.state.dataPerPage;
        const indexOfFirstData=indexOfLastData - this.state.dataPerPage;
        this.setState({
            currentData:this.state.tableCountries.slice(indexOfFirstData,indexOfLastData)
        })
      }
      async updatePageNumber(){
        const countryRes=await Axios.get("https://pomber.github.io/covid19/timeseries.json");
        const searchCountry=this.state.selectedCountry;
        
        const byConfirmed=countryRes.data[searchCountry].slice(0);
        byConfirmed.sort(function(a,b){
            return b.confirmed - a.confirmed;
        });

        this.setState({
            selectedCountry:searchCountry,
            countries:countryRes.data[searchCountry],
            tableCountries:byConfirmed
        })
        const indexOfLastData=this.state.currentPage * this.state.dataPerPage;
        const indexOfFirstData=indexOfLastData - this.state.dataPerPage;
        this.setState({
            currentData:this.state.tableCountries.slice(indexOfFirstData,indexOfLastData)
        })
      }
    //paginate = pageNumber=> this.setState({currentPage:pageNumber});
        paginate(pageNumber){
        this.setState({currentPage:pageNumber});
        this.updatePageNumber();
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
                <Row className="justify-content-md-center">
                    <Col lg="12" md="12">
                    <h5>{this.state.selectedCountry}'s Data</h5>
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
                        <p><i><b>** Note:</b> Table data is accomulative.</i></p>
                    </Col>
                </Row>
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
                        this.state.currentData.map((list,index)=>
                        <tr key={index}>
                        <td>{list.date}</td>
                        <td><NumberFormat value={list.confirmed} displayType={'text'} thousandSeparator={true} /></td>
                        <td><NumberFormat value={list.recovered} displayType={'text'} thousandSeparator={true} /></td>
                        <td style={{fontWeight:"bold"}}><NumberFormat value={list.deaths} displayType={'text'} thousandSeparator={true} /></td>
                        </tr>
                        )
                        }
                    </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg="12" md="auto">
                    <Pagination dataPerPage={this.state.dataPerPage} totalData={this.state.tableCountries.length} paginate={this.paginate}/>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}
}
export default DataChart;