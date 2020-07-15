export default {
  invitationCreate: async (data) => {
    const res = await (fetch('/invitation/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : 'application/json'
      }
    }))
    .then(data => data)
    console.log(JSON.stringify(data))
    if (res.status !== 401) {
      return (res.json().then(data => data))
    } else {
      return (res.json({ message: { msgBody: "Error has occured", msgError: true } }))
    }
  },

  invitationList: () => {
    return (
      fetch('/invitation/list')
      .then(response => {
        if(response.status !== 401) {
          return (response.json('Get data')
          .then(data => data));
        } else {
          return ({message: {msgBody: "Can not get data",msgError: true}});
        }
      })
    )
  },

  invitationUpdate: async (data, id) => {
    console.log(id)
    const res = await (fetch(`/invitation/update/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }))

    if (res.status !== 401) {
      return (res.json().then(data => data))
    } else {
      return (res.json({ message: { msgBody: "Error has occured", msgError: true } }))
    }
  },

  invitationDelete: (id) => {
    return (
      fetch(`/invitation/delete/${id}`, {method: 'delete'})
      .then(response => {
        if(response.status !== 401) {
          return (response.json('Delete data of id: ' + id)
          .then(data => data));
        } else {
          return ({message: {msgBody: 'Can not delete data', msgError: true}});
        }
      })
    )
  },
};