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
    console.log(JSON.stringify(data))
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
}