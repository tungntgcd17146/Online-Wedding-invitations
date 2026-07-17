'use client';
import { motion } from 'framer-motion';

export default function EnvelopePhoto() {
  return (
    <div id="envelop-photo" className="select-none overflow-visible">
      {/* Lưng phong bì (Phía sau ảnh) */}
      <img 
        src="https://cocohappii.com/templates/005/images/envolop_back.png" 
        alt="Envelope Back"
        className="back"
      />
      
      {/* Bức ảnh 1: Trượt lên và nghiêng phải (Bức ảnh bên phải) */}
      <motion.div
        initial={{ y: '55%', rotate: 10, opacity: 0 }}
        whileInView={{ y: 0, rotate: 10, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ type: 'spring', stiffness: 55, damping: 14, delay: 0.2 }}
        className="pt1"
        style={{
          backgroundImage: 'url(/wedding_photos/BUM_8162.webp)',
        }}
      />

      {/* Bức ảnh 2: Trượt lên và nghiêng trái (Bức ảnh bên trái) */}
      <motion.div
        initial={{ y: '55%', rotate: -2, opacity: 0 }}
        whileInView={{ y: 0, rotate: -2, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ type: 'spring', stiffness: 55, damping: 14, delay: 0.4 }}
        className="pt2"
        style={{
          backgroundImage: 'url(/wedding_photos/BUM_8205.webp)',
        }}
      />

      {/* Thân trước phong bì (Che khuất phần dưới ảnh, chứa dấu sáp vàng) */}
      <img 
        src="https://cocohappii.com/templates/005/images/envolop_front.png" 
        alt="Envelope Front"
        className="front"
      />
    </div>
  );
}
