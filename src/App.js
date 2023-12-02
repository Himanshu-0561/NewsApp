import './App.css';

import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress, setprogress] = useState(0)
  return (
    <>
      <BrowserRouter>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<News setprogress={setprogress} key="general" pageSize={8} country="us" category="general" />} />
          <Route path="/general" element={<News setprogress={setprogress} key="general" pageSize={8} country="us" category="general" />} />
          <Route path="/business" element={<News setprogress={setprogress} key="business" pageSize={8} country="us" category="business" />} />
          <Route path="/entertainment" element={<News setprogress={setprogress} key="entertainment" pageSize={8} country="us" category="entertainment" />} />
          <Route path="/health" element={<News setprogress={setprogress} key="health" pageSize={8} country="us" category="health" />} />
          <Route path="/science" element={<News setprogress={setprogress} key="science" pageSize={8} country="us" category="science" />} />
          <Route path="/sports" element={<News setprogress={setprogress} key="sports" pageSize={8} country="us" category="sports" />} />
          <Route path="/technology" element={<News setprogress={setprogress} key="technology" pageSize={8} country="us" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App