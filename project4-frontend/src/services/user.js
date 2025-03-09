const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

// View all confirmed appointments
async function viewSingleUser(userId) {
    try {
        const res = await fetch(BASE_URL+`/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

export {
    viewSingleUser
}