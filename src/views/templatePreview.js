import React, { useEffect, useState, lazy, Suspense } from 'react';
import TemplateService from '../services/TemplateService';
import sampleImage from '../assets/image1.jpg';
import moment from 'moment';

const TemplatePreview = ({match, location}) => {
  let [template, setTemplate] = useState();
  const {params: {temp_id}} = match;
  
  const PreviewContent = lazy(() => import(template.templateFile.replace('src/views', '.') + '/index.js'));

  useEffect(() => {
    TemplateService.templateListId(temp_id).then(data => setTemplate(data));
  }, []);

  const TemplateContent = () => {
    if (template) {
      let props = []
      for (let i in template.content) {
        console.log(template.content[i].variable);
        if (template.content[i].type === 'Date') {
          props[template.content[i].variable] = moment(12/12/2012);
        } else if (template.content[i].type === 'Time') {
          props[template.content[i].variable] = moment(12);
        } else if (template.content[i].type === 'Image') {
          props[template.content[i].variable] = sampleImage;
        } else if (template.content[i].variable === 'maplink') {
          props[template.content[i].variable] = 'https://www.google.com/maps/place/Thera+847+00,+Hy+L%E1%BA%A1p/@36.4203348,25.4277823,16z/data=!3m1!4b1!4m5!3m4!1s0x1499cdce05e3bce9:0x9f4c192bbefa1db!8m2!3d36.4166485!4d25.432447?hl=vi-VN';
        } else {
          props[template.content[i].variable] = '.......................';
        }
      }

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
      {TemplateContent()}
    </div>
  )
}

export default TemplatePreview;