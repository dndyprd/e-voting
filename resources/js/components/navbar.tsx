export default function Navbar() {
    const listNavbar = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Voting",
            href: "/voting",
        },
        {
            name: "Grafik",
            href: "/grafik",
        },
        {
            name: "Login",
            href: "/login",
        },
    ];

    return (
        <>
            {/* NAVBAR : DESKTOP */}
            <div className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {listNavbar.map((item) => (
                        <a key={item.name} href={item.href} className="text-white font-medium hover:text-gray-300">
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
            {/* NAVBAR : MOBILE */}
        </>
    );
}