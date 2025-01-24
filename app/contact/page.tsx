"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlowEffect } from '@/components/ui/glow-effect';


import { Button } from "@/components/ui/button";
import { useState } from "react"
import Image from "next/image";



export default function EmailForm() {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [org, setOrg] = useState('')
    const [link, setLink] = useState('');
    const [budget, setBudget] = useState('');
    const [referal, setReferal] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);


    const handleCheckboxChange = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service) // Remove if already selected
                : [...prev, service] // Add if not selected
        );
    };


    const sendEmail = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('/api/sendmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'dzynlabstudio@gmail.com',
                    subject: 'WORK!',
                    email,
                    name,
                    phone,
                    org,
                    link,
                    budget,
                    referal,
                    select: selectedServices,
                }),
            });

            if (response.ok) { // Use response.ok to simplify status check
                const responseData = await response.json(); // Parse response JSON if necessary
                console.log('Response:', responseData); // Log the response for debugging
                setStatus('Email sent successfully.');
                // Redirect after a successful response
                window.location.href = '/contact/success';
            } else {
                const errorData = await response.json(); // Optional: fetch error details from server
                console.error('Error Response:', errorData);
                setStatus('Failed to send email.');
                setOpen(true);
            }
        } catch (error) {
            setStatus('Error occurred while sending email.');
            console.error('Catch Error:', error);
            setOpen(true);
        }
    };


    return (
        <div className="flex flex-col lg:flex-row w-full h-full justify-between items-center">
            <div className="max-w-xl mx-auto p-6 border rounded-md shadow-md">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-6 w-3">GET IN TOUCH</h1>
                    <div className="hidden md:block">
                        <Image
                            src="/logo.png" // Path to your desktop image
                            alt="Desktop Image"
                            width={150}
                            height={150}
                            priority // Load faster for above-the-fold
                        />
                    </div>

                    {/* Mobile Image */}
                    <div className="block md:hidden">
                        <Image
                            src="/logo.png" // Path to your mobile image
                            alt="Mobile Image"
                            width={120}
                            height={120}
                            priority
                        />
                    </div>
                </div>
                <form className="space-y-6">
                    {/* Name and Organization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="block mb-2">
                                Your Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="name" placeholder="Name" required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="organization" className="block mb-2">
                                Your Organization's Name <span className="text-red-500">*</span>
                            </Label>
                            <Input id="organization" placeholder="Your Organization's Name" required onChange={(e) => setOrg(e.target.value)} />
                        </div>
                    </div>

                    {/* Email and Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email" className="block mb-2">
                                Your Email <span className="text-red-500">*</span>
                            </Label>
                            <Input id="email" type="email" placeholder="Your Email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="contact" className="block mb-2">
                                Your Contact <span className="text-red-500">*</span>
                            </Label>
                            <Input id="contact" type="tel" placeholder="Your Contact" required onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    {/* Website / Social Media */}
                    <div>
                        <Label htmlFor="website" className="block mb-2">
                            Website / Social Media Link <span className="text-gray-500 italic">(If Any)</span>
                        </Label>
                        <Input id="website" placeholder="Your Website" onChange={(e) => setLink(e.target.value)} />
                    </div>

                    {/* Services */}
                    <div>
                        <Label className="block mb-2">What services are you interested in?</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="logo-design" onCheckedChange={() => handleCheckboxChange("Logo design")} />
                                <Label htmlFor="logo-design">Logo design</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="brand-identity" onCheckedChange={() => handleCheckboxChange("Brand identity development")} />
                                <Label htmlFor="brand-identity">Brand identity development</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="packaging-design" onCheckedChange={() => handleCheckboxChange("Packaging design")} />
                                <Label htmlFor="packaging-design">Packaging design</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="brand-consultation" onCheckedChange={() => handleCheckboxChange("Brand consultation")} />
                                <Label htmlFor="brand-consultation">Brand consultation</Label>
                            </div>
                        </div>
                    </div>

                    {/* Investment */}
                    <div>
                        <Label htmlFor="investment" className="block mb-2">
                            How much are you looking to invest in this project? (Our starting rate of Branding projects is ₹1,20,000) <span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={(value) => { setBudget(value) }}>
                            <SelectTrigger id="investment">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1-2-lakh">₹1,00,000 - ₹2,00,000</SelectItem>
                                <SelectItem value="2-5-lakh">₹2,00,000 - ₹5,00,000</SelectItem>
                                <SelectItem value="5-lakh-plus">₹5,00,000+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* How did you hear about us */}
                    <div>
                        <Label htmlFor="reference" className="block mb-2">
                            And lastly, how did you hear about us? <span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={(value) => { setReferal(value) }}>
                            <SelectTrigger id="reference">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="social-media">Social Media</SelectItem>
                                <SelectItem value="referral">Referral</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit */}
                    <div className='relative'>
                        <GlowEffect
                            colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
                            mode='colorShift'
                            blur='soft'
                            duration={3}
                            scale={1.01}
                        />
                        <Button onClick={sendEmail} className="w-full relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline outline-1 outline-[#fff2f21f]">
                            Let&apos;s Connect!
                        </Button>
                    </div>
                </form>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Missing required fields</DialogTitle>
                            <DialogDescription>
                                Please check all the fields are added and are valid. Thank you!!
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}


/**<form onSubmit={sendEmail}>
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send Email</button>
      <p>{status}</p>
    </form> */