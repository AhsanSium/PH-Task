import React from 'react'
import { Table } from 'react-bootstrap'

const Distribution = () => {
  return (
    <div>
        <h3>Distribution</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Student Id</th>
                    <th>Date</th>
                    <th>Shift</th>
                    <th>Statue</th>
                    <th>Food Item List</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}

export default Distribution