import React from 'react'


const loading = () => {
  return (
	<div className="loader">
		<div className="flex w-full h-[40px] items-center justify-center space-x-1">
			<span className="loading-item1"></span>
			<span className="loading-item2"></span>
			<span className="loading-item3"></span>
			<span className="loading-item4"></span>
			<span className="loading-item5"></span>
		</div>
	</div>
  )
}

export default loading
