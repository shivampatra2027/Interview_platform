import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  ChevronDown, 
  HelpCircle, 
  MessageSquare,
  Mail,
  Phone
} from 'lucide-react';

const FAQPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10 border-b border-purple-100/20' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-xl group-hover:shadow-purple-500/70 transition-all transform group-hover:scale-105">
                <Brain className="text-white w-7 h-7" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">
                Interview<span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => navigate('/')}
                className="px-5 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition-all"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-linear-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-bold text-sm mb-6 border-2 border-purple-200 shadow-lg">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
            Frequently Asked <span className="bg-linear-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about InterviewAI and how to make the most of your preparation
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <FAQItem 
              question="What is InterviewAI?"
              answer="InterviewAI is an advanced AI-powered platform that helps you prepare for job interviews through realistic mock interviews. Our AI analyzes your responses, body language, and communication skills to provide personalized feedback and help you improve."
            />
            <FAQItem 
              question="How does the AI interview work?"
              answer="Our AI conducts realistic mock interviews by asking relevant questions based on your target role and industry. It uses natural language processing to understand your answers, voice recognition to analyze your speech patterns, and computer vision to assess your body language and presentation."
            />
            <FAQItem 
              question="What types of interviews can I practice?"
              answer="You can practice various interview types including behavioral interviews, technical interviews, case studies, and industry-specific scenarios. We cover roles across tech, finance, healthcare, consulting, and many other industries."
            />
            <FAQItem 
              question="How accurate is the AI feedback?"
              answer="Our AI is trained on thousands of successful interviews and continuously learns from new data. It provides highly accurate feedback on communication skills, answer structure, confidence levels, and areas for improvement. Many users have successfully landed jobs after using our platform."
            />
            <FAQItem 
              question="Is my interview data private and secure?"
              answer="Absolutely! We take privacy seriously. All your interview recordings and data are encrypted end-to-end and stored securely. We never share your personal information or interview content with third parties. You can delete your data at any time."
            />
            <FAQItem 
              question="Can I use InterviewAI on mobile devices?"
              answer="Yes! InterviewAI is fully responsive and works on desktop, tablet, and mobile devices. However, for the best experience with video interviews, we recommend using a desktop or laptop with a good webcam and microphone."
            />
            <FAQItem 
              question="What's included in the free plan?"
              answer="The free plan includes 5 mock interviews per month, basic performance analytics, standard AI feedback, and access to our community support. It's perfect for getting started and experiencing what InterviewAI can do."
            />
            <FAQItem 
              question="How is the Pro plan different from Free?"
              answer="The Pro plan offers unlimited mock interviews, advanced analytics with detailed insights, real-time AI coaching during interviews, industry-specific scenarios, priority support, and resume analysis. It's designed for serious job seekers who want comprehensive preparation."
            />
            <FAQItem 
              question="Can I cancel my subscription anytime?"
              answer="Yes! You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access until the end of your billing period."
            />
            <FAQItem 
              question="Do you offer refunds?"
              answer="We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied with InterviewAI within the first 7 days, contact our support team for a full refund."
            />
            <FAQItem 
              question="How long does each mock interview take?"
              answer="Mock interviews typically last 15-45 minutes depending on the role and interview type. You can pause and resume interviews at any time, making it flexible to fit your schedule."
            />
            <FAQItem 
              question="Can I practice with specific companies in mind?"
              answer="Yes! You can customize your interview preparation for specific companies. Our AI can simulate company-specific interview styles and questions based on your target employer."
            />
            <FAQItem 
              question="Is there a limit to how many times I can retry?"
              answer="With the Pro plan, you can retry as many times as you want. The free plan includes 5 interviews per month. We encourage multiple practice sessions to track your improvement over time."
            />
            <FAQItem 
              question="How quickly will I see improvement?"
              answer="Most users see noticeable improvement after 3-5 practice sessions. Our analytics track your progress over time, showing improvements in confidence, answer quality, and communication skills."
            />
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Still Have <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Questions?</span>
            </h2>
            <p className="text-lg text-slate-600">
              Our support team is here to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-purple-300 transition-all hover:shadow-xl text-center">
              <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Live Chat</h3>
              <p className="text-slate-600 mb-4">Chat with our support team in real-time</p>
              <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                Start Chat
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-purple-300 transition-all hover:shadow-xl text-center">
              <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600 mb-4">We'll respond within 24 hours</p>
              <a 
                href="mailto:support@interviewai.com" 
                className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Send Email
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-purple-300 transition-all hover:shadow-xl text-center">
              <div className="w-16 h-16 bg-linear-to-br from-pink-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Phone Support</h3>
              <p className="text-slate-600 mb-4">Mon-Fri, 9am-6pm IST</p>
              <a 
                href="tel:+911234567890" 
                className="inline-block px-6 py-2.5 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-all"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-xl text-white">
                Interview<span className="text-purple-400">AI</span>
              </span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 InterviewAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-purple-300 transition-all overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <h3 className="text-lg font-bold text-slate-900 pr-4">{question}</h3>
        <ChevronDown 
          className={`w-6 h-6 text-purple-600 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-8 pb-6">
          <p className="text-slate-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
