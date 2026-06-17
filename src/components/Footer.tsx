'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavLogo from '../../public/NavLogo.png';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import {
  FaTwitter, FaLinkedinIn, FaGithub,
  FaFacebookF, FaInstagram,
} from 'react-icons/fa';
import {
  FaPenFancy, FaSearch, FaChartLine, FaRobot,
} from 'react-icons/fa';
import { Mail, ArrowRight, Newspaper } from 'lucide-react';

/* ── Data ── */
const FEATURES = [
  { name: 'AI Writing Assistant', href: '/products/ai-content-writer', icon: FaPenFancy },
  { name: 'Plagiarism Checker',   href: '/products/ai-summarizer',     icon: FaSearch   },
  { name: 'Trending News',        href: '/news',                       icon: FaChartLine, badge: 'HOT' },
  { name: 'AI Editor',            href: '/ai-editor',                  icon: FaRobot    },
];

const COMPANY = [
  { name: 'About Us',       href: '/about'   },
  { name: 'Contact',        href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Blog',           href: '/blog'    },
];

const PRODUCT_LINKS = [
  { name: 'AI Content Writer',  href: '/products/ai-content-writer' },
  { name: 'AI News Digest',     href: '/news'                       },
  { name: 'AI Summarizer',      href: '/products/ai-summarizer'     },
  { name: 'SEO Optimizer',      href: '/products/ai-seo-optimizer'  },
  { name: 'API Integrations',   href: '/products/api-integrations'  },
];

const SOCIALS = [
  { icon: FaTwitter,   href: 'https://twitter.com/',   label: 'Twitter'   },
  { icon: FaLinkedinIn,href: 'https://linkedin.com/',  label: 'LinkedIn'  },
  { icon: FaGithub,    href: 'https://github.com/',    label: 'GitHub'    },
  { icon: FaFacebookF, href: 'https://facebook.com/',  label: 'Facebook'  },
  { icon: FaInstagram, href: 'https://instagram.com/', label: 'Instagram' },
];

const BOTTOM_LINKS = ['privacy', 'terms', 'cookies', 'sitemap'];

/* ── Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

/* ── Column heading ── */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs font-bold uppercase tracking-widest mb-5"
      style={{ color: 'rgba(147,197,253,0.7)' }}
    >
      {children}
    </h3>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020c1f 0%, #0F2854 45%, #0a1628 100%)",
        borderTop: '1px solid rgba(28,77,141,0.3)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(28,77,141,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Mesh grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(28,77,141,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,77,141,1) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

        {/* ── Top CTA banner ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl px-8 py-7 mb-20"
          style={{
            background: 'linear-gradient(135deg, rgba(28,77,141,0.4) 0%, rgba(15,40,84,0.6) 100%)',
            border: '1px solid rgba(28,77,141,0.4)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div>
            <p className="text-white font-bold text-xl mb-1">Start writing smarter today</p>
            <p className="text-white/40 text-sm">Join 50,000+ creators — free forever plan available.</p>
          </div>
          <Link href="/auth/sign-up">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(28,77,141,0.7)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white shrink-0 group"
              style={{
                background: 'linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)',
                border: '1px solid rgba(28,77,141,0.6)',
                boxShadow: '0 4px 20px rgba(28,77,141,0.4)',
              }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* Brand col */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block mb-5">
              <Image src={NavLogo} alt="Insight AI" width={120} height={48} />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-6">
              Empowering creators with AI-driven content writing, plagiarism checking,
              and smart editing tools. Your trusted partner for quality content.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white transition-all"
                  style={{
                    background: 'rgba(15,40,84,0.6)',
                    border: '1px solid rgba(28,77,141,0.35)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Features col */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <ColHeading>Features</ColHeading>
            <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {FEATURES.map((f) => (
                <motion.li key={f.name} variants={listItem}>
                  <Link
                    href={f.href}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <f.icon className="w-3.5 h-3.5 text-blue-400/60 group-hover:text-blue-400 transition-colors shrink-0" />
                    {f.name}
                    {f.badge && (
                      <span
                        className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded"
                        style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
                      >
                        {f.badge}
                      </span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Products col */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <ColHeading>Products</ColHeading>
            <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {PRODUCT_LINKS.map((p) => (
                <motion.li key={p.name} variants={listItem}>
                  <Link
                    href={p.href}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 group-hover:bg-blue-400 transition-colors"
                      style={{ background: 'rgba(28,77,141,0.8)' }}
                    />
                    {p.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Company col */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <ColHeading>Company</ColHeading>
            <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {COMPANY.map((c) => (
                <motion.li key={c.name} variants={listItem}>
                  <Link
                    href={c.href}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 group-hover:bg-blue-400 transition-colors"
                      style={{ background: 'rgba(28,77,141,0.8)' }}
                    />
                    {c.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Newsletter col */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <ColHeading>Newsletter</ColHeading>
            <p className="text-white/40 text-sm mb-4 leading-relaxed">
              Weekly AI tips, updates, and industry news.
            </p>

            {subscribed ? (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-green-300"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{ background: 'rgba(10,18,40,0.8)', border: '1px solid rgba(28,77,141,0.35)' }}
                >
                  <Mail className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none min-w-0"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white group"
                  style={{
                    background: 'linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)',
                    border: '1px solid rgba(28,77,141,0.5)',
                  }}
                >
                  <Newspaper className="w-3.5 h-3.5" />
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
                <p className="text-white/25 text-xs text-center">No spam, ever.</p>
              </form>
            )}
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(28,77,141,0.25)' }}
        >
          <p className="text-white/30 text-sm text-center sm:text-left">
            © {year} Insight-AI. All rights reserved. Made by{' '}
            <span style={{ color: 'rgba(96,165,250,0.8)' }} className="font-semibold">
              Bug SlayerS
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {BOTTOM_LINKS.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="text-xs text-white/30 hover:text-white/70 transition-colors capitalize"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
