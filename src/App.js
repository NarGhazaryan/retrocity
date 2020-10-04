import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Components/Home/Home'

class App extends React.Component {

  state = {
    myProf: {
      userId: {
        _id: "",
        name: '',
        email: '',
      },
    },
    posts: [
      //   {
      //     date: "29.06.2020",
      //     _id: "1",
      //     title: 'yellow car',
      //     imgUrl: 'https://avatars.mds.yandex.net/get-pdb/472427/b954f0d2-1ed7-4358-a7c4-7d1bc0d5db5e/s1200?webp=false',
      //     userId: {
      //       _id: "0",
      //       name: 'AnubisS',
      //       email: 'narek.ghazaryan1.g@tumo.org',
      //     },
      //   },
      //   {
      //     date: "29.06.2020",
      //     _id: "2",
      //     title: 'not yellow car',
      //     imgUrl: 'https://avatars.mds.yandex.net/get-pdb/2838509/bdc1cf2c-f7ee-458d-a6c6-3c08cff4db3a/s1200?webp=false',
      //     userId: {
      //       date: "29.06.2020",
      //       _id: "22",
      //       name: 'tumo',
      //       email: 'tumo@gmail.com',
      //       avatarUrl: "https://i.ytimg.com/vi/yMd0JvrtJF4/maxresdefault_live.jpg"
      //     },
      //   },
      //   {
      //     date: "29.06.2020",
      //     _id: "3",
      //     title: 'not yellow car again',
      //     imgUrl: 'https://f.vividscreen.info/soft/b416a194227ccc11469f0c4171604205/Retro-Portrait-2880x1920.jpg',
      //     userId: {
      //       date: "29.06.2020",
      //       _id: "0",
      //       name: 'AnubisS',
      //       email: 'narek.ghazaryan1.g@tumo.org',
      //       avatarUrl: "https://i.ytimg.com/vi/yMd0JvrtJF4/maxresdefault_live.jpg"
      //     },
      //   },
      //   {
      //     date: "29.06.2020",
      //     _id: "1",
      //     title: 'yellow car',
      //     imgUrl: 'https://avatars.mds.yandex.net/get-pdb/472427/b954f0d2-1ed7-4358-a7c4-7d1bc0d5db5e/s1200?webp=false',
      //     userId: {
      //       date: "01.01.0001",
      //       _id: "0",
      //       name: 'AnubisS',
      //       email: 'narek.ghazaryan1.g@tumo.org',
      //       avatarUrl: "https://i.ytimg.com/vi/yMd0JvrtJF4/maxresdefault_live.jpg"
      //     },
      //   },
      //   {
      //     date: "29.06.2020",
      //     _id: "2",
      //     title: 'not yellow car',
      //     imgUrl: 'https://avatars.mds.yandex.net/get-pdb/2838509/bdc1cf2c-f7ee-458d-a6c6-3c08cff4db3a/s1200?webp=false',
      //     userId: {
      //       date: "29.06.2020",
      //       _id: "22",
      //       name: 'tumo',
      //       email: 'tumo@gmail.com',
      //       avatarUrl: "https://i.ytimg.com/vi/yMd0JvrtJF4/maxresdefault_live.jpg"
      //     },
      //   },
      //   {
      //     date: "29.06.2020",
      //     _id: "3",
      //     title: 'not yellow car again',
      //     imgUrl: 'https://f.vividscreen.info/soft/b416a194227ccc11469f0c4171604205/Retro-Portrait-2880x1920.jpg',
      //     userId: {
      //       date: "29.06.2020",
      //       _id: "0",
      //       name: 'AnubisS',
      //       email: 'narek.ghazaryan1.g@tumo.org',
      //       avatarUrl: "https://i.ytimg.com/vi/yMd0JvrtJF4/maxresdefault_live.jpg"
      //     },
      //   },
    ]
  }

  fetchData = async () => {
    try {
      const data = await fetch("https://still-sands-43004.herokuapp.com/posts")
      const fetchedData = await data.json()
      this.setState({ posts: fetchedData })
    } catch (e) {
      console.log(e);
    }
  }

  fetchMyProfile = async () => {
    try {
      const token = await localStorage.getItem("token")
      const myProf = await fetch('https://still-sands-43004.herokuapp.com/user/auth/profile', {
        method: "POST",
        headers: {
          'auth-token': token
        }
      })
      const userId = await myProf.json()
      this.setState({ myProf: { userId: userId } })
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.fetchMyProfile()
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path='/' render={() => <Home posts={this.state.posts} user={this.state.myProf} refPrfo={this.fetchMyProfile} />} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
