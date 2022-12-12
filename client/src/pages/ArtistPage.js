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
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';

import { getArtist,getArtistsByName,getPopularArtists, getArtistsByNumEvents, getUpcomingEvents,rankArtistByEventCounts,getArtistSongs,getArtistEvents} from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;
const wideFormat = format('.3r');

const playerColumns = [
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
      render: (text, row) => <a href={`/artists?id=${row.id}`}>{text}</a>
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

const songColumns = [
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
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
  
    {
      title: 'Spotify Page',
      dataIndex: 'external_urls',
      key: 'external_urls',
      sorter: (a, b) => a.external_urls.localeCompare(b.external_urls),
      render: (text, row) => <a href={`//${row.external_urls.slice(20, -2)}`}>{text}</a>
    },
    {
      title: 'Duration',
      dataIndex: 'duration_ms',
      key: 'duration_ms',
      sorter: (a, b) => a.duration - b.duration
    }
   
  ];
  
  class ArtistPage extends React.Component {
  
    constructor(props) {
      super(props)
  
      this.state = {
        nameQuery: '',
        selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 1,
        selectedPlayerDetails: null,
        playersResults: [],
        pagination: null,
        songs:[]
      }
  
      
     
      this.updateSearchResults = this.updateSearchResults.bind(this)
      this.handleNameQueryChange = this.handleNameQueryChange.bind(this)

    }
   handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    updateSearchResults() {
        getArtistsByName(this.state.nameQuery).then(res => {
            this.setState({ playersResults: res.results })
        })
    }



    componentDidMount() {
    
        getPopularArtists(10).then(res => {
          this.setState({ playersResults: res.results })
        })
        
        getArtistSongs(this.state.selectedPlayerId).then(res => {
            this.setState({ songs: res.results })
          })

        getArtistsByName(this.state.selectedPlayerId).then(res => {
            this.setState({ selectedPlayerDetails: res.results[0] })
        })
        
        getArtist(this.state.selectedPlayerId).then(res => {
            this.setState({ selectedPlayerDetails: res.results[0] })
        })
        
      }



    render() {
  
      return (
        <div>
          <MenuBar />
          <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Search by Name</label>
                            <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                      
                       
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                    <br></br>
               

          </Form>
         
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Top 10 Artists</h3>
            <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}/>
            <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}></div>
        </div>
  

        <Divider />{this.state.selectedPlayerDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
    <Card>
   
        <CardBody>
        <Row gutter='30' align='middle' justify='center'>
            <Col flex={2} style={{ textAlign: 'left' }}>
            <h3>{this.state.selectedPlayerDetails.name}</h3>
            </Col>
            <Col flex={2} style={{ textAlign: 'right' }}>
            
                            <img src={this.state.selectedPlayerDetails.images.split(/[, ]+/)[3].slice(1, -1)} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
           
        </Row>
            <Row gutter='30' align='middle' justify='left'>
                <Col>
                Genres: <h5>{this.state.selectedPlayerDetails.genres.slice(2, -2)}</h5>
                </Col>
                <Col>
                Spotify Page: <h5>{this.state.selectedPlayerDetails.external_urls.slice(2, -2)}</h5>
                
                </Col>
                <Col>
                Popularity: <h5>{this.state.selectedPlayerDetails.popularity}</h5>
                </Col>
            </Row>
            <br></br>
            
            
           
        </CardBody>

    </Card>

      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Artist's Songs</h3>
            <Table dataSource={this.state.songs} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}/>
            <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}></div>
        </div>
  

</div> : null}

</div>
      )
    }
  
  }
  




export default ArtistPage

