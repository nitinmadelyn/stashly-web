"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface UseCase {
  id: string;
  emoji: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  accentColor: string;
  steps: Step[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const useCases: UseCase[] = [
  {
    id: "oversaver",
    emoji: "🔖",
    tag: "For heavy savers",
    title: "The \"I Saved It Somewhere\" Person",
    subtitle:
      "You save everything — and find nothing. The link exists, you know it does, but it's buried across WhatsApp, Instagram, browser bookmarks, and three other apps. Stashly fixes this.",
    ctaLabel: "See how it works",
    accentColor: "#DC2626",
    steps: [
      {
        number: 1,
        title: "One place for every link, from every app",
        description:
          "WhatsApp forward, Instagram save, browser tab, Reddit post — tap Share → Stashly from anywhere. Every link flows into one place instead of scattering across five.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Title and preview captured automatically",
        description:
          "Stashly pulls the page title, thumbnail, and source platform the moment you save. No typing, no effort — the context is already there when you come back.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Tag in seconds while saving",
        description:
          "Add one or two tags the moment you save — \"recipe\", \"work\", \"gift idea\", \"follow up\". Takes three seconds. Saves twenty minutes of searching later.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Search by anything",
        description:
          "Can't remember the title? Search a word from it. Know the platform? Filter by it. Remember roughly when you saved it? Sort by date. It surfaces — every time.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Filter by platform or date",
        description:
          "Know it was a YouTube video from last month? Filter to YouTube, sort by date, done. No more digging through browser history or scrolling Instagram saves to the beginning of time.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Find it in under 2 seconds",
        description:
          "That is the benchmark Stashly is built around. Type three letters and the right link is on your screen — not somewhere in a chat you have to scroll back through.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "Save more. Lose nothing.",
        description:
          "The more you save into Stashly, the more powerful your search becomes. Every link you've ever saved is one query away — no matter when or where you saved it.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "readlater",
    emoji: "📖",
    tag: "For avid readers",
    title: "The Read-Later Hoarder",
    subtitle:
      "Stop upvoting Reddit threads and Medium articles you'll never find again. Every link you save to read later, actually findable when you have time to read it.",
    ctaLabel: "See how it works",
    accentColor: "#16A34A",
    steps: [
      {
        number: 1,
        title: "Save articles as you scroll",
        description:
          "Interesting Reddit thread, Medium post, Substack newsletter, Hacker News link — tap Share → Stashly instead of upvoting and forgetting. It's there when you're ready.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Tag by topic and reading time",
        description:
          "Label each article — \"tech\", \"psychology\", \"finance\", \"5 min read\", \"deep dive\". Commuting and only have 10 minutes? Search \"short\" and pick something that fits.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Add a note on why it caught your eye",
        description:
          "\"Follow up on this for work\", \"counters what I read last week\", \"share with Arjun\" — a quick note means you remember why you saved it, not just that you did.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Build reading lists by theme",
        description:
          "\"Startup essays\", \"mental models\", \"investing basics\", \"weekend long reads\". Group related articles so your reading time builds on itself instead of being random.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Share reading lists with people who think like you",
        description:
          "Curate a collection on a topic you care about and share it via a link. No account needed to read through it — just open and explore.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Find any article in seconds",
        description:
          "Saved something about compounding six months ago and can't find it? Search \"compounding\" or \"investing\" and it surfaces instantly — even if you barely remember the title.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "A reading list that actually gets read",
        description:
          "No more Reddit upvotes you never return to. Every article is tagged, noted, and one search away — ready for your next commute, coffee break, or Sunday morning.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "watchlater",
    emoji: "🍿",
    tag: "For binge watchers",
    title: "The Weekend Watcher",
    subtitle:
      "Stop asking \"what should I watch tonight?\" You've saved hundreds of recommendations — they're just buried everywhere. Bring them all into one searchable watchlist.",
    ctaLabel: "See how it works",
    accentColor: "#7C3AED",
    steps: [
      {
        number: 1,
        title: "Save anything you want to watch",
        description:
          "YouTube video, Netflix show, movie someone mentioned on Reddit, a documentary your friend shared — tap Share → Stashly and it's in your watchlist instantly.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Tag by type and genre",
        description:
          "Label each item — \"movie\", \"series\", \"documentary\", \"short\", \"thriller\", \"comedy\", \"feel-good\". Friday night and want something light? Search \"comedy\" and you're sorted.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Tag by platform and mood",
        description:
          "\"Netflix\", \"YouTube\", \"Prime\", \"date night\", \"solo watch\", \"watch with family\". No more opening four apps trying to remember where that show was.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Add a note on why you saved it",
        description:
          "\"Recommended by Rahul\", \"part 2 — watch part 1 first\", \"subtitles needed\", \"perfect for a rainy Sunday\". Context that makes picking something to watch effortless.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Create collections for every occasion",
        description:
          "\"Weekend binge\", \"watch with partner\", \"long flights\", \"horror season\". Curate themed lists so the right watch is always one tap away.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Share your watchlist with friends and family",
        description:
          "Planning a movie night? Share a collection link. Everyone sees your picks — no app needed. The group picks something in minutes instead of arguing for an hour.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "Never ask \"what should I watch?\" again",
        description:
          "Your entire watchlist — movies, series, videos — tagged by genre, mood, and platform. The perfect watch for any evening is always one search away.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "foodie",
    emoji: "🍜",
    tag: "For foodies",
    title: "The Food Explorer",
    subtitle:
      "Stop forgetting that restaurant your friend recommended last month. Save every spot, tag by vibe and cuisine, and always know exactly where to go next.",
    ctaLabel: "See how it works",
    accentColor: "#EA580C",
    steps: [
      {
        number: 1,
        title: "Save spots the moment you discover them",
        description:
          "See a drool-worthy café on Instagram, a hidden gem on YouTube, or a spot on a food blog? Tap Share → Stashly. Captured instantly — no more screenshotting and forgetting.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Tag by cuisine, vibe, and occasion",
        description:
          "Label each spot with what matters to you — \"Italian\", \"date night\", \"brunch\", \"budget\", \"rooftop\", \"must-try\". Finding the right place for any mood takes seconds.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Add notes while the tip is fresh",
        description:
          "Jot down what matters — \"try the truffle pasta\", \"book 2 weeks ahead\", \"cash only\", \"ask for the corner table\". Your insider knowledge, always with you.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Create collections by city or occasion",
        description:
          "\"Bangkok eats\", \"London date spots\", \"Sunday brunch\", \"best burgers\". Curate a collection for every city you visit and every craving you chase.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Share your food list with friends",
        description:
          "Friends visiting your city? Share your local gems collection via a link. They get your entire curated list — no app needed to browse.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Search when you're out and hungry",
        description:
          "Standing in a new neighbourhood wondering where to eat? Search \"outdoor seating\" or \"Thai\" and your saved spots surface in seconds — no scrolling through screenshots.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "Never forget a great recommendation again",
        description:
          "Every café, restaurant, and hidden gem you've ever saved — tagged, noted, and searchable. Your personal food guide, everywhere you go.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "jobseeker",
    emoji: "💼",
    tag: "For job seekers",
    title: "The Job Hunter",
    subtitle:
      "Stop tracking applications in a messy spreadsheet. Save every listing, attach your notes, and keep your entire job hunt — research and all — in one searchable place.",
    ctaLabel: "See how it works",
    accentColor: "#4F46E5",
    steps: [
      {
        number: 1,
        title: "Save any job listing in two taps",
        description:
          "See a role on LinkedIn, Indeed, or a company careers page? Tap Share → Stashly. The listing is saved instantly — title, company, and URL captured before it gets taken down.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Add notes that matter",
        description:
          "Drop in the details while they're fresh — \"Applied 15 June\", \"Interview scheduled 22 June\", \"Salary range $80k–$100k\", \"Referral from Priya\". All attached to the listing.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Tag by application status",
        description:
          "Use tags to track where each role stands — \"saved\", \"applied\", \"interviewing\", \"offer\", \"rejected\". Your entire pipeline visible at a glance.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Link your research to each role",
        description:
          "Save the company's Glassdoor page, their latest funding news, salary benchmarks, and interview prep articles — all tagged to that specific company.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.5.7l3-3a5 5 0 0 0-7-7.1l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.7l-3 3a5 5 0 0 0 7 7.1l1.7-1.7" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Create a collection per company",
        description:
          "Group the job listing, company research, salary data, and interview prep into one collection per company. Walk into every interview fully prepared.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Search across your entire job hunt",
        description:
          "Can't remember which role had the 4-day work week? Search \"remote\" or \"flexible\" and every matching listing surfaces instantly — notes and all.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "Your entire job hunt, one organised place",
        description:
          "Applications, research, prep, notes — no more spreadsheets, no more lost listings. Just a clean, searchable record of every opportunity you've pursued.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "creator",
    emoji: "🎬",
    tag: "For creators",
    title: "The Content Creator",
    subtitle:
      "Stop losing your best research across 30 open tabs. Build a dedicated collection for every video and go from research chaos to structured brief in one place.",
    ctaLabel: "See how it works",
    accentColor: "#F97316",
    steps: [
      {
        number: 1,
        title: "Create a collection for your video",
        description:
          "Start a new collection and name it after your topic — \"My video on AI tools 2026\". Every piece of research you find has a home from the first minute.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Save everything as you research",
        description:
          "Articles, YouTube videos, Twitter threads, Reddit discussions, competitor videos — tap Share → Stashly and it lands straight into your collection.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Tag by content type",
        description:
          "Label each source as \"stat\", \"quote\", \"example\", \"angle\", or \"competitor\". When you sit down to script, you know exactly what you have and where to find it.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Add a note to each source",
        description:
          "Drop in a quick thought while the idea is fresh — \"open video with this stat\" or \"use as counterpoint in section 2\". Your scripting session becomes 10x faster.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="10" x2="3" y2="10" />
            <line x1="21" y1="14" x2="3" y2="14" />
            <line x1="21" y1="18" x2="9" y2="18" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Share with your editor or collaborator",
        description:
          "Send your research collection to your editor, co-creator, or thumbnail designer via a public link. They see everything — no account needed.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Search your research while scripting",
        description:
          "Mid-script and need that one stat you saved last week? Search \"2026 adoption rate\" and it surfaces in under two seconds — without breaking your flow.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "Research chaos → structured content brief",
        description:
          "Every video has its own collection: tagged, noted, searchable, and shareable. Your research process finally keeps up with your publishing pace.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "student",
    emoji: "🎓",
    tag: "For students",
    title: "The Researcher",
    subtitle:
      "Stop drowning in 20 scattered tabs. Create a research project, save every source, and find anything instantly — all in one organised place.",
    ctaLabel: "See how it works",
    accentColor: "#0D9488",
    steps: [
      {
        number: 1,
        title: "Create a research project",
        description:
          "Start a new collection and give it a goal — \"Climate change essay — due Friday\". Your project has a name and a home.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Save every relevant source into the project",
        description:
          "Research papers, news articles, YouTube explainers, Reddit threads — tap Share → Stashly and every source lands directly into your project.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Tag by topic and subtopic",
        description:
          "Tag each source — \"causes\", \"solutions\", \"statistics\", \"counterargument\". Makes it effortless to pull the right sources when you're writing each section.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Add notes to each source",
        description:
          "Jot down why you saved it — \"use this stat in intro\" or \"contradicts Smith 2021\". Your future self will thank you at 2am before the deadline.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="21" y1="10" x2="3" y2="10" />
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" />
            <line x1="21" y1="18" x2="9" y2="18" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Share the collection with classmates",
        description:
          "Working in a group? Share your research collection via a public link. Everyone sees all the sources — no account needed to browse.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Find any source in seconds",
        description:
          "Search across titles, tags, notes, and URLs all at once. Type \"carbon emissions 2023\" and the right paper surfaces instantly.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "20 scattered tabs → one organised project",
        description:
          "From the first search result to the final essay — every source is tagged, noted, and searchable. No more losing that one crucial link.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "traveller",
    emoji: "✈️",
    tag: "For travellers",
    title: "The Frequent Traveller",
    subtitle:
      "Stop losing hotel recommendations in Reddit threads and YouTube vlogs. Plan every trip with a searchable, shareable stash.",
    ctaLabel: "See how it works",
    accentColor: "#0EA5E9",
    steps: [
      {
        number: 1,
        title: "Download & sign up",
        description:
          "Get Stashly on iOS or Android and create your free account in under a minute.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Save travel inspiration as you scroll",
        description:
          "Spot a hotel on Instagram, a restaurant on YouTube, a hidden trail on Reddit? Tap Share → Stashly. Captured in two taps.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Create a collection per trip",
        description:
          "Make a collection called \"Bali 2025\" or \"Europe Summer\" and drop all your saved links into it — hotels, restaurants, activities, flights.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Tag by category",
        description:
          "Tag links as \"stay\", \"eat\", \"explore\", \"budget\" or whatever works for you. One-time effort, lifetime payoff.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Share the collection with your travel buddies",
        description:
          "Generate a public link to your trip collection and send it to whoever is joining. No account needed to browse — they just open and explore.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Search on the go during your trip",
        description:
          "Standing in a new city wondering where to eat? Search \"dinner Tokyo\" and your saved restaurants surface instantly — no internet rabbit holes.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "Every trip planned, zero recommendations lost",
        description:
          "From first scroll to boarding gate — your entire trip research lives in one place, always with you, always searchable.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "shopaholic",
    emoji: "🛍️",
    tag: "For shoppers",
    title: "The Shopaholic",
    subtitle:
      "Stop losing your wishlist buried in Instagram saves and Facebook albums. Every item you want, searchable in seconds.",
    ctaLabel: "See how it works",
    accentColor: "#E1306C",
    steps: [
      {
        number: 1,
        title: "Download & sign up",
        description:
          "Get Stashly on iOS or Android and create your free account in under a minute.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
      },
      {
        number: 2,
        title: "Import your collections from Instagram & Facebook",
        description:
          "Bring in everything you've already saved. Your existing saved posts and albums land in Stashly automatically.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
        ),
      },
      {
        number: 3,
        title: "Everything in one place",
        description:
          "Your wishlist from Instagram, Facebook, Pinterest — all unified in a single beautiful library.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
      {
        number: 4,
        title: "Tag everything — it's worth it",
        description:
          "Spend a few minutes tagging by category: \"shoes\", \"summer\", \"under ₹2000\". This one-time effort pays off forever.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        number: 5,
        title: "Save new links with reminders & notes",
        description:
          "Spot something you want to buy next payday? Save it with a reminder and a personal note — \"wait for sale\" or \"check size chart\".",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        ),
      },
      {
        number: 6,
        title: "Find anything in seconds",
        description:
          "Search across titles, tags, notes, and platforms all at once. Type \"red heels\" and it surfaces instantly — even if you saved it months ago.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ),
      },
      {
        number: 7,
        title: "20 minutes saved, every week",
        description:
          "No more scrolling through DMs, saved posts, and browser tabs. Your wishlist is organised, searchable, and always with you.",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

function StepsModal({
  useCase,
  onClose,
}: {
  useCase: UseCase;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(15, 10, 30, 0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`How Stashly helps: ${useCase.title}`}
    >
      {/* Panel — bottom sheet on mobile, centered card on desktop */}
      <div
        className="relative w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[85dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl flex flex-col"
        style={{ backgroundColor: "#FFFFFF" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 pt-5 pb-4"
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none" aria-hidden="true">
              {useCase.emoji}
            </span>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: useCase.accentColor }}
              >
                {useCase.tag}
              </p>
              <h2
                className="text-base font-bold leading-snug"
                style={{ color: "#0F0A1E" }}
              >
                {useCase.title}
              </h2>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
            style={{ backgroundColor: "#F3F4F6" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E5E7EB")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#F3F4F6")
            }
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="#6B7280"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Steps */}
        <div className="px-6 py-5 flex flex-col gap-0">
          {useCase.steps.map((step, index) => {
            const isLast = index === useCase.steps.length - 1;
            return (
              <div key={step.number} className="flex gap-4">
                {/* Left: number + connector line */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: isLast
                        ? useCase.accentColor
                        : "#EDE9FE",
                      color: isLast ? "#FFFFFF" : useCase.accentColor,
                    }}
                  >
                    {isLast ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className="mt-1 w-px flex-1 mb-1"
                      style={{ backgroundColor: "#E8E5F5", minHeight: 20 }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div className={`pb-5 flex-1 min-w-0 ${isLast ? "" : ""}`}>
                  <p
                    className="text-sm font-semibold leading-snug mb-1"
                    style={{ color: "#0F0A1E" }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B7280" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div
          className="sticky bottom-0 px-6 py-4"
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #F3F4F6",
          }}
        >
          <a
            href="https://apps.apple.com/us/app/stashly-save-search-share/id6771729320"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-12 w-full rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: "#6C47FF" }}
          >
            Download Stashly — it&apos;s free
          </a>
          <p className="mt-2 text-center text-xs" style={{ color: "#9CA3AF" }}>
            iOS &amp; Android · Free to get started
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Use case card ─────────────────────────────────────────────────────────────

function UseCaseCard({
  useCase,
  onOpen,
}: {
  useCase: UseCase;
  onOpen: () => void;
}) {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E5F5",
        boxShadow: "0 2px 12px rgba(108,71,255,0.06)",
      }}
    >
      {/* Card top accent */}
      <div className="h-1 w-full" style={{ backgroundColor: useCase.accentColor }} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Emoji + tag */}
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl leading-none"
            style={{ backgroundColor: `${useCase.accentColor}15` }}
            aria-hidden="true"
          >
            {useCase.emoji}
          </span>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-0.5"
              style={{ color: useCase.accentColor }}
            >
              {useCase.tag}
            </p>
            <h3
              className="text-base font-bold leading-snug"
              style={{ color: "#0F0A1E" }}
            >
              {useCase.title}
            </h3>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "#4B5563" }}
        >
          {useCase.subtitle}
        </p>

        {/* Step count pill */}
        <div className="flex items-center gap-2">
          {[...Array(useCase.steps.length)].map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full"
              style={{
                backgroundColor:
                  i === useCase.steps.length - 1
                    ? useCase.accentColor
                    : "#EDE9FE",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onOpen}
          className="flex items-center justify-between w-full rounded-xl px-4 h-11 text-sm font-semibold transition-all duration-150 cursor-pointer"
          style={{
            backgroundColor: "#EDE9FE",
            color: "#6C47FF",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#6C47FF";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#EDE9FE";
            e.currentTarget.style.color = "#6C47FF";
          }}
        >
          <span>{useCase.ctaLabel}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function UseCases() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = useCases.find((u) => u.id === activeId) ?? null;

  const open  = useCallback((id: string) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);

  return (
    <>
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "#F9F8FF" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-10 text-center">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#6C47FF" }}
            >
              Who it&apos;s for
            </p>
            <h2
              className="text-balance text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "#0F0A1E" }}
            >
              Built for people who save a lot
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              See exactly how Stashly fits into your life — step by step.
            </p>
          </div>

          {/* Cards grid */}
          <div
            className={`grid grid-cols-1 gap-6 ${
              useCases.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "max-w-sm mx-auto"
            }`}
          >
            {[...useCases].reverse().map((u) => (
              <UseCaseCard key={u.id} useCase={u} onOpen={() => open(u.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {active && <StepsModal useCase={active} onClose={close} />}
    </>
  );
}
