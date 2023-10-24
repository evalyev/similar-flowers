import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Main.scss'

export default function Main(methods: any) {
  const toast = useRef<any>(null);
  const [file, setFile] = useState<any>(null)

  const onUpload = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    console.log(toast.current)
  };

  const onSelect = (evt: any) => {
    console.log(evt.files[0])
    setFile(evt.files[0])
  }

  const onClear = () => {
    setFile(null)
  }

  function handleSubmit(evt: any) {
    evt.preventDefault()
    console.log('test')
    if (!file) return;
  }

  return (
    <main className='main'>
      <h1>Поиск похожих картинок цветов</h1>

      <form className='form' name='load-files' onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form_files card flex justify-content-center">
          <Toast ref={toast}></Toast>
          <FileUpload mode="basic" name="upload-file" accept="image/*" maxFileSize={1000000} onUpload={onUpload} onSelect={onSelect}
            onClear={onClear} chooseLabel='Выбрать' className='form_btn' />
          <Button label="Отправить" icon="pi pi-check" iconPos="right" type='submit' />
        </div>
      </form>

      {file && (<img src={file.objectURL} alt='Картинка цветка' />)}

    </main>
  )
}
