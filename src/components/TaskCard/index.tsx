import React, { useEffect, useState } from 'react'

import { ITaskDTO } from '@dtos/taskDTO'

import { Checkbox } from '@components/Checkbox'
import { TaskDeleteDialog } from '@components/TaskDeleteDialog'

import styles from './styles.module.css'

interface Props {
  index: number
  data: ITaskDTO
  done: boolean
  onCheck(value: ITaskDTO): void
  onRefresh(): void
}

export const TaskCard: React.FC<Props> = ({
  index,
  data,
  done,
  onCheck,
  onRefresh
}) => {
  const [isCheck, setCheck] = useState<boolean>(false)

  function handleTaskCheck() {
    setCheck(!isCheck)
    onCheck(data)
  }

  useEffect(() => {
    setCheck(done)
  }, [done])

  return (
    <div
      className={`${styles.container} ${isCheck && styles.checked}`}
      style={{ animationDuration: `${0.8 + index / 12}s` }}
    >
      <div className={styles.content}>
        <div className={styles.checkbox}>
          <Checkbox checked={isCheck} onClick={handleTaskCheck} />
        </div>
        <p>{data.taskName}</p>
      </div>

      <TaskDeleteDialog taskID={data.id} onConfirm={onRefresh} />
    </div>
  )
}
