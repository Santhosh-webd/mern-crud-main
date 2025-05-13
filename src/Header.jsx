import React, { useState } from 'react'
import logo from "./images/logo.png"

export const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchText)  // send to View component
  }

  return (
    <div className="mainheader">
      <div className="headerlogo">
        <img src={logo} alt="" className='headerlogoimage' />
        <h4>MINIREVIEW</h4>
      </div>
      <div className="inputtag">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder='Search...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}
