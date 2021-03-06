import React, { Fragment } from 'react'
import axios from 'axios'
import dndApiUrl from './../../dndApiConfig'

const Dropdown = ({ urlSuffix, resourceName, handleChange }) => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [resource, setResource] = React.useState([])

  React.useEffect(() => {
    axios({
      url: `${dndApiUrl}/api/${urlSuffix}`
    })
      .then(res => {
        setResource(res.data.results.map(result => {
          return result.name
        }))
      })
      .then(setIsLoaded(true))
      .catch(console.error)
  }, [])

  if (isLoaded) {
    return (
      <Fragment>
        <select name='currentResource' onChange={handleChange}>
          {resource.map((item, idx) => {
            return (<option key={idx} value={item.toLowerCase()}>{item}</option>)
          })}
        </select>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <select>
          <option>Loading...</option>
        </select>
      </Fragment>
    )
  }
}

export default Dropdown
