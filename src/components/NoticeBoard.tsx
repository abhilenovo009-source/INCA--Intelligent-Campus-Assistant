import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Pin } from "lucide-react";
import { format } from "date-fns";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  department: string | null;
  is_pinned: boolean;
  created_at: string;
}

const NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();

    const channel = supabase
      .channel('notices-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notices'
        },
        () => {
          fetchNotices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-destructive/20 text-destructive';
      case 'medium':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center">Loading notices...</div>
        </div>
      </section>
    );
  }

  if (notices.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border rounded-full px-6 py-2 mb-6">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Latest Updates</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Campus Notices
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest announcements and important information
          </p>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {notices.map((notice) => (
            <Card 
              key={notice.id}
              className="p-6 bg-gradient-card backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {notice.is_pinned && (
                  <Pin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {notice.title}
                    </h3>
                    <Badge className={getPriorityColor(notice.priority)}>
                      {notice.priority}
                    </Badge>
                    <Badge variant="outline">{notice.category}</Badge>
                    {notice.department && (
                      <Badge variant="secondary">{notice.department}</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{notice.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(notice.created_at), 'PPP')}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
