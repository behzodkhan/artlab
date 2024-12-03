import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import "@fontsource/playfair-display/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

function AboutPage() {
  useEffect(() => {
    document.body.style.backgroundColor = '#f8f8f8';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-gray-800 font-sans">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-8 text-center font-serif text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Dovuchcha ArtLab
        </motion.h1>

        <motion.section {...fadeIn} className="mb-16">
          <p className="text-xl sm:text-2xl text-center mb-8 font-serif text-gray-700">
            "Celebrating and sharing the beauty of art with the world, one masterpiece at a time."
          </p>
          <div className="h-1 w-32 bg-lime-500 mx-auto mb-8"></div>
          <p className="text-lg leading-relaxed mb-4">
          Dovuchcha ArtLab is a platform dedicated to connecting artists, enthusiasts, and the global community. Building on the legacy of Dovuchcha, we aim to create a space where creativity thrives and inspiration is shared freely. Our goal is to bridge gaps in the art world, fostering an environment where people can explore and appreciate diverse forms of artistic expression.
          </p>
        </motion.section>

        <motion.section {...fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold mb-4 font-serif text-lime-600">Our Legacy</h2>
          <p className="text-lg leading-relaxed mb-4">
          Dovuchcha ArtLab is dedicated to curating and promoting art, connecting artists and enthusiasts from around the world. Our journey is driven by passion, discovery, and a pursuit of beauty in all its forms. ArtLab is the next step in this journey—a digital space where we continue to share and celebrate artistic expression.
          </p>
        </motion.section>

        <motion.section {...fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold mb-4 font-serif text-lime-600">Visionary Leadership</h2>
          <h3 className="text-2xl font-bold mb-2">Behzod Musurmonqulov</h3>
          <p className="text-lg leading-relaxed mb-4">
            At the helm of Dovuchcha ArtLab is our visionary CEO, Behzod Musurmonqulov. With an
            innate understanding of art's power to transform and connect, Behzod has steered
            Dovuchcha towards innovative horizons. His leadership has been instrumental in creating
            ArtLab, a platform that not only showcases art but also nurtures a global community of
            creators and admirers.
          </p>
        </motion.section>

        <motion.section {...fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold mb-4 font-serif text-lime-600">Our Team</h2>
          <p className="text-lg leading-relaxed mb-4">
            Behind every masterpiece at ArtLab is a team of dedicated individuals who share a common
            passion for art. From our curators and developers to our community managers and support
            staff, each member plays a crucial role in bringing our vision to life.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            We extend our heartfelt gratitude to all the artists, contributors, and partners who
            have joined us on this exciting journey. Your creativity, support, and trust in our
            platform continue to inspire us every day.
          </p>
        </motion.section>

        <motion.section {...fadeIn} className="text-center bg-green-50 p-8 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold mb-4 font-serif text-lime-600">Join Our Artistic Journey</h2>
          <p className="text-lg mb-6">
            Dovuchcha ArtLab is more than a platform; it's a movement. We invite you to be part of
            our story, to explore the depths of human creativity, and to contribute your unique
            perspective to our growing tapestry of art.
          </p>
          <Link to="/contribute">
            <Button className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Contribute to ArtLab
            </Button>
          </Link>
        </motion.section>
      </main>
    </div>
  );
}

export default AboutPage;