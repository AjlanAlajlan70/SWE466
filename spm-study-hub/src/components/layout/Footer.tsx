'use client';

import { GraduationCap, Heart, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-coral-500 to-teal-500">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              © {currentYear} SPM Study Hub
            </span>
          </div>

          {/* Contact Me */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Contact Me:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/ajlan-alajlan-064297292/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm transition-all hover:bg-[#0077B5] hover:text-white hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/AjlanAlajlan70"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm transition-all hover:bg-foreground hover:text-background hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-coral-500 text-coral-500" />
            <span>for SPM students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
