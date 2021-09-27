import axios from 'axios';

export default axios.create({
  baseURL: 'https://petstore.swagger.io/v2'
});
