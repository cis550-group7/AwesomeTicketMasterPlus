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
    title: 'Id',
    dataIndex: 'Id',
    key: 'Id',
    sorter: (a, b) => a.Id - b.Id
  },
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
  },
  {
    title: 'Generes',
    dataIndex: 'Generes',
    key: 'Generes',
    sorter: (a, b) => a.Generes.localeCompare(b.Generes)
  },
  {
    title: 'External_urls',
    dataIndex: 'External_urls',
    key: 'External_urls',
    sorter: (a, b) => a.External_urls.localeCompare(b.External_urls)
  },
  {
    title: 'Popularity',
    dataIndex: 'Popularity',
    key: 'Popularity',
    sorter: (a, b) => a.Popularity - b.Popularity
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

  leagueOnChange(value) {
    getAllMatches(null, null, value).then(res => {
      this.setState({ matchesResults: res.results })
    })
  }

  componentDidMount() {
    getAllMatches(null, null, 'D1').then(res => {
      this.setState({ matchesResults: res.results })
    })

    getAllPlayers().then(res => {
      console.log(res.results)
      this.setState({ playersResults: res.results })
    })

 
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Top 100 Artists</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
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
  }} dataSource={this.state.matchesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Teams">
              <Column title="Home" dataIndex="Home" key="Home" sorter= {(a, b) => a.Home.localeCompare(b.Home)}/>
              <Column title="Away" dataIndex="Away" key="Away" sorter= {(a, b) => a.Away.localeCompare(b.Away)}/>
            </ColumnGroup>
            <ColumnGroup title="Goals">
              <Column title="Home Goals" dataIndex="HomeGoals" key="HomeGoals" sorter= {(a, b) => a.HomeGoals - b.HomeGoals}/>
              <Column title="Away Goals" dataIndex="AwayGoals" key="AwayGoals" sorter= {(a, b) => a.AwayGoals - b.AwayGoals}/>
            </ColumnGroup>
              <Column title="Date" dataIndex="Date" key="Date"/>
              <Column title="Time" dataIndex="Time" key="Time"/>
          </Table>

        </div>


      </div>
    )
  }

}

export default HomePage

