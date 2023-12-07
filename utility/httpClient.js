const axios = require('axios');
const { stringify } = require('uuid');


const httpClientPlugin = {

  get: async (url) => {
    const { data } = await axios.get(url);
    return data;
    // const resp = await fetch( url );
    // return await resp.json();     
  },

  post: async (url, headerparam, body) => {
    const { data } = await axios.post(url,  headerparam , body);
    return data;
  },

  //postplus: async (methodparam, urlparams, headerparam, bodyData) => {
  postplus: async (requestPost) => {
    const { data } = await axios(requestPost);
    return data;
  },






  put: async (url, body) => { },
  delete: async (url) => { },

};

module.exports = {
  httpClient: httpClientPlugin,
};