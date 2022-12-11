import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getUpcomingEvents, getPopularArtists, getArtistsByNumEvents} from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


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
    //render: (text, row) => <a href={`${row.external_urls.slice(12, -2)}`}>{text}</a>
  },
  {
    title: 'Popularity',
    dataIndex: 'popularity',
    key: 'popularity',
    sorter: (a, b) => a.popularity - b.popularity
  }
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }


  leagueOnChange() {
    getUpcomingEvents().then(res => {
      this.setState({ matchesResults: res.results })
    })
  }

  componentDidMount() {
    getUpcomingEvents().then(res => {
      console.log(res.results)
      this.setState({ matchesResults: res.results })
    })

    getPopularArtists(100).then(res => {
      //console.log(res.results)
      this.setState({ playersResults: res.results })
    })

 
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Top 100 Artists</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}/>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Upcoming Events</h3>
          <Select defaultValue="D1" style={{ width: 120 }} onChange={this.leagueOnChange}>
            <Option value="D1">Bundesliga</Option>
            <Option value="SP1">La Liga</Option>
          </Select>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.matchesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}>
            <Column title="id" dataIndex="id" key="id" sorter= {(a, b) => a.id - b.id}/>
            <Column title="Name" dataIndex="name" key="name" sorter= {(a, b) => a.name.localeCompare(b.name)}/>
            <Column title="Ticketmaster Page" dataIndex="url" key="url" sorter= {(a, b) => a.name.localeCompare(b.name)}/>
            <ColumnGroup title="Prices">
              <Column title="From" dataIndex="priceFrom" key="priceFrom" sorter= {(a, b) => a.priceFrom - b.priceFrom}/>
              <Column title="To" dataIndex="priceTo" key="priceTo" sorter= {(a, b) => a.priceTo - b.priceTo}/>
            </ColumnGroup>
            <Column title="Date" dataIndex="date" key="date"/>
            <Column title="Time" dataIndex="time" key="time"/>
            <Column title="Venues" dataIndex="venues" key="venues"/>
          </Table>

        </div>


      </div>
    )
  }

}

export default HomePage

