import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import { useContacts } from '../contexts/ContactsProvider'

const TABS_KEYS = ['Conversations', 'Contacts']

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(TABS_KEYS[0].toLowerCase())
  const [modalOpen, setModalOpen] = useState(false)
  const conversationsOpen = activeKey === TABS_KEYS[0].toLowerCase()
  const { contacts } = useContacts()
  
  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          {TABS_KEYS.map((itemKey) => <Nav.Item key={itemKey.toLowerCase()}>
            <Nav.Link eventKey={itemKey.toLowerCase()} className={activeKey !== itemKey.toLowerCase()?'text-secondary' : 'text-primary'} >{itemKey}</Nav.Link>
          </Nav.Item> )}
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={TABS_KEYS[0].toLowerCase()} key={TABS_KEYS[0].toLowerCase()}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={TABS_KEYS[1].toLowerCase()} key={TABS_KEYS[1].toLowerCase()}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <p className="font-weight-light text-muted font-italic">{id}</p>
        </div>
        {console.log(Boolean(contacts))}
        <Button onClick={() => setModalOpen(true)} disabled={conversationsOpen && contacts.length === 0? "disabled" : ""  } className="rounded-0">
          {conversationsOpen && contacts.length === 0? "No Contacts":(`New ${conversationsOpen ? TABS_KEYS[0].toLowerCase() : TABS_KEYS[1].toLowerCase()}`)}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ?
          <NewConversationModal closeModal={closeModal} /> :
          <NewContactModal closeModal={closeModal} />
        }
      </Modal>
    </div>
  )
}
