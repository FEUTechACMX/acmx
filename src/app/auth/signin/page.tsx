"use client";
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import ACMLogo from '~/components/ACMLogo';
export default function SignIn() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(provider: 'google' | 'microsoft') {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="w-20 h-12 rounded-full flex items-center justify-center relative">
                        <ACMLogo />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Project ACM-X</CardTitle>
                    <p className="text-sm text-muted-foreground text-center">
                        Sign in to access your account
                    </p>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button
                        variant="outline"
                        onClick={() => onSubmit('google')}
                        disabled={isLoading}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        {/* {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.google className="mr-2 h-4 w-4" />
                        )} */}
                        Sign in with Google
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => onSubmit('microsoft')}
                        disabled={isLoading}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        {/* {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.microsoft className="mr-2 h-4 w-4" />
                        )} */}
                        Sign in with Microsoft
                    </Button>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-center text-gray-600 mt-4 w-full">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}