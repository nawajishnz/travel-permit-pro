
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, FileText, Globe, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ApplicationSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Fill Out Your Details",
      description: "Complete your application with our simple, guided form",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "AI-Powered Processing",
      description: "Our technology reviews and prepares your application",
      icon: Zap,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 3,
      title: "Expert Human Review",
      description: "Visa specialists ensure everything is perfect",
      icon: Globe,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      id: 4,
      title: "Visa Delivery",
      description: "Receive your approved visa electronically or by mail",
      icon: Check,
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Four Simple Steps to Your Visa
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our streamlined process takes the stress out of visa applications
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 hidden md:block" style={{ transform: 'translateY(-50%)' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 h-full flex flex-col items-center text-center relative z-10">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 rotate-90 md:rotate-0 text-gray-300 z-20">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/visa-finder">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 group">
              Start Your Application 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationSteps;
