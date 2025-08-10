import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Database, Key, Brain, Users, Activity, TrendingUp, Zap, ArrowUp, ArrowDown, Clock, DollarSign, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export default function Dashboard() {
  const realTimeData = [
    { time: '09:00', requests: 120, users: 15 },
    { time: '10:00', requests: 180, users: 22 },
    { time: '11:00', requests: 240, users: 18 },
    { time: '12:00', requests: 320, users: 35 },
    { time: '13:00', requests: 280, users: 28 },
    { time: '14:00', requests: 350, users: 42 }
  ]

  const systemHealth = [
    { name: 'API Gateway', status: 'healthy', uptime: 99.9, response: '145ms' },
    { name: 'Database', status: 'healthy', uptime: 99.8, response: '23ms' },
    { name: 'LLM Models', status: 'warning', uptime: 98.5, response: '1.2s' },
    { name: 'Cache Layer', status: 'healthy', uptime: 99.7, response: '8ms' }
  ]

  const resourceUsage = [
    { name: 'CPU Usage', value: 65, max: 100, color: 'bg-blue-500' },
    { name: 'Memory', value: 78, max: 100, color: 'bg-green-500' },
    { name: 'Storage', value: 42, max: 100, color: 'bg-purple-500' },
    { name: 'Bandwidth', value: 89, max: 100, color: 'bg-orange-500' }
  ]

  const stats = [
    {
      title: "Active Requests",
      value: "1,284",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-500",
      trend: "up"
    },
    {
      title: "Models Online",
      value: "8/10",
      change: "2 offline",
      icon: Brain,
      color: "text-purple-500",
      trend: "warning"
    },
    {
      title: "Requests/min",
      value: "847",
      change: "+18%",
      icon: Activity,
      color: "text-green-500",
      trend: "up"
    },
    {
      title: "Active Users",
      value: "156",
      change: "+5%",
      icon: Users,
      color: "text-orange-500",
      trend: "up"
    },
    {
      title: "Response Time",
      value: "1.2s",
      change: "-8%",
      icon: Clock,
      color: "text-cyan-500",
      trend: "down"
    },
    {
      title: "Cost Today",
      value: "$247.80",
      change: "+12%",
      icon: DollarSign,
      color: "text-yellow-500",
      trend: "up"
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

      {/* Real-time Overview */}
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-smooth animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {stat.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                    {stat.trend === 'down' && <ArrowDown className="h-3 w-3 text-green-500" />}
                    {stat.trend === 'warning' && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className={
                      stat.trend === 'up' ? "text-green-500" : 
                      stat.trend === 'down' ? "text-green-500" : 
                      "text-yellow-500"
                    }>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground">vs last hour</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Real-time Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Live Activity (Last 6 Hours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={realTimeData}>
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3}
                    name="Requests"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent))" 
                    fillOpacity={0.2}
                    name="Active Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemHealth.map((service, index) => (
              <Card key={service.name} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{service.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {service.status === 'healthy' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {service.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {service.status === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
                    <Badge variant={service.status === 'healthy' ? 'default' : 'destructive'}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uptime</span>
                      <span className="font-medium">{service.uptime}%</span>
                    </div>
                    <Progress value={service.uptime} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="font-medium">{service.response}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceUsage.map((resource, index) => (
              <Card key={resource.name} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage</span>
                      <span className="font-medium">{resource.value}%</span>
                    </div>
                    <Progress value={resource.value} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

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