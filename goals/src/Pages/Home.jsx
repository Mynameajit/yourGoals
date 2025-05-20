import React from 'react'
import TaskList from './TaskList'
import Header from '../Components/Header'
import AddDialog from '../dialog/AddDialog'

const Home = () => {
    return (
        <div>
            <Header />
            <TaskList />

            <AddDialog/>
        </div>
    )
}

export default Home