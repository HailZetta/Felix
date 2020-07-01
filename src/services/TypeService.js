export default {
  typeCreate: async (data) => {
    const res = await (fetch('/type/create', {
      method: 'post',
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

  typeList: () => {
    return (
      fetch('/type/list')
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

  typeListId: (id) => {
    return (
      fetch('/type/list/' + id)
      .then(response => {
        if(response.status !== 401) {
          return (response.json('Get data of id: ' + id)
          .then(data => data));
        } else {
          return ({message: {msgBody: 'Can not get data', msgError: true}});
        }
      })
    )
  },

  typeUpdate: async (data, id) => {
    console.log(id)
    const res = await (fetch('/type/update/' + id, {
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

  typeDelete: (id) => {
    return (
      fetch('/type/delete/' + id, {method: 'delete'})
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
}