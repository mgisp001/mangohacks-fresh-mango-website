import React, { Component } from "react";
import logo from "./logo.svg";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { EightBaseAppProvider } from '@8base/app-provider';
import { WebAuth0AuthClient } from '@8base/web-auth0-auth-client';
import { POINT_CONVERSION_UNCOMPRESSED } from "constants";

const ENDPOINT_URL = 'https://api.8base.com/cjrmxf8uw00ax01quz59g93hk'
const AUTH_CLIENT_ID = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';
const AUTH_DOMAIN = 'auth.8base.com';

const TRACKS_LIST_QUERY = gql`
query TrackTest {
  tracksList {
    items {
      id
      title
      courses {
        items {
          id
          title
          summary
          modulesSections{
            items{
              name
              summary
              videos
            }
          }
        }
      }
    }
  }
}


`;
/*
This is to allow us to call the query itself. 
*/
const withTracksList = graphql(TRACKS_LIST_QUERY, {
  props: ({ data: { tracksList: ({ items } = {}) } }) => {
  return {
    tracks: items || []
  };
}
});





const authClient = new WebAuth0AuthClient({
  domain: AUTH_DOMAIN,
  clientId: AUTH_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback`,
  logoutRedirectUri: `${window.location.origin}/auth`,
});

/*
Every component function requires to extend component and a render function
*/
class NavBar extends Component {

  render() {
    return <div>
      NavBar
    </div>
  }
}

class Main extends Component {

  renderCourse = (course) => {
    console.log("renderCourse = ", course);
    return <div>
      <br /><div>Course: {course.title}, {course.summary}</div>
      {course.modulesSections.items.map((section) => this.renderModule(section)
      )}
    </div>

  }
  renderModule = (modulesSection) => {
    console.log("renderModule = ", modulesSection);
    return <div>{modulesSection.title},
    {modulesSection.summary},
    {modulesSection.videos}</div>
  }

  /*
  The code below is where we start printing and developing the list of queries
  */
  render() {
    const { tracks } = this.props;
    console.log('tracks', tracks);

    return (
      <div className="App">
        <NavBar></NavBar>
        <header className="App-header">
          {tracks.map((track) => {
            { console.log("hello test", track) }
            return (
              <div>Track title: {track.title}, title of courses:
            {track.courses.items.map((course) => this.renderCourse(course)
              )}</div>

            );
          })}
          {/*<img src={this.state.image_url} className="App-logo" alt="logo" />*/}
          <p>

          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}
//This is what makes the program spit it out :)
Main = withTracksList(Main);

class App extends Component {

  state = {
    text: "Edit src/App.js and save to reload.",
    image_url: logo
  }

  //This is once the program mounts, what is below will show up on the program.
  componentDidMount() {
    this.setState({ text: "This is going to be fresh mango" })
  }


  render() {
    return (
      <EightBaseAppProvider uri={ENDPOINT_URL} authClient={authClient} >
        {({ loading }) => loading ? <div>"Loading..."</div> : (
          <Main />
        )}
      </EightBaseAppProvider>
    );
  }
}

export default App;

