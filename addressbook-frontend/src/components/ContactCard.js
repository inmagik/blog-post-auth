export default function ContactCard({ contact }) {
  return (
    <div className="list-group-item">
      <div>
        <span className="mr-3">🧑</span>
        <b>{contact.name}</b>
      </div>
      <div>
        <span className="mr-3">📞</span>
        <b>{contact.phone}</b>
      </div>
      {contact.email && (
        <div>
          <span className="mr-3">✉️</span>
          <b>{contact.email}</b>
        </div>
      )}
      {contact.notes && <p className='mb-0 mt-2'>{contact.notes}</p>}
    </div>
  )
}
