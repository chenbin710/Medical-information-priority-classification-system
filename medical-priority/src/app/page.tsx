"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DrugItem {
  name?: string;
  aliases?: string[];
  target?: string;
  mechanism?: string;
  company?: string;
}

interface NewsItem {
  id?: number;
  title: string;
  source: string;
  publishDate: string;
  originalText?: string;
  aiExtracted?: {
    drugs?: DrugItem[];
  };
  aiTags?: string[];
  aiConfidence?: number;
}

function TableSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
    </div>
  );
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/mock-news.json", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch mock news");
      const data: NewsItem[] = await res.json();
      setNews(data);
    } catch {
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNews();
  }, [loadNews]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">医药资讯列表</h1>
        <Button onClick={() => void loadNews()} disabled={loading}>
          刷新数据
        </Button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>发布日期</TableHead>
              <TableHead>来源</TableHead>
              <TableHead>AI标签</TableHead>
              <TableHead>优先级</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item, index) => (
              <TableRow key={`${item.title}-${index}`}>
                <TableCell>{item.id ?? index + 1}</TableCell>
                <TableCell className="max-w-[420px] truncate">{item.title}</TableCell>
                <TableCell>{item.publishDate}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(item.aiTags ?? []).length > 0 ? (
                      item.aiTags!.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="border-orange-200 bg-orange-100 text-orange-700">
                    待计算
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
