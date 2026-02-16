import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from '@/faq.constant';

export const FAQAccordion = () => {
  return (
    <Accordion type="single" collapsible className=" h-fit py-5 font-body border-none grid gap-5 md:gap-8   mx-auto w-[97%] ">
      {FAQ_ITEMS.map((faq, index) => (
        <AccordionItem
          key={faq.id}
          className="p-2 border rounded-2xl px-6 md:px-10"
          value={`item-${index + 1}`}
        >
          <AccordionTrigger className=" text-base md:text-xl lg:text-2xl [&>svg]:size-5 md:[&>svg]:size-6 tracking-wide text-left hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="border-t tracking-wide text-black/70 text-sm md:text-base lg:text-lg pt-2">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};