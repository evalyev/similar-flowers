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
  const [allImages, setAllImages] = useState<any>(null)
  const [randomImageName, setRandomImageName] = useState<any>(null)

  const onSelect = (evt: any) => {
    setFile(evt.files[0])
    setIsVisibleContent(false)
    setImages(null)
    setRandomImageName(null)
  }

  const onClear = () => {
    setFile(null)
  }

  function handleSubmit(evt: any) {
    evt.preventDefault()
    if (!file && !randomImageName) return;

    toast.current.show({ severity: 'info', summary: 'Success', detail: 'Загружаются похожие фото' });

    if (randomImageName) {
      methods.getInnerSimilarPhotos(randomImageName)
        .then((data: any) => {
          setImages(data['image_names'])
          setIsVisibleContent(true)
        })
        .catch((err: any) => {
          console.log(err)
        })
      return
    }

    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      methods.getOuterSimilarPhotos(formData)
        .then((data: any) => {
          setImages(data['image_names'])
          setIsVisibleContent(true)
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }

  function handleRandomClick() {
    setFile(null)
    setIsVisibleContent(false)
    setImages(null)

    if (allImages) {
      const maxIndex = allImages?.length
      const newIndex = Math.floor(Math.random() * maxIndex)
      setRandomImageName(allImages[newIndex])
    }
  }

  useEffect(() => {
    methods.getAllPhotos()
      .then((data: any) => {
        setAllImages(data['image_names'])
        console.log(data)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  return (
    <main className='main'>
      <h1>Поиск похожих картинок цветов</h1>

      <form className='form' name='load-files' onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form_files card flex justify-content-center">
          <Toast ref={toast}></Toast>
          <FileUpload mode="basic" name="upload-file" accept="image/*" maxFileSize={1000000} onSelect={onSelect}
            onClear={onClear} chooseLabel='Выбрать' className='form_btn' />
          <Button label="Рандомная фотка" icon="pi pi-search" iconPos="right" className='form_btn' onClick={handleRandomClick} type='button' />
          <Button label="Отправить" icon="pi pi-check" iconPos="right" type='submit' />
        </div>
      </form>

      {file && (<>
        <h2>Выбранная картинка</h2>
        <img className='curr-img' src={file.objectURL} alt='Картинка цветка' />
      </>)}
      {randomImageName && (<>
        <h2>Выбранная картинка</h2>
        <img className='curr-img' src={require(`../../images/${randomImageName}`)} alt='Картинка цветка' />
      </>)}


      {isVisibleContent && (
        <>
          <h2>Похожие картинки</h2>
          <div className='imgs'>
            {images.map((image_name: any) => <img className='imgs_img' src={require(`../../images/${image_name}`)} />)}
          </div>
        </>
      )}
    </main>
  )
}
