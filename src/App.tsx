import React, { useState } from 'react'

import { FiPlusCircle } from 'react-icons/fi'
import { useForm } from 'react-hook-form'

import { ITaskDTO } from '@dtos/taskDTO'

import { EmptyListAlert } from '@components/EmptyListAlert'
import { Header } from '@components/Header'
import { TaskCard } from '@components/TaskCard'

import styles from './App.module.css'

interface IForm {
  newTask: string
}

export const App: React.FC = () => {
  const [tasksList, setTasksList] = useState<ITaskDTO[]>([])
  const [completedTasks, setCompletedTasks] = useState<ITaskDTO[]>([])

  const numberOfTasksCreated = tasksList.length
  const numberOfTasksCompleted = completedTasks.length

  const { register, watch, reset } = useForm<IForm>()
  const task = watch('newTask')

  function handleCompletedTasks(value: ITaskDTO) {
    const taskExist = completedTasks.find(item => item.id === value.id)

    if (taskExist) {
      setCompletedTasks(oldState =>
        oldState.filter(item => item.id !== value.id)
      )
    } else {
      setCompletedTasks(oldState => [...oldState, value])
    }
  }

  function handleDeleteTask(value: ITaskDTO) {
    setTasksList(oldState => oldState.filter(item => item.id !== value.id))
  }

  async function handleTaskRegister() {
    const date = new Date()
    if (task) {
      setTasksList(oldState => [
        ...oldState,
        {
          id: `${date.getTime()}`,
          value: task
        }
      ])
      reset()
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.content}>
        <form>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            {...register('newTask')}
          />
          <button type="button" onClick={handleTaskRegister}>
            Criar <FiPlusCircle size={16} />
          </button>
        </form>

        <div className={styles.taskScoreboard}>
          <p>
            Tarefas criadas <span>{numberOfTasksCreated}</span>
          </p>
          <p>
            Concluídas <span>{numberOfTasksCompleted}</span>
          </p>
        </div>

        <div className={styles.taskList}>
          {tasksList.length === 0 ? (
            <EmptyListAlert />
          ) : (
            tasksList.map((item, index) => (
              <TaskCard
                key={item.id}
                index={index}
                data={item}
                onCheck={handleCompletedTasks}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
