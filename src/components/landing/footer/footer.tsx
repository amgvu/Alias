export default function Footer() {
  return (
    <footer className="py-16 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-text-secondary text-sm font-ginto">
            © 2025 Alias. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-ginto">
            <a
              href="/legal/privacy-policy"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/legal/terms-of-service"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
