import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [step, setStep] = useState<'username' | 'password'>('username');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 'username' && username) {
            setStep('password');
        } else if (step === 'password' && password) {
            // 실제 로그인 로직 추가 위치
            console.log('Login attempt:', { username, password });
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        setStep('username');
        setPassword('');
    };

    return (
        <div 
            className="min-h-screen bg-login-background bg-cover bg-center flex items-center justify-center p-4 relative"
        >
            <div className="absolute inset-0 bg-black/70"></div> {/* 어두운 오버레이 */}

            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden p-8 space-y-8 relative">
                {step === 'password' && (
                     <button onClick={handleBack} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600">
                        <ArrowLeftIcon />
                    </button>
                )}
                
                <div className="text-left">
                    <p className="font-bold text-2xl text-blue-600 border-l-4 border-blue-600 pl-3">
                        {step === 'username' ? 'Seoul Echo Admin' : username}
                    </p>
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-800">
                        로그인
                    </h2>
                </div>

                <form onSubmit={handleNext} className="space-y-6">
                    {step === 'username' ? (
                        <div>
                            <label htmlFor="username" className="text-sm font-medium text-gray-600">사용자 이름</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full mt-2 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                                autoFocus
                            />
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-600">비밀번호</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                                autoFocus
                            />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button type="submit" className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <ArrowRightIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;


export default LoginPage;
