import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
function App() {
	const [allData, setAllData] = useState([]);
	const [filteredData, setFilteredData] = useState(allData);

	const handleSearch = (event) => {
		let value = event.target.value.toLowerCase();
		let result = [];
		console.log(value);
		result = allData.filter((data) => {
			return data.name.toLowerCase().search(value) != -1;
		});
		 setFilteredData(result);
	}


	useEffect(() => {
    // use axios to make a request to the API nd then set the response of the API call equal to the first and second piece of state we created.
		axios('https://gateway.marvel.com/v1/public/characters?ts=1645190460&apikey=d73705caf44118d278fda98330ccf890&hash=8cdfeb67ae5f1a97e0be94e7ad691fa2')
			.then(response => {
				console.log(response.data.data.results)
				setFilteredData(response.data.data.results);
				
				setAllData(response.data.data.results);
				
				//console.log('Error getting fake data: ' + response.data);
			})
			.catch(error => {
				console.log('Error getting fake data: ' + error);
			})
	}, []);



	return (
		<div className="App">
      <div className="container">
        <div className="row">
			<div style={{ margin: '0 auto', marginTop: '10%' }}>
				<label>Search:</label>
				<input type="text" onChange={(event) => handleSearch(event)} className="form-control" />
			</div>

				{filteredData.map((value, index) => {
					console.log('test',index);
					return (
					
								<div  className=" col-lg-2 col-md-6 col-sm-12">
                  <div className='MovieCard'>
                <div class="products-image-div">
                <img src={`${value.thumbnail.path}.jpg`}></img>
                  </div>
                  <div class="product-info-div">
                    <div class="product-title-maindiv">
                      <div class="product-title"><h1>{value.name}</h1></div>
                      <div class="product-tag-list">{value.description.substring(0, 20)}
                      </div>
                      </div>
                  </div>
                  </div>
								</div>
					)
				})}
      
			</div>
      </div>
		</div>
	);
}

export default App;
