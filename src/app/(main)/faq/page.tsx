import { Metadata } from "next";
import { seoConfig } from "@/lib/seo";
import { FAQClient } from "@/components/FAQClient";

const siteUrl = "https://cavalierkingcharlesrehomingcenter.com";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${seoConfig.siteName}`,
  description: `Get answers to common questions about adopting a Cavalier King Charles Spaniel. Learn about our adoption process, health guarantees, and rehoming services.`,
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

const faqItems = [
  {
    question: "How does the Cavalier King Charles Spaniel adoption process work?",
    answer: "Our adoption process is designed to match loving families with healthy Cavalier King Charles Spaniels. First, browse our available puppies and select one that fits your family. Then complete our adoption application. We'll review your application, conduct a brief phone consultation, and if approved, finalize the adoption with a health guarantee."
  },
  {
    question: "What health guarantees do you offer?",
    answer: "All our Cavalier puppies come with a comprehensive health guarantee. Each puppy undergoes thorough veterinary examination before adoption. We provide documentation of all vaccinations, health screenings, and a genetic health guarantee for hereditary conditions common to the breed."
  },
  {
    question: "What is included in the adoption fee?",
    answer: "Our adoption fees include complete veterinary care, age-appropriate vaccinations, deworming treatments, health certificate, adoption contract, and health guarantee. We also provide a starter kit with food, collar, and care guides for your new companion."
  },
  {
    question: "Do you offer transport services?",
    answer: "Yes! We provide professional pet transport services throughout the United States. Our experienced transport team ensures your new Cavalier travels safely and comfortably to your location. Transport fees vary based on distance."
  },
  {
    question: "How do I know if a Cavalier King Charles Spaniel is right for my family?",
    answer: "Cavalier King Charles Spaniels are ideal family dogs known for their gentle, affectionate nature. They adapt well to various living situations and get along great with children and other pets. Their moderate exercise needs and loving temperament make them excellent companions."
  },
  {
    question: "What makes your rehoming center different?",
    answer: "We're dedicated exclusively to Cavalier King Charles Spaniels, ensuring expert breed knowledge and care. Our puppies receive premium veterinary care, early socialization, and training. We maintain ethical breeding practices and prioritize finding the perfect forever home for each dog."
  },
  {
    question: "What age puppies do you have available?",
    answer: "We have puppies of various ages available for adoption, from young puppies to adult dogs. Each puppy's age, temperament, and personality are carefully matched with prospective families to ensure the best fit."
  },
  {
    question: "How can I start the adoption process?",
    answer: "Simply browse our available Cavalier King Charles Spaniels, select your favorite puppy, and complete our adoption application online. Our team will contact you within 24-48 hours to discuss next steps."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient faqItems={faqItems} />
    </>
  );
}