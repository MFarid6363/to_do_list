import type { NextPage } from 'next'
import React, { useContext, useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Table from '../components/table/Table'
import TaskGeneration from '../components/createTask/TaskGeneration'
import useProvider from '../providers/provider'
import Popup from '../components/popupmodule/popup'
import Snackbar from '../components/Snackbar'
import Edit from '@material-ui/icons/Edit'
import ls from 'local-storage'

interface Props {
  taskList: string[]
}


const Home: React.FC<Props> = (props) => {
  const { taskList, setTaskList } = useProvider()
  let localStorage:any = ls
  const [namePopup, setNamePopup] = useState(localStorage?.get('userName') ? false : true)
  const [alert, setAlert] = useState({ bgc: '', open: false, message: '' })

  const userName = useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    setTaskList(props.taskList)
  }, [props.taskList, setTaskList])

  const handlePopupClose = () => {
    if (localStorage?.get('userName')) {
      if (confirm('Are you sure to continue with old name')) {
        setNamePopup(false)
      }
    }
    else {
      setAlert({
        bgc: '#D8000C',
        open: true,
        message: 'Please fill your name'
      })
    }
  }

  const handlePopupConfirm = () => {
    if (userName.current.value.trim().length > 0) {
      if (confirm('Are you sure to continue with this name')) {
        localStorage?.set('userName', userName.current.value)
        setNamePopup(false)
      }
    }
    else {
      setAlert({
        bgc: '#D8000C',
        open: true,
        message: 'Please fill your name'
      })
    }
  }

  return (
    <div className={styles.container}>
      {localStorage?.get('userName') && <h1 className={styles.greating}>Welcome {localStorage?.get('userName')} <i onClick={() => setNamePopup(true)}> <Edit /> </i></h1>}
      <h1>To do List</h1>
      <TaskGeneration />
      <Table/>
      {namePopup && <Popup closeModule={handlePopupClose} spinner={false}>
        <div className={styles.nameContainer} >
          <label htmlFor='name'>User name</label>
          <input onKeyDown={(event) => event.key == 'Enter' && handlePopupConfirm()} id='name' ref={userName} placeholder='Please provide your name' />
          <button onClick={handlePopupConfirm}>Confirm</button>
          <Snackbar alert={alert} setAlert={setAlert} duration={2000} bottom={'right'} vertical={'top'} />
        </div>
      </Popup>}
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      taskList: [
        { id: 1, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: true },// status true  : complited    false : not complited 
        { id: 2, createDate: '12/11/2021', deadline: '18/12/2021', description: 'Visit friend', status: false },
        { id: 3, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 4, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 5, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 6, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 7, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 8, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 9, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 10, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 11, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false },
        { id: 12, createDate: '13/11/2021', deadline: '13/12/2021', description: 'Visit friend', status: false }
      ]
    }
  }
}
export default Home