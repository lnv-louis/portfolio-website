// Structured data (JSON-LD) for every page, rendered by src/document.tsx.
// SITE_GRAPH appears on all pages; HOME_GRAPH only on the homepage, since it
// describes what the homepage shows (profile, films, gallery, papers, events).

export const SITE_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://lenguyenvu.com/#person",
      "name": "Louis Le",
      "alternateName": "Le Nguyen Vu",
      "url": "https://lenguyenvu.com/",
      "image": "https://lenguyenvu.com/og-image.jpg",
      "description": "Software engineer in London building production AI systems for real estate.",
      "jobTitle": "Co-Founder & CTO",
      "worksFor": {
        "@id": "https://lenguyenvu.com/#cf0"
      },
      "memberOf": {
        "@id": "https://lenguyenvu.com/#hack-collective"
      },
      "affiliation": {
        "@type": "CollegeOrUniversity",
        "name": "University College London",
        "url": "https://www.ucl.ac.uk/"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "GB"
      },
      "knowsAbout": [
        "AI agents",
        "Real estate technology",
        "Property management software",
        "LLM systems",
        "Hackathon organising",
        "Machine learning"
      ],
      "sameAs": [
        "https://github.com/lnv-louis",
        "https://linkedin.com/in/le-nguyen-vu",
        "https://x.com/lnv007"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://lenguyenvu.com/#cf0",
      "name": "cf0.ai",
      "url": "https://cf0.ai/",
      "description": "Zero, the AI that lets and manages homes.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": "https://cf0.ai/",
        "availableLanguage": "en"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://lenguyenvu.com/#hack-collective",
      "name": "The Hack Collective",
      "url": "https://hackcollective.uk/",
      "description": "London's hackathon community.",
      "founder": {
        "@id": "https://lenguyenvu.com/#person"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "partnerships",
        "url": "https://lenguyenvu.com/contact",
        "areaServed": "GB",
        "availableLanguage": "en"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "GB"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://lenguyenvu.com/#website",
      "name": "Louis Le",
      "url": "https://lenguyenvu.com/",
      "inLanguage": "en",
      "publisher": {
        "@id": "https://lenguyenvu.com/#person"
      }
    }
  ]
} as const

