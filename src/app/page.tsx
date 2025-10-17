import NavbarGuest from "./component/NavbarGuest";

export default function Page() {
  return (
    <section>
      {/* อันดับแรกเราจะสร้าง navbar เพื่อ ทำเป็น เมนูการเข้าถึง แต่เราจะสร้างเป็น component เพื่อสามารถเรียกใช้งานสะดวกรวดเร็วได้ทุกหน้า */}
      <NavbarGuest/>
    </section>
  )
}