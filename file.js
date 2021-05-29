import { fetchCalls } from "./axios";



import api from "./apiModule"

// USE ALWAYS ASYNC AND AWAITE BEFORE USE THIS FUNCTIONS ============


useEffect(async() => {
    const data = fetchCalls.get("https://jsonplaceholder.typicode.com/posts")
     data.then(res => console.log(res))

     fetchCalls.post("https://jsonplaceholder.typicode.com/posts" , {title: 'foo',
     body: 'bar',
     userId: 1,}).then(res => console.log("resPOst=>",res))

       
     const data = await api.get("https://jsonplaceholder.typicode.com/posts")
     console.log(data)

     const post = await api.post("https://jsonplaceholder.typicode.com/posts" , {title: 'foo',
       body: 'bar',
       userId: 1,})

       const patch = await api.patch('https://jsonplaceholder.typicode.com/posts/1' , {title: "manish"});

       const deleteData = await api.delete('https://jsonplaceholder.typicode.com/posts/1');

       const put = await fetchCalls.put("https://jsonplaceholder.typicode.com/posts/1" , {title: 'fooiiiiiiiiiiiiiiiiiii',
       body: 'asdfjalsjdfasdf',
       userId: 1,})

       console.log(put)
    

}, [])
