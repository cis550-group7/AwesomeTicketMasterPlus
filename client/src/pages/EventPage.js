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
    Rate 
} from 'antd'

import { NavLink } from "react-router-dom";
import MenuBar from '../components/MenuBar';
import { search_events, getEvent, getUpcomingEvents, getReservations, reserveEvent, unReserveEvent} from '../fetcher'
import {useSelector, useDispatch} from 'react-redux'
import {updateCurrentUser, selectCurrentUser, logoutAction} from '../pages/currentUserSlice'


export default function EventPage(){

    const eventColumns = [
        {
            title: 'Event Id',
            dataIndex: 'EventId',
            key: 'EventId',
            sorter: (a, b) => a.EventId - b.EventId,
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
                </NavLink>,
            
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

    //search for events
    const[nameQuery, setName] = useState("");
    const[countryQuery, setCountry] = useState("United States");
    const[eventResults, setResults] = useState([]);

    //select an event
    const[selectedEventId, setEventId] = useState(1);
    const[selectedEventDetails, setEventDetails] = useState(null);
    const [buttonTxt, setButtonTxt] = useState('Reserve');

    //logged-in user
    const stateCurrentUser = useSelector(selectCurrentUser);
    const userId = stateCurrentUser.id;

    async function updateSearchResults() {
        const res =  await search_events(nameQuery, countryQuery)
        setResults(res.results);
    }

    async function updateSpecificEvent(selectedEventId){
        const res =  await getEvent(selectedEventId);
        console.log(res);
        setEventDetails(res.results[0]);
        
        const reserved = await getReservations(userId);
        const reservedEvents = reserved.results;
        for(let i = 0; i < reservedEvents.length; i++){
            const reservedEventId= reservedEvents[i].eventId;
            if(reservedEventId==selectedEventId){
                setButtonTxt('Unreserve');
                break;
            } else{
                setButtonTxt('Reserve');
            }
        }
    }

    async function handleReserve(){
        try{
            const selectedEventId = window.location.search ? window.location.search.substring(1).split('=')[1] : 1
            const response = await reserveEvent(userId, selectedEventId)
            setButtonTxt('Unreserve');
            alert("Successfully Reserved!"); 
        } catch(err){
            return err;
        }
    }

    async function handleUnReserve(){
        try{
            const selectedEventId = window.location.search ? window.location.search.substring(1).split('=')[1] : 1
            const response = await unReserveEvent(userId, selectedEventId)
            setButtonTxt('Reserve');
            alert("Successfully Unreserved!"); 
        } catch(err){
            return err;
        }
    }

    useEffect(() => {
        updateSearchResults();

        setEventId(window.location.search ? window.location.search.substring(1).split('=')[1] : 1);
        console.log(selectedEventId);
        updateSpecificEvent(selectedEventId);

      }, [selectedEventId])

    return (

        <div>
        <Row>
        <Col flex={1}>
        <MenuBar />
        </Col>
        <Col flex={11} >

            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Event Name</label>
                        <FormInput placeholder="Event Name" value={nameQuery} onChange={e => setName(e.target.value)} />
                    </FormGroup></Col>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Country</label>
                        <FormInput placeholder="Country" value={countryQuery} onChange={e => setCountry(e.target.value)} />
                    </FormGroup></Col>
                    <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                        <Button theme="info" style={{ marginTop: '2.5vh' }} onClick={updateSearchResults}>Search</Button>
                    </FormGroup></Col>
                </Row>
            </Form>

            <Divider />
            
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <h3>Upcoming Events</h3>
                <Table dataSource={eventResults} columns={eventColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
            </div>
            
            <Button theme="info" style={{ margin: '0 auto', marginLeft: '20vh', marginTop: '4vh' }} onClick={e => setEventId(window.location.search.substring(1).split('=')[1])}>Show the Selected Event</Button>

            <Divider />

            {selectedEventDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
           
            <Card>
                <CardBody>
                <Row gutter='30' align='middle' justify='center'>
                    <Col flex={2} style={{ textAlign: 'left' }}>
                        <h3>{selectedEventDetails.EventName}</h3>
                    </Col>
                    <Col>
                        {buttonTxt === 'Unreserve' ? (
                            <Button 
                            theme="info"
                            type= 'primary'
                            shape="round" 
                            onClick={handleUnReserve}
                            >{buttonTxt} </Button>) : (
                            <Button 
                            theme="info"
                            type= 'primary'
                            shape="round" 
                            onClick={handleReserve}
                            > {buttonTxt} </Button>
                            )}
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
            </Col>
        </Row>
        </div>
    )
}