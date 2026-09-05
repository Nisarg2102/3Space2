"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import styles from "@/styles/Contact.module.css";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaChevronRight,
  FaPaperPlane,
  FaLock,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaCircleCheck,
  FaCircleExclamation,
} from "react-icons/fa6";

import {
  Briefcase,
  FileText,
  CalendarDays,
  Rocket,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          setToast({ message: `Validation failed: ${errorMessages}`, type: "error" });
        } else {
          setToast({ message: data.message || "Failed to submit inquiry", type: "error" });
        }
        setStatus("idle");
        return;
      }

      setStatus("sent");
      setToast({ message: data.message || "Your message was saved successfully.", type: "success" });

      setForm({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      setToast({ message: error.message || "Something went wrong.", type: "error" });
      setStatus("idle");
    }
  };

  const socialLinks = [
    {
      key: "linkedin",
      label: "LinkedIn",
      sub: "Connect with us",
      href: "https://www.linkedin.com/company/3space-aerospace-and-space-technologies-company/",
      icon: <FaLinkedinIn />,
      variant: styles.iconLinkedin,
    },
    {
      key: "instagram",
      label: "Instagram",
      sub: "See our latest updates",
      href: "https://www.instagram.com/anjanisutah_3space?igsh=MWRzZDJlM2M0dTFwZA==",
      icon: <FaInstagram />,
      variant: styles.iconInstagram,
    },
    {
      key: "youtube",
      label: "YouTube",
      sub: "Watch our videos",
      href: "https://youtube.com/@anjanisutah_3space?si=h-YjBsOppmZxmJOV",
      icon: <FaYoutube />,
      variant: styles.iconYoutube,
    },
    {
      key: "twitter",
      label: "X (Twitter)",
      sub: "Follow our journey",
      href: "https://x.com/3Space_tech",
      icon: <FaXTwitter />,
      variant: styles.iconTwitter,
    },
    {
      key: "contact-email",
      label: "Contact Email",
      sub: "contactus@a3spacetech.com",
      href: "mailto:contactus@a3spacetech.com",
      icon: <FaEnvelope />,
      variant: styles.iconEmail,
    },
    {
      key: "career-email",
      label: "Career Email",
      sub: "careers@a3spacetech.com",
      href: "mailto:careers@a3spacetech.com",
      icon: <FaEnvelope />,
      variant: styles.iconEmail,
    },
  ];

  const exploreCards = [
    {
      key: "careers",
      title: "Careers",
      text: "Join our team and build the future with us.",
      cta: "Explore Careers",
      href: "/careers",
      icon: <Briefcase size={26} />,
      variant: styles.exploreCareers,
    },
    {
      key: "blogs",
      title: "Blogs",
      text: "Insights, updates and stories from 3Space.",
      cta: "Read Blogs",
      href: "/blogs",
      icon: <FileText size={26} />,
      variant: styles.exploreBlogs,
    },
    {
      key: "brochure",
      title: "Company Brochure",
      text: "Download our brochure to know more about us.",
      cta: "Download Brochure",
      href: "/brochure/3Space-Brochure.pptx",
      icon: <FileText size={26} />,
      variant: styles.exploreBrochure,
      download: "3Space-Brochure.pptx",
    },
    {
      key: "events",
      title: "Events",
      text: "Check out our upcoming events and activities.",
      cta: "View Events",
      href: "/events",
      icon: <CalendarDays size={26} />,
      variant: styles.exploreEvents,
    },
  ];

  return (
    <>
      <ParallaxBackground />

      <Navbar />

      <main className={styles.contactPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.heroEyebrow}>Connect With</span>

              <h1>
                <span className={styles.heroAccent}>3</span>SPACE
              </h1>

              <p>
                Building the future of reusable space transportation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Follow Us + Get In Touch */}
        <section className={`section ${styles.formsSection}`}>
          <div className="container">
            <div className={styles.formsGrid}>
              {/* Follow Us */}
              <motion.div
                className={styles.followCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.cardTitle}>Follow Us</h2>

                <div className={styles.cardTitleUnderline} />

                <div className={styles.socialList}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialItem}
                    >
                      <span
                        className={`${styles.socialIcon} ${link.variant}`}
                      >
                        {link.icon}
                      </span>

                      <span className={styles.socialText}>
                        <span className={styles.socialLabel}>
                          {link.label}
                        </span>

                        <span className={styles.socialSub}>
                          {link.sub}
                        </span>
                      </span>

                      <FaChevronRight
                        className={styles.socialChevron}
                      />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Get In Touch */}
              <motion.div
                className={styles.touchCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.cardTitle}>Get In Touch</h2>

                <div className={styles.cardTitleUnderline} />

                <p className={styles.touchIntro}>
                  We&apos;d love to hear from you! Fill out the form and
                  we&apos;ll get back to you as soon as possible.
                </p>

                <form
                  className={styles.contactForm}
                  onSubmit={handleSubmit}
                >
                  {/* Name + Email */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <FaUser className={styles.inputIcon} />

                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <FaEnvelope className={styles.inputIcon} />

                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div className={styles.inputGroup}>
                    <FaBuilding className={styles.inputIcon} />

                    <input
                      type="text"
                      name="organization"
                      placeholder="Organization (Optional)"
                      value={form.organization}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Subject */}
                  <div className={styles.inputGroup}>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className={styles.selectInput}
                    >
                      <option value="">Subject options*</option>

                      <option value="general">
                        General Inquiry
                      </option>

                      <option value="partnership">
                        Partnership
                      </option>

                      <option value="sponsorship">
                        Sponsorship
                      </option>

                      <option value="investor-relations">
                        Investor Relations
                      </option>

                      <option value="collaboration">
                        Collaboration
                      </option>

                      <option value="careers">
                        Careers
                      </option>

                      <option value="internship">
                        Internship
                      </option>

                      <option value="media-pr">
                        Media &amp; PR
                      </option>

                      <option value="technical-query">
                        Technical Query
                      </option>

                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className={styles.inputGroup}>
                    <textarea
                      name="message"
                      placeholder="Message *"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {errorMessage && (
                    <div style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}>
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === "sending"}
                  >
                    <FaPaperPlane />

                    {status === "sending"
                      ? "Sending..."
                      : status === "sent"
                      ? "Message Sent!"
                      : "Send Message"}
                  </button>

                  {/* Privacy */}
                  <p className={styles.privacyNote}>
                    <FaLock />

                    Your information is safe with us. We respect your
                    privacy.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className={`section ${styles.exploreSection}`}>
          <div className="container">
            <motion.div
              className={styles.exploreHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.exploreTitle}>
                Explore More
              </h2>

              <div
                className={styles.cardTitleUnderline}
                style={{ margin: "0 auto" }}
              />
            </motion.div>

            <div className={styles.exploreGrid}>
              {exploreCards.map((card, idx) => (
                <motion.a
                  key={card.key}
                  href={card.href}
                  {...(card.download ? { download: card.download } : {})}
                  className={styles.exploreCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * idx,
                  }}
                  viewport={{ once: true }}
                >
                  <span
                    className={`${styles.exploreIcon} ${card.variant}`}
                  >
                    {card.icon}
                  </span>

                  <h3>{card.title}</h3>

                  <p>{card.text}</p>

                  <span className={styles.exploreLink}>
                    {card.cta}

                    <ArrowRight size={16} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Community */}
        <section className={styles.whatsappSection}>
          <div className="container">
            <motion.div
              className={styles.whatsappCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">
                Join Our WhatsApp Community
              </h2>

              <p className="section-subtitle">
                Stay updated with the latest news, events,
                opportunities, and updates from 3SPACE.
              </p>

              <div
                style={{
                  textAlign: "center",
                }}
              >
                <a
                  href="https://chat.whatsapp.com/KPNqWjNCZtv8p7pcmt2GFm?s=sh&p=a&ilr=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Join WhatsApp

                  <ArrowRight size={17} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className={styles.ctaBannerSection}>
          <div className="container">
            <motion.div
              className={styles.ctaBanner}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className={styles.ctaBannerLeft}>
                <span className={styles.ctaIcon}>
                  <Rocket size={22} />
                </span>

                <div>
                  <h3>
                    Let&apos;s build the future of space,
                    together.
                  </h3>

                  <p>
                    We are always open to new ideas, partnerships
                    and opportunities.
                  </p>
                </div>
              </div>

              <a
                href="/about"
                className={styles.ctaBannerBtn}
              >
                Learn More About 3Space

                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toastOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setToast(null)}
          >
            <motion.div
              className={`${styles.toastCard} ${
                toast.type === "success"
                  ? styles.toastSuccess
                  : styles.toastError
              }`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.toastIconWrapper}>
                {toast.type === "success" ? (
                  <FaCircleCheck size={32} />
                ) : (
                  <FaCircleExclamation size={32} />
                )}
              </span>
              <h3 className={styles.toastTitle}>
                {toast.type === "success"
                  ? "Message Sent!"
                  : "Something went wrong"}
              </h3>
              <p className={styles.toastMessage}>{toast.message}</p>
              <button
                className={styles.toastBtn}
                onClick={() => setToast(null)}
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}