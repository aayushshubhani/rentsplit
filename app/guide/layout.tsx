import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RentSplit Guide — How to Set Up & Use RentSplit',
  description: 'Step-by-step guide to setting up your house, inviting roommates, adding expenses, verifying payments with AI, and managing settlements on RentSplit.',
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
