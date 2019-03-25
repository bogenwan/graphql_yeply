'use strict'

const { gql } = require('apollo-server-express');
// const fetch = require('node-fetch');
const axios = require('axios');
const path = require('path');
const stringify = require('json-stringify-safe');

require('dotenv').config(
  {
    path: path.join(__dirname, '/../../.env')
  }
);

const typeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
  }

  type Business {
    # rating: Int
    # price: String
    # name: String
    # url: String
    hours_type: String,
    is_open_now: String
  }

  type Query {
    randomPerson: [Person!]!
    randomPerson2: [Person!]!
    getBusinessByPhoneNum: [Business!]!
  }
`;

const resolvers = {
  Query: {
    getBusinessByPhoneNum: async () => {
      // let url = 'https://api.yelp.com/v3/businesses/search/phone';
      let apiKey = process.env.YELP_API_KEY
      let url = `https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco`;
      // let phoneNum = '+14159083801'
      return axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + apiKey
        }
      })
      .then(function (response) {
        console.log(response.data.hours);
        return response.data.hours;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
    },



    randomPerson: async () => {
    return axios.get('https://api.randomuser.me/')
      .then(function (response) {
        return response.data.results;
      })
      .catch(function (error) {
        return error
      });
    }

      // const response = await fetch ("https://api.randomuser.me/");
      // const data = await response.json();
      // console.log(data);
      // return data;
    // randomPerson2: (_, __, {dataSource}) => {
    //   dataSources.randomUserAPI.getPerson()
    // }
  }
};

module.exports = { typeDefs, resolvers }
