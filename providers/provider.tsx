import { createContext, useState, useEffect, useContext } from "react";


interface AppStateValue {
    taskList: Array<Task>,
    setTaskList: (val: any) => void,
    deleteTask: (id: number) => void,
    handleStatus: (id: number, status: boolean) => void,
    handleCreateTask: (data: any) => void,
}

interface Task{
    id: number, 
    createDate: string,
    deadline: string, 
    description: string, 
    status: boolean 

}

const defaultStateValue: AppStateValue = {
    taskList: [],
    setTaskList: function (val: any): void {
        throw new Error("Function not implemented.");
    },
    deleteTask: function (id: number): void {
        throw new Error("Function not implemented.");
    },
    handleStatus: function (id: number, status: boolean): void {
        throw new Error("Function not implemented.");
    },
    handleCreateTask: function (data: any): void {
        throw new Error("Function not implemented.");
    }
};

const UserContext = createContext(defaultStateValue)

export const Provider: React.FC = ({ children }) => {
    const [taskList, setTaskList] = useState<Array<Task>>([])

    const deleteTask = (id: number) => {
        let updated = [...taskList]
        updated = updated.filter((task: { id: number }) => task.id != id)
        setTaskList([...updated])
    }

    const handleStatus = (id: number, status: boolean) => {
        let updated = [...taskList]
        updated.some((task: { id: number, status: boolean }) => {
            if (task.id == id) {
                task.status = status
                return true
            }
        })
        setTaskList([...updated])
    }

    const handleCreateTask = (data:Task) => {
        let updated :Array<Task> = [...taskList]
        data.id = updated[taskList.length - 1].id + 1
        updated.push(data)
        setTaskList([...updated])
    }

    return (
        <UserContext.Provider value={{ taskList, setTaskList, deleteTask, handleStatus, handleCreateTask }}>
            {children}
        </UserContext.Provider>
    )
}
export default function useUser() {
    const context = useContext(UserContext)

    return context
}