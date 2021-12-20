import React, { useState, useRef } from 'react';
import style from './TaskGeneration.module.css'
import useProvider from '../../providers/provider'
import { formatDate } from '../../utils';
import Snackbar from '../Snackbar';


const TaskGeneration: React.FC = () => {
    const [alert, setAlert] = useState({ bgc: '', open: false, message: '' })
    const { handleCreateTask } = useProvider()
    const deadline = useRef() as React.MutableRefObject<HTMLInputElement>
    const description = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

    const handleCreate = () => {
        if (deadline?.current?.value.length > 0 && description?.current?.value.trim().length > 0) {
            var today = new Date();
            let todayFormatted = formatDate(today.toISOString().split('T')[0])
            let formatedDeadline = formatDate(deadline.current.value)
            let data = {
                createDate: todayFormatted,
                deadline: formatedDeadline,
                description: description?.current.value,
                status: true
            }
            handleCreateTask(data)
            deadline.current.value = ''
            description.current.value = ''
        }
        else {
            setAlert({
                bgc: '#D8000C',
                open: true,
                message: 'Please fill all fields'
            })
        }
    }

    return (
        <div className={style.TaskGenerationContainer}>
            <textarea placeholder='Please write task description' ref={description} name='description' />
            <div className={style.deadlineSelector}>
                <label htmlFor="start">Please select deadline</label>
                <input ref={deadline} type="date" id="start" name="start" min={new Date().toISOString().split('T')[0]} max='2025-01-01' />
            </div>
            <button onClick={handleCreate}>Create</button>
            <Snackbar alert={alert} setAlert={setAlert} duration={2000} bottom={'right'} vertical={'top'} />
        </div>
    );
};

export default TaskGeneration;