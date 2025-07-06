import React from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent } from './components/ui/card';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-10 flex flex-col gap-6 items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-lg font-semibold">Welcome</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-center">
            <p>Get started with shadcn/ui in Vite + React.</p>
            <div className="flex gap-2">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default App;