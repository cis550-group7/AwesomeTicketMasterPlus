import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'

import MenuBar from '../components/MenuBar';
import { search_events, getEvent, getUpcomingEvents } from '../fetcher'

const eventColumns = [
    {
        title: 'Event Id',
        dataIndex: 'EventId',
        key: 'EventId',
        sorter: (a, b) => a.EventId - b.EventId
    },
    {
        title: 'Event Name',
        dataIndex: 'EventName',
        key: 'EventName',
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        render: (text, row) => <a href={`/events?id=${row.EventId}`}>{text}</a>
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        sorter: (a, b) => a.Country.localeCompare(b.Country)
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        sorter: (a, b) => a.Country.localeCompare(b.Country)
    },
    { 
        title: 'Price From',
        dataIndex: 'priceFrom',
        key: 'priceFrom',
        sorter: (a, b) => a.Price - b.Price
    },
    { 
        title: 'Price To',
        dataIndex: 'priceTo',
        key: 'priceTo',
        sorter: (a, b) => a.Price - b.Price
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time'
    }
];



class EventPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            countryQuery: '',
            selectedEventId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedEventDetails: null,
            eventResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleCountryQueryChange = this.handleCountryQueryChange.bind(this)
    }

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }


    handleCountryQueryChange(event) {
        this.setState({ countryQuery: event.target.value })
    }

    updateSearchResults() {

        search_events(this.state.nameQuery, this.state.countryQuery).then(res => {
            this.setState({ eventResults: res.results })
        })
    }

    componentDidMount() {

        search_events(this.state.nameQuery, this.state.countryQuery).then(res => {
            this.setState({ eventResults: res.results })
        })

        getEvent(this.state.selectedEventId).then(res => {
            this.setState({ selectedEventDetails: res.results[0] })
        })
    }


    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Event Name</label>
                            <FormInput placeholder="Event Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Country</label>
                            <FormInput placeholder="Country" value={this.state.countryQuery} onChange={this.handleCountryQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Divider />
                
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Upcoming Events</h3>
                    <Table 
                        dataSource={this.state.eventResults} columns={eventColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                </div>
                <Divider />

                {this.state.selectedEventDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <Card>
   
                    <CardBody>
                    <Row gutter='30' align='middle' justify='center'>
                        <Col flex={2} style={{ textAlign: 'left' }}>
                        <h3>{this.state.selectedEventDetails.EventName}</h3>
                        </Col>
                        <Col flex={2} style={{ textAlign: 'right' }}>
                        
                                        <img src={this.state.selectedEventDetails.images.split(/[, ]+/)[3].slice(1, -1)} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                                        </Col>
                    
                    </Row>
                    <Row>
                        TicketMaster Page:  <a href={this.state.selectedEventDetails.url}>Click Here!</a>  
                    </Row>
                    <Row gutter='30' align='middle' justify='left'>
                        <Col>
                            Date: <h5>{this.state.selectedEventDetails.date}</h5>
                        </Col>
                        <Col>
                            Time: <h5>{this.state.selectedEventDetails.time}</h5>
                        </Col>
                        <Col>
                            Price From: <h5>{this.state.selectedEventDetails.priceFrom}</h5>
                        </Col>
                        <Col>
                            Price To: <h5>{this.state.selectedEventDetails.priceTo}</h5>
                        </Col>
                    </Row>
                    <Row gutter='30' align='middle' justify='left'>
                        <Col>
                            Address: <h5>{this.state.selectedEventDetails.address}</h5>
                        </Col>
                        <Col>
                            City: <h5>{this.state.selectedEventDetails.city}</h5>
                        </Col>
                        <Col>
                            State: <h5>{this.state.selectedEventDetails.state}</h5>
                        </Col>
                        <Col>
                            Country: <h5>{this.state.selectedEventDetails.country}</h5>
                        </Col>
                        <Col>
                            Postal Code: <h5>{this.state.selectedEventDetails.postalCode}</h5>
                        </Col>
                    </Row>    
                        
                    
                    </CardBody>

                </Card>

                </div> : null}

            </div>
        )
    }
}

export default EventPage

