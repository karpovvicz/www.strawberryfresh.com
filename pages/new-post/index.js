import NewPostForm from "../../components/posts/NewPostForm";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";


function NewPostPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // You can change this password to whatever you prefer
    const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
        setIsLoading(false);
    };

    async function addPostHandler(enteredPostData) {
        const response = await fetch('/api/new-post', {
            method: 'POST',
            body: JSON.stringify(enteredPostData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        router.push('/');
    }

    const seoConfig = {
        title: "Add a Post",
        description: "Add new content to StrawberryFresh",
        canonical: "https://strawberryfresh.com/new-post",
        noindex: true,
        nofollow: true,
    };

    return (
        <Fragment>

            {!isAuthenticated ? (
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md w-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-zinc-900 mb-2">
                                    Admin Access
                                </h1>
                                <p className="text-zinc-700/80">
                                    Please enter the password to add a new post
                                </p>
                            </div>

                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/30 backdrop-blur-xl border border-white/40 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter password"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm text-center bg-red-50/50 backdrop-blur-xl rounded-xl p-3 border border-red-200/30">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading || !password.trim()}
                                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white font-semibold text-base shadow-lg backdrop-blur-xl border border-white/20 hover:from-blue-700/90 hover:to-blue-800/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Verifying...</span>
                                        </div>
                                    ) : (
                                        'Access Form'
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => router.push('/')}
                                    className="text-zinc-600 hover:text-zinc-800 transition-colors duration-200 text-sm"
                                >
                                    ← Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <NewPostForm onAddPost={addPostHandler}/>
            )}
        </Fragment>
    )
}

export default NewPostPage;