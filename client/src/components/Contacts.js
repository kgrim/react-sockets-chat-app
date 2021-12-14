import React from 'react'
import { ListGroup , Button} from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';


export default function Contacts() {
  const { contacts, removeContact } = useContacts()

  function handleClick( id) {
    removeContact(id)
  }

  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
          <p className='font-weight-light text-muted font-italic' style={{fontSize: "11px"}}>{contact.id}</p>
          <Button onClick={()=>handleClick(contact.id)} className="text-sm bg-danger text-uppercase border-danger font-bold" style={{fontSize: "11px"}}>Remove Contact</Button>
        </ListGroup.Item>
      ))}
      
    </ListGroup>
  )
}
