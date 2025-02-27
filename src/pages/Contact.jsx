import '../App.css';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const sendEmail = (data) => {
    emailjs
      .send('service_dve6jpc', 'template_kq5zo6m', data, '8KoKQoo7R8afcTIg-')
      .then((response) => {
        console.log('Email sent successfully:', response);
        toast.success('Your message has been sent successfully!',{
          position: 'top-center',
          toastId: 'send-toast',
          
        }); 
        reset(); 
      })
      .catch((error) => {
        console.error('Email error:', error);
        toast.error('Error sending the email. Please try again later.'); // Error toast
      });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="contact_container">
        <div>
          <h2>Contact Us</h2>
          <div className="form">
            <form onSubmit={handleSubmit(sendEmail)} noValidate>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                  placeholder="Enter Your Name"
                  autoComplete="off"
                  {...register('Name', {
                    required: 'Name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  })}
                />
                {errors.Name && <div className="invalid-feedback">{errors.Name.message}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                  placeholder="Enter Your Email"
                  autoComplete="off"
                  {...register('Email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email.message}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.Subject ? 'is-invalid' : ''}`}
                  placeholder="Enter Your Subject"
                  autoComplete="off"
                  {...register('Subject', {
                    required: 'Subject is required',
                    minLength: { value: 5, message: 'Subject must be at least 5 characters' },
                  })}
                />
                {errors.Subject && <div className="invalid-feedback">{errors.Subject.message}</div>}
              </div>

              <div className="mb-3">
                <textarea
                  className={`form-control ${errors.Message ? 'is-invalid' : ''}`}
                  placeholder="Your Message"
                  autoComplete="off"
                  {...register('Message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                  })}
                />
                {errors.Message && <div className="invalid-feedback">{errors.Message.message}</div>}
              </div>

              {isAuthenticated ? (
                <button className="btn  col-4 col-md-5 col-lg-2" type="submit">
                  Send
                </button>
              ) : (
                <button className="btn  col-4 col-md-5 col-lg-2" type="button" onClick={handleSend}>
                  Login to Send
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

