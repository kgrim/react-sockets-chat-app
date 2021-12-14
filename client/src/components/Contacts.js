import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts } = useContacts()

  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
          <p className='small font-weight-light text-muted font-italic'>{contact.id}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