export const HOME_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://lenguyenvu.com/#profile",
      "url": "https://lenguyenvu.com/",
      "name": "Louis Le (Le Nguyen Vu) | AI and Real Estate, cf0.ai",
      "isPartOf": {
        "@id": "https://lenguyenvu.com/#website"
      },
      "mainEntity": {
        "@id": "https://lenguyenvu.com/#person"
      },
      "primaryImageOfPage": "https://lenguyenvu.com/og-image.jpg",
      "dateModified": "2026-10-31"
    },
    {
      "@type": "VideoObject",
      "name": "Devin Local: London",
      "description": "Film from Devin Local: London, hosted on behalf of Cognition on 1 October 2026.",
      "thumbnailUrl": "https://lenguyenvu.com/hackathons/devin-local-london-poster.webp",
      "contentUrl": "https://media.lenguyenvu.com/devin-local-london.mp4",
      "uploadDate": "2026-10-31",
      "duration": "PT1M45S"
    },
    {
      "@type": "VideoObject",
      "name": "Zero by cf0.ai: product film",
      "description": "Zero, the AI that lets and manages homes: listing, letting and managing after move-in.",
      "thumbnailUrl": "https://lenguyenvu.com/zero-product-film-poster.webp",
      "contentUrl": "https://media.lenguyenvu.com/cf0-product-film-720.h264.mp4",
      "uploadDate": "2026-10-30",
      "duration": "PT45S"
    },
    {
      "@type": "ImageGallery",
      "name": "Building the London hackathon scenes",
      "description": "Photos from the Grok Bot hackathon, the Hack-Nation London hub and Paris Builds.",
      "url": "https://lenguyenvu.com/#hackathons",
      "image": [
        "https://lenguyenvu.com/hackathons/grok-bot-hackathon-group-photo-1600.webp",
        "https://lenguyenvu.com/hackathons/paris-builds-group-photo-1600.webp",
        "https://lenguyenvu.com/hackathons/hack-nation-london-audience-1600.webp"
      ]
    },
    {
      "@type": "ScholarlyArticle",
      "name": "Machine Learning Classification of Leukaemia",
      "author": {
        "@id": "https://lenguyenvu.com/#person"
      },
      "url": "https://media.lenguyenvu.com/ML-classification-leukaemia.pdf",
      "encodingFormat": "application/pdf",
      "about": "Classifying acute myeloid leukaemia subtypes from gene expression data with Random Forest and RBF-SVM"
    },
    {
      "@type": "ScholarlyArticle",
      "name": "Machine Learning Sentiment Analysis",
      "author": {
        "@id": "https://lenguyenvu.com/#person"
      },
      "url": "https://media.lenguyenvu.com/ML-sentiment-analysis.pdf",
      "encodingFormat": "application/pdf",
      "about": "Comparing a bidirectional LSTM and LinearSVC for sentiment classification of financial news headlines"
    },
    {
      "@type": "Event",
      "name": "ImpactHack 2027",
      "startDate": "2027-02-13",
      "endDate": "2027-02-14",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": [
        {
          "@type": "Place",
          "name": "Temple Quarter Enterprise Campus",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bristol",
            "addressCountry": "GB"
          }
        },
        {
          "@type": "Place",
          "name": "Mumbai Enterprise Campus",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mumbai",
            "addressCountry": "IN"
          }
        }
      ],
      "sponsor": [
        {
          "@id": "https://lenguyenvu.com/#hack-collective"
        },
        {
          "@id": "https://lenguyenvu.com/#person"
        }
      ],
      "url": "https://impact-hack.com/"
    },
    {
      "@type": "Event",
      "name": "Imperial BioHack x Anthropic",
      "startDate": "2026-11-28",
      "endDate": "2026-11-29",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "City & Guilds Building, Imperial College London",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "postalCode": "SW7 2BX",
          "addressCountry": "GB"
        }
      },
      "sponsor": [
        {
          "@type": "Organization",
          "name": "Cognition",
          "url": "https://cognition.com/"
        },
        {
          "@id": "https://lenguyenvu.com/#person"
        }
      ],
      "url": "https://luma.com/m21rdpv1"
    },
    {
      "@type": "Event",
      "name": "Devin Local: London",
      "startDate": "2026-10-01",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "London",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        }
      },
      "organizer": [
        {
          "@type": "Organization",
          "name": "Cognition",
          "url": "https://cognition.com/"
        },
        {
          "@id": "https://lenguyenvu.com/#person"
        }
      ],
      "url": "https://luma.com/eveur09a"
    },
    {
      "@type": "Event",
      "name": "Hack-Nation 7th Global AI Hackathon: London hub",
      "startDate": "2026-10-03",
      "endDate": "2026-10-04",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "London",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        }
      },
      "organizer": {
        "@id": "https://lenguyenvu.com/#person"
      },
      "url": "https://luma.com/nln5g3e0"
    },
    {
      "@type": "Event",
      "name": "Grok Bot Community Engineering London Hackathon",
      "startDate": "2026-10-22",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Expedite London HQ",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "7 Lyric Square",
          "addressLocality": "London",
          "addressCountry": "GB"
        }
      },
      "organizer": [
        {
          "@id": "https://lenguyenvu.com/#person"
        },
        {
          "@id": "https://lenguyenvu.com/#hack-collective"
        }
      ],
      "sponsor": [
        { "@type": "Organization", "name": "Cursor" },
        { "@type": "Organization", "name": "Supabase" },
        { "@type": "Organization", "name": "Cognee" },
        { "@type": "Organization", "name": "Zero" },
        { "@type": "Organization", "name": "Notion" }
      ],
      "maximumAttendeeCapacity": 180,
      "url": "https://luma.com/wn0h6ffm"
    },
    {
      "@type": "Event",
      "name": "Paris Builds",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Stephenson Harwood",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "48 Rue Cambon",
          "addressLocality": "Paris",
          "postalCode": "75001",
          "addressCountry": "FR"
        }
      },
      "sponsor": {
        "@id": "https://lenguyenvu.com/#person"
      },
      "organizer": {
        "@id": "https://lenguyenvu.com/#person"
      },
      "maximumAttendeeCapacity": 150,
      "url": "https://luma.com/8ucy347o"
    }
  ]
} as const
