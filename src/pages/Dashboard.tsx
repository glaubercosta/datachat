import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Database, Key, Brain, Users, Activity, TrendingUp, Zap } from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Conversations",
      value: "1,284",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      title: "Active Models",
      value: "8",
      change: "+2",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      title: "API Calls Today",
      value: "42,891",
      change: "+18%",
      icon: Activity,
      color: "text-green-500"
    },
    {
      title: "Active Users",
      value: "156",
      change: "+5%",
      icon: Users,
      color: "text-orange-500"
    }
  ]

  const quickActions = [
    {
      title: "Start New Chat",
      description: "Begin a conversation with your AI assistant",
      icon: MessageSquare,
      href: "/chat",
      color: "bg-gradient-primary"
    },
    {
      title: "Configure Database",
      description: "Set up or modify database connections",
      icon: Database,
      href: "/admin/database",
      color: "bg-gradient-accent"
    },
    {
      title: "Manage API Keys",
      description: "Update your LLM provider credentials",
      icon: Key,
      href: "/admin/api-keys",
      color: "bg-gradient-secondary"
    },
    {
      title: "Model Settings",
      description: "Configure AI models and parameters",
      icon: Brain,
      href: "/admin/models",
      color: "bg-gradient-primary"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero border border-border/10 p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
              <p className="text-muted-foreground">Manage your AI infrastructure with ease</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/chat">
                <MessageSquare className="h-5 w-5" />
                Start Chatting
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/admin/models">
                <Brain className="h-5 w-5" />
                Configure Models
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-smooth animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={action.title} className="group cursor-pointer hover:scale-105 transition-spring shadow-card-custom hover:shadow-elegant animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
              <Link to={action.href} className="block p-6">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-spring`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">New GPT-4 model configured</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Database connection updated</p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/20 border border-secondary/30">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">New user registered</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}