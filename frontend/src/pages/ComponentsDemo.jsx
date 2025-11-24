import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';

const ComponentsDemo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4">
            shadcn/ui <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Components</span>
          </h1>
          <p className="text-lg text-slate-600">
            Beautiful, reusable components built with Radix UI and Tailwind CSS
          </p>
          <Button onClick={() => navigate('/')} variant="outline" className="mt-6">
            ← Back to Home
          </Button>
        </div>

        {/* Button Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Card Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>This is a card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Card content goes here. You can put any content inside.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Action</Button>
              </CardFooter>
            </Card>

            <Card className="bg-linear-to-br from-purple-600 to-blue-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-white">Gradient Card</CardTitle>
                <CardDescription className="text-white/80">With custom styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">This card has a custom gradient background.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Learn More</Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">This card has hover effects.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Explore</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Input Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Inputs</h2>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Form Example</CardTitle>
              <CardDescription>Using shadcn/ui Input components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                <Input type="search" placeholder="Search..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Combined Example */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Combined Example</h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Get Started Today</CardTitle>
              <CardDescription>Sign up for our newsletter to stay updated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <p className="text-sm text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Privacy Policy</Button>
                <Button variant="ghost" size="sm">Terms of Service</Button>
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ComponentsDemo;
