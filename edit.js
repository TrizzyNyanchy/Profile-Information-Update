import { useEffect, useState } from "react";
import './restaurant.css';
import { useParams } from "react-router";

function RestaurantEdit() {

  const { RestaurantID } = useParams();

  const [Name, setName] = useState();
  const [PhoneNumber, setPhone] = useState();
  const [Email, setEmail] = useState();
  const [Address, setAddress] = useState();
  const [Description, setDescription] = useState();

  const handleEdit = () => {
    var result = window.confirm('Are you sure you want to save changes?');
    if (result === true) {
      // execute put function via nodejs service
      editRestaurantInfo(Name, PhoneNumber, Email, Address, Description);
    } else {
      alert('Edit cancelled. No changes done.')
    }
  };

  const editRestaurantInfo = (Name, PhoneNumber, Email, Address, Description) => {
    fetch(`http://localhost:3100/restaurant-profile/${RestaurantID}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Name, PhoneNumber, Email, Address, Description })
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      } else {
        alert('An error occured. Contact Admin.');
      }
    }).catch(()=>{
      alert('Error occured');
    }).finally()
  };

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchSingleRestaurant();
  }, []);

  const fetchSingleRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:3100/restaurant-profile/${RestaurantID}`);
      const restaurantData = await response.json();
      setName(restaurantData.data.Name);
      setEmail(restaurantData.data.Email);
      setPhone(restaurantData.data.PhoneNumber);
      setAddress(restaurantData.data.Address);
      setDescription(restaurantData.data.Description);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="content">
      <h1>Edit Restaurant</h1>
      <hr />
      <h3>{Name}</h3>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td><input type="text" value={Name} placeholder="Enter name of restaurant" onChange={(e) => setName(e.target.value)} /></td>
            </tr>
            <tr>
              <td>Phone</td>
              <td><input type="phone" value={PhoneNumber} placeholder="Enter phone number" onChange={(e) => setPhone(e.target.value)} /></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input type="email" value={Email} placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} /></td>
            </tr>
            <tr>
              <td>Address</td>
              <td><textarea rows={3} value={Address} onChange={(e) => setAddress(e.target.value)} /></td>
            </tr>
            <tr>
              <td>Description</td>
              <td><textarea rows={5} value={Description} onChange={(e) => setDescription(e.target.value)} /></td>
            </tr>
            <tr>
              <td><input type="reset" value={`Reset`} /></td>
              <td><input type="button" value={`Edit`} onClick={handleEdit} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
export default RestaurantEdit;
