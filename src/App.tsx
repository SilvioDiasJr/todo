import React from 'react'

import logo from '@assets/logo.svg'

import styles from './App.module.css'

export const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <header>
        <img src={logo} alt="Logo todo-list" />
      </header>
    </div>
  )
}
