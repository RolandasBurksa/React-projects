/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
  // Naudosime kontrolei/formos_kurimui, kol nepajungsime API

  //   const dummyData = [
  //     {
  //       id: 1,
  //       firstName: 'Vardenis',
  //       lastName: 'Pavardenis',
  //       email: 'kazkas@gmail.com',
  //     },
  //     {
  //       id: 2,
  //       firstName: 'Petras',
  //       lastName: 'Pavardenis',
  //       email: 'petras@gmail.com',
  //     },
  //     {
  //       id: 3,
  //       firstName: 'Saulius',
  //       lastName: 'Pavardenis',
  //       email: 'saulius@gmail.com',
  //     },
  //   ];

  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);

    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2>List of Employees</h2>
      <button className="btn btn-primary mb-2 d-grid" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            //   dummyData.map((employee) => (    <- taip buvo kol bildinom forma, dabar naudosim API, 66 eilute
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeEmployee(employee.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
