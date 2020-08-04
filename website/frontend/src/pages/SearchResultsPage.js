import React, {useState, useEffect} from "react";
import axios from "axios";
import qs from "qs";
import Navbar from "../components/Navbar";
import SearchResultsBody from "../components/SearchResultsBody";


function SearchResultsPage({history}) {
  const [sets, setSets] = useState([])
  const [searchParam, setSearchParam] = useState(qs.parse(history.location.search, {ignoreQueryPrefix: true}).name)

  useEffect(() => {
    const data = {
      name: searchParam
    }

    axios.post("/api/set/search", data)
      .then((res) => {
        setSets(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return(
    <>
      <Navbar history={history}/>
      <SearchResultsBody initialSets={sets} searchParam={searchParam}/>
    </>
  )

}

export default SearchResultsPage;