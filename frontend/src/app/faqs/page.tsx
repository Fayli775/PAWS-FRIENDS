'use client'

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "How do I add or edit my pet's profile?",
    answer: "First, make sure you’re logged in, go to the Profile page and navigate yourself to Pets section, and then click 'ADD Pet' to fill in your pet’s details and upload a profile photo. You can also click the edit icon on each pet card to update their information anytime."
  },
  {
    question: "What photo formats can I upload?",
    answer: "We currently support JPG, JPEG, and PNG formats. For best results, keep the image under 10MB and around 200x200 pixels in size."
  },
  {
    question: "How do I book a dog walking or pet boarding service?",
    answer: "Please make sure you are logged in first. You can search for sitters using keywords on the home page. Click into a sitter's profile page to place a booking."
  },
  {
    question: "How can I view or cancel my bookings?",
    answer: "Head to the Profile page, Orders section to see all your past and upcoming services. To cancel a booking, please do so at least 24 hours before the service starts to avoid any inconvienience"
  },
  {
    question: "Why do you ask for vet and emergency contact details?",
    answer: "This information is only accessed by our service staff in case of an emergency, to help ensure your pet’s health and safety. We are committed to keeping your data private and secure."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use encryption and authentication to protect your personal and pet data. Your information will never be shared or used without your consent."
  },
  {
    question: "What should I do if I run into technical issues?",
    answer: "Please contact us via info@example.com, we will get to you as soon as possible. Thank you for your patient."
  }
];

export default function FAQsPage() {
  return (
    <Box sx={{ backgroundColor: '#fef8f2' }}>
      <Container maxWidth="md" sx={{ pt: 6, pb: 10 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}