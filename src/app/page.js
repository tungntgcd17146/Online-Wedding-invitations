'use client';
import { useState, Suspense } from 'react';
import GuestPopup from '@/components/GuestPopup';
import OpeningCard from '@/components/OpeningCard';
import AudioPlayer from '@/components/AudioPlayer';
import Countdown from '@/components/Countdown';
import EnvelopePhoto from '@/components/EnvelopePhoto';
import FilmFrame from '@/components/FilmFrame';
import Gallery from '@/components/Gallery';
import MiniCalendar from '@/components/MiniCalendar';
import GiftModal from '@/components/GiftModal';
import Guestbook from '@/components/Guestbook';
import PersonalizedGreeting from '@/components/PersonalizedGreeting';
import { MapPin, Gift, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const [musicPlayTrigger, setMusicPlayTrigger] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const handlePopupClose = () => {
    setIsPopupClosed(true);
    setMusicPlayTrigger(true);
  };

  return (
    <main className="min-h-screen bg-[#333]">
      {/* Bước 1: Hiệu ứng mở cánh phong bì tự động lúc mới tải trang */}
      <OpeningCard onComplete={() => setIsEnvelopeOpened(true)} isReady={true} />

      {/* Bước 2: Popup thư mời cá nhân hóa chỉ hiện sau khi phong bì mở ra */}
      {isEnvelopeOpened && !isPopupClosed && (
        <Suspense fallback={null}>
          <GuestPopup onClose={handlePopupClose} />
        </Suspense>
      )}

      {/* Trình phát nhạc nền */}
      <AudioPlayer autoPlay={musicPlayTrigger} />

      {/* Bao bọc giao diện di động căn giữa */}
      <div className="card-wrapper shadow-2xl relative">
        
        {/* SECTION 1: BANNER BÌA CHÍNH */}
        <section 
          id="card-banner" 
          className="relative w-full h-[668px] bg-cover bg-center flex flex-col justify-between text-[#fff8ed] select-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.6) 100%), url(/wedding_photos/BUM_8335.webp)`
          }}
        >
          <div className="text-center pt-14">
            <motion.h2 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-7xl md:text-5xl font-cursive text-white drop-shadow-md"
            >
              We get married!
            </motion.h2>
          </div>

          {/* Tên cô dâu chú rể chữ in hoa, hiển thị trực tiếp lên ảnh nền với gradient tối */}
          <div className="text-center pb-12 space-y-1 w-full">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="wedding-name font-serif-elegant text-white text-[21px] font-medium tracking-[0.15em] uppercase drop-shadow-md"
            >
              Thanh Tùng & Ánh Nguyệt
            </motion.div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="wedding-date font-serif-elegant text-white text-sm tracking-[0.2em] font-medium drop-shadow-md"
            >
              07.11.2025
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: BỘ ĐẾM NGƯỢC & PHONG BÌ THƯ */}
        <section id="card-countdown" className="card-section border-b border-[#928362]/10 pt-28 pb-44">
          <div className="text-center space-y-6">
            {/* Monogram T N lồng nhau kiểu mẫu 005 */}
            <h2 className="relative flex items-center justify-center h-20 mb-6 select-none">
              <span className="groom font-serif-elegant font-bold text-[#928362] text-5xl">T</span>
              <span className="bride font-cursive text-[#928362]/90 text-6xl absolute translate-x-5.5 translate-y-1.5">N</span>
            </h2>
            <h3 className="text-[20px] font-bold text-[#928362] uppercase tracking-[0.25em] leading-relaxed mt-4 opacity-90">
              We will become<br />Husband and wife in
            </h3>
          </div>
          
          {/* Đếm ngược dạng chữ số thanh mảnh */}
          <Countdown targetDate="2026-08-02T11:00:00" />

          {/* Phong bì ảnh cưới trồi lên */}
          <EnvelopePhoto />
        </section>

        <section 
          id="card-save-the-date"
          className="relative w-full h-[500px] bg-cover bg-center text-white select-none overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.25)), url(/wedding_photos/BUM_8507.webp)`
          }}
        >
          <motion.div 
            initial={{ y: 45, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-8 bottom-10 text-left space-y-1.5"
          >
            <h2 className="text-8xl font-serif-elegant font-bold text-white uppercase tracking-wider leading-none drop-shadow-md">
              SAVE
            </h2>
            <div className="flex items-center space-x-3.5 drop-shadow-md">
              <span className="font-cursive text-white text-6xl lowercase leading-none -mt-2.5">the</span>
              <span className="font-serif-elegant font-bold text-white text-5xl uppercase tracking-widest leading-none">DATE</span>
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: THÔNG TIN TIỆC CƯỚI & GIA ĐÌNH */}
        <section id="card-info" className="card-section border-b border-[#928362]/10 space-y-8 select-none">
          {/* Thông tin Cha Mẹ hai bên */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4 text-center text-sm text-zinc-700 font-semibold border-b border-[#928362]/10 pb-8"
          >
            <div className="space-y-1.5 border-r border-[#928362]/10 pr-2">
              <span className="text-[#796745] font-serif-elegant font-bold text-lg block uppercase tracking-widest mb-1.5">Nhà Trai</span>
              <p>Ông: <span className="font-bold text-zinc-800">Nguyễn Văn Toàn</span></p>
              <p>Bà: <span className="font-bold text-zinc-800">Nguyễn Thị Bích Liên</span></p>
            </div>
            <div className="space-y-1.5 pl-2">
              <span className="text-[#796745] font-serif-elegant font-bold text-lg block uppercase tracking-widest mb-1.5">Nhà Gái</span>
              <p>Ông: <span className="font-bold text-zinc-800">Phạm Đình Triêu</span></p>
              <p>Bà: <span className="font-bold text-zinc-800">Dương Phương Nga</span></p>
            </div>
          </motion.div>

          {/* Lời chào trân trọng */}
          <div className="text-center space-y-4">
            <motion.h3 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-zinc-700 text-md font-bold uppercase tracking-[0.15em] leading-relaxed max-w-[320px] mx-auto"
            >
              Trân trọng kính mời đến dự<br />tiệc mừng lễ hạnh phúc của chúng tôi
            </motion.h3>
            
            {/* Tên Cô dâu Chú rể có hiệu ứng trượt từ 2 bên */}
            <div className="flex flex-col items-center justify-center space-y-2.5 my-8 font-serif-elegant text-[#796745] overflow-hidden w-full select-none">
              <motion.span 
                initial={{ x: -80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ type: "spring", stiffness: 45, damping: 12 }}
                className="text-4xl tracking-[0.18em] font-medium uppercase text-center block"
              >
                THANH TÙNG
              </motion.span>
              <motion.span 
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-7xl font-cursive -mt-1.5 block text-[#928362]"
              >
                and
              </motion.span>
              <motion.span 
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ type: "spring", stiffness: 45, damping: 12 }}
                className="text-4xl tracking-[0.18em] font-medium uppercase text-center block"
              >
                ÁNH NGUYỆT
              </motion.span>
            </div>

            {/* Cá nhân hóa tên khách */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Suspense fallback={<div className="text-xs text-zinc-400">Đang tải lời mời...</div>}>
                <PersonalizedGreeting />
              </Suspense>
            </motion.div>
          </div>

          {/* Chi tiết Ngày giờ & Địa điểm tổ chức (Dạng văn bản trực tiếp trên giấy như bản gốc) */}
          <div className="space-y-6 text-center pt-4 text-[#796745]">
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] block">Được tổ chức vào lúc</span>
              
              {/* Dòng phân cách ngang thanh lịch */}
              <div className="border-y border-[#928362]/20 py-4 max-w-[240px] mx-auto space-y-1">
                <div className="text-2xl font-serif-elegant font-bold uppercase tracking-widest">
                  11:00 - Thứ Sáu
                </div>
                <div className="text-3xl font-serif-elegant font-bold tracking-widest">
                  07.11.2025
                </div>
              </div>

              <p className="text-sm font-medium italic">
                (Tức ngày 18 tháng 9 năm Ất Tỵ)
              </p>
            </motion.div>

            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2 pt-4"
            >
              <span className="text-xs font-bold uppercase tracking-widest block">Địa Điểm:</span>
              <h4 className="text-xl font-serif-elegant font-bold uppercase tracking-wide">
                Hội Trường Peony- Tầng 3
              </h4>
              <p className="text-[15px] leading-relaxed font-semibold max-w-[320px] mx-auto opacity-90">
                Promes Center: 122 Xuân Thuỷ, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
              </p>
            </motion.div>

            {/* Nút chỉ đường có hiệu ứng nhấp nhô */}
            <motion.div 
              initial={{ y: 35, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-4 flex justify-center"
            >
              <style>{`
                @keyframes bounceSoft {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-6px); }
                }
                .bounce-soft-btn {
                  animation: bounceSoft 1.4s ease-in-out infinite;
                }
              `}</style>
              <a 
                href="https://maps.app.goo.gl/nn2Gjf9W5Y3DDk6f7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bounce-soft-btn flex items-center justify-center text-[#796745] hover:text-[#5a4a30] text-[14px] font-bold transition duration-300 tracking-[0.25em] space-x-2 w-fit mx-auto"
              >
                <MapPin className="w-[18px] h-[18px]" />
                <span className="border-b border-[#796745]/30 pb-0.5">CHỈ ĐƯỜNG</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: CÔ DÂU & CHÚ RỂ (BỐ CỤC POLAROID LỆCH CHÉO BẢN GỐC) */}
        <section id="card-love-story" className="card-section border-b border-[#928362]/10 space-y-10">
          <div className="text-center font-serif-elegant">
            <h3 className="text-3xl font-extrabold text-[#5b432b] tracking-[0.15em] flex items-center justify-center space-x-2 select-none">
              <span>THE STORY</span>
              <span className="font-cursive text-5xl font-normal -mt-2.5 opacity-90 lowercase text-[#796745]">of</span>
              <span>LOVE</span>
            </h3>
          </div>

          <div className="relative h-[480px] w-full max-w-[360px] mx-auto select-none">
            {/* Polaroid 1: Chú rể (Nằm bên trái, nghiêng trái) */}
            <div className="absolute left-2 top-2 w-[55%] z-10 origin-bottom-left transition-transform duration-300 hover:rotate-0">
              <div className="bg-white p-2.5 pb-7 shadow-lg border border-zinc-200 -rotate-[6deg] rounded-xs">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                  <img 
                    src="/wedding_photos/BUM_8582.webp" 
                    alt="Groom Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Tên chú rể đặt bên phải ảnh */}
              <div className="absolute left-[105%] top-[36%] w-[130px] space-y-1 text-left font-serif-elegant whitespace-nowrap z-20">
                <span className="font-cursive text-[#5b432b] text-4xl font-bold block leading-none">Chú rể</span>
                <h4 className="text-[18px] font-black text-[#5b432b] tracking-wider uppercase">THANH TÙNG</h4>
              </div>
            </div>

            {/* Polaroid 2: Cô dâu (Nằm bên phải, nghiêng phải, hơi đè lên ảnh chú rể) */}
            <div className="absolute right-2 bottom-2 w-[55%] z-20 origin-bottom-right transition-transform duration-300 hover:rotate-0">
              {/* Tên cô dâu đặt bên trái ảnh */}
              <div className="absolute right-[105%] top-[36%] w-[130px] space-y-1 text-right font-serif-elegant whitespace-nowrap z-20">
                <span className="font-cursive text-[#5b432b] text-4xl font-bold block leading-none">Cô dâu</span>
                <h4 className="text-[18px] font-black text-[#5b432b] tracking-wider uppercase">ÁNH NGUYỆT</h4>
              </div>
              <div className="bg-white p-2.5 pb-7 shadow-lg border border-zinc-200 rotate-[6deg] rounded-xs">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                  <img 
                    src="/wedding_photos/BUM_8369.webp" 
                    alt="Bride Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: ALBUM ẢNH CƯỚI (FILM & GALLERY BẢN GỐC) */}
        <section id="card-gallery" className="card-section border-b border-[#928362]/10 select-none">
          {/* Dải phim cuộn ngang ở đầu phân đoạn */}
          <FilmFrame />

          {/* Sắp xếp tiêu đề lồng ghép Polaroid lệch chéo bên dưới */}
          <div className="relative h-[280px] w-full max-w-[360px] mx-auto mt-10 mb-8">
            
            {/* Tiêu đề bên trái */}
            <div className="absolute left-2 top-[35%] font-serif-elegant text-left space-y-0.5 z-10">
              <span className="font-cursive text-3xl text-[#928362] block italic leading-none">The</span>
              <h3 className="text-2xl font-bold text-[#928362] tracking-wider uppercase">ALBUM</h3>
            </div>

            {/* Polaroid 1 (Bên phải, nghiêng trái, ảnh lớn) */}
            <div className="absolute right-2 top-0 w-[45%] z-20">
              <div className="bg-white p-2 pb-5 shadow-md border border-zinc-200/50 -rotate-[6deg] rounded-xs">
                <div className="aspect-[3/4] bg-zinc-100 overflow-hidden">
                  <img 
                    src="/wedding_photos/BUM_8357.webp" 
                    alt="Album Cover 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Polaroid 2 (Căn giữa dưới, nghiêng phải, ảnh nhỏ hơn) */}
            <div className="absolute left-[30%] bottom-0 w-[40%] z-30">
              <div className="bg-white p-1.5 pb-4 shadow-md border border-zinc-200/50 rotate-[4deg] rounded-xs">
                <div className="aspect-[3/4] bg-zinc-100 overflow-hidden">
                  <img 
                    src="/wedding_photos/BUM_8306.webp" 
                    alt="Album Cover 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Tiêu đề bên phải dưới */}
            <div className="absolute right-4 bottom-[20%] font-serif-elegant text-right space-y-0.5 z-10">
              <span className="text-[10px] font-bold text-[#928362] tracking-[0.25em] block leading-none">OF</span>
              <h3 className="text-xl font-bold text-[#928362] tracking-widest uppercase">LOVE</h3>
            </div>
          </div>

          {/* Lưới ảnh trưng bày masonry có click zoom */}
          <Gallery />
        </section>

        {/* SECTION 7: LỊCH THÁNG CƯỚI (2 ẢNH ĐỨNG TRÊN LỊCH) */}
        <section id="card-calendar" className="card-section border-b border-[#928362]/10 space-y-8">
          
          {/* Hai ảnh đứng nằm song song trên đầu Lịch */}
          <div className="grid grid-cols-2 gap-4 max-w-[340px] mx-auto select-none pointer-events-none">
            <div className="bg-white p-1.5 pb-4 shadow-xs border border-zinc-200/40 rounded-xs">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                <img 
                  src="/wedding_photos/BUM_8260.webp" 
                  alt="Calendar Side 1" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-white p-1.5 pb-4 shadow-xs border border-zinc-200/40 rounded-xs">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                <img 
                  src="/wedding_photos/BUM_8782.webp" 
                  alt="Calendar Side 2" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Lịch âm dương tháng cưới */}
          <MiniCalendar />
        </section>

        {/* SECTION 8: DÒNG THỜI GIAN NGANG (HORIZONTAL TIMELINE) */}
        <section 
          id="card-timeline" 
          className="relative w-full py-16 px-4 bg-cover bg-center text-[#fff8ed] select-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(/wedding_photos/BUM_8435.webp)`
          }}
        >
          <div className="w-full flex flex-col items-center">
            {/* Tiêu đề Timeline */}
            <h4 className="text-3xl font-serif-elegant font-bold text-white uppercase tracking-[0.25em] mb-10">
              TIMELINE
            </h4>

            {/* Dòng thời gian dạng ngang chuẩn mẫu 005 */}
            <div className="w-full relative flex items-start justify-between px-1">
              
              {/* Đường chỉ trắng nằm ngang nối các chấm tròn */}
              <div className="absolute left-[12%] right-[12%] top-[58px] h-[1.5px] bg-white/50 z-0" />
              
              {/* Mốc 1 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                {/* Icon nổi phía trên đường line */}
                <div className="h-12 flex items-center justify-center mb-1">
                  <img src="https://cocohappii.com/templates/005/images/icon-tl1.png" className="w-9 h-9 object-contain" alt="camera" />
                </div>
                {/* Chấm tròn trắng nằm ngay trên đường line */}
                <div className="w-3 h-3 rounded-full bg-white border border-white/60 shadow-xs z-20 my-1" />
                {/* Giờ & Nội dung phía dưới */}
                <div className="text-white font-serif-elegant font-bold text-sm tracking-wider mt-1.5">11:00</div>
                <div className="text-[9px] font-semibold text-white/95 leading-relaxed uppercase mt-1 tracking-wider px-0.5">
                  ĐÓN KHÁCH, CHỤP<br />ẢNH CÙNG CDCR
                </div>
              </div>
              
              {/* Mốc 2 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                <div className="h-12 flex items-center justify-center mb-1">
                  <img src="https://cocohappii.com/templates/005/images/icon-tl2.png" className="w-9 h-9 object-contain" alt="rings" />
                </div>
                <div className="w-3 h-3 rounded-full bg-white border border-white/60 shadow-xs z-20 my-1" />
                <div className="text-white font-serif-elegant font-bold text-sm tracking-wider mt-1.5">11:30</div>
                <div className="text-[9px] font-semibold text-white/95 leading-relaxed uppercase mt-1 tracking-wider px-0.5">
                  NGHI LỄ CƯỚI
                </div>
              </div>
              
              {/* Mốc 3 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                <div className="h-12 flex items-center justify-center mb-1">
                  <img src="https://cocohappii.com/templates/005/images/icon-tl3.png" className="w-9 h-9 object-contain" alt="dining" />
                </div>
                <div className="w-3 h-3 rounded-full bg-white border border-white/60 shadow-xs z-20 my-1" />
                <div className="text-white font-serif-elegant font-bold text-sm tracking-wider mt-1.5">11:40</div>
                <div className="text-[9px] font-semibold text-white/95 leading-relaxed uppercase mt-1 tracking-wider px-0.5">
                  KHAI TIỆC
                </div>
              </div>
              
              {/* Mốc 4 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                <div className="h-12 flex items-center justify-center mb-1">
                  <img src="https://cocohappii.com/templates/005/images/icon-tl1.png" className="w-9 h-9 object-contain" alt="camera" />
                </div>
                <div className="w-3 h-3 rounded-full bg-white border border-white/60 shadow-xs z-20 my-1" />
                <div className="text-white font-serif-elegant font-bold text-sm tracking-wider mt-1.5">12:30</div>
                <div className="text-[9px] font-semibold text-white/95 leading-relaxed uppercase mt-1 tracking-wider px-0.5">
                  GIAO LƯU VỚI<br />CÔ DÂU & CHÚ RỂ
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 9: HỘP MỪNG CƯỚI */}
        <section id="card-gift" className="card-section border-b border-[#928362]/10 text-center bg-[#fff8ed]">
          <div className="space-y-2.5 mb-8 text-[#928362]">
            <h3 className="font-cursive text-6xl">Hộp mừng cưới</h3>
            <p className="text-[17px] text-[#928362] font-semibold max-w-[320px] mx-auto leading-relaxed">
              Cảm ơn tình cảm của mọi người đã dành cho chúng mình!
            </p>
          </div>

          {/* Hộp quà chuyển khoản */}
          <div className="flex justify-center mb-4">
            <button 
              onClick={() => setIsGiftOpen(true)}
              className="w-40 aspect-square p-2 bg-transparent border border-[#928362]/20 rounded-md flex items-center justify-center shadow-sm hover:scale-105 transition duration-300 cursor-pointer select-none"
            >
              <img 
                src="https://cocohappii.com/templates/001/images/present.png"
                alt="Gift Box"
                className="w-full h-full object-contain gift-pulse"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{ display: 'none' }} className="text-center space-y-1">
                <Gift className="w-12 h-12 text-[#928362] mx-auto animate-pulse-slow" />
                <span className="text-xs font-bold text-[#928362]">MỞ HỘP QUÀ</span>
              </div>
            </button>
          </div>

          <GiftModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />
        </section>

        {/* SECTION 10: SỔ LƯU BÚT */}
        <section id="card-comments" className="card-section text-center">
          <div className="space-y-2.5 mb-8 text-[#928362]">
            <h3 className="font-cursive text-6xl">Sổ lưu bút</h3>
            <p className="text-[17px] text-[#928362] font-semibold max-w-[320px] mx-auto leading-relaxed">
              Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất đến đám cưới của chúng tôi!
            </p>
          </div>

          <Guestbook />

          {/* Cảm ơn cuối trang */}
          <div className="mt-12 space-y-4 border-t border-[#928362]/10 pt-10 pb-6 text-[#928362]">
            <h4 className="text-6xl font-cursive">Thank You!</h4>
            <p className="text-[17px] leading-relaxed font-semibold max-w-[320px] mx-auto">
              Sự hiện diện của bạn là món quà ý nghĩa nhất đối với chúng mình. Chân thành cảm ơn các bạn đã cùng chúng mình chia sẻ những khoảnh khắc hạnh phúc nhất!
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
