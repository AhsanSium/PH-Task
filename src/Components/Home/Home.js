import React from 'react'
import Distribution from '../Distribution/Distribution';
import FoodItem from '../FoodItem/FoodItem';
import TopNavbar from '../Navigation/TopNavbar';
import Student from '../Student/Student';

const Home = () => {
  return (
    <div>
        <TopNavbar />
        <FoodItem />
        <Student />
        <Distribution />
    </div>
  )
}

export default Home;