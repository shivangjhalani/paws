import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Mon-Fri from 9am to 5pm",
      contact: "(+91) 01234-56789",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "We'll respond within 24 hours",
      contact: "support@pawfect.com",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Available 24/7",
      contact: "Start a chat",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      description: "Visit our office",
      contact: "PES University, BE Block, Section I",
    },
  ];

  const faqs = [
    {
      question: "How quickly will I get a response?",
      answer: "We typically respond to all inquiries within 24 hours during business days.",
    },
    {
      question: "What information should I include in my message?",
      answer: "Please include any relevant details about your inquiry, such as pet IDs, your location, and specific questions you have.",
    },
    {
      question: "Is there emergency support available?",
      answer: "Yes, for urgent matters related to pet safety, our emergency line is available 24/7.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions about pet adoption? We're here to help! Choose your preferred way to reach us.
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactMethods.map((method, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-lg">{method.title}</h3>
                <p className="text-sm text-gray-500">{method.description}</p>
                <p className="font-medium">{method.contact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Inquiry Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adoption">Pet Adoption</SelectItem>
                  <SelectItem value="rehoming">Rehoming</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="How can we help you?"
                className="min-h-[150px]"
              />
            </div>

            <Button className="w-full">Send Message</Button>
          </form>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Map or Location */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Location</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5831550466417!2d77.53600631482173!3d12.934494090877053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e468d8d36d3%3A0x694d74f6ac640acf!2sPES%20University!5e0!3m2!1sen!2sin!4v1653493972785!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PES University Location"
                className="rounded-lg"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              PES University, Ring Road, Banashankari III Stage, Bangalore - 560085
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
