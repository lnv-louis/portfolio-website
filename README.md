# Vu Le - Portfolio

A modern, high-performance developer portfolio website built with Next.js 14, showcasing full-stack engineering projects and research.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React, TypeScript, App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/)
- **UI Libraries**: 
  - [Magic UI](https://magicui.design/)
  - [React Bits](https://reactbits.dev/)
  - [Radix UI](https://www.radix-ui.com/)
- **Storage & Assets**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) (Object Storage for large media/PDFs)
- **Deployment**: [Vercel](https://vercel.com/)

## Features

- **Performance**: Optimized asset delivery via Cloudflare R2 and Next.js image optimization.
- **Interactivity**: Custom cursor, smooth scroll-snap sections, and fluid animations.
- **PDF Preview**: Secure, in-app PDF previewer for research manuscripts with watermark protection.
- **Dynamic UI**: Responsive Bento Grid layout and interactive project cards.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/lnv-louis/portfolio-website.git
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file and add your Cloudflare R2 public bucket URL:
    ```env
    NEXT_PUBLIC_R2_BUCKET_URL=https://your-r2-bucket-url.com
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## License

© 2025 Le Nguyen Vu. All rights reserved.
