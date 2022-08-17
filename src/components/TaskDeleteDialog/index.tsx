import React from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { FiTrash2, FiX } from 'react-icons/fi'

import styles from './styles.module.css'

interface Props {
  onConfirm(): void
}

export const TaskDeleteDialog: React.FC<Props> = ({ onConfirm }) => {
  function handleConfirm() {
    onConfirm()
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.deleteButton}>
        <FiTrash2 size={16} />
      </Dialog.Trigger>

      <Dialog.Portal>
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
            <button onClick={handleConfirm}>Apagar</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
