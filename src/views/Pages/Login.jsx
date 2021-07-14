import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../../controllers/localStorage';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { firebase } from '../../firebase/firebase-confix';

// login
const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In',
  });
  const { email, password1 } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = (tokenId, accessToken) => {
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(tokenId, accessToken);
    firebase.auth().signInWithCredential(googleCredential).then(credential => {
      console.log('creds', credential.user);
      firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        var res = {
          data: {
            success: true,
            message: 'Login success!',
            token: idToken,
            user: {
              _id: credential.user.uid,
              name: credential.user.displayName,
              email: credential.user.email
            },
          }
        }
        informParent(res);
        toast.success(`Welcome!! ${credential.user.displayName}`);
        history.push('/home');
      }).catch(function (error) {
        console.log(error);
        toast.success(`Error! ${error.message}`);
      });
    }).catch(error => {
      console.log(error);
      toast.success(`Error! ${error.message}`);
    })
  };
  const informParent = (response) => {
    authenticate(response, () => {
      history.push('/home');
    });
  };

  const sendFacebookToken = (accessToken) => {
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
    firebase.auth().signInWithCredential(facebookCredential).then(credential => {
      console.log('creds', credential.user);
      firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        var res = {
          data: {
            success: true,
            message: 'Login success!',
            token: idToken,
            user: {
              _id: credential.user.uid,
              name: credential.user.displayName,
              email: credential.user.email
            },
          }
        }
        informParent(res);
        toast.success(`Welcome!! ${credential.user.displayName}`);
        history.push('/home');
      }).catch(function (error) {
        console.log(error);
        toast.success(`Error! ${error.message}`);
      });
    }).catch(error => {
      console.log(error);
      toast.success(`Error! ${error.message}`);
    })
  };
  const responseGoogle = async (response) => {
    var email = response.profileObj.email;
    await firebase.firestore().collection('admin').where('email', '==', email).get().then(data => {
      if (data.size > 0) {
        sendGoogleToken(response.tokenId, response.accessToken);
      } else {
        toast.success(`Email sử dụng cho tài khoản Google này chưa được đăng ký`);
      }
    })
  };
  const responseFacebook = (response) => {
    console.log(response);
    sendFacebookToken(response.accessToken);
  };
  // check login
  const handleSubmit = (e) => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      firebase.auth().signInWithEmailAndPassword(email, password1)
        .then((userCredential) => {
          console.log(userCredential);
          firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
            var res = {
              data: {
                success: true,
                message: 'Login success!',
                token: idToken,
                user: {
                  _id: userCredential.user.uid,
                  name: userCredential.user.displayName,
                  email: userCredential.user.email
                },

              }
            }
            informParent(res);
            history.push('/home');
            toast.success(`Welcome!! ${userCredential.user.email}`);
          }).catch(function (error) {
            console.log('error');
            toast.success('Error! ', error.message);
          });

        })
        .catch((error) => {
          toast.error('Email or password is not correct');
        });
      // axios
      //   .post(`${process.env.REACT_APP_API_URL_LOGIN}/admin/login`, {
      //     email,
      //     password: password1,
      //   })
      //   .then((res) => {
      //     authenticate(res, () => {
      //       setFormData({
      //         ...formData,
      //         email: '',
      //         password1: '',
      //         textChange: 'Submitted',
      //       });
      //       history.push('/home');
      //       toast.success(`Welcome  ${res.data.user.name}!!`);
      //     });
      //   })
      //   .catch((err) => {
      //     setFormData({
      //       ...formData,
      //       email: '',
      //       password1: '',
      //       textChange: 'Sign In',
      //     });
      //     // console.log(err.response);
      //     toast.error(err.response.data.message);
      //   });
    } else {
      toast.error('Please fill all fields');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign In for Toeic App Admin
            </h1>
            <div className="w-full flex-1 mt-8 text-indigo-500">
              <form
                className="mx-auto max-w-xs relative "
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                  <span className="ml-3">Sign In</span>
                </button>
                <Link
                  to="/users/password/forget"
                  className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2"
                >
                  Forget password?
                </Link>
              </form>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign In with selections
                </div>
              </div>
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#EBF4FF',
                        borderRadius: 25,
                      }}
                    >
                      <div className=" p-2 rounded-full ">
                        <i className="fab fa-google fa-2x" style={{ color: 'red' }} />
                      </div>
                    </button>
                  )}
                ></GoogleLogin>
                <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#EBF4FF',
                        borderRadius: 25,
                        marginLeft: 20,
                      }}
                    >
                      <div className=" p-2 rounded-full ">
                        <i className="fab fa-facebook fa-2x" />
                      </div>
                    </button>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
