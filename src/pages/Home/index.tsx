import React, { useEffect, useState } from 'react'

import { FiPlusCircle } from 'react-icons/fi'
import { useForm } from 'react-hook-form'

import Amount from 'react-animated-numbers'

import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore/lite'

import { db } from '@services/firebaseConnection'
import { ITaskDTO } from '@dtos/taskDTO'

import { EmptyListAlert } from '@components/EmptyListAlert'
import { Header } from '@components/Header'
import { TaskCard } from '@components/TaskCard'
import { Loading } from '@components/Loading'

import styles from './styles.module.css'

interface IForm {
  newTask: string
}

export const Home: React.FC = () => {
  const [tasksList, setTasksList] = useState<ITaskDTO[]>([])
  const [isRegisterLoading, setRegisterLoading] = useState<boolean>(false)

  const numberOfTasksCreated = tasksList.length
  const numberOfTasksCompleted = tasksList.filter(item => item.done).length

  const { register, watch, reset } = useForm<IForm>()
  const task = watch('newTask')

  async function handleCompletedTasks(value: ITaskDTO) {
    try {
      const taskRef = doc(db, 'tasks', value.id)

      await updateDoc(taskRef, {
        done: !value.done
      })

      getTasks()
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }

  async function handleTaskRegister() {
    if (!task) {
      return
    }

    try {
      setRegisterLoading(true)

      const date = new Date()

      await addDoc(collection(db, 'tasks'), {
        taskName: task,
        done: false,
        createdAt: date
      })

      reset()
      getTasks()
    } catch (error: any) {
      console.log(error.response.data.message)
    } finally {
      setRegisterLoading(false)
    }
  }

  async function getTasks() {
    try {
      const taskCol = collection(db, 'tasks')

      const tasksSnapshot = await getDocs(query(taskCol, orderBy('createdAt')))

      const tasksListFormatted: ITaskDTO[] = tasksSnapshot.docs.map(item => ({
        id: item.id,
        taskName: item.data().taskName,
        done: item.data().done,
        createdAt: item.data().createdAt
      }))

      setTasksList(tasksListFormatted)
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

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
            {isRegisterLoading ? (
              <Loading />
            ) : (
              <>
                Criar
                <FiPlusCircle size={16} />
              </>
            )}
          </button>
        </form>

        <div className={styles.taskScoreboard}>
          <div>
            <p>Tarefas criadas </p>
            <div className={styles.amount}>
              <Amount
                includeComma
                animateToNumber={numberOfTasksCreated}
                configs={[
                  {
                    mass: 1,
                    tension: 120,
                    friction: 14,
                    frequency: 0.1
                  }
                ]}
              />
            </div>
          </div>

          <div>
            <p>Concluídas </p>
            <div className={styles.amount}>
              <Amount
                includeComma
                animateToNumber={numberOfTasksCompleted}
                configs={[
                  {
                    mass: 1,
                    tension: 120,
                    friction: 14,
                    frequency: 0.1
                  }
                ]}
              />
            </div>
          </div>
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
                done={item.done}
                onCheck={handleCompletedTasks}
                onRefresh={getTasks}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
