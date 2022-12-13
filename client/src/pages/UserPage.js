import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import React, { useState, useEffect } from 'react';
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
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';
import { useSelector, useDispatch} from 'react-redux'
import {updateCurrentUser, selectCurrentUser} from './currentUserSlice'
import MenuBar from '../components/MenuBar';
import { getFollows, getPopularArtists, getReservations } from "../fetcher";

const artistColumns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text, row) => <a href={`/artist?id=${row.id}`}>{text}</a>
  },
  {
    title: 'Genres',
    dataIndex: 'genres',
    key: 'genres',
    sorter: (a, b) => a.genres.localeCompare(b.genres)
  },
  {
    title: 'Spotify Page',
    dataIndex: 'external_urls',
    key: 'external_urls',
    sorter: (a, b) => a.external_urls.localeCompare(b.external_urls),
    render: (text, row) => <a href={`//${row.external_urls.slice(20, -2)}`}>{text}</a>
  },
  {
    title: 'Popularity',
    dataIndex: 'popularity',
    key: 'popularity',
    sorter: (a, b) => a.popularity - b.popularity
  }
];

const eventsColumns = [
  {
    title: 'Time Placed',
    dataIndex: 'timePlaced',
    key: 'timePlaced'
  },
  {
      title: 'Event Id',
      dataIndex: 'eventId',
      key: 'eventId',
      sorter: (a, b) => a.eventId - b.eventId
  },
  {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
      render: (text, row) => <a href={`/events?id=${row.eventId}`}>{text}</a>
  },
  {
    title: 'Venue',
    dataIndex: 'venueName',
    key: 'venueName',
    sorter: (a, b) => a.venueName.localeCompare(b.venueName)
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address)
  },
  {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city)
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: (a, b) => a.Country.localeCompare(b.Country)
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

function UserPage() {
  const stateCurrentUser = useSelector(selectCurrentUser);
  const [artistsResults, setArtists] = useState([]);
  const [eventsResults, setEvents] = useState([]);


  useEffect(() => {
    if (stateCurrentUser.id!==-1){
    getFollows(stateCurrentUser.id).then(res => {
      setArtists(res.results);
    })
    getReservations(stateCurrentUser.id).then(res => {
      setEvents(res.results);
    });
  }
  }, []);


    return(
      <>
      <MenuBar />
      
      <Card style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
      <CardBody>
      <Row gutter='30' align='middle' justify='center'>
          <Col flex={2} style={{ textAlign: 'left' }}>
          <h3>{}</h3>
          </Col>
          <Col flex={2} style={{ textAlign: 'right' }}>
          <img src={"https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>
          </Col>
         
      </Row>
          <Row gutter='30' align='middle' justify='left'>
              <Col>
              <h5>Id:</h5> {stateCurrentUser.id}
              </Col>
              <Col>
              <h5>Name:</h5> {stateCurrentUser.name}
              </Col>
              <Col>
              <h5>Username:</h5>{stateCurrentUser.username}
              </Col>
              <Col>
              <h5>Date of Birth:</h5> {stateCurrentUser.dob}
              </Col>
              <Col>
              <h5>Email:</h5> {stateCurrentUser.email}
              </Col>
          </Row>
          <br></br>

      </CardBody>
      </Card>
      <Divider />

      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Following</h3>
          <Table dataSource={artistsResults} columns={artistColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Reservations</h3>
          <Table dataSource={eventsResults} columns={eventsColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>
    </>
    )

}

export default UserPage