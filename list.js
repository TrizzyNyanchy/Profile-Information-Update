import { useEffect, useState } from "react";
import './restaurant.css';
import { Link } from "react-router-dom";

function RestaurantList() {

  const [tableData, setTableData] = useState({ labels: [], data: [] });


  const handleDelete = (RestaurantID) => {
    var result = window.confirm(`Are you sure you want to delete?`);
    if (result === true) {
      // execute delete function via nodejs service
      deleteRestaurant(RestaurantID);
    } else {
      alert('Delete action cancelled');
    }
  };

  const deleteRestaurant = (RestaurantID) => {
    fetch(`http://localhost:3300/restaurant-profile/${RestaurantID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    }).catch(() => {

    }).finally(() => {

    });
  };


  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3300/restaurant-profile');
      const restaurantListData = await response.json();
      setTableData(restaurantListData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="content">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Restaurants</h1>
        <hr />
        <h3>{`Showing ${tableData.data.length} restaurant(s)`}</h3>
        <Link to={{ pathname: `/restaurant/add` }}> + Add</Link>
      </div>
      <table>
        <thead>
          <tr>
            {tableData.labels.map(label => (
              <th key={label}>{label}</th>
            ))}
            <th key={'actions'}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.data.map(row => (
            <tr key={row.RestaurantID}>
              {tableData.labels.map(label => (
                <td key={label}>{row[label]}</td>
              ))}
              <td key={`lnk_actions${row.RestaurantID}`}>
                <Link to={{ pathname: `/restaurant/edit/${row.RestaurantID}` }}>Edit</Link>
                &nbsp;
                &nbsp;
                <button class="btn-delete" onClick={() => handleDelete(row.RestaurantID)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default RestaurantList;
