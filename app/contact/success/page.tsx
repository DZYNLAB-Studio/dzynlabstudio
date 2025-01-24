import Image from "next/image";
import { Cursor } from '@/components/ui/cursor';
import { TextLoop } from '@/components/ui/text-loop';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Instagram, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";



export default function Success() {
  return (
    <div className="w-full h-screen flex-col flex justify-center items-center ">

      <div className='p-4'>
        <Cursor
          attachToParent
          variants={{
            initial: { height: 0, opacity: 0, scale: 0.3 },
            animate: { height: 'auto', opacity: 1, scale: 1 },
            exit: { height: 0, opacity: 0, scale: 0.3 },
          }}
          transition={{
            type: 'spring',
            duration: 0.3,
            bounce: 0.1,
          }}
          className='overflow-hidden'
          springConfig={{
            bounce: 0.01,
          }}
        >
          <img
            src='/logo.png'
            alt='Christian Church, Eastern Europe'
            className='h-40 w-40'
          />
        </Cursor>
        <div className='inline-flex whitespace-pre-wrap text-lg'>
          DZYNLAB Studio for{' '}
          <TextLoop
            className='overflow-y-clip'
            transition={{
              type: 'spring',
              stiffness: 900,
              damping: 80,
              mass: 10,
            }}
            variants={{
              initial: {
                y: 20,
                rotateX: 90,
                opacity: 0,
                filter: 'blur(4px)',
              },
              animate: {
                y: 0,
                rotateX: 0,
                opacity: 1,
                filter: 'blur(0px)',
              },
              exit: {
                y: -20,
                rotateX: -90,
                opacity: 0,
                filter: 'blur(4px)',
              },
            }}
          >
            <span>Small Businesses</span>
            <span>Corporates</span>
            <span>E-commerce</span>
            <span>Event Planners</span>
            <span>NGOs</span>
            <span>Content Creators</span>
            <span>SaaS Startups</span>
            <span className="italic">doers.</span>
          </TextLoop>
        </div>
      </div>
      <div className="bottom-0  p-2">
      <Alert >
        <Terminal className="h-4 w-4" />
        <AlertTitle>Great Choice!</AlertTitle>
        <AlertDescription>
        You made the right move—let’s bring your vision to life!
        </AlertDescription>
      </Alert>
      </div>
      <Button variant="secondary" asChild>
        <a href="https://www.instagram.com/dzynlabstudio" target="_blank">
        <Instagram />
        INSTAGRAM
        </a>
      </Button>
    </div>
  );
}
