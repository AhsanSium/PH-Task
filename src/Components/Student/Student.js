
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap';
import { db } from '../FirebaseConfig/firebase-config';
import {addDoc, collection, getDocs, updateDoc, doc, deleteDoc} from 'firebase/firestore';

import { getDatabase, push, ref, set , onValue, remove, update } from "firebase/database";

const Student = () => {

    //const studentCollectionRef = collection(db, "Student");
    const [student, setStudent] = useState([]);
    const [formData, setFormData] = useState({
        fullName:'',
        roll: null,
        age : null,
        class : null,
        hall: '',
        status: 'active'
    });
    const [add, setAdd] = useState(true);
    const [updateStudent, setUpdateStudent] = useState({});
    const [checkBox, setCheckBox] = useState([]);

    const handleChange = (e) => {
        console.log(formData);
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const addStudent = async () => {
        const rdb = getDatabase();

        await push(ref(rdb, 'Student/'), {
            fullName:formData.fullName,
            roll: formData.roll,
            age : formData.age,
            class : formData.age,
            hall: formData.hall,
            status: formData.status
        });

        // await push(studentCollectionRef, {
        //     fullName:formData.fullName,
        //     roll: formData.roll,
        //     age : formData.age,
        //     class : formData.age,
        //     hall: formData.hall,
        //     status: formData.status
        // });
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
        
        // const studentDoc = doc(db, "studentItem", updateStudent.id)
        // const newFields = {
            //     name : formData.name,
            //     price: formData.price
            // }
            // await updateDoc(studentDoc , newFields);
            
            
            for(let i = 0; i < checkBox.length ; i++){
                const rdb = getDatabase();
                let singleData = checkBox[i];
                let newFields = {
                    status: singleData.status
                }
                update(ref(rdb, 'Student/' + singleData.id),newFields);
            }
            e.preventDefault();
            setCheckBox([]);
    }

    const handleCheckbox = (id, status) => {
        setAdd(false);
        
        let newValue = {
            id:id,
            status:status
        }
        setCheckBox(checkBox => [...checkBox,newValue] );
        
    }
    console.log(checkBox);

    useEffect(()=> {
        const getStudent = async () => {
            const rdb = getDatabase();

            await onValue(ref(rdb, 'Student/'), (snapshot) => {
                console.log(snapshot.val());
                const data = snapshot.val();
                const dataList = [];
                for(let id in data){
                    dataList.push({id: id, 
                        fullName: data[id].fullName,
                        roll: data[id].roll,
                        age : data[id].age,
                        class : data[id].age,
                        hall: data[id].hall,
                        status: data[id].status});
                }
                setStudent(dataList);
                console.log(dataList);
            })
            // const data = await getDocs(studentCollectionRef);
            // setStudent(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
            //console.log(data);
        }

        getStudent()
    }, [])

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
                    <th>In Active</th>
                    <th>Active</th>
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
                            <td><input type="checkbox" checked={singleStudent.status === 'inActive'} onClick={()=>{handleCheckbox(singleStudent.id, singleStudent.status === 'inactive' ? 'active' : 'inActive')}} /> </td>
                            <td><input type="checkbox" checked={singleStudent.status === 'active'} onClick={()=>{handleCheckbox(singleStudent.id, singleStudent.status === 'inactive' ? 'inActive' : 'active')}}/> </td>
                        </tr>
                    
                    )
                }
            </tbody>
        </Table>

        <Form style={{width:'420px', marginTop:'20px', marginBottom:'30px'}}>
        {
            add? <h4>Add Student</h4> : <h4>Update Student Status</h4>
        }
        {
            add &&
            <div>

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
            </div>
        }
        
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