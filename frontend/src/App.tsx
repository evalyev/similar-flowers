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

    function getOuterSimilarPhotos(image: any) {
        return api.getOuterSimilarPhotos(image)
    }

    return (
        <div className="page">
            <Main getInnerSimilarPhotos={getInnerSimilarPhotos} getAllPhotos={getAllPhotos} getOuterSimilarPhotos={getOuterSimilarPhotos} />
        </div>
    )
}

export default App
