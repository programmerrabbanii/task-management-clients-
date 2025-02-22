import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignin = async () => {
        googleSignIn().then((res) => {
            if (res.user.email) {
                toast.success("Successfully Signed In");
                navigate(from, { replace: true });
            }
            const userInfo = {
                name: res.user?.displayName, 
                email: res.user?.email,
                photoURL: res.user?.photoURL,
            };
            axios.post("https://job-task-server-swart.vercel.app/users", userInfo).then(() => {
                navigate(from, { replace: true });
            });
        }).catch(error => {
            toast.error("Sign-in failed. Please try again.");
            console.error(error);
        }); 
    };   
 
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome to Task Application</h2>
                    <p className="mt-2 text-gray-600">Please sign in to continue</p>
                </div>
                <button
                    onClick={handleGoogleSignin}
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-700 transition-all duration-300"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
