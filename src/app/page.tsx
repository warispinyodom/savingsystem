import NavbarGuest from "./component/NavbarGuest";

export default function Page() {
  return (
    <section className="bg-white min-h-screen">
      <NavbarGuest />

      <div className="section-homepage mt-[96px]">
        {/* Banner */}
        <div className="section-banner">
          <img
            src="/images/banner.png"
            alt="banner"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Concept Section */}
        <div className="section-concept p-6 md:px-20 md:py-14 bg-gray-50">
          <div className="text-3xl md:text-4xl text-center font-bold text-gray-800 leading-snug mb-6">
            ฝึกนิสัยการออม สร้างสังคมแห่งการให้
          </div>
          <div className="text-xl md:text-2xl text-center text-gray-600 font-medium mb-12">
            เปลี่ยนทุกการออมให้กลายเป็นโอกาสในการช่วยเหลือผู้อื่น พร้อมพัฒนาตนเองไปในเวลาเดียวกัน
          </div>

          {/* Section 1 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <img
              className="rounded-xl shadow-lg transition-all duration-300 w-[280px] md:w-[400px] hover:scale-105"
              src="/images/review1.png"
              alt="Review 1"
            />
            <div className="text-center md:text-left max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                ร่วมเป็นส่วนหนึ่งของการเปลี่ยนแปลง
              </h3>
              <p className="text-gray-600 text-lg">
                ไม่ใช่แค่การออม แต่คือการสร้างวินัย พัฒนาตนเอง และทำสิ่งดีให้กับสังคมในทุกๆ วัน
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 mb-16">
            <img
              className="rounded-xl shadow-lg transition-all duration-300 w-[280px] md:w-[400px] hover:scale-105"
              src="/images/review2.png"
              alt="Review 2"
            />
            <div className="text-center md:text-left max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                ทุกก้าวของคุณมีความหมาย
              </h3>
              <p className="text-gray-600 text-lg">
                ทุกการออมช่วยสร้างความเปลี่ยนแปลงในตัวคุณ และเพิ่มโอกาสให้กับผู้อื่นในสังคม
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <img
              className="rounded-xl shadow-lg transition-all duration-300 w-[280px] md:w-[400px] hover:scale-105"
              src="/images/review3.png"
              alt="Review 3"
            />
            <div className="text-center md:text-left max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                จากการออม สู่การเปลี่ยนแปลงชีวิตผู้อื่น
              </h3>
              <p className="text-gray-600 text-lg">
                ทุกบาทที่คุณออม คือก้าวสำคัญในการสร้างอนาคตที่ดีกว่าให้กับทั้งคุณและสังคม
              </p>
            </div>
          </div>

          {/* Promote / Feature Highlights */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center mb-16">
            <h3 className="text-3xl font-bold text-green-600 mb-4">
              ทำไมต้องเลือกเรา?
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              เพราะเราคือแพลตฟอร์มออมเงินเพื่อสังคมแห่งแรกที่ผสานระหว่างการพัฒนาตนเองกับการให้คืนสู่สังคมอย่างแท้จริง
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  ✔️ ระบบติดตามเป้าหมาย
                </h4>
                <p className="text-gray-600">ช่วยให้คุณมองเห็นความก้าวหน้าในทุกวัน</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  ✔️ การออมที่มีผลต่อสังคม
                </h4>
                <p className="text-gray-600">ทุกยอดออมสามารถต่อยอดเป็นการช่วยเหลือผู้อื่น</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  ✔️ ฟรี! ไม่มีค่าใช้จ่าย
                </h4>
                <p className="text-gray-600">เริ่มใช้งานได้ทันที ไม่มีข้อผูกมัด</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xl font-medium text-gray-700 mb-4">
              เริ่มต้นสร้างนิสัยการออมและเปลี่ยนแปลงชีวิตคุณวันนี้
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow hover:bg-green-700 transition duration-300"
            >
              สมัครใช้งานฟรี
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
