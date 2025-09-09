# Personal Portfolio Website

A modern, responsive portfolio website built with React, TailwindCSS, and Framer Motion, inspired by the Portz template design.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Beautiful animations and transitions using Framer Motion
- **Modern UI/UX**: Clean, minimal design with professional aesthetics
- **Interactive Components**: Hover effects, smooth scrolling, and dynamic interactions
- **Contact Form**: Functional contact form with validation
- **Portfolio Showcase**: Grid-based project display with filtering
- **Testimonials Carousel**: Auto-rotating testimonials with manual navigation
- **SEO Friendly**: Semantic HTML structure and optimized performance

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Production-ready motion library for React
- **Vite**: Fast build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with mobile menu
│   ├── Hero.jsx            # Hero section with CTA buttons
│   ├── About.jsx           # About section with skills
│   ├── Portfolio.jsx       # Portfolio grid with filtering
│   ├── Services.jsx        # Services cards with hover effects
│   ├── Testimonials.jsx    # Testimonials carousel
│   ├── Contact.jsx         # Contact form and information
│   └── Footer.jsx          # Footer with links and social media
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and TailwindCSS imports
```

## 🎨 Design Features

- **Color Palette**: Black/white/gray with accent color #0077FF
- **Typography**: Inter font family for modern, clean appearance
- **Spacing**: Consistent padding and margins throughout
- **Animations**: Smooth scroll animations, hover effects, and page transitions
- **Responsive Grid**: Adaptive layouts for different screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the website

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎯 Customization

### Personal Information

Update the following files with your personal information:

1. **Navbar.jsx**: Change "Your Name" to your actual name
2. **Hero.jsx**: Update headline, subtitle, and CTA text
3. **About.jsx**: Replace bio text and skills with your information
4. **Portfolio.jsx**: Add your actual projects and update project data
5. **Services.jsx**: Modify services to match your offerings
6. **Testimonials.jsx**: Replace with real client testimonials
7. **Contact.jsx**: Update contact information and social links
8. **Footer.jsx**: Update social media links and contact details

### Images

Replace placeholder images with your own:

- Profile photos in Hero and About sections
- Project images in Portfolio section
- Any other visual assets

### Colors and Styling

- Modify the accent color in `tailwind.config.js`
- Update color schemes in individual components
- Customize fonts by changing the Google Fonts import in `index.css`

### Content

- Update all placeholder text with your actual content
- Modify project descriptions and technologies
- Replace testimonials with real client feedback
- Update service descriptions to match your offerings

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column grids)
- **Desktop**: > 1024px (3-column grids and full layouts)

## 🎭 Animation Features

- **Page Load**: Fade-in animations for all sections
- **Scroll Animations**: Elements animate into view as you scroll
- **Hover Effects**: Interactive hover states on buttons and cards
- **Smooth Scrolling**: Smooth navigation between sections
- **Carousel**: Auto-rotating testimonials with manual controls

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Configure custom domain if needed

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push
3. Configure environment variables if needed

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Happy coding! 🎉**# new-portfolio
