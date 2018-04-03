// ./routes/index.js
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// import MainPage from './MainPage';
// import AnotherPage from './AnotherPage';

const ALL_ITEMS_QUERY = gql`
  query HelloWorld {
    hello
  }
`;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  handleClick(event) {
    this.setState({ liked: !this.state.liked });
  }
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} fetchPolicy="cache-first">
        {({ data, error, loading, refetch }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          const text = this.state.liked ? 'like' : "haven't liked";
          return (
            <div>
              <p onClick={this.handleClick}>
                You {text} this. Click to toggle.
              </p>
              <button
                onClick={() => {
                  alert('alert');
                }}
              >
                alert
              </button>

              <button
                onClick={() => {
                  console.log('calling refetch');
                  refetch().then(() => console.log('refetch finished'));
                }}
              >
                refetch
              </button>
              <p>{data.hello} </p>
            </div>
          );
        }}
      </Query>
    );
  }
}

const AnotherPage = () => <div> another </div>;

const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: MainPage,
  },
  {
    path: '/another',
    name: 'another',
    component: AnotherPage,
  },
];

export default routes;
