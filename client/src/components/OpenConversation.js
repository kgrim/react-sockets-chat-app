import React, { useState, useCallback, Fragment } from 'react'
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import NewContactModal from './NewContactModal'

export default function OpenConversation() {
  const [text, setText] = useState('')
  const [currentAddingId, setCurrentAddingId] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()
  const [modalOpen, setModalOpen] = useState(false)

  function closeModal() {
    setModalOpen(false)
  }

  function attachAddButton(id) {
    return (
      <Fragment key={id}> 
        {id}
        <Button className="text-sm bg-success text-uppercase border-success font-bold mx-2" style={{ fontSize: "11px" }} onClick={() => { setModalOpen(true); setCurrentAddingId(id)}}>Add</Button>
      </Fragment>)
}

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    )
    setText('')
  }

  return (
      <div className="d-flex flex-column flex-grow-1">
      <div className="p-2 px-4">{selectedConversation.recipients.map((r) => r.id === r.name ? attachAddButton(r.id) : r.name)}</div>
        <div className="flex-grow-1 overflow-auto">
          <div className="d-flex flex-column align-items-start justify-content-end px-3">
            {selectedConversation.messages.map((message, index) => {
              const lastMessage = selectedConversation.messages.length - 1 === index
              return (
                <div
                  ref={lastMessage ? setRef : null}
                  key={index}
                  className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                >
                  <div
                    className={`rounded px-2 py-1 ${message.fromMe ?  'border border-primary text-primary' : 'bg-primary text-white'}`}>
                    {message.text}
                  </div>
                  <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                    {message.fromMe ? 'You' : message.senderName}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={e => setText(e.target.value)}
                style={{ height: '75px', resize: 'none' }}
              />
              <InputGroup.Append>
                <Button type="submit">Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      
      <Modal show={modalOpen} onHide={closeModal}>
            
          <NewContactModal closeModal={closeModal} currentAddingId={currentAddingId} />
        </Modal>
      </div>
  )
}
