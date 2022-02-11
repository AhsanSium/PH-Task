import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap';
import { db } from '../FirebaseConfig/firebase-config';
import {addDoc, collection, getDocs, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import { database } from '../FirebaseConfig/firebase-config';
import { getDatabase, push, ref, set , onValue, remove, update } from "firebase/database";

const FoodItem = () => {

    //const foodCollectionRef = collection(db, "FoodItem");
    const [food, setFood] = useState([]);
    const [formData, setFormData] = useState({
        name:'',
        price:''
    });
    const [add, setAdd] = useState(true);
    const [updateFood, setUpdateFood] = useState({});

    const handleChange = (e) => {
        console.log(formData);
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const addFood = async () => {
        const rdb = getDatabase();
        await push(ref(rdb, 'FoodItem/'), formData);
        // await addDoc(foodCollectionRef, {
        //     name: formData.name,
        //     price: formData.price
        // });
    }

    const handleClick = (e) => {
        e.preventDefault();
        addFood();
        setFormData({});
    }

    const handleUpdate = (singleFood) => {
        setAdd(false);
        setUpdateFood(singleFood);
    }

    const handleDelete = async (id) => {
        const proceed = window.confirm("Are you sure you want to Delete?");
        if (proceed) {
        console.log(id);
        const rdb = getDatabase();
        await remove(ref(rdb, 'FoodItem/' + id));
        // const foodDoc = doc(db, "FoodItem", id);
        // await deleteDoc(foodDoc);
        } else {
        }
        
    }

    const handleClickUpdate = async (e) => {
        e.preventDefault();
        const newFields = {
            name : formData.name,
            price: formData.price
        }
        const rdb = getDatabase();
        await update(ref(rdb, 'FoodItem/' + updateFood.id),newFields);

        // const foodDoc = doc(db, "FoodItem", updateFood.id)
        // await updateDoc(foodDoc , newFields);
    }

    useEffect(()=> {
        const getFood = async () => {
            const rdb = getDatabase();
            await onValue(ref(rdb, 'FoodItem/'), (snapshot) => {
                console.log(snapshot.val());
                const data = snapshot.val();
                const dataList = [];
                for(let id in data){
                    dataList.push({id: id, name:data[id].name, price:data[id].price});
                }
                setFood(dataList);
                console.log(dataList);
            })
            // const data = await getDocs(foodCollectionRef);
            // setFood(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
            //console.log(data);
        }

        getFood()
    }, [])

  return (
      <Container>
    <div>
        <h3>Food Item </h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    food.map((singleFood) =>
                        <tr key={singleFood.id}>
                            <td>{singleFood.id}</td>
                            <td>{singleFood.name}</td>
                            <td>{singleFood.price}</td>
                            <td style={{cursor:'pointer'}} onClick={()=>{handleUpdate(singleFood)}}>update</td>
                            <td style={{cursor:'pointer'}} onClick={()=>{handleDelete(singleFood.id)}}>delete</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
        <Form style={{width:'420px', marginTop:'20px', marginBottom:'30px'}}>
        {
            add? <h4>Add Food Item</h4> : <h4>Update Food Item</h4>
        }
        
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Enter name" onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" type="number" placeholder="price" onChange={(e)=>{handleChange(e)}} />
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
    </div>
    </Container>
  )
}

export default FoodItem;