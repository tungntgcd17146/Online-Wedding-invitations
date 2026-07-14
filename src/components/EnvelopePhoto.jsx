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
      
      {/* Bức ảnh 1: Trượt lên và nghiêng trái (Chú rể nhìn cô dâu) */}
      <motion.div
        initial={{ y: 110, rotate: -3, opacity: 0 }}
        whileInView={{ y: -30, rotate: -8, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ type: 'spring', stiffness: 55, damping: 14, delay: 0.2 }}
        className="pt1"
        style={{
          backgroundImage: 'url(https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/d44e2427-4695-44ba-a4d8-600cdbaa1bc2.jpg)',
        }}
      />

      {/* Bức ảnh 2: Trượt lên và nghiêng phải (Cô dâu cười, chú rể bên phải) */}
      <motion.div
        initial={{ y: 110, rotate: 3, opacity: 0 }}
        whileInView={{ y: -38, rotate: 6, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ type: 'spring', stiffness: 55, damping: 14, delay: 0.4 }}
        className="pt2"
        style={{
          backgroundImage: 'url(https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/dea27d6c-12f4-4bf1-ae2e-2310817cafd1.jpg)',
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
