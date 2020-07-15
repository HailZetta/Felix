export default {
  profileCreate: async (data) => {
    const res = await (fetch('/profile/create', {
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
  
  profileList: () => {
    return (
      fetch('/profile/list')
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

  profileListId: (id) => {
    return (
      fetch(`/profile/list/${id}`)
      .then(response => {
        if(response.status !== 401) {
          return (response.json(`Get data of id: ${id}`)
          .then(data => data));
        } else {
          return ({message: {msgBody: 'Can not get data', msgError: true}});
        }
      })
    )
  },

  profileUpdate: async (data, id) => {
    const res = await (fetch(`/profile/update/${id}`, {
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
};