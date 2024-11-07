export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-sec-bg text-white flex text-center justify-center items-center p-4">
      <p className="ml-4">© {currentYear} Your Company Name. All rights reserved.</p>
    </div>
  );
}
