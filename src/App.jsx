import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [formData, setFormData] = useState({
    id: 1,
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries',
        formData
      );
      toast.success('Form submitted successfully');
      setFormData({
        id: 0,
        name: '',
        email: '',
        message: '',
        subject: '',
      });
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while submitting the form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!formData.message) {
      setError({
        message: 'Message is required',
      });
      isValid = false;
    }
    if (!formData.email) {
      setError({
        email: 'Email is required',
      });
      isValid = false;
    }
    if (!formData.name) {
      setError({
        name: 'Name is required',
      });
      isValid = false;
    }

    if (isValid) {
      setFormData({
        ...formData,
        id: formData.id + 1,
      });

      submitForm();
      console.log(formData);
    }
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>CONTACT FORM</h1>
          <div className="form-group">
            <input
              type="text"
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (e.target.value === '') {
                  setError({
                    ...error,
                    name: 'Please enter your name',
                  });
                } else {
                  setError({
                    ...error,
                    name: '',
                  });
                }
              }}
            />
            {error.name && (
              <span
                style={{
                  color: '#f80923',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                {error.name}
              </span>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="E-MAIL"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (e.target.value === '') {
                  setError({
                    ...error,
                    email: 'Please enter your email address',
                  });
                } else if (
                  !event.target.value.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                ) {
                  setError({
                    ...error,
                    email: 'Invalid email address',
                  });
                } else {
                  setError({
                    ...error,
                    email: '',
                  });
                }
              }}
            />
            {error.email && (
              <span
                style={{
                  color: '#f80923',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                {error.email}
              </span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="THE SUBJECT"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (e.target.value === '') {
                  setError({
                    ...error,
                    message: 'Please enter your message',
                  });
                } else if (e.target.value.length < 10) {
                  setError({
                    ...error,
                    message: 'Message must be at least 10 characters',
                  });
                } else {
                  setError({
                    ...error,
                    message: '',
                  });
                }
              }}
              id=""
              cols="30"
              rows="10"
              placeholder="YOUR MESSAGE"
            ></textarea>
            {error.message && (
              <span
                style={{
                  color: '#f80923',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                {error.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'SUBMIT'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default App;
