import Banner from "./component/Banner";
import Footer from "./component/Footer";
import NavbarGuest from "./component/NavbarGuest";

export default function Page() {
  return (
    <section className="bg-white min-h-screen">
      <NavbarGuest />

      <div className="section-homepage mt-[72px] md:mt-=[96px]">
        {/* Banner */}
        <Banner />
        {/* Concept Section */}
        <div className="section-concept p-6 md:px-20 md:py-14 bg-gray-50">
          <div className="text-3xl md:text-4xl text-center font-bold text-gray-800 leading-snug mb-6">
            ฝึกนิสัยการออม เพื่อเกมที่คุณรัก
          </div>
          <div className="text-xl md:text-2xl text-center text-gray-600 font-medium mb-12">
            เปลี่ยนความฝันในการเล่นเกมใหม่ให้เป็นจริง ด้วยการออมเงินอย่างมีเป้าหมาย
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
                เริ่มต้นง่าย ๆ ไม่ต้องรอสิ้นเดือน
              </h3>
              <p className="text-gray-600 text-lg">
                แค่วันละไม่กี่บาท คุณก็เข้าใกล้เกมในฝันได้ทุกวัน
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
                เกมใหม่มาเมื่อไหร่ คุณพร้อมเสมอ
              </h3>
              <p className="text-gray-600 text-lg">
                ไม่พลาดโปรโมชั่น ไม่ต้องผ่อน ไม่ต้องใช้บัตรเครดิต
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
                ซื้อเกมด้วยเงินของคุณเอง
              </h3>
              <p className="text-gray-600 text-lg">
                รู้สึกภูมิใจทุกครั้งที่กดซื้อ เพราะเงินทุกบาทมาจากความตั้งใจของคุณ
              </p>
            </div>
          </div>

          {/* Promote / Feature Highlights */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center mb-16">
            <h3 className="text-3xl font-bold text-green-600 mb-4">
              อยากได้เกมใหม่? เริ่มออมตั้งแต่วันนี้!
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              ไม่ต้องฝันลม ๆ แล้ง ๆ อีกต่อไป แค่เริ่มออมอย่างมีวินัย แล้วเกมใน Wishlist ก็จะกลายเป็นของคุณ
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  🎯 ตั้งเป้าหมายเกมที่อยากได้
                </h4>
                <p className="text-gray-600">
                  จะ Steam, PS5 หรือเกมมือถือ ก็วางแผนได้หมด
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  💰 ออมทุกวัน ไม่หนักกระเป๋า
                </h4>
                <p className="text-gray-600">
                  เริ่มจากหลักสิบต่อวัน สะสมไปเรื่อย ๆ ก็ถึงเป้าได้
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  🕹 เปลี่ยนความฝันให้เป็นจริง
                </h4>
                <p className="text-gray-600">
                  ไม่มีอะไรฟินไปกว่าการซื้อเกมด้วยเงินที่คุณออมเอง
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xl font-medium text-gray-700 mb-4">
              พร้อมจะเป็นเจ้าของเกมที่คุณฝันไว้หรือยัง?
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow hover:bg-green-700 transition duration-300"
            >
              เริ่มออมเพื่อเกมในฝัน ฟรี!
            </a>
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
    </section>
  );
}
