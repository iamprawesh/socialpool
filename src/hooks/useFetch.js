import React from 'react';
import Axios from 'axios';
function useFetch(url) {
  const [state, setState] = React.useState({
    data: null,
    loading: false,
  });
  console.log('useFetch');
  //  api call
  React.useEffect(() => {
    setState({loading: true, data: null});
    Axios.get(url)
      .then((res) => {
        setState({
          loading: false,
          data: res.data.trivia_categories,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);
  return {...state};
}

export default useFetch;
