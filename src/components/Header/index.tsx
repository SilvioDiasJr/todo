import React from 'react'

import logo from '@assets/logo.svg'

import styles from './styles.module.css'

export const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <img src={logo} alt="Logo todo-list" />
    </header>
  )
}
