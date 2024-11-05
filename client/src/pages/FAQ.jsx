import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  const faqData = {
    "For Pet Owners Listing Their Pets": [
      {
        question: "How do I list my pet for rehoming?",
        answer: "To list your pet, create an account and click \"List a Pet\" on your dashboard. You'll need to provide recent photos of your pet, basic information (age, breed, size, gender), medical history and vaccination records, behavioral assessment, reason for rehoming, and any specific requirements for the new home."
      },
      {
        question: "Is there a fee to list my pet?",
        answer: "No, listing your pet is completely free. We believe removing financial barriers helps more pets find loving homes."
      },
      {
        question: "What information should I include in my pet's listing?",
        answer: "Include details about your pet's personality and temperament, training level and commands known, experience with children and other pets, daily routine and care requirements, any medical conditions or special needs, dietary preferences and restrictions, and favorite toys, activities, and treats."
      },
      {
        question: "How long will my listing remain active?",
        answer: "Listings remain active for 60 days. You can renew, update, or remove your listing at any time."
      },
      {
        question: "What happens after someone expresses interest in my pet?",
        answer: "You'll receive a notification and can review the potential adopter's profile. If you feel they might be a good match, you can message them through our secure platform, arrange a meet-and-greet, discuss specific requirements, and complete our adoption agreement if both parties agree to proceed."
      }
    ],
    "For Potential Adopters": [
      {
        question: "How do I search for available pets?",
        answer: "You can search using filters including species and breed, age range, size, location (distance from your zip code), gender, good with children/other pets, special needs/medical conditions, and training level."
      },
      {
        question: "Are the pets on your site free to adopt?",
        answer: "Adoption fees vary and are set by individual pet owners. Some pets may be free to adopt, while others may have a fee to cover medical expenses, supplies, or transport costs."
      },
      {
        question: "Can I meet the pet before deciding to adopt?",
        answer: "Yes, we strongly encourage meet-and-greets before finalizing any adoption. This helps ensure a good match between the pet and their new family."
      },
      {
        question: "How do I know if the pets are healthy and vaccinated?",
        answer: "Each listing includes the pet's medical history and vaccination records. We recommend reviewing all provided medical documentation, asking the current owner for vet references, having your own vet examine the pet before finalizing the adoption, and getting pet insurance coverage."
      },
      {
        question: "What is the adoption process?",
        answer: "1. Create an account and browse available pets\n2. Contact owners of pets you're interested in\n3. Arrange meet-and-greets\n4. Complete our adoption application\n5. Sign the adoption agreement\n6. Complete the transfer of ownership"
      }
    ],
    "Safety and Security": [
      {
        question: "How do you ensure the safety of both parties?",
        answer: "We protect our users through verified user accounts, secure messaging system, user ratings and reviews, standardized adoption agreements, report system for suspicious activity, and best practices guidelines for safe meetings."
      },
      {
        question: "What if things don't work out after adoption?",
        answer: "We recommend discussing any issues with the previous owner, consulting with a veterinarian or animal behaviorist, reviewing our resource center for training and adjustment tips, contacting our support team for guidance, and following the return policy specified in your adoption agreement."
      },
      {
        question: "How can I report suspicious activity?",
        answer: "Use the \"Report\" button on any listing or user profile, or contact our support team directly. We investigate all reports within 24 hours."
      }
    ],
    "Technical Support": [
      {
        question: "How do I update my pet's listing?",
        answer: "Log into your account, go to \"My Listings,\" select the pet's profile, and click \"Edit Listing\" to make changes."
      },
      {
        question: "What if I'm having technical issues with the website?",
        answer: "Contact our technical support team through live chat (available 9 AM - 6 PM EST), email: support@website.com, Help Center articles, or our contact form."
      }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      {Object.entries(faqData).map(([category, questions], categoryIndex) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow">
            {questions.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`${categoryIndex}-${index}`}
                className="border-b last:border-b-0"
              >
                <AccordionTrigger className="text-left px-4 hover:bg-gray-50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-600">
                  {item.answer.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
