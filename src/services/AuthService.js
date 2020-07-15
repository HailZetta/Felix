export default {
    login : async user =>{
        const res = await fetch('/users/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status !== 401)
            return res.json().then(data => data);
        else
            return { isAuthenticated: false, user: { email: "", role: "" }, message: { vi: "Sai email hoặc mật khẩu", en: "Incorrect Email or Password" } };
    },

    register : async user =>{
        const res = await fetch('/users/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },

    logout : async ()=>{
        const res = await fetch('/users/logout');
        const data = await res.json();
        return data;
    },
    
    isAuthenticated : ()=>{
        return fetch('/users/authenticated')
        .then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated : false, user : {email : "", role : "", profile: ""}};
            }
        });
    }

}