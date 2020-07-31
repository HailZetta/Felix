import React, { useEffect, useState, lazy, Suspense } from 'react';
import InvitationService from '../services/InvitationService';
import GuestService from '../services/GuestService';
import TemplateService from '../services/TemplateService';


const InvitationView = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [template, setTemplate] = useState();
  let [guest, setGuest] = useState([]);
  const {params: {invi_id, guest_id}} = match;
  
  const PreviewContent = lazy(() => import(template.templateFile.replace('../src/views', '.') + '/index.js'));

  useEffect(() => {
    InvitationService.invitationListId(invi_id).then(data => {
      setInvitation(data);
      TemplateService.templateListId(data.template).then(data => setTemplate(data));
    });
    GuestService.guestListId(guest_id).then(data => setGuest(data));
  }, []);

  const InvitationContent = () => {
    if (invitation && template) {
      const props = {
        ...invitation.content,
        guest: guest,
        position: 'fixed',
      };
      
      return (
        <div style={{height: '100vh'}}>
          <Suspense fallback={<div>Loading...</div>}>
            <PreviewContent {...props} />
          </Suspense>
        </div>
      )
    }
  }

  return (
    <div>
      {InvitationContent()}
    </div>
  )
}

export default InvitationView;