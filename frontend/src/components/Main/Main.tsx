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
  const [isVisibleContent, setIsVisibleContent] = useState(false)
  const [images, setImages] = useState<any>(null)

  const onSelect = (evt: any) => {
    console.log(evt.files[0])
    setFile(evt.files[0])
    setIsVisibleContent(false)
    setImages(null)
  }

  const onClear = () => {
    setFile(null)
  }

  function handleSubmit(evt: any) {
    evt.preventDefault()
    console.log('test')
    if (!file) return;
    setIsVisibleContent(true)
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'Загружаются похожие фото' });
  }

  function handleRandomClick() {
    setFile(null)
    setIsVisibleContent(false)
    setImages(null)
  }

  return (
    <main className='main'>
      <h1>Поиск похожих картинок цветов</h1>

      <form className='form' name='load-files' onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form_files card flex justify-content-center">
          <Toast ref={toast}></Toast>
          <FileUpload mode="basic" name="upload-file" accept="image/*" maxFileSize={1000000} onSelect={onSelect}
            onClear={onClear} chooseLabel='Выбрать' className='form_btn' />
          <Button label="Рандомная фотка" icon="pi pi-search" iconPos="right" className='form_btn' onClick={handleRandomClick} />
          <Button label="Отправить" icon="pi pi-check" iconPos="right" type='submit' />
        </div>
      </form>

      {file && (<img src={file.objectURL} alt='Картинка цветка' />)}


      {isVisibleContent && (
        <div className='imgs'>
          {images.map((image_name: any) => <img className='imgs_img' src={require(`../../images/${image_name}`)} />)}
        </div>
      )}
    </main>
  )
}
