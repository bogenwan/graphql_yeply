'use strict'

const { gql } = require('apollo-server-express');
// const fetch = require('node-fetch');
const axios = require('axios');

const typeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
  }

  type Query {
    randomPerson: [Person!]!
    randomPerson2: [Person!]!
  }
`;

const resolvers = {
  Query: {
    randomPerson: async () => {
      return axios.get('https://api.randomuser.me/')
        .then(function (response) {
          return response.data.results;
        })
        .catch(function (error) {
          return error
        });
      // const response = await fetch ("https://api.randomuser.me/");
      // const data = await response.json();
      // console.log(data);
      // return data;
    }
    // randomPerson2: (_, __, {dataSource}) => {
    //   dataSources.randomUserAPI.getPerson()
    // }
  }
};

module.exports = { typeDefs, resolvers }
