import React, { useState } from 'react'

import { ITaskDTO } from '@dtos/taskDTO'

import { Checkbox } from '@components/Checkbox'
import { TaskDeleteDialog } from '@components/TaskDeleteDialog'

import styles from './styles.module.css'

interface Props {
  index: number
  data: ITaskDTO
  onCheck(value: ITaskDTO): void
  onDelete(value: ITaskDTO): void
}

export const TaskCard: React.FC<Props> = ({
  index,
  data,
  onCheck,
  onDelete
}) => {
  const [isCheck, setCheck] = useState<boolean>(false)

  function handleTaskCheck() {
    setCheck(!isCheck)
    onCheck(data)
  }

  function handleTaskDelete() {
    onDelete(data)
  }

  return (
    <div
      className={`${styles.container} ${isCheck && styles.checked}`}
      style={{ animationDuration: `${0.8 + index / 12}s` }}
    >
      <div className={styles.content}>
        <div className={styles.checkbox}>
          <Checkbox checked={isCheck} onClick={handleTaskCheck} />
        </div>
        <p>{data.value}</p>
      </div>

      <TaskDeleteDialog onConfirm={handleTaskDelete} />
    </div>
  )
}
