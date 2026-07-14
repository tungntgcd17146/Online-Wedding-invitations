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
          className="relative w-full h-[600px] bg-cover bg-center flex flex-col justify-between text-[#fff8ed] select-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.6) 100%), url(https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/ba6b6aa0-24b2-4787-bca5-d82b75ddd31b.jpg)`
          }}
        >
          <div className="text-center pt-14">
            <motion.h2 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl font-cursive text-white drop-shadow-md"
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
              Minh Phương & Đức Trung
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
        <section id="card-countdown" className="card-section border-b border-[#928362]/10 pt-16 pb-12">
          <div className="text-center space-y-4">
            {/* Monogram T P lồng nhau kiểu mẫu 005 */}
            <h2 className="relative flex items-center justify-center h-16 mb-4 select-none">
              <span className="groom font-serif-elegant font-bold text-[#928362] text-5xl">T</span>
              <span className="bride font-cursive text-[#928362]/90 text-6xl absolute translate-x-5.5 translate-y-1.5">P</span>
            </h2>
            <h3 className="text-xs font-bold text-[#928362] uppercase tracking-[0.25em] leading-relaxed">
              We will become<br />Husband and wife in
            </h3>
          </div>
          
          {/* Đếm ngược dạng chữ số thanh mảnh */}
          <Countdown targetDate="2025-11-07T11:00:00" />

          {/* Phong bì ảnh cưới trồi lên */}
          <EnvelopePhoto />
        </section>

        {/* SECTION 3: SAVE THE DATE COVER */}
        <section 
          id="card-save-the-date"
          className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white select-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/a4fe0cec-4f4e-40e9-b4dd-a86c5d898fcd.jpg)`
          }}
        >
          <div className="text-center space-y-1">
            <h2 className="text-7xl font-cursive drop-shadow-lg text-white">Save</h2>
            <div className="text-xl font-serif-elegant italic tracking-widest uppercase drop-shadow-md text-[#fff8ed] -mt-2">the</div>
            <h2 className="text-7xl font-serif-elegant font-bold drop-shadow-lg uppercase tracking-wide">Date</h2>
          </div>
        </section>

        {/* SECTION 4: THÔNG TIN TIỆC CƯỚI & GIA ĐÌNH */}
        <section id="card-info" className="card-section border-b border-[#928362]/10 space-y-8 select-none">
          {/* Thông tin Cha Mẹ hai bên */}
          <div className="grid grid-cols-2 gap-4 text-center text-[11px] text-zinc-600 font-semibold border-b border-[#928362]/10 pb-8">
            <div className="space-y-1 border-r border-[#928362]/10 pr-2">
              <span className="text-[#928362] font-serif-elegant font-bold text-xs block uppercase tracking-widest mb-1">Nhà Gái</span>
              <p><span className="text-[#928362]/70 font-normal">Bà:</span> Lê Thị Kim Liên</p>
            </div>
            <div className="space-y-1 pl-2">
              <span className="text-[#928362] font-serif-elegant font-bold text-xs block uppercase tracking-widest mb-1">Nhà Trai</span>
              <p><span className="text-[#928362]/70 font-normal">Ông:</span> Trần Đức Thịnh</p>
              <p><span className="text-[#928362]/70 font-normal">Bà:</span> Phạm Thị Mai</p>
            </div>
          </div>

          {/* Lời chào trân trọng */}
          <div className="text-center space-y-4">
            <h3 className="text-zinc-700 text-xs font-bold uppercase tracking-[0.15em] leading-relaxed max-w-[300px] mx-auto">
              Trân trọng kính mời đến dự<br />tiệc mừng lễ hạnh phúc của chúng tôi
            </h3>
            
            <div className="flex flex-col items-center justify-center space-y-1 my-6 font-serif-elegant text-[#928362]">
              <span className="text-3xl tracking-widest font-normal uppercase">MINH PHƯƠNG</span>
              <span className="text-2xl font-cursive -mt-1 opacity-80">and</span>
              <span className="text-3xl tracking-widest font-normal uppercase">ĐỨC TRUNG</span>
            </div>

            {/* Cá nhân hóa tên khách */}
            <Suspense fallback={<div className="text-xs text-zinc-400">Đang tải lời mời...</div>}>
              <PersonalizedGreeting />
            </Suspense>
          </div>

          {/* Chi tiết Ngày giờ & Địa điểm tổ chức (Dạng văn bản trực tiếp trên giấy như bản gốc) */}
          <div className="space-y-6 text-center pt-4">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#928362] uppercase tracking-[0.2em] block">Được tổ chức vào lúc</span>
              
              {/* Dòng phân cách ngang thanh lịch */}
              <div className="border-y border-[#928362]/20 py-4 max-w-[240px] mx-auto space-y-1">
                <div className="text-xl font-serif-elegant font-medium uppercase tracking-widest text-[#928362]">
                  11:00 - Thứ Sáu
                </div>
                <div className="text-2xl font-serif-elegant font-bold tracking-widest text-[#928362]">
                  07.11.2025
                </div>
              </div>

              <p className="text-[11px] text-[#928362]/80 italic">
                (Tức ngày 18 tháng 9 năm Ất Tỵ)
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <span className="text-[10px] font-bold text-[#928362]/80 uppercase tracking-widest block">Địa Điểm:</span>
              <h4 className="text-lg font-serif-elegant font-bold text-zinc-800 uppercase tracking-wide">
                Hội Trường Peony- Tầng 3
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-semibold max-w-[320px] mx-auto">
                Promes Center: 122 Xuân Thuỷ, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
              </p>
            </div>

            {/* Nút chỉ đường đơn giản như bản gốc */}
            <div className="pt-4">
              <a 
                href="https://maps.app.goo.gl/nn2Gjf9W5Y3DDk6f7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-1.5 text-[#928362] hover:text-[#7a6d51] text-xs font-bold transition duration-300 tracking-[0.2em] border-b border-[#928362]/30 pb-0.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>CHỈ ĐƯỜNG</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 5: CÔ DÂU & CHÚ RỂ (BỐ CỤC POLAROID LỆCH CHÉO BẢN GỐC) */}
        <section id="card-love-story" className="card-section border-b border-[#928362]/10 space-y-10">
          <div className="text-center font-serif-elegant">
            <h3 className="text-2xl font-bold text-[#928362] tracking-widest flex items-center justify-center space-x-1.5 select-none">
              <span>THE STORY</span>
              <span className="font-cursive text-3xl font-light -mt-2 opacity-80 lowercase">of</span>
              <span>LOVE</span>
            </h3>
          </div>

          <div className="relative h-[480px] w-full max-w-[360px] mx-auto select-none">
            {/* Polaroid 1: Cô dâu (Nằm bên trái, nghiêng trái) */}
            <div className="absolute left-2 top-2 w-[55%] z-10 origin-bottom-left transition-transform duration-300 hover:rotate-0">
              <div className="bg-white p-2.5 pb-7 shadow-lg border border-zinc-200 -rotate-[6deg] rounded-xs">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                  <img 
                    src="https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/d574a229-6382-4aef-afc1-7aa5402f59cf.jpg" 
                    alt="Bride Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Tên cô dâu đặt bên phải ảnh */}
              <div className="absolute left-[105%] top-[40%] w-[70px] space-y-0.5 text-left font-serif-elegant whitespace-nowrap z-20">
                <span className="font-cursive text-[#928362] text-xl block leading-none">Cô dâu</span>
                <h4 className="text-xs font-bold text-zinc-700 tracking-wider uppercase">MINH PHƯƠNG</h4>
              </div>
            </div>

            {/* Polaroid 2: Chú rể (Nằm bên phải, nghiêng phải, hơi đè lên ảnh cô dâu) */}
            <div className="absolute right-2 bottom-2 w-[55%] z-20 origin-bottom-right transition-transform duration-300 hover:rotate-0">
              {/* Tên chú rể đặt bên trái ảnh */}
              <div className="absolute right-[105%] top-[40%] w-[70px] space-y-0.5 text-right font-serif-elegant whitespace-nowrap z-20">
                <span className="font-cursive text-[#928362] text-xl block leading-none">Chú rể</span>
                <h4 className="text-xs font-bold text-zinc-700 tracking-wider uppercase">ĐỨC TRUNG</h4>
              </div>
              <div className="bg-white p-2.5 pb-7 shadow-lg border border-zinc-200 rotate-[6deg] rounded-xs">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                  <img 
                    src="https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/e1d4367e-6ffc-48de-8585-b2925eb94273.jpg" 
                    alt="Groom Profile"
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
                    src="https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/9332cfc9-0542-47f2-97c6-06ee4b9d6492.jpg" 
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
                    src="https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/75df7e4e-80c7-4041-8693-88f380b029f6.jpg" 
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
                  src="https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/75df7e4e-80c7-4041-8693-88f380b029f6.jpg" 
                  alt="Calendar Side 1" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-white p-1.5 pb-4 shadow-xs border border-zinc-200/40 rounded-xs">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                <img 
                  src="https://media.cocohappii.com/thumbnails/53d8f7a6-acc3-4f83-afe2-0aba355282c2/9332cfc9-0542-47f2-97c6-06ee4b9d6492.jpg" 
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(https://media.cocohappii.com/optimized/53d8f7a6-acc3-4f83-afe2-0aba355282c2/23551696-0373-4254-be55-3950e81c8708.jpg)`
          }}
        >
          <div className="w-full flex flex-col items-center">
            {/* Tiêu đề Timeline */}
            <h4 className="text-2xl font-serif-elegant font-bold text-white uppercase tracking-[0.25em] mb-12">
              TIMELINE
            </h4>

            {/* Dòng thời gian dạng ngang chuẩn mẫu 005 */}
            <div className="w-full relative flex items-start justify-between px-1">
              
              {/* Đường chỉ trắng nằm ngang nối các mốc */}
              <div className="absolute left-[12%] right-[12%] top-[22px] h-[1px] bg-white/40 z-0" />
              
              {/* Mốc 1 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                <div className="w-11 h-11 rounded-full bg-[#928362] border-2 border-white flex items-center justify-center shadow-md mb-2.5 transition-transform duration-300 hover:scale-105">
                  <Camera className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="text-white font-serif-elegant font-bold text-xs tracking-wider">11:00</div>
                <div className="text-[8px] font-bold text-white/95 leading-tight uppercase mt-1.5 tracking-wider px-0.5">
                  ĐÓN KHÁCH<br />CDCR
                </div>
              </div>
              
              {/* Mốc 2 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                <div className="w-11 h-11 rounded-full bg-[#928362] border-2 border-white flex items-center justify-center shadow-md mb-2.5 transition-transform duration-300 hover:scale-105">
                  <span className="text-white text-xs select-none">💍</span>
                </div>
                <div className="text-white font-serif-elegant font-bold text-xs tracking-wider">11:30</div>
                <div className="text-[8px] font-bold text-white/95 leading-tight uppercase mt-1.5 tracking-wider px-0.5">
                  NGHI LỄ<br />KẾT HÔN
                </div>
              </div>
              
              {/* Mốc 3 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                <div className="w-11 h-11 rounded-full bg-[#928362] border-2 border-white flex items-center justify-center shadow-md mb-2.5 transition-transform duration-300 hover:scale-105">
                  <span className="text-white text-xs select-none">🍽️</span>
                </div>
                <div className="text-white font-serif-elegant font-bold text-xs tracking-wider">11:40</div>
                <div className="text-[8px] font-bold text-white/95 leading-tight uppercase mt-1.5 tracking-wider px-0.5">
                  KHAI TIỆC<br />MỪNG
                </div>
              </div>
              
              {/* Mốc 4 */}
              <div className="relative flex flex-col items-center text-center w-1/4 z-10">
                <div className="w-11 h-11 rounded-full bg-[#928362] border-2 border-white flex items-center justify-center shadow-md mb-2.5 transition-transform duration-300 hover:scale-105">
                  <Camera className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="text-white font-serif-elegant font-bold text-xs tracking-wider">12:30</div>
                <div className="text-[8px] font-bold text-white/95 leading-tight uppercase mt-1.5 tracking-wider px-0.5">
                  GIAO LƯU<br />VĂN NGHỆ
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 9: HỘP MỪNG CƯỚI */}
        <section id="card-gift" className="card-section border-b border-[#928362]/10 text-center bg-[#fff8ed]">
          <div className="space-y-2 mb-8">
            <h3 className="font-cursive text-3xl text-[#928362]">Hộp mừng cưới</h3>
            <p className="text-[11px] text-zinc-500 font-semibold max-w-[300px] mx-auto leading-relaxed">
              Cảm ơn tình cảm của mọi người đã dành cho chúng mình!
            </p>
          </div>

          {/* Hộp quà chuyển khoản */}
          <div className="flex justify-center mb-4">
            <button 
              onClick={() => setIsGiftOpen(true)}
              className="w-40 aspect-square p-2 bg-transparent border border-[#928362]/20 rounded-md flex items-center justify-center shadow-sm hover:scale-102 transition duration-300 cursor-pointer"
            >
              <img 
                src="https://images.squarespace-cdn.com/content/v1/5ea6cecfeb4cf11f1816e87f/652f9b88-16cb-4ca7-a4bb-3ef71ceefb4f/gift+box.png"
                alt="Gift Box"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if square-space CDN fails
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
          <div className="space-y-2 mb-8">
            <h3 className="font-cursive text-3xl text-[#928362]">Sổ lưu bút</h3>
            <p className="text-[11px] text-zinc-500 font-semibold max-w-[300px] mx-auto leading-relaxed">
              Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất đến đám cưới của chúng tôi!
            </p>
          </div>

          <Guestbook />

          {/* Cảm ơn cuối trang */}
          <div className="mt-12 space-y-4 border-t border-[#928362]/10 pt-10 pb-6">
            <h4 className="text-3xl font-cursive text-[#928362]">Thank You!</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold max-w-[320px] mx-auto">
              Sự hiện diện của bạn là món quà ý nghĩa nhất đối với chúng mình. Chân thành cảm ơn các bạn đã cùng chúng mình chia sẻ những khoảnh khắc hạnh phúc nhất!
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="app-footer" className="bg-[#1e1e1e] py-6 text-center text-[10px] text-white/40 border-t border-[#928362]/20 tracking-wider">
          <p>© {new Date().getFullYear()} — Thiết kế lấy cảm hứng từ Cocohappii</p>
        </footer>

      </div>
    </main>
  );
}
