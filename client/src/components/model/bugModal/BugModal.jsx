import React, { useContext } from 'react'
import { HomeContext } from '../../../context/homeContext/HomeContext'
import close from '../../../assets/close.svg'
import './bugModal.css'
export default function BugModal() {
    const {bugModal, setBugModal} = useContext(HomeContext)
    if(!bugModal)
    {
        return <></>
    }
  return (
    <div className="bug-detail-container">
        <div className="bug-detail-close">
          <img src={close} onClick = {() => setBugModal(false)}/>
        </div>
        <div className="bug-detail-body">
            <div className="bug-content">
              <div className="bug-content-left">
               {bugModal.screenshot ? <img src={bugModal.screenshot} alt="" /> : <p>No image Provided</p>}
              </div>
              <div className="bug-content-right">
                <div className="bcr-upper">
                  <p>{bugModal.status}</p>
                  <p>{bugModal.type}</p>
                  <p>{bugModal.deadline.split('T')[0]}</p>
                </div>
                <div className="bcr-lower">
                  <p className='bcr-title'>{bugModal.title}</p>
                  <p className='bcr-desc'>{bugModal.description}</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
