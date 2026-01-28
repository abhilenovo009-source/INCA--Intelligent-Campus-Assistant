import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Poll {
  id: string;
  title: string;
  description: string | null;
  category: string;
  duration: string;
  expires_at: string;
  created_at: string;
}

const PollsList = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls();

    const channel = supabase
      .channel('polls-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'polls'
        },
        () => {
          fetchPolls();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPolls = async () => {
    try {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPolls(data || []);
    } catch (error) {
      console.error('Error fetching polls:', error);
    } finally {
      setLoading(false);
    }
  };

  const isExpiringSoon = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const hoursUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilExpiry < 24;
  };

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center">Loading polls...</div>
        </div>
      </section>
    );
  }

  if (polls.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border rounded-full px-6 py-2 mb-6">
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Community Voice</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Active Polls
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your opinion on campus matters and help shape decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {polls.map((poll) => (
            <Card 
              key={poll.id}
              className="p-6 bg-gradient-card backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elevated"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{poll.category}</Badge>
                    {isExpiringSoon(poll.expires_at) && (
                      <Badge className="bg-destructive/20 text-destructive">
                        <Clock className="w-3 h-3 mr-1" />
                        Ending Soon
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {poll.title}
                  </h3>
                  
                  {poll.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {poll.description}
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    Expires: {format(new Date(poll.expires_at), 'PPP')}
                  </p>
                </div>
                
                <Link to="/community-polls" className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Vote Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/community-polls">
            <Button variant="ghost">
              View All Polls →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PollsList;
