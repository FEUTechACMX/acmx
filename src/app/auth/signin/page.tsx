"use client";
import { signIn } from "next-auth/react";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import ACMLogo from '~/components/ACMLogo';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

type Provider = {
    name: string;
    id: string;
    logo: JSX.Element;
};

const providers = {
    google: {
        name: 'Google',
        id: 'google',
        logo: <FaGoogle className="mr-2 h-4 w-4" />,
    },
    microsoft: {
        name: 'Microsoft',
        id: 'azure-ad',
        logo: <FaMicrosoft className="mr-2 h-4 w-4" />,
    },
};
const ProviderButton: React.FC<Provider> = (provider) => {
    return (
        <Button
            variant="outline"
            onClick={() => signIn(provider.id)}
        >
            {provider.logo}
            Sign in with {provider.name}
        </Button>
    );
};

const ProviderButtons: React.FC = () => {
    return (
        <CardContent className="grid gap-4">
            {Object.values(providers).map(provider => (
                <ProviderButton key={provider.id} {...provider} />
            ))}
        </CardContent>
    );
}

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
            <div className="absolute inset-0 bg-background -z-10"></div>
            <Card className="w-full max-w-md backdrop-blur-sm shadow-xl border-0">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="w-20 h-12 rounded-full flex items-center justify-center relative">
                        <ACMLogo />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Project ACM-X</CardTitle>
                    <p className="text-sm text-muted-foreground text-center">
                        Sign in to access your account
                    </p>
                </CardHeader>
                <ProviderButtons />
                <CardFooter>
                    <p className="text-xs text-center text-gray-600 mt-4 w-full">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}