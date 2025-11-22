import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MessageSquare, 
  BarChart3, 
  CheckCircle2, 
  Play, 
  Menu, 
  X, 
  ChevronRight, 
  Cpu,
  Shield,
  Zap,
  Brain,
  Users,
  Calendar,
  Award,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-900/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Brain className="text-white w-6 h-6" />
              </div>
              <span className={`font-bold text-2xl tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                Interview<span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Master</span>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-12 flex items-baseline space-x-8">
                <a href="#features" className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${scrolled ? 'text-slate-700 hover:text-purple-600' : 'text-white/90 hover:text-white'}`}>Features</a>
                <a href="#how-it-works" className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${scrolled ? 'text-slate-700 hover:text-purple-600' : 'text-white/90 hover:text-white'}`}>How it Works</a>
                <a href="#testimonials" className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${scrolled ? 'text-slate-700 hover:text-purple-600' : 'text-white/90 hover:text-white'}`}>Testimonials</a>
                <a href="#pricing" className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${scrolled ? 'text-slate-700 hover:text-purple-600' : 'text-white/90 hover:text-white'}`}>Pricing</a>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              Get Started
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-slate-900' : 'text-white'}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-slate-700 hover:bg-slate-50 block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#how-it-works" className="text-slate-700 hover:bg-slate-50 block px-3 py-2 rounded-md text-base font-medium">How it Works</a>
            <a href="#testimonials" className="text-slate-700 hover:bg-slate-50 block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
            <a href="#pricing" className="text-slate-700 hover:bg-slate-50 block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
            <button 
              onClick={() => navigate('/login')}
              className="w-full text-left bg-linear-to-r from-purple-600 to-blue-600 text-white block px-3 py-3 rounded-lg text-base font-medium mt-4"
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-semibold">Powered by Advanced AI Technology</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[1.1]">
            Ace Your Next
            <span className="block bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-2">
              Job Interview
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Practice with AI-powered mock interviews. Get real-time feedback, improve your skills, and land your dream job with confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => navigate('/login')}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all transform hover:scale-105 shadow-2xl shadow-white/20"
            >
              Start Practicing Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm">
              <Play className="w-5 h-5 fill-current" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-slate-900 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <span className="font-semibold">10,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto mt-20">
          <div className="absolute -inset-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl opacity-20 blur-2xl" />
          <div className="relative rounded-2xl border border-white/20 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 h-8 bg-slate-800/50 rounded-lg flex items-center px-3">
                <span className="text-white/50 text-sm">interviewmaster.ai/interview</span>
              </div>
            </div>
            <div className="p-8 bg-linear-to-b from-slate-800/30 to-slate-900/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 aspect-video bg-slate-800 rounded-xl relative overflow-hidden border border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-linear-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Mic className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-white/70 font-medium">AI Interviewer Active</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-white text-sm font-medium">Recording...</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-mono">
                      00:45
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Live Score</span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">94</div>
                    <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                      <div className="bg-linear-to-r from-green-400 to-emerald-400 h-full rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-white/80 leading-relaxed">Excellent use of STAR method. Keep maintaining eye contact.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: IconComponent, title, description, gradient }) => {
  return (
    <div className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Everything You Need to<br />
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform provides comprehensive tools and insights to help you prepare for any interview scenario.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Brain}
            title="AI-Powered Analysis"
            description="Advanced AI evaluates your responses, tone, and body language to provide actionable insights."
            gradient="bg-linear-to-br from-purple-600 to-purple-500"
          />
          <FeatureCard 
            icon={Mic}
            title="Voice Recognition"
            description="Real-time speech analysis detects filler words, pace, and clarity to improve your delivery."
            gradient="bg-linear-to-br from-blue-600 to-blue-500"
          />
          <FeatureCard 
            icon={MessageSquare}
            title="Smart Questions"
            description="Dynamic questions adapted to your role, experience level, and target company."
            gradient="bg-linear-to-br from-pink-600 to-pink-500"
          />
          <FeatureCard 
            icon={BarChart3}
            title="Performance Analytics"
            description="Detailed reports and progress tracking help you identify strengths and areas for improvement."
            gradient="bg-linear-to-br from-indigo-600 to-indigo-500"
          />
          <FeatureCard 
            icon={Target}
            title="Industry-Specific Prep"
            description="Tailored interview scenarios for tech, finance, healthcare, and more industries."
            gradient="bg-linear-to-br from-violet-600 to-violet-500"
          />
          <FeatureCard 
            icon={Shield}
            title="100% Private & Secure"
            description="Your data is encrypted and never shared. Practice confidently in a safe environment."
            gradient="bg-linear-to-br from-emerald-600 to-emerald-500"
          />
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ number, title, description }) => (
  <div className="relative">
    <div className="flex items-start gap-6">
      <div className="shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-purple-500/30">
        {number}
      </div>
      <div className="pt-2">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
            <Clock className="w-4 h-4" />
            How it Works
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Get Started in<br />
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-16">
          <StepCard 
            number="1" 
            title="Create Your Profile" 
            description="Sign up and tell us about your target role, industry, and experience level. Upload your resume for personalized questions." 
          />
          <div className="flex justify-center">
            <div className="w-1 h-16 bg-linear-to-b from-purple-600 to-blue-600 rounded-full" />
          </div>
          <StepCard 
            number="2" 
            title="Start Your Mock Interview" 
            description="Enter a realistic interview environment with our AI. Answer questions naturally while we analyze your performance in real-time." 
          />
          <div className="flex justify-center">
            <div className="w-1 h-16 bg-linear-to-b from-purple-600 to-blue-600 rounded-full" />
          </div>
          <StepCard 
            number="3" 
            title="Review & Improve" 
            description="Get detailed feedback on every aspect of your interview. Track your progress over time and master your skills." 
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, role, company, image, text, rating }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-slate-700 leading-relaxed mb-6 text-lg">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {image}
      </div>
      <div>
        <div className="font-bold text-slate-900 text-lg">{name}</div>
        <div className="text-slate-600 text-sm">{role} at {company}</div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-6">
            <Award className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Loved by <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of successful candidates who landed their dream jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Sarah Chen"
            role="Software Engineer"
            company="Google"
            image="SC"
            rating={5}
            text="This platform helped me land my dream job at Google! The AI feedback was incredibly accurate and helped me improve my communication skills."
          />
          <TestimonialCard 
            name="Michael Roberts"
            role="Product Manager"
            company="Amazon"
            image="MR"
            rating={5}
            text="The mock interviews felt so realistic. I was fully prepared for my Amazon interview and got the offer on the first try!"
          />
          <TestimonialCard 
            name="Priya Sharma"
            role="Data Scientist"
            company="Microsoft"
            image="PS"
            rating={5}
            text="Best investment I made for my career. The detailed analytics showed me exactly where I needed to improve. Highly recommend!"
          />
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ name, price, period, features, popular, navigate }) => (
  <div className={`relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${popular ? 'bg-linear-to-br from-purple-600 to-blue-600 shadow-2xl shadow-purple-500/40 scale-105' : 'bg-white border-2 border-slate-200 hover:border-purple-200 hover:shadow-xl'}`}>
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-slate-900 text-sm font-bold rounded-full">
        MOST POPULAR
      </div>
    )}
    <h3 className={`text-2xl font-bold mb-2 ${popular ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
    <div className="mb-6">
      <span className={`text-5xl font-black ${popular ? 'text-white' : 'text-slate-900'}`}>${price}</span>
      <span className={`text-lg ${popular ? 'text-white/80' : 'text-slate-600'}`}>/{period}</span>
    </div>
    <button 
      onClick={() => navigate('/login')}
      className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 mb-8 ${popular ? 'bg-white text-purple-600 shadow-lg hover:shadow-xl' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
    >
      Get Started
    </button>
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle2 className={`w-6 h-6 shrink-0 mt-0.5 ${popular ? 'text-white' : 'text-green-500'}`} />
          <span className={`${popular ? 'text-white' : 'text-slate-700'}`}>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-6">
            <Zap className="w-4 h-4" />
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Choose Your <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard 
            name="Free"
            price="0"
            period="forever"
            features={[
              "5 mock interviews per month",
              "Basic performance analytics",
              "Standard AI feedback",
              "Community support"
            ]}
            navigate={navigate}
          />
          <PricingCard 
            name="Pro"
            price="29"
            period="month"
            popular={true}
            features={[
              "Unlimited mock interviews",
              "Advanced analytics & insights",
              "Real-time AI coaching",
              "Industry-specific scenarios",
              "Priority support",
              "Resume analysis"
            ]}
            navigate={navigate}
          />
          <PricingCard 
            name="Enterprise"
            price="99"
            period="month"
            features={[
              "Everything in Pro",
              "Custom interview scenarios",
              "Team management",
              "API access",
              "Dedicated account manager",
              "White-label options"
            ]}
            navigate={navigate}
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white w-6 h-6" />
              </div>
              <span className="text-white font-bold text-2xl">InterviewMaster</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
              Empower your career with AI-driven interview preparation. Practice, learn, and succeed.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Start Free Trial
            </button>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Product</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">For Teams</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Enterprise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Interview Tips</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">API Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm">© 2025 InterviewMaster. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Calendar className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}
