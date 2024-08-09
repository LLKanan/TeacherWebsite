import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const apiEndpoint = 'https://2a2tyby9f2.execute-api.ap-southeast-2.amazonaws.com/Test/DDB/listStudents';

const accessKey = sessionStorage.getItem('accessToken')
console.log(accessKey)

async function getStudentData(accessKey) {
  try {
      // Make the API call with the POST method
      const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(accessKey)
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const responseData = await response.json();

      // Store the JSON object
      console.log('Data received from API:', responseData);

      // You can now use the responseData object as needed
      return responseData.body;
  } catch (error) {
      console.error('Error posting data:', error);
  }
}

const TableComponent = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const hideClassPath = '/teacher';

    useEffect(() => {
        // Fetch data from your API or use a static JSON object
        const fetchData = async () => {
            const studentData = await getStudentData(accessKey);
            const jsonData = JSON.parse(studentData);

            // Transform the data to remove the "S" part
            const transformedData = jsonData.map(item => {
                const transformedItem = {};
                for (const key in item) {
                    transformedItem[key] = item[key].S;
                }
                return transformedItem;
            });

            setData(transformedData);
        };

        fetchData();
    }, []);
    console.log(data);

    return (
      <table id={location.pathname !== hideClassPath ? 'studentTable' : ''}>
          <thead>
              <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>DOB</th>
              </tr>
          </thead>
          <tbody>
              {data.map((item, index) => (
                  <tr key={index}>
                      <td>{item.StudentID}</td>
                      <td>{item.FirstName}</td>
                      <td>{item.LastName}</td>
                      <td>{item.Email}</td>
                      <td>{item.DOB}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  );
};

export default TableComponent;