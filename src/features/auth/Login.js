import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../../assets/VBM-Logo.png'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])

    // useEffect(() => {
    //     setErrMsg('')
    // }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user, pwd }).unwrap()
            dispatch(setCredentials({ ...userData, user }))
            setUser('')
            setPwd('')
            navigate('/welcome')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login flex direction">
          <div className="left-side">
            <div className="bg-img">
              <div className="container">
                <h3 className="fs-600">“Without hard work, nothing<br/>grows but weeds.”</h3>
                <h6 className="fs-400">- Gordon B. Hinckley</h6>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="container flow">
              <div className="pl-7">
                <img src={Logo} alt="logo"/>
                <h1 className="fs-700">Welcome to<br/><span className="uppercase">property</span> Admin Panel</h1>
                <h6>Sign in to your account below</h6>
                <form className="flow" onSubmit={handleSubmit}>
                  <div className="form-set flow flow-space--small">
                    <label>Email</label>
                    <input className="input-box" type="email" placeholder="Type your email here" onChange={handleUserInput} />
                  </div>
                  <div className="form-set flow flow-space--small">
                    <label>Password</label>
                    <i className="icon show-password"></i>
                    <input className="input-box" type="password" placeholder="Type your password here" onChange={handlePwdInput}/>
                  </div>
                  <div className="form-set">
                    <button className="button-orange">Sign In</button>
                  </div>
                </form>
                <p>Version 1.0.0</p>
              </div>
            </div>
          </div>
        </section>
    )

    return content
}
export default Login