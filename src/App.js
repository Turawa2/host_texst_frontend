import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    // Load submitted data from the server on component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllData');

      // Update the state with the fetched data
      setSubmittedData(response.data);

      console.log('Data fetched successfully:', response.data);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/submitData', {
        name: name,
        password: password,
      });

      // Update the state with the submitted data
      setSubmittedData([...submittedData, response.data.data]);

      // Display a success message using alert
      alert('Data submitted successfully!');
      console.log('Response from server:', response.data);
    } catch (error) {
      // Display an error message using alert
      alert('Error submitting data. Please try again.');
      console.error('Error while making POST request:', error);
    }
  };

  return (
    <>
      <center>
        <h1>Testing Host</h1>
        <input
          type="text"
          placeholder="Enter your name"
          style={{ marginTop: '10px', padding: '20px' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          style={{ marginTop: '10px', padding: '20px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          type="button"
          onClick={handleSubmit}
          style={{ marginTop: '10px', padding: '10px', width: '16%' }}
        >
          Submit
        </button>
      </center>

      {/* Display the submitted data in a table */}
      {submittedData.length > 0 && (
        <table style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;


