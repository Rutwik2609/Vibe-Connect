import React from 'react'
import { useState, useEffect } from 'react'

const Searchbar = () => {

  const [Search, setSearch] = useState(null)

  const handleSearch=(e)=>{
    e.preventDefault();
    setSearch(`/profile/${e.target[0].value}`);
  }

  useEffect(() => {
		if (Search) {
		  // Trigger navigation here
		  window.location.href = Search;
		}
	  }, [Search]);

  return (
    <div className='flex-1 p-1 top-0 w-full justify-center border-b  ' >
        <form action="" onSubmit={handleSearch}>
            <label htmlFor="search" className='flex gap-2 input rounded-lg w-full justify-center items-center  hover:bg-slate-900'>
                <img src="/spin.svg" alt="search" className='w-8' />
                <input type="text" placeholder='Enter username of Person... ' className='tracking-tighter text-white font-medium' />
            </label>
        </form>
    </div>
  )
}

export default Searchbar