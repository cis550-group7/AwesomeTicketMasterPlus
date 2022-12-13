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
    render: (text, row) => <a href={`//${row.external_urls.slice(20, -2)}`}>{text}</a>
  },
  {
    title: 'Popularity',
    dataIndex: 'popularity',
    key: 'popularity',
    sorter: (a, b) => a.popularity - b.popularity
  }
];

class UserPage extends React.Component {

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
      </div>
    )
  }

}

export default UserPage
