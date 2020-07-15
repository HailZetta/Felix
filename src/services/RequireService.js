export default {
  requireCreate: async (data) => {
    const res = await (fetch('/require/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers : {
        'Content-Type' : 'application/json'
      }
    }))
    if (res.status !== 401) {
      return (res.json().then(data => data))
    } else {
      return (res.json({ message: { msgBody: "Error has occured", msgError: true } }))
    }
  },
  
  requireList: () => {
    return (
      fetch('/require/list')
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

  requireListId: (id) => {
    return (
      fetch('/require/list/' + id)
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
};