'use client';

import { FaFacebook, FaLink, FaPrint, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ShareButtons = () => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = typeof document !== 'undefined' ? document.title : '';

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    const text = `${title} - ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleYouTube = () => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Could not copy the link. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-circle btn-sm btn-ghost hover:text-blue-600"
        aria-label="Share on Facebook"
        onClick={handleFacebookShare}
      >
        <FaFacebook size={18} />
      </button>
      <button
        className="btn btn-circle btn-sm btn-ghost hover:text-emerald-600"
        aria-label="Share on WhatsApp"
        onClick={handleWhatsAppShare}
      >
        <FaWhatsapp size={18} />
      </button>
      <button
        className="btn btn-circle btn-sm btn-ghost hover:text-red-600"
        aria-label="Open YouTube"
        onClick={handleYouTube}
      >
        <FaYoutube size={18} />
      </button>
      <button
        className="btn btn-circle btn-sm btn-ghost hover:text-sky-500"
        aria-label="Copy Link"
        onClick={handleCopyLink}
      >
        <FaLink size={18} />
      </button>
      <button
        className="btn btn-circle btn-sm btn-ghost hover:text-slate-900"
        aria-label="Print article"
        onClick={handlePrint}
      >
        <FaPrint size={18} />
      </button>
    </div>
  );
};

export default ShareButtons;