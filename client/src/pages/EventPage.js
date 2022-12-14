import React,{useState, useEffect} from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress, NavItem } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    notification 
} from 'antd'

import { NavLink } from "react-router-dom";
import MenuBar from '../components/MenuBar';
import { search_events, getEvent, getUpcomingEvents, getReservations, reserveEvent } from '../fetcher'
import {useSelector, useDispatch} from 'react-redux'
import {updateCurrentUser, selectCurrentUser, logoutAction} from '../pages/currentUserSlice'

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
        sorter: (a, b) => a.EventName.localeCompare(b.EventName),
        render: (text, row) =>  
            <NavLink 
                to = {`/events?id=${row.EventId}`}
                >
                    {text}
            </NavLink>
        // <a href={`/events?id=${row.EventId}`}>{text}</a>
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country)
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        sorter: (a, b) => a.city.localeCompare(b.city)
    },
    { 
        title: 'Price From',
        dataIndex: 'priceFrom',
        key: 'priceFrom',
        sorter: (a, b) => a.priceFrom - b.priceFrom
    },
    { 
        title: 'Price To',
        dataIndex: 'priceTo',
        key: 'priceTo',
        sorter: (a, b) => a.priceTo - b.priceTo
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



export default function EventPage(){
    const[nameQuery, setName] = useState("");
    const[countryQuery, setCountry] = useState("");
    const[selectedEventDetails, setEventDetails]=useState(null);
    const[eventResults, setResults] = useState([]);
    const[selectedEventId, setEventId] = useState(0);
    const [buttonTxt, setButtonTxt] = useState('Reserve');
    const stateCurrentUser = useSelector(selectCurrentUser);
    const userId = stateCurrentUser.id;
    
    function handleNameQueryChange(event) {
        setName(event.target.value)
    }


    function handleCountryQueryChange(event) {
        setCountry(event.target.value)
    }

    async function updateSearchResults() {
        const res =  await search_events(nameQuery, countryQuery)
        setResults(res.results);
    }

    async function updateSpecificEvent(selectedEventId){
        // const selectedEventId = window.location.search ? window.location.search.substring(1).split('=')[1] : 0
        const res =  await getEvent(selectedEventId);
        setEventDetails(res.results[0]);
        
        // const reserved = await getReservations(userId);
        // const reservedEvents = reserved.results;
        // for(let i = 0; i < reservedEvents.length; i++){
        //     const reservedEventId= reservedEvents[i].eventId;
        //     // postList.push(curPost);
        //     // console.log(reservedEventId)
        //     if(reservedEventId==selectedEventId){
        //         setButtonTxt('Unreserve');
        //         break;
        //     } else{
        //         setButtonTxt('Reserve');
        //     }
        // }
        // console.log(res);

    }

    async function handleReserve(){
        try{
            // const selectedEventId = window.location.search ? window.location.search.substring(1).split('=')[1] : 0
            const response = await reserveEvent(userId, selectedEventId)
            if(response.success){
                notification.success({
                    message: 'Successfully Reserved!',
                  });
                  setButtonTxt('Unreserve');
            } else{
                notification.error({
                    description: "Oops! Some errors occurred.",
                  });
            }
        } catch(err){
            return err;
        }
    }

    useEffect(() => {
        const selectedEventId = window.location.search ? window.location.search.substring(1).split('=')[1] : 0
        console.log(selectedEventId)
        // setEventId(window.location.search ? window.location.search.substring(1).split('=')[1] : 0);
        updateSearchResults();
        updateSpecificEvent(selectedEventId);
        // initReserve();
        console.log(selectedEventDetails)
      }, [selectedEventDetails])

    return (

        <div>

            <MenuBar />
            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Event Name</label>
                        <FormInput placeholder="Event Name" value={nameQuery} onChange={handleNameQueryChange} />
                    </FormGroup></Col>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Country</label>
                        <FormInput placeholder="Country" value={countryQuery} onChange={handleCountryQueryChange} />
                    </FormGroup></Col>
                    <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                        <Button style={{ marginTop: '4vh' }} onClick={updateSearchResults}>Search</Button>
                    </FormGroup></Col>
                </Row>
            </Form>
            <Divider />
            
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <h3>Upcoming Events</h3>
                <Table
                    dataSource={eventResults} columns={eventColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
            </div>
            <Divider />

            {selectedEventDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <Card>

                <CardBody>
                <Row gutter='30' align='middle' justify='center'>
                    <Col flex={2} style={{ textAlign: 'left' }}>
                    <h3>{selectedEventDetails.EventName}</h3>
                    </Col>
                    <Col>
                    {
                    buttonTxt === 'Unreserve' ? (
                        <Button 
                          type= 'primary'
                          shape="round" 
                        //   onClick={handleUnFollow}
                        >{buttonTxt} </Button>) : (
                          <Button 
                          type= 'primary'
                          shape="round" 
                          onClick={handleReserve}
                        > {buttonTxt} </Button>
                        )
                }
                    </Col>
                    <Col flex={2} style={{ textAlign: 'right' }}>
                    
                                    <img src={selectedEventDetails.images.split(/[, ]+/)[3].slice(1, -1)} alt={null} style={{height:'15vh'}}/>

                                    </Col>
                
                </Row>
                <Row>
                    TicketMaster Page:  <a href={selectedEventDetails.url}>Click Here!</a>  
                </Row>
                <Row gutter='30' align='middle' justify='left'>
                    <Col>
                        Date: <h5>{selectedEventDetails.date}</h5>
                    </Col>
                    <Col>
                        Time: <h5>{selectedEventDetails.time}</h5>
                    </Col>
                    <Col>
                        Price From: <h5>{selectedEventDetails.priceFrom}</h5>
                    </Col>
                    <Col>
                        Price To: <h5>{selectedEventDetails.priceTo}</h5>
                    </Col>
                </Row>
                <Row gutter='30' align='middle' justify='left'>
                    <Col>
                        Address: <h5>{selectedEventDetails.address}</h5>
                    </Col>
                    <Col>
                        City: <h5>{selectedEventDetails.city}</h5>
                    </Col>
                    <Col>
                        State: <h5>{selectedEventDetails.state}</h5>
                    </Col>
                    <Col>
                        Country: <h5>{selectedEventDetails.country}</h5>
                    </Col>
                    <Col>
                        Postal Code: <h5>{selectedEventDetails.postalCode}</h5>
                    </Col>
                </Row>    

                </CardBody>

            </Card>

            </div> : null}

        </div>
    )
}