import React, { ButtonHTMLAttributes } from 'react'

import { FiCheck } from 'react-icons/fi'

import styles from './styles.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean
}

export const Checkbox: React.FC<Props> = ({ checked, ...rest }) => {
  return (
    <button
      type="button"
      className={`${styles.container} ${checked && styles.checked}`}
      {...rest}
    >
      <FiCheck size={12} />
    </button>
  )
}
