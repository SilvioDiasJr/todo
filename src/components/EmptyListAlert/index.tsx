import React from 'react'

import clipboardIcon from '@assets/icons/clipboard.svg'

import styles from './styles.module.css'

export const EmptyListAlert: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={clipboardIcon} />
      <p>Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}
