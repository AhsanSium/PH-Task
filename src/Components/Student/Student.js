
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap';
import { db } from '../FirebaseConfig/firebase-config';
import {addDoc, collection, getDocs, updateDoc, doc, deleteDoc} from 'firebase/firestore';

const Student = () => {

    const studentCollectionRef = collection(db, "Student");
    const [student, setStudent] = useState([]);
    const [formData, setFormData] = useState({
        fullName:'',
        roll: null,
        age : null,
        class : null,
        hall: '',
        status: ''
    });
    const [add, setAdd] = useState(true);
    const [updateStudent, setUpdateStudent] = useState({});

    const handleChange = (e) => {
        console.log(formData);
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const addStudent = async () => {
        await addDoc(studentCollectionRef, {
            fullName:formData.fullName,
            roll: formData.roll,
            age : formData.age,
            class : formData.age,
            hall: formData.hall,
            status: formData.status
        });
    }

    const handleClick = (e) => {
        e.preventDefault();
        addStudent();
    }

    const handleUpdate = (singlestudent) => {
        setAdd(false);
        setUpdateStudent(singlestudent);
    }

    const handleDelete = async (id) => {
        const proceed = window.confirm("Are you sure you want to Delete?");
        if (proceed) {
        const studentDoc = doc(db, "studentItem", id);
        await deleteDoc(studentDoc);
        } else {
        }
        
    }

    const handleClickUpdate = async (e) => {
        e.preventDefault();
        const studentDoc = doc(db, "studentItem", updateStudent.id)
        const newFields = {
            name : formData.name,
            price: formData.price
        }
        await updateDoc(studentDoc , newFields);
    }

    useEffect(()=> {
        const getStudent = async () => {
            const data = await getDocs(studentCollectionRef);
            setStudent(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
            //console.log(data);
        }

        getStudent()
    }, [addStudent])

  return (
    <div>
        <Container>

        
        <h3>Student</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Roll</th>
                    <th>Age</th>
                    <th>Class</th>
                    <th>Hall</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    student.map((singleStudent) => 
                        <tr>
                            <td>{singleStudent.id}</td>
                            <td>{singleStudent.fullName}</td>
                            <td>{singleStudent.roll}</td>
                            <td>{singleStudent.age}</td>
                            <td>{singleStudent.class}</td>
                            <td>{singleStudent.hall}</td>
                            <td>{singleStudent.status}</td>
                        </tr>
                    
                    )
                }
            </tbody>
        </Table>

        <Form style={{width:'420px', marginTop:'20px', marginBottom:'30px'}}>
        {
            add? <h4>Add Student</h4> : <h4>Update Student</h4>
        }
        
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control name="fullName" type="text" placeholder="Enter name" onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Roll</Form.Label>
                <Form.Control name="roll" type="number" placeholder="roll" onChange={(e)=>{handleChange(e)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Age</Form.Label>
                <Form.Control name="age" type="number" placeholder="Age" onChange={(e)=>{handleChange(e)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Class</Form.Label>
                <Form.Control name="class" type="number" placeholder="Class" onChange={(e)=>{handleChange(e)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Hall</Form.Label>
                <Form.Control name="hall" type="text" placeholder="Hall" onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Status</Form.Label>
                <select name="status" onChange={(e)=>{handleChange(e)}}>
                    <option>active</option>
                    <option>inActive</option>
                </select>
            </Form.Group>
            {
                add? <Button onClick={(e)=>{handleClick(e)}} variant="primary" type="submit">
                Submit
                </Button> :
                <div>
                <Button onClick={(e)=>{handleClickUpdate(e)}} variant="primary" type="submit">
                Update
                </Button>
                <Button onClick={()=>{setAdd(true)}} variant="secondary" type="submit">
                Cancel
                </Button>
                
                </div>
            }
            
        </Form>
    </Container>
    </div>
  )
}

export default Student