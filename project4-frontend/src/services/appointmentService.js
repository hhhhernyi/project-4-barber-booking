const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/book-appointment`;

// create a new appointment
async function createAppointment(bookingFormData) {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(bookingFormData),
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}


export {
    createAppointment
  };