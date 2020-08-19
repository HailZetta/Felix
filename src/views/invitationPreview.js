import React, { useEffect, useState, lazy, Suspense } from 'react';
import InvitationService from '../services/InvitationService';
import TemplateService from '../services/TemplateService';
import sampleImage from '../assets/image1.jpg';
import moment from 'moment';

const InvitationPreview = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [template, setTemplate] = useState();
  const {params: {invi_id}} = match;
  
  const PreviewContent = lazy(() => import(template.templateFile.replace('src/views', '.') + '/index.js'));

  useEffect(() => {
    InvitationService.invitationListId(invi_id).then(data => {
      setInvitation(data);
      TemplateService.templateListId(data.template).then(data => setTemplate(data))
    })
  }, []);

  const InvitationContent = () => {
    if (template) {
      let props = []
      for (let i in template.content) {
        if (template.content[i].type === 'Date') {
          props[template.content[i].variable] = moment(12/12/2012);
        } else if (template.content[i].type === 'Time') {
          props[template.content[i].variable] = moment(12);
        } else if (template.content[i].type === 'Image') {
          props[template.content[i].variable] = sampleImage;
        } else {
          props[template.content[i].variable] = '.......................';
        }
      }

      const newProps = invitation.content;
      let uploadImage = null;
      if (newProps.image) {
        uploadImage = require(`./upload/${invitation.content.image}`);
        newProps.image = uploadImage;
      }

      props = {...props, ...newProps};
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

export default InvitationPreview;