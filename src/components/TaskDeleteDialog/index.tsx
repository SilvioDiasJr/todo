import React, { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { FiTrash2, FiX } from 'react-icons/fi'
import { deleteDoc, doc } from 'firebase/firestore/lite'

import { db } from '@services/firebaseConnection'

import styles from './styles.module.css'
import { Loading } from '@components/Loading'

interface Props {
  onConfirm(): void
  taskID: string
}

export const TaskDeleteDialog: React.FC<Props> = ({ onConfirm, taskID }) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  async function handleDeleteTask() {
    try {
      setLoading(true)
      await deleteDoc(doc(db, 'tasks', taskID))

      onConfirm()
      setOpen(false)
    } catch (error: any) {
      console.log(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={styles.deleteButton}>
        <FiTrash2 size={16} />
      </Dialog.Trigger>

      <Dialog.Portal style={{ position: 'relative' }}>
        <Dialog.Overlay className={styles.overlay} />

        <Dialog.Content className={styles.content}>
          <Dialog.Close className={styles.closeButton}>
            <FiX size={16} />
          </Dialog.Close>

          <Dialog.Title className={styles.title}>Apagar tarefa</Dialog.Title>

          <Dialog.Description className={styles.description}>
            Você deseja apagar essa tarefa?
          </Dialog.Description>

          <div className={styles.footer}>
            <Dialog.Close>Cancelar</Dialog.Close>
            <div className={styles.separator}></div>

            <button onClick={handleDeleteTask}>
              {isLoading ? <Loading /> : 'Apagar'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
