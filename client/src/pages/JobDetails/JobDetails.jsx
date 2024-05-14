import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext } from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const JobDetails = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const job = useLoaderData();
  const { user } = useContext(AuthContext);
  const {
    buyer_email,
    job_title,
    description,
    _id,
    deadline,
    min_price,
    max_price,
  } = job;
  const handleFormSubmission = async (e) => {
    if (user?.email === buyer_email) return toast.error('Action not permitted');
    e.preventDefault();
    const form = e.target;
    const jobId = _id;
    const price = parseFloat(form.price.value);
    if (price < parseFloat(min_price))
      return toast.error('Offer more or at least equal to Minimum Price');
    const comment = form.comment.value;
    const deadline = startDate;
    const email = form.email.value;
    const buyerEmail = buyer_email;
    const status = 'Pending';
    const bidData = {
      jobId,
      price,
      comment,
      email,
      buyerEmail,
      status,
      job_title,
      deadline,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bid`,
        bidData
      );
      console.log(data);
      toast.success('You successfully Bid on these Project');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error('Error in bid request');
    }
  };
  return (
    <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
      {/* Job Details */}
      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-light text-gray-800 '>
            Deadline: {deadline}
          </span>
          <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
            Web Development
          </span>
        </div>

        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
            {job_title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>{description}</p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Buyer Details:
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>
                Name: Jhankar Mahbub
              </p>
              <p className='mt-2 text-sm  text-gray-600 '>
                Email: jhankar.mahbub@gmail.com
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img src='' alt='' />
            </div>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
            Range: ${min_price} - ${max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Place A Bid
        </h2>

        <form onSubmit={handleFormSubmission}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='price'>
                Price
              </label>
              <input
                id='price'
                type='text'
                name='price'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                required
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                readOnly
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                defaultValue={user?.email}
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                required
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>
              <DatePicker
                className='border p-2 rounded'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
      <Toaster></Toaster>
    </div>
  );
};

export default JobDetails;