export default {
  uploadTemplate: async (data) => {
    const res = await (fetch('/template/upload', {
      method: 'post',
      body: data
    }))
    .then(data => data)
    if (res.status !== 401) {
      return (res.json().then(data => data))
    } else {
      return (res.json({ message: { msgBody: "Error has occured", msgError: true } }))
    }
  },

  templateList: () => {
    return (
      fetch('/template/list')
      .then(response => {
        if(response.status !== 401) {
          return (response.json('Get data')
          .then(data => data));
        } else {
          return ({message: {msgBody: "Can not get data", msgError: true}});
        }
      })
    )
  },

  templateListId: (id) => {
    return (
      fetch(`/template/list/${id}`)
      .then(response => {
        if(response.status !== 401) {
          return (response.json(`Get data of id: ${id}`).then(data => data));
        } else {
          return ({message: {msgBody: 'Can not get data', msgError: true}});
        }
      })
    )
  },

  templateUpdate: async (data, id) => {
    const res = await (fetch(`/template/update/${id}`, {
      method: 'put',
      body: (data)
    }))

    if (res.status !== 401) {
      return (res.json().then(data => data))
    } else {
      return (res.json({ message: { msgBody: "Error has occured", msgError: true } }))
    }
  },

  templateDelete: (id) => {
    return (
      fetch(`/template/delete/${id}`, {method: 'delete'})
      .then(response => {
        if(response.status !== 401) {
          return (response.json(`Delete data of id: ${id}`)
          .then(data => data));
        } else {
          return ({message: {msgBody: 'Can not delete data', msgError: true}});
        }
      })
    )
  },
};