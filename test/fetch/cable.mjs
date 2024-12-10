import { fetchBackEnd, backEndData } from '../../services/fetcher.js';
fetchBackEnd(backEndData.sample)
  .then(data => console.log(data)) // test?
