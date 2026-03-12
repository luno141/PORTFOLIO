import React from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/mdx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import RevealAnimation from "@/components/reveal-animations";
import { config } from "@/data/config";
export const metadata = {
  title: `Writing | ${config.author}`,
  description:
    "Writing, notes, and future posts from Vikrant Dey on products, engineering, AI systems, and experimentation.",
};
export default function BlogPage() {
  const posts = getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen font-sans">
      <RevealAnimation>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-500">
          Writing
        </h1>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Notes, breakdowns, and project write-ups from ongoing experiments.
        </p>
      </RevealAnimation>

      {posts.length === 0 ? (
        <RevealAnimation delay={0.1}>
          <Card className="max-w-2xl mx-auto bg-black/30 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>No posts published yet</CardTitle>
              <CardDescription>
                I am currently focused on building products across AI,
                full-stack web, graphics, and Web3 experiments. Writing will
                land here once I start publishing project breakdowns.
              </CardDescription>
            </CardHeader>
          </Card>
        </RevealAnimation>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <RevealAnimation key={post.slug} delay={index * 0.1}>
              <Link href={`/blogs/${post.slug}`}>
                <Card className="h-full bg-black/40 border-zinc-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors group overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-400"
                      >
                        {post.metadata.tags?.[0] || "Blog"}
                      </Badge>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {post.metadata.publishedAt}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-emerald-400 transition-colors">
                      {post.metadata.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.metadata.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent />
                  <CardFooter className="mt-auto">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <User className="w-4 h-4" />
                      {post.metadata.author}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </RevealAnimation>
          ))}
        </div>
      )}
    </div>
  );
}
