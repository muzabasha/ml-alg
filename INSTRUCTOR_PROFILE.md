# Instructor Profile Component

## Overview

A professional, responsive instructor profile component featuring Dr. Syed Muzamil Basha's credentials, achievements, and contact information.

## Component Location

- **Component**: `frontend/src/components/InstructorProfile.tsx`
- **Page**: `frontend/src/pages/instructor.tsx`
- **Profile Image**: `frontend/public/DP_profile.png`

## Features

### Layout
- **Side-by-side design**: Image on left (1/3 width), content on right (2/3 width)
- **Responsive**: Stacks vertically on mobile devices
- **Sticky sidebar**: Profile image and contact info stay visible while scrolling
- **Professional styling**: Gradient headers, shadow effects, rounded corners

### Sections

#### Left Column (Sticky)
1. **Profile Image**
   - Professional photo display
   - Aspect ratio: 3:4
   - Rounded corners with shadow

2. **Contact Information Card**
   - Email addresses
   - Phone numbers
   - University address
   - Icon-based layout

3. **Academic Profiles Card**
   - Google Scholar
   - Scopus
   - ORCID
   - Publons
   - ResearchGate
   - LinkedIn
   - All links open in new tab

#### Right Column (Scrollable)
1. **Header Section**
   - Name and title
   - University affiliation
   - Professional badges (ACM, ISTE, VIDWAN score)

2. **About Section**
   - Educational background
   - Experience summary
   - Key recognition

3. **Research Portfolio**
   - 65 Scopus-indexed publications
   - 25+ textbooks
   - Q1-Q4 journal breakdown
   - Patents and designs
   - High-impact journals

4. **Leadership & Administrative Roles**
   - Research and Innovation Vertical Head
   - NBA-NAAC Coordinator
   - IEEE Computer Society Chair
   - PhD supervision statistics

5. **Awards & Recognition**
   - Recent awards highlighted
   - Expandable section for additional awards
   - Color-coded by importance

6. **Research Expertise**
   - Colorful gradient tags
   - 9 key research areas
   - Visual emphasis

7. **Editorial & Review Work**
   - Editorial board memberships
   - Senior reviewer roles
   - Conference participation

8. **Academic Service**
   - Board memberships
   - Conference organization

## Design Features

### Color Scheme
- **Primary**: Blue gradient (blue-600 to blue-800)
- **Accents**: Various colors for tags and highlights
- **Background**: White with subtle gray/blue gradients
- **Text**: Gray-900 for headings, gray-700 for body

### Typography
- **Headings**: Bold, large sizes (text-xl to text-3xl)
- **Body**: Regular weight, readable line height
- **Links**: Blue-600 with hover underline

### Interactive Elements
- **Hover effects**: On links and cards
- **Expandable section**: "View More Awards"
- **External links**: Open in new tab with proper rel attributes

### Responsive Design
- **Desktop**: Side-by-side layout
- **Tablet**: Adjusted spacing
- **Mobile**: Stacked layout

## Usage

### In a Page
```tsx
import InstructorProfile from '../components/InstructorProfile';

const InstructorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <InstructorProfile />
      </div>
    </div>
  );
};
```

### In the Main App
Add to navigation:
```tsx
<Link href="/instructor">About Instructor</Link>
```

## Image Requirements

### Profile Photo
- **Filename**: `DP_profile.png`
- **Location**: `frontend/public/DP_profile.png`
- **Recommended size**: 600x800px (3:4 aspect ratio)
- **Format**: PNG with transparent or white background
- **Quality**: High resolution for professional appearance

## Customization

### Updating Content
All content is in the component file. To update:

1. **Personal Information**: Edit the header section
2. **Research Stats**: Update numbers in Research Portfolio
3. **Awards**: Add/remove from Awards section
4. **Links**: Update URLs in Academic Profiles
5. **Expertise**: Add/remove tags in Research Expertise

### Styling
- Uses Tailwind CSS utility classes
- Modify colors by changing class names
- Adjust spacing with padding/margin utilities
- Change layout breakpoints with responsive prefixes (md:, lg:)

## Accessibility

- **Alt text**: Provided for profile image
- **Semantic HTML**: Proper heading hierarchy
- **Keyboard navigation**: All links are keyboard accessible
- **Screen readers**: Descriptive link text
- **Color contrast**: WCAG AA compliant

## Performance

- **Image optimization**: Uses Next.js Image component
- **Lazy loading**: Images load on demand
- **Sticky positioning**: CSS-only, no JavaScript
- **Minimal dependencies**: Only React and Next.js

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Future Enhancements

Potential additions:
- [ ] Publications list with filters
- [ ] Research projects showcase
- [ ] Student testimonials
- [ ] Teaching philosophy section
- [ ] Course listings
- [ ] Research group members
- [ ] News/updates feed
- [ ] Download CV button

## Contact Information

**Dr. Syed Muzamil Basha**
- Email: muzamilbasha.s@reva.edu.in
- Phone: +91 8331977568, +91 7259421438
- Institution: REVA University, Bengaluru

## Links

- [Google Scholar](https://scholar.google.co.in/citations?user=weNQmW0AAAAJ&hl=en)
- [Scopus](https://www.scopus.com/authid/detail.uri?authorId=57195586589)
- [ORCID](http://orcid.org/0000-0002-1169-3151)
- [Publons](https://publons.com/researcher/3362117/syed-muzamil)
- [ResearchGate](https://www.researchgate.net/profile/Muzamil_Basha)
- [LinkedIn](https://www.linkedin.com/in/muzamil-basha-syed-19612a25/)

---

**Component Status**: ✅ Complete and Production-Ready
**Last Updated**: Current Session
**Maintained by**: Development Team
