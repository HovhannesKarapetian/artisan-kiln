const LINKS = [
  { label: 'Terms of Service', short: 'Terms', mobile: true },
  { label: 'Privacy Policy', short: 'Privacy', mobile: false },
  { label: 'Shipping Info', short: 'Shipping', mobile: false },
  { label: 'Contact Us', short: 'Contact', mobile: true },
];

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-6 pt-8 text-center font-body text-sm font-semibold uppercase tracking-wide">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 xl:gap-x-0 xl:divide-x-2 xl:divide-ink">
        {LINKS.map(({ label, short, mobile }) => (
          <li key={label} className={mobile ? 'xl:px-2' : 'hidden xl:block xl:px-2'}>
            <a href="#" className="hover:underline">
              <span className="xl:hidden">{short}</span>
              <span className="hidden xl:inline">{label}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-1 hidden xl:block">© 2026 The Artisan Kiln. All rights reserved.</p>
    </footer>
  );
}
