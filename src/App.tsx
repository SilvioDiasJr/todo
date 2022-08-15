import React from 'react'

import { FiPlusCircle } from 'react-icons/fi'

import { EmptyListAlert } from '@components/EmptyListAlert'
import { Header } from '@components/Header'
import { TaskCard } from '@components/TaskCard'

import styles from './App.module.css'

const data = [1, 2, 3, 4, 5]

export const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.content}>
        <form>
          <input
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa"
          />
          <button>
            Criar <FiPlusCircle size={16} />
          </button>
        </form>

        <div className={styles.taskScoreboard}>
          <p>
            Tarefas criadas <span>0</span>
          </p>
          <p>
            Concluídas <span>0</span>
          </p>
        </div>

        <div className={styles.taskList}>
          {/* <EmptyListAlert /> */}

          {data.map((item, index) => (
            <TaskCard key={item} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}
