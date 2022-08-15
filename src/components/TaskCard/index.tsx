import React, { useState } from 'react'

import { FiTrash2 } from 'react-icons/fi'

import { Checkbox } from '@components/Checkbox'

import styles from './styles.module.css'

interface Props {
  index: number
}

export const TaskCard: React.FC<Props> = ({ index }) => {
  const [isCheck, setCheck] = useState<boolean>(false)

  function handleTaskCheck() {
    setCheck(!isCheck)
  }

  return (
    <div
      className={`${styles.container} ${isCheck && styles.checked}`}
      style={{ animationDuration: `${1 + index / 10}s` }}
    >
      <div className={styles.content}>
        <div className={styles.checkbox}>
          <Checkbox checked={isCheck} onClick={handleTaskCheck} />
        </div>
        <p>
          teger urna interdum massa libero auctor neque turpis turpis semper.
          Duis vel sed fames integer.
        </p>
      </div>

      <button>
        <FiTrash2 size={16} />
      </button>
    </div>
  )
}
