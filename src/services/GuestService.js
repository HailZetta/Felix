export default {
  guestCreate: async (data) => {
    const res = await (fetch('/guestlist/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : 'application/json'
      }
    }))
    .then(data => data)
    if (res.status !== 401) {
      return (res.json().then(data => data))
    } else {
      return (res.json({ message: { msgBody: "Error has occured", msgError: true } }))
    }
  },

  guestList: () => {
    return (
      fetch('/guestlist/list')
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

  guestDelete: (id) => {
    return (
      fetch(`/guestlist/delete/${id}`, {method: 'delete'})
      .then(response => {
        if(response.status !== 401) {
          return (response.json(`Delete data of id: ${id}`).then(data => data));
        } else {
          return ({message: {msgBody: 'Can not delete data', msgError: true}});
        }
      })
    )
  },
}