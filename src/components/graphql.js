// Now, let's create a GraphQL-enabled component...

// ... then, let's create the component and decorate it with the `graphql`
// HOC that will automatically populate `this.props` with the query data
// once the GraphQL API request has been completed

// ----------------------
// IMPORTS

/* NPM */

import React from 'react';
import PropTypes from 'prop-types';

// GraphQL
import { graphql, Query } from 'react-apollo';

/* App */

// GraphQL queries.  Looking at this file demonstrates how to import fragments.
// Webpack will compile this into inline GraphQL for us, so we can pass the
// query to components using the @graphql decorator
import allMessages from 'src/graphql/queries/all_messages.gql';

// ----------------------

// Since this component needs to 'listen' to GraphQL data, we wrap it in
// `react-apollo`'s `graphql` HOC/decorator and pass in the query that this
// component requires. Note: This is not to be confused with the `graphql`
// lib, which is used on the server-side to initially define the schema
export class _GraphQLMessage extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      message: PropTypes.shape({
        text: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    data: {
      message: {
        text: null,
      },
    },
  };

  render() {
    const { data } = this.props;
    setTimeout(() => {
      console.log('refetching');
      data.refetch().then(console.log);
    }, 500);

    // Since we're dealing with async GraphQL data, we defend against the
    // data not yet being loaded by checking to see that we have the `message`
    // key on our returned object
    const message = data.message && data.message.text;

    // Apollo will tell us whether we're still loading.  We can also use this
    // check to ensure we have a fully returned response
    const isLoading = data.loading ? 'yes' : 'nope';
    return (
      <div>
        <h2>
          Message from GraphQL server: <em>{message}</em>
        </h2>
        <h2>Currently loading?: {isLoading}</h2>
      </div>
    );
  }
}
export default graphql(allMessages)(_GraphQLMessage);

export class GraphQLMessage extends React.PureComponent {
  refetched = false;
  render() {
    // const { data } = this.props;
    // setTimeout(() => {
    //   console.log('refetching');
    //   data.refetch().then(console.log);
    // }, 500);

    // Since we're dealing with async GraphQL data, we defend against the
    // data not yet being loaded by checking to see that we have the `message`
    // key on our returned object
    // const message = data.message && data.message.text;

    // Apollo will tell us whether we're still loading.  We can also use this
    // check to ensure we have a fully returned response
    // const isLoading = data.loading ? 'yes' : 'nope';
    return (
      <Query query={allMessages}>
        {({ data, loading, refetch }) => {
          if (!loading && !this.refetched) {
            setInterval(() => {
              console.log('refetching');
              // refetch().then(console.log);
            }, 500);
            this.refetched = true;
          }
          return (
            <div>
              <h2>
                Message from GraphQL server:{' '}
                <em>{(data.message && data.message.text) || null}</em>
              </h2>
              <h2>Currently loading?: {loading}</h2>
            </div>
          );
        }}
      </Query>
    );
  }
}
