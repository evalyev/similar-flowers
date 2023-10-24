import React, { useState, useEffect } from 'react'
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Main.scss'

export default function Main(methods: any) {

  return (
    <main className='main'>
      <h1>Поиск похожих картинок цветов</h1>
    </main>
  )
}
