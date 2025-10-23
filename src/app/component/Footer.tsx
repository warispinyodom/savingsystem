export default function Footer() {
    return (
        <footer className="bg-[#FF9B00] text-white py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Savings System. All rights reserved.</p>
            </div>
        </footer>
    )
}