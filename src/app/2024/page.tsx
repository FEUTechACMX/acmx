"use client";

import { useState, useEffect } from "react";
import Loader from "~/components/2024/preloader/Loader";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prevPercentage) => {
        if (prevPercentage >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prevPercentage + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Loader loadingPercentage={loadingPercentage} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <p>sample</p>
      <main className="flex-1">
        <h1>Home Page</h1>
      </main>
    </div>
  );
}
