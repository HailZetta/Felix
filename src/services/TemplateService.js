export default {
  uploadTemplate: async (data) => {
    const res = await (fetch('/template/upload', {
      method: 'post',
      body: data
    }))
    .then(data => data)
    console.log([data, res.status]);
    if (res.status !== 401) {
      return (res.json().then(data => data))
    } else {
      return (res.json({ message: { msgBody: "Error has occured", msgError: true } }))
    }
  }
};