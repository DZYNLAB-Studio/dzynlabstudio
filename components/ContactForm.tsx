import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Email sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatus("Error: Failed to send email.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-md rounded-md"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        className="w-full border p-2 rounded"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Send Message
      </button>
      {status && <p className="text-center mt-2">{status}</p>}
    </form>
  );
};

export default ContactForm;
