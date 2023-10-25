import api from './utils/api'
import Main from './components/Main/Main'
import { useEffect, useState } from 'react'
import './App.scss';
import React from 'react';

function App() {
    function getAllPhotos() {
        return api.getAllPhotos()
    }

    function getInnerSimilarPhotos(imageName: string) {
        return api.getInnerSimilarPhotos(imageName)
    }

    return (
        <div className="page">
            <Main getInnerSimilarPhotos={getInnerSimilarPhotos} getAllPhotos={getAllPhotos} />
        </div>
    )
}

export default App
