import Container from "../Container";
import Link from "next/link";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
const Navbar = () => {
  return (
    <div className="sticky top-0 shadow-sm w-full bg-slate-200 z-30">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/" className="font-bold text-xl">
              EtronKart
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
