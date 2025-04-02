import { Button } from 'primereact/button';
import React from 'react';

export default function PageNotFound() {


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-xl text-gray-700">Oops! Page Not Found</p>
                <p className="mt-2 text-gray-500">Sorry, the page you are looking for doesn't exist.</p>
                <Button
                    label="Go to Home"
                    icon="pi pi-home"
                    className="p-button-primary mt-6"

                />
            </div>
        </div>
    );
}
